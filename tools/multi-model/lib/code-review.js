/**
 * Multi-Model Code Review System
 * Run code through multiple AI models and find consensus issues
 *
 * Supports single-model mode when USE_MULTI_MODEL=FALSE or only one API key is available
 */

import {
  complete,
  MODELS,
  isMultiModelEnabled,
  getAvailableProviders,
  filterAvailableModels,
  getDefaultModel,
  getBestModel,
} from './clients.js';
import chalk from 'chalk';

const REVIEW_PROMPT = `You are an expert code reviewer. Analyze the following code and identify issues.

For each issue found, respond in this JSON format:
{
  "issues": [
    {
      "severity": "critical|high|medium|low",
      "type": "security|performance|logic|style|maintainability",
      "line": <line_number_or_null>,
      "description": "Brief description of the issue",
      "suggestion": "How to fix it"
    }
  ],
  "summary": "Overall assessment in 1-2 sentences"
}

If no issues found, return: { "issues": [], "summary": "Code looks good" }

CODE TO REVIEW:
\`\`\`
{{CODE}}
\`\`\`

Respond ONLY with valid JSON, no markdown.`;

/**
 * Review code with a single model
 */
async function reviewWithModel(code, model, filename = 'unknown') {
  const prompt = REVIEW_PROMPT.replace('{{CODE}}', code);

  try {
    const result = await complete(model, prompt, {
      temperature: 0.2,
      systemPrompt:
        'You are a senior software engineer conducting a thorough code review. Be specific and actionable.',
    });

    // Parse JSON response
    const content = result.content.trim();
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      console.warn(`${model}: Could not parse JSON response`);
      return { model, issues: [], summary: 'Parse error', raw: content };
    }

    const parsed = JSON.parse(jsonMatch[0]);
    return {
      model,
      issues: parsed.issues || [],
      summary: parsed.summary || '',
      usage: result.usage,
    };
  } catch (error) {
    console.error(`${model} error:`, error.message);
    return { model, issues: [], summary: `Error: ${error.message}`, error: true };
  }
}

/**
 * Find consensus issues across multiple model reviews
 */
function findConsensus(reviews) {
  const issueMap = new Map();

  for (const review of reviews) {
    for (const issue of review.issues) {
      // Create a key based on issue characteristics
      const key = `${issue.type}-${issue.line || 'general'}-${issue.severity}`;
      const existing = issueMap.get(key);

      if (existing) {
        existing.models.push(review.model);
        existing.count++;
        // Keep the most detailed description
        if (issue.description.length > existing.description.length) {
          existing.description = issue.description;
          existing.suggestion = issue.suggestion;
        }
      } else {
        issueMap.set(key, {
          ...issue,
          models: [review.model],
          count: 1,
        });
      }
    }
  }

  // Sort by consensus count and severity
  const severityOrder = { critical: 4, high: 3, medium: 2, low: 1 };
  return Array.from(issueMap.values()).sort((a, b) => {
    if (b.count !== a.count) return b.count - a.count;
    return severityOrder[b.severity] - severityOrder[a.severity];
  });
}

/**
 * Multi-model code review with consensus
 * Falls back to single-model mode when USE_MULTI_MODEL=FALSE or only one API key is available
 */
export async function reviewCode(code, options = {}) {
  const {
    filename = 'code',
    models: requestedModels = [MODELS.GEMINI_FLASH, MODELS.GPT4O_MINI, MODELS.CLAUDE_HAIKU],
    consensusThreshold = 2, // How many models must agree
    verbose = false,
  } = options;

  // Check if multi-model is enabled and what providers are available
  const multiModelEnabled = isMultiModelEnabled();
  const availableProviders = getAvailableProviders();

  // Filter to only available models
  let models = filterAvailableModels(requestedModels);

  // Determine mode
  const useSingleModel = !multiModelEnabled || availableProviders.length === 1 || models.length < 2;

  if (useSingleModel) {
    // Single model mode - use the best available model
    const singleModel = models.length > 0 ? models[0] : getBestModel();
    console.log(chalk.blue(`\n🔍 Reviewing ${filename} with ${singleModel} (single-model mode)\n`));

    if (!multiModelEnabled) {
      console.log(chalk.dim('Multi-model mode disabled via USE_MULTI_MODEL=FALSE'));
    } else if (availableProviders.length === 1) {
      console.log(chalk.dim(`Only ${availableProviders[0]} API key configured`));
    }

    const startTime = Date.now();
    const review = await reviewWithModel(code, singleModel, filename);
    const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);

    // In single model mode, all issues are "confirmed" (no consensus possible)
    return {
      filename,
      models: [singleModel],
      reviews: [review],
      confirmedIssues: review.issues.map((issue) => ({
        ...issue,
        models: [singleModel],
        count: 1,
      })),
      possibleIssues: [],
      elapsed,
      singleModelMode: true,
      summary: generateSingleModelSummary(review),
    };
  }

  // Multi-model mode
  if (models.length === 0) {
    throw new Error('No models available. Check your API keys.');
  }

  console.log(chalk.blue(`\n🔍 Reviewing ${filename} with ${models.length} models...\n`));

  // Run reviews in parallel
  const startTime = Date.now();
  const reviews = await Promise.all(models.map((model) => reviewWithModel(code, model, filename)));
  const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);

  if (verbose) {
    console.log(chalk.dim(`\n⏱️  Completed in ${elapsed}s\n`));
    for (const review of reviews) {
      console.log(
        chalk.dim(`${review.model}: ${review.issues.length} issues - "${review.summary}"`)
      );
    }
  }

  // Find consensus
  const consensusIssues = findConsensus(reviews);
  const confirmedIssues = consensusIssues.filter((i) => i.count >= consensusThreshold);
  const possibleIssues = consensusIssues.filter((i) => i.count < consensusThreshold && i.count > 0);

  return {
    filename,
    models,
    reviews,
    confirmedIssues,
    possibleIssues,
    elapsed,
    singleModelMode: false,
    summary: generateSummary(confirmedIssues, possibleIssues),
  };
}

