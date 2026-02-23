/**
 * Multi-Model AI Toolkit
 *
 * A comprehensive toolkit for leveraging multiple AI models:
 * - OpenAI (GPT-4, GPT-4o, GPT-4o-mini)
 * - Anthropic (Claude 3 Opus, Sonnet, Haiku)
 * - Google (Gemini Pro, Flash)
 *
 * Supports single-model mode when USE_MULTI_MODEL=FALSE or only one API key is available.
 *
 * @example
 * import { reviewCode, createRouter, searchCodebase } from '@claude-sidekick/multi-model';
 *
 * // Multi-model code review (auto-adapts to available API keys)
 * const results = await reviewCode(code, { filename: 'app.js' });
 *
 * // Intelligent routing
 * const router = createRouter('balanced');
 * const response = await router.route('Explain this architecture...');
 *
 * // Semantic search
 * const matches = await searchCodebase('authentication logic');
 */

// Clients & Configuration
export {
  complete,
  embed,
  embedBatch,
  getOpenAI,
  getAnthropic,
  getGemini,
  MODELS,
  MODEL_COSTS,
  // Configuration helpers
  isMultiModelEnabled,
  getAvailableProviders,
  getAvailableModels,
  getDefaultModel,
  getBestModel,
  hasProvider,
  filterAvailableModels,
} from './lib/clients.js';

// Code Review
export {
  reviewCode,
  quickReview,
  deepReview,
  singleReview,
  formatReviewResults,
} from './lib/code-review.js';

// Model Router
export {
  ModelRouter,
  createRouter,
  detectTaskType,
  getOptimalModel,
  TASK_ROUTING,
} from './lib/model-router.js';

// Embeddings & Search
export {
  indexCodebase,
  loadIndex,
  searchCodebase,
  formatSearchResults,
  findSimilarCode,
} from './lib/embeddings.js';
