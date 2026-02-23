/**
 * Intelligent Model Router
 * Routes tasks to the optimal AI model based on task characteristics
 */

import { complete, MODELS, MODEL_COSTS } from './clients.js';

/**
 * Task type definitions with optimal models
 */
const TASK_ROUTING = {
  // Long context tasks → Claude (200k context)
  'long-context': {
    primary: MODELS.CLAUDE_SONNET,
    fallback: MODELS.GPT4O,
    reason: 'Claude has 200k context window, best for large files',
  },

  // Code generation → GPT-4 (mature function calling)
  'code-generation': {
    primary: MODELS.GPT4O,
    fallback: MODELS.CLAUDE_SONNET,
    reason: 'GPT-4 has mature function calling and code generation',
  },

  // Quick refactors → Fast models
  refactor: {
    primary: MODELS.GPT4O_MINI,
    fallback: MODELS.GEMINI_FLASH,
    reason: 'Fast and accurate for straightforward refactors',
  },

  // Documentation → Claude (nuanced, thorough)
  documentation: {
    primary: MODELS.CLAUDE_SONNET,
    fallback: MODELS.GPT4O,
    reason: 'Claude excels at nuanced, comprehensive documentation',
  },

  // Image/diagram analysis → Gemini (native multimodal)
  multimodal: {
    primary: MODELS.GEMINI_PRO,
    fallback: MODELS.GPT4O,
    reason: 'Gemini has native multimodal support',
  },

  // Research/synthesis → Gemini
  research: {
    primary: MODELS.GEMINI_PRO,
    fallback: MODELS.CLAUDE_SONNET,
    reason: 'Gemini good at information synthesis',
  },

  // Security review → Claude (careful reasoning)
  security: {
    primary: MODELS.CLAUDE_SONNET,
    fallback: MODELS.GPT4O,
    reason: 'Claude better at nuanced security analysis',
  },

  // Architecture decisions → Claude
  architecture: {
    primary: MODELS.CLAUDE_SONNET,
    fallback: MODELS.GPT4O,
    reason: 'Claude excels at complex reasoning and trade-offs',
  },

  // Linting/style → Cheap and fast
  lint: {
    primary: MODELS.GEMINI_FLASH,
    fallback: MODELS.GPT4O_MINI,
    reason: 'Simple checks, optimize for cost',
  },

  // Test generation → GPT-4
  testing: {
    primary: MODELS.GPT4O,
    fallback: MODELS.CLAUDE_SONNET,
    reason: 'GPT-4 good at structured test generation',
  },

  // Explanation/teaching → Claude
  explain: {
    primary: MODELS.CLAUDE_SONNET,
    fallback: MODELS.GPT4O,
    reason: 'Claude provides clear, thorough explanations',
  },

  // Default/general
  general: {
    primary: MODELS.GPT4O_MINI,
    fallback: MODELS.GEMINI_FLASH,
    reason: 'Good balance of capability and cost',
  },
};

/**
 * Detect task type from prompt characteristics
 */
export function detectTaskType(prompt, context = {}) {
  const promptLower = prompt.toLowerCase();
  const { contentLength = 0, hasImage = false } = context;

  // Check for multimodal
  if (hasImage) return 'multimodal';

  // Check for long context
  if (contentLength > 50000) return 'long-context';

  // Keyword matching (in priority order)
  const patterns = [
    {
      type: 'security',
      keywords: ['security', 'vulnerability', 'exploit', 'injection', 'xss', 'csrf'],
    },
    {
      type: 'documentation',
      keywords: ['document', 'readme', 'jsdoc', 'explain the code', 'write docs'],
    },
    { type: 'testing', keywords: ['test', 'spec', 'unittest', 'jest', 'vitest', 'coverage'] },
    { type: 'architecture', keywords: ['architect', 'design pattern', 'structure', 'scalab'] },
    { type: 'refactor', keywords: ['refactor', 'clean up', 'simplify', 'optimize'] },
    {
      type: 'code-generation',
      keywords: ['generate', 'create a function', 'implement', 'build a'],
    },
    { type: 'lint', keywords: ['lint', 'format', 'style', 'prettier', 'eslint'] },
    { type: 'explain', keywords: ['explain', 'what does', 'how does', 'why does', 'teach me'] },
    { type: 'research', keywords: ['research', 'compare', 'alternatives', 'best practice'] },
  ];

  for (const { type, keywords } of patterns) {
    if (keywords.some((kw) => promptLower.includes(kw))) {
      return type;
    }
  }

  return 'general';
}