/**
 * Generate summary for single-model review
 */
function generateSingleModelSummary(review) {
  if (review.error) {
    return `❌ Review failed: ${review.summary}`;
  }
  if (review.issues.length === 0) {
    return '✅ No issues found';
  }
  const critical = review.issues.filter((i) => i.severity === 'critical').length;
  const high = review.issues.filter((i) => i.severity === 'high').length;
  const parts = [`⚠️  ${review.issues.length} issue(s) found`];
  if (critical > 0) parts.push(`🚨 ${critical} critical`);
  if (high > 0) parts.push(`🔴 ${high} high`);
  return parts.join(' | ');
}

/**
 * Generate a human-readable summary
 */
function generateSummary(confirmed, possible) {
  if (confirmed.length === 0 && possible.length === 0) {
    return '✅ No issues found - all models agree the code looks good!';
  }

  const parts = [];
  if (confirmed.length > 0) {
    const critical = confirmed.filter((i) => i.severity === 'critical').length;
    const high = confirmed.filter((i) => i.severity === 'high').length;
    parts.push(`⚠️  ${confirmed.length} confirmed issue(s)`);
    if (critical > 0) parts.push(`🚨 ${critical} critical`);
    if (high > 0) parts.push(`🔴 ${high} high`);
  }
  if (possible.length > 0) {
    parts.push(`❓ ${possible.length} possible issue(s) (single model)`);
  }
  return parts.join(' | ');
}

/**
 * Format review results for display
 */
export function formatReviewResults(results) {
  const lines = [];
  lines.push(chalk.bold(`\n📋 Code Review Results: ${results.filename}`));

  if (results.singleModelMode) {
    lines.push(chalk.dim(`Model: ${results.models[0]} (single-model mode)`));
  } else {
    lines.push(chalk.dim(`Models: ${results.models.join(', ')}`));
  }
  lines.push(chalk.dim(`Time: ${results.elapsed}s\n`));
  lines.push(results.summary);

  if (results.confirmedIssues.length > 0) {
    const headerText = results.singleModelMode
      ? '\n🔍 Issues Found:'
      : '\n🔴 Confirmed Issues (multiple models agree):';
    lines.push(chalk.bold(headerText));

    for (const issue of results.confirmedIssues) {
      const severityColor =
        { critical: 'red', high: 'yellow', medium: 'cyan', low: 'dim' }[issue.severity] || 'white';
      lines.push(
        chalk[severityColor](
          `  [${issue.severity.toUpperCase()}] ${issue.type}${issue.line ? ` (line ${issue.line})` : ''}`
        )
      );
      lines.push(`    ${issue.description}`);
      lines.push(chalk.green(`    → ${issue.suggestion}`));
      if (!results.singleModelMode) {
        lines.push(chalk.dim(`    Flagged by: ${issue.models.join(', ')}\n`));
      } else {
        lines.push(''); // blank line
      }
    }
  }

  if (results.possibleIssues.length > 0) {
    lines.push(chalk.bold('\n🟡 Possible Issues (single model):'));
    for (const issue of results.possibleIssues) {
      lines.push(chalk.dim(`  [${issue.severity}] ${issue.type}: ${issue.description}`));
      lines.push(chalk.dim(`    Flagged by: ${issue.models[0]}`));
    }
  }

  return lines.join('\n');
}

/**
 * Quick review with fastest/cheapest models
 * Automatically adapts to available API keys
 */
export async function quickReview(code, filename = 'code') {
  return reviewCode(code, {
    filename,
    models: [MODELS.GEMINI_FLASH, MODELS.GPT4O_MINI, MODELS.CLAUDE_HAIKU],
    consensusThreshold: 2,
  });
}

/**
 * Deep review with most capable models
 * Automatically adapts to available API keys
 */
export async function deepReview(code, filename = 'code') {
  return reviewCode(code, {
    filename,
    models: [MODELS.GPT4O, MODELS.CLAUDE_SONNET, MODELS.GEMINI_PRO],
    consensusThreshold: 2,
    verbose: true,
  });
}

/**
 * Single model review (explicit single-model mode)
 * Uses the best available model
 */
export async function singleReview(code, filename = 'code', model = null) {
  const useModel = model || getBestModel();
  return reviewCode(code, {
    filename,
    models: [useModel],
    consensusThreshold: 1,
  });
}
