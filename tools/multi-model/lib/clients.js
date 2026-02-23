/**
 * Multi-Model AI Clients
 * Unified interface for OpenAI, Anthropic, and Google Gemini
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
};
