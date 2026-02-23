/**
 * Agent Integration Example
 * 
 * Shows how to integrate multi-model routing into a Claude Code workflow
 */

import { createRouter, searchCodebase, reviewCode, MODELS } from '../index.js';

// Create a balanced router (switches between cost/quality as needed)
const router = createRouter('balanced');

/**
 * Example: Smart code assistant that uses the right model for each task
 */
async function smartAssistant(userRequest, codeContext = {}) {
  const { currentFile, projectRoot } = codeContext;

  // 1. Search for relevant code context
  let relevantCode = [];
  if (projectRoot) {
    try {
      relevantCode = await searchCodebase(userRequest, {
        indexPath: `${projectRoot}/.code-index/index.json`,
        topK: 5,
      });
    } catch (e) {
      // Index might not exist, that's okay
    }
  }

  // 2. Build context-aware prompt
  const contextBlock = relevantCode.length > 0
    ? `\nRelevant code from the codebase:\n${relevantCode.map((r) => 
        `--- ${r.filename} (lines ${r.lineStart}-${r.lineEnd}) ---\n${r.content}`
      ).join('\n\n')}\n`
    : '';

  const prompt = `${userRequest}${contextBlock}`;

  // 3. Route to optimal model based on task type
  const result = await router.route(prompt, {
    context: {
      contentLength: prompt.length,
    },
    systemPrompt: `You are a senior software engineer. Be concise and actionable.
Current file: ${currentFile || 'unknown'}`,
  });

  return {
    response: result.content,
    model: result.model,
    taskType: result.taskType,
    reasoning: result.routing,
  };
}

/**
 * Example: PR Review workflow
 */
async function reviewPullRequest(changedFiles) {
  const results = {
    summary: '',
    fileReviews: [],
    criticalCount: 0,
    highCount: 0,
  };

  for (const file of changedFiles) {
    // Use quick review for small files, deep for large/important ones
    const isImportant = 
      file.path.includes('auth') || 
      file.path.includes('payment') ||
      file.path.includes('security');

    const review = isImportant
      ? await reviewCode(file.content, {
          filename: file.path,
          models: [MODELS.GPT4O, MODELS.CLAUDE_SONNET, MODELS.GEMINI_PRO],
        })
      : await reviewCode(file.content, {
          filename: file.path,
          models: [MODELS.GEMINI_FLASH, MODELS.GPT4O_MINI],
        });

    results.fileReviews.push({
      file: file.path,
      issues: review.confirmedIssues,
      summary: review.summary,
    });

    results.criticalCount += review.confirmedIssues.filter(
      (i) => i.severity === 'critical'
    ).length;
    results.highCount += review.confirmedIssues.filter(
      (i) => i.severity === 'high'
    ).length;
  }

  // Generate overall summary using Claude (best at synthesis)
  const summaryPrompt = `Summarize this PR review in 2-3 sentences:
${JSON.stringify(results.fileReviews, null, 2)}`;

  const summaryResult = await router.route(summaryPrompt, {
    taskType: 'documentation',
  });

  results.summary = summaryResult.content;

  return results;
}

/**
 * Example: Cost-aware batch processing
 */
async function batchProcess(tasks, budget = 1.0) {
  const costRouter = createRouter('cost');
  const qualityRouter = createRouter('quality');
  
  let spent = 0;
  const results = [];

  for (const task of tasks) {
    // Estimate cost with cheap model
    const estimate = costRouter.estimateCost(task.type, task.tokens);
    
    // Use quality model if we have budget, otherwise cheap
    const useQuality = spent + estimate.total * 10 < budget; // 10x safety margin
    const router = useQuality ? qualityRouter : costRouter;

    const result = await router.route(task.prompt, {
      taskType: task.type,
    });

    spent += estimate.total;
    results.push({
      ...result,
      estimatedCost: estimate.formatted,
    });
  }

  return { results, totalSpent: `$${spent.toFixed(4)}` };
}

// Export for use in other modules
export { smartAssistant, reviewPullRequest, batchProcess };