/**
 * Get the optimal model for a task
 */
export function getOptimalModel(taskType, options = {}) {
  const { preferCost = false, preferSpeed = false, preferQuality = false } = options;

  const routing = TASK_ROUTING[taskType] || TASK_ROUTING.general;

  if (preferCost) {
    // Return cheapest model that can handle the task
    return MODELS.GEMINI_FLASH;
  }

  if (preferSpeed) {
    // Return fastest model
    const fastModels = [MODELS.GEMINI_FLASH, MODELS.GPT4O_MINI, MODELS.CLAUDE_HAIKU];
    return fastModels.includes(routing.primary) ? routing.primary : MODELS.GEMINI_FLASH;
  }

  if (preferQuality) {
    // Return most capable model for the task
    const qualityModels = [MODELS.GPT4O, MODELS.CLAUDE_SONNET, MODELS.GEMINI_PRO];
    return qualityModels.includes(routing.primary) ? routing.primary : MODELS.CLAUDE_SONNET;
  }

  return routing.primary;
}

/**
 * Router class for stateful routing with fallbacks
 */
export class ModelRouter {
  constructor(options = {}) {
    this.preferCost = options.preferCost || false;
    this.preferSpeed = options.preferSpeed || false;
    this.preferQuality = options.preferQuality || false;
    this.verbose = options.verbose || false;
    this.failedModels = new Set();
  }

  /**
   * Route a task to the optimal model and execute
   */
  async route(prompt, options = {}) {
    const { context = {}, systemPrompt, maxTokens } = options;

    // Detect task type
    const taskType = options.taskType || detectTaskType(prompt, context);
    const routing = TASK_ROUTING[taskType] || TASK_ROUTING.general;

    if (this.verbose) {
      console.log(`\n🎯 Task type: ${taskType}`);
      console.log(`📋 Reason: ${routing.reason}`);
    }

    // Get model (considering preferences and failures)
    let model = this.getModel(taskType);

    // Try primary, then fallback
    const modelsToTry = [model, routing.fallback].filter((m) => m && !this.failedModels.has(m));

    for (const tryModel of modelsToTry) {
      try {
        if (this.verbose) {
          console.log(`🤖 Using model: ${tryModel}`);
        }

        const result = await complete(tryModel, prompt, {
          systemPrompt,
          maxTokens,
        });

        return {
          ...result,
          taskType,
          routing: routing.reason,
        };
      } catch (error) {
        console.error(`Model ${tryModel} failed:`, error.message);
        this.failedModels.add(tryModel);
      }
    }

    throw new Error(`All models failed for task type: ${taskType}`);
  }

  getModel(taskType) {
    return getOptimalModel(taskType, {
      preferCost: this.preferCost,
      preferSpeed: this.preferSpeed,
      preferQuality: this.preferQuality,
    });
  }

  /**
   * Estimate cost for a task
   */
  estimateCost(taskType, inputTokens, outputTokens = 1000) {
    const model = this.getModel(taskType);
    const costs = MODEL_COSTS[model] || [1, 3];
    const inputCost = (inputTokens / 1_000_000) * costs[0];
    const outputCost = (outputTokens / 1_000_000) * costs[1];
    return {
      model,
      inputCost,
      outputCost,
      total: inputCost + outputCost,
      formatted: `$${(inputCost + outputCost).toFixed(4)}`,
    };
  }
}

/**
 * Create a pre-configured router
 */
export function createRouter(profile = 'balanced') {
  const profiles = {
    cost: { preferCost: true },
    speed: { preferSpeed: true },
    quality: { preferQuality: true },
    balanced: {},
  };

  return new ModelRouter(profiles[profile] || profiles.balanced);
}

export { TASK_ROUTING };
