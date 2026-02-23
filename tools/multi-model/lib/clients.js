/**
 * Multi-Model AI Clients
 * Unified interface for OpenAI, Anthropic, and Google Gemini
 *
 * Supports single-model mode when USE_MULTI_MODEL=FALSE or only one API key is available
 */

import OpenAI from 'openai';
import Anthropic from '@anthropic-ai/sdk';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { config } from 'dotenv';

config();

// Initialize clients lazily
let openaiClient = null;
let anthropicClient = null;
let geminiClient = null;
let veniceClient = null;

/**
 * Check if multi-model mode is enabled
 */
export function isMultiModelEnabled() {
  const setting = process.env.USE_MULTI_MODEL?.toUpperCase();
  // Default to TRUE if not set, FALSE only if explicitly disabled
  return setting !== 'FALSE' && setting !== '0' && setting !== 'NO';
}

/**
 * Check which API keys are available
 */
export function getAvailableProviders() {
  const providers = [];
  if (process.env.OPENAI_API_KEY) providers.push('openai');
  if (process.env.ANTHROPIC_API_KEY) providers.push('anthropic');
  if (process.env.GEMINI_API_KEY || process.env.GEMENI_API_KEY) providers.push('gemini');
  if (process.env.VENICE_API_KEY) providers.push('venice');
  return providers;
}

/**
 * Check if a specific provider is available
 */
export function hasProvider(provider) {
  return getAvailableProviders().includes(provider);
}

/**
 * Get the primary (first available) provider
 */
export function getPrimaryProvider() {
  const providers = getAvailableProviders();
  if (providers.length === 0) {
    throw new Error(
      'No API keys configured. Set at least one of: OPENAI_API_KEY, ANTHROPIC_API_KEY, GEMINI_API_KEY'
    );
  }
  return providers[0];
}

export function getOpenAI() {
  if (!openaiClient) {
    if (!process.env.OPENAI_API_KEY) {
      throw new Error('OPENAI_API_KEY not set in environment');
    }
    openaiClient = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  }
  return openaiClient;
}

export function getAnthropic() {
  if (!anthropicClient) {
    if (!process.env.ANTHROPIC_API_KEY) {
      throw new Error('ANTHROPIC_API_KEY not set in environment');
    }
    anthropicClient = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
  }
  return anthropicClient;
}

export function getGemini() {
  if (!geminiClient) {
    const key = process.env.GEMINI_API_KEY || process.env.GEMENI_API_KEY;
    if (!key) {
      throw new Error('GEMINI_API_KEY not set in environment');
    }
    geminiClient = new GoogleGenerativeAI(key);
  }
  return geminiClient;
}

/**
 * Get Venice AI client (OpenAI-compatible)
 * Venice provides uncensored models with private inference
 * https://venice.ai
 */
export function getVenice() {
  if (!veniceClient) {
    if (!process.env.VENICE_API_KEY) {
      throw new Error('VENICE_API_KEY not set in environment');
    }
    veniceClient = new OpenAI({
      apiKey: process.env.VENICE_API_KEY,
      baseURL: 'https://api.venice.ai/api/v1',
    });
  }
  return veniceClient;
}

/**
 * Unified completion interface
 */
export async function complete(model, prompt, options = {}) {
  const { maxTokens = 4096, temperature = 0.3, systemPrompt } = options;

  // OpenAI models
  if (model.startsWith('gpt-')) {
    const client = getOpenAI();
    const messages = [];
    if (systemPrompt) messages.push({ role: 'system', content: systemPrompt });
    messages.push({ role: 'user', content: prompt });

    const response = await client.chat.completions.create({
      model,
      messages,
      max_tokens: maxTokens,
      temperature,
    });
    return {
      content: response.choices[0].message.content,
      model,
      usage: response.usage,
    };
  }

  // Anthropic models
  if (model.startsWith('claude-')) {
    const client = getAnthropic();
    const response = await client.messages.create({
      model,
      max_tokens: maxTokens,
      system: systemPrompt || undefined,
      messages: [{ role: 'user', content: prompt }],
    });
    return {
      content: response.content[0].text,
      model,
      usage: {
        prompt_tokens: response.usage.input_tokens,
        completion_tokens: response.usage.output_tokens,
      },
    };
  }

  // Gemini models
  if (model.startsWith('gemini-')) {
    const client = getGemini();
    const genModel = client.getGenerativeModel({ model });
    const fullPrompt = systemPrompt ? `${systemPrompt}\n\n${prompt}` : prompt;
    const result = await genModel.generateContent(fullPrompt);
    const response = await result.response;
    return {
      content: response.text(),
      model,
      usage: null, // Gemini doesn't return token counts the same way
    };
  }

  // Venice AI models (OpenAI-compatible API)
  if (model.startsWith('venice/') || VENICE_MODELS.includes(model)) {
    const client = getVenice();
    const messages = [];
    if (systemPrompt) messages.push({ role: 'system', content: systemPrompt });
    messages.push({ role: 'user', content: prompt });

    // Strip venice/ prefix if present
    const veniceModel = model.replace('venice/', '');

    const response = await client.chat.completions.create({
      model: veniceModel,
      messages,
      max_tokens: maxTokens,
      temperature,
    });
    return {
      content: response.choices[0].message.content,
      model,
      usage: response.usage,
    };
  }

  throw new Error(`Unknown model: ${model}`);
}

/**
 * Get embeddings (OpenAI only for now)
 */
export async function embed(text, model = 'text-embedding-3-small') {
  const client = getOpenAI();
  const response = await client.embeddings.create({
    model,
    input: text,
  });
  return response.data[0].embedding;
}

/**
 * Batch embeddings for efficiency
 */
export async function embedBatch(texts, model = 'text-embedding-3-small') {
  const client = getOpenAI();
  const response = await client.embeddings.create({
    model,
    input: texts,
  });
  return response.data.map((d) => d.embedding);
}

// Venice AI model identifiers
export const VENICE_MODELS = [
  'llama-3.3-70b',
  'llama-3.2-3b',
  'deepseek-r1-671b',
  'deepseek-r1-llama-70b',
  'dolphin-2.9.2-qwen2-72b',
  'qwen-2.5-72b',
];

export const MODELS = {
  // OpenAI
  GPT4: 'gpt-4-turbo-preview',
  GPT4O: 'gpt-4o',
  GPT4O_MINI: 'gpt-4o-mini',

  // Anthropic
  CLAUDE_OPUS: 'claude-sonnet-4-20250514', // Opus 4 not out yet, use Sonnet 4
  CLAUDE_SONNET: 'claude-sonnet-4-20250514',
  CLAUDE_HAIKU: 'claude-3-5-haiku-20241022',

  // Google
  GEMINI_PRO: 'gemini-1.5-pro',
  GEMINI_FLASH: 'gemini-2.0-flash',

  // Venice AI (uncensored, private inference)
  VENICE_LLAMA_70B: 'llama-3.3-70b',
  VENICE_LLAMA_3B: 'llama-3.2-3b',
  VENICE_DEEPSEEK_R1: 'deepseek-r1-671b',
  VENICE_DEEPSEEK_LLAMA: 'deepseek-r1-llama-70b',
  VENICE_DOLPHIN: 'dolphin-2.9.2-qwen2-72b',
  VENICE_QWEN: 'qwen-2.5-72b',
};

export const MODEL_COSTS = {
  // Per 1M tokens [input, output]
  'gpt-4-turbo-preview': [10, 30],
  'gpt-4o': [5, 15],
  'gpt-4o-mini': [0.15, 0.6],
  'claude-sonnet-4-20250514': [3, 15],
  'claude-3-5-haiku-20241022': [0.8, 4],
  'gemini-1.5-pro': [3.5, 10.5],
  'gemini-2.0-flash': [0.075, 0.3],
  // Venice AI (VVV token) - prices approximate
  'llama-3.3-70b': [0.5, 0.75],
  'llama-3.2-3b': [0.1, 0.15],
  'deepseek-r1-671b': [2.0, 4.0],
  'deepseek-r1-llama-70b': [0.5, 0.75],
  'dolphin-2.9.2-qwen2-72b': [0.5, 0.75],
  'qwen-2.5-72b': [0.5, 0.75],
};

/**
 * Get provider from model name
 */
export function getProviderFromModel(model) {
  if (model.startsWith('gpt-')) return 'openai';
  if (model.startsWith('claude-')) return 'anthropic';
  if (model.startsWith('gemini-')) return 'gemini';
  if (model.startsWith('venice/') || VENICE_MODELS.includes(model)) return 'venice';
  return null;
}

/**
 * Get available models based on configured API keys
 */
export function getAvailableModels() {
  const models = [];
  if (hasProvider('openai')) {
    models.push(MODELS.GPT4O, MODELS.GPT4O_MINI);
  }
  if (hasProvider('anthropic')) {
    models.push(MODELS.CLAUDE_SONNET, MODELS.CLAUDE_HAIKU);
  }
  if (hasProvider('gemini')) {
    models.push(MODELS.GEMINI_PRO, MODELS.GEMINI_FLASH);
  }
  if (hasProvider('venice')) {
    models.push(MODELS.VENICE_LLAMA_70B, MODELS.VENICE_LLAMA_3B, MODELS.VENICE_DEEPSEEK_R1);
  }
  return models;
}

/**
 * Get the default model (cheapest available fast model)
 */
export function getDefaultModel() {
  // Prefer cheaper/faster models as default
  if (hasProvider('gemini')) return MODELS.GEMINI_FLASH;
  if (hasProvider('venice')) return MODELS.VENICE_LLAMA_3B;
  if (hasProvider('openai')) return MODELS.GPT4O_MINI;
  if (hasProvider('anthropic')) return MODELS.CLAUDE_HAIKU;
  throw new Error('No API keys configured');
}

/**
 * Get the best available model for quality
 */
export function getBestModel() {
  if (hasProvider('anthropic')) return MODELS.CLAUDE_SONNET;
  if (hasProvider('openai')) return MODELS.GPT4O;
  if (hasProvider('venice')) return MODELS.VENICE_DEEPSEEK_R1;
  if (hasProvider('gemini')) return MODELS.GEMINI_PRO;
  throw new Error('No API keys configured');
}

/**
 * Filter models to only those with available API keys
 */
export function filterAvailableModels(models) {
  return models.filter((model) => {
    const provider = getProviderFromModel(model);
    return provider && hasProvider(provider);
  });
}
