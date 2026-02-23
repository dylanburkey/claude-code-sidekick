/**
 * Codebase Indexing & Semantic Search
 * Index your codebase with embeddings for semantic code search
 */

import { embed, embedBatch } from './clients.js';
import { glob } from 'glob';
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { join, relative, extname } from 'path';
import chalk from 'chalk';

const DEFAULT_EXTENSIONS = [
  '.js', '.ts', '.jsx', '.tsx', '.py', '.go', '.rs',
  '.java', '.rb', '.php', '.vue', '.svelte', '.astro',
  '.css', '.scss', '.html', '.json', '.md', '.yaml', '.yml',
];

const DEFAULT_IGNORE = [
  '**/node_modules/**',
  '**/dist/**',
  '**/build/**',
  '**/.git/**',
  '**/coverage/**',
  '**/*.min.js',
  '**/package-lock.json',
  '**/pnpm-lock.yaml',
  '**/yarn.lock',
];

/**
 * Chunk code into meaningful segments
 */
function chunkCode(content, filename, options = {}) {
  const { maxChunkSize = 1500, overlap = 200 } = options;
  const chunks = [];
  const ext = extname(filename);

  // For code files, try to chunk by functions/classes
  if (['.js', '.ts', '.jsx', '.tsx', '.py', '.go', '.rs', '.java'].includes(ext)) {
    // Simple heuristic: split on function/class definitions
    const patterns = [
      /^(export\s+)?(async\s+)?function\s+\w+/gm,
      /^(export\s+)?(const|let|var)\s+\w+\s*=\s*(async\s+)?\(/gm,
      /^(export\s+)?class\s+\w+/gm,
      /^def\s+\w+/gm, // Python
      /^func\s+\w+/gm, // Go
    ];

    let lastIndex = 0;
    const boundaries = [0];

    for (const pattern of patterns) {
      let match;
      while ((match = pattern.exec(content)) !== null) {
        boundaries.push(match.index);
      }
    }

    boundaries.push(content.length);
    boundaries.sort((a, b) => a - b);

    // Merge small chunks, split large ones
    let currentChunk = '';
    let currentStart = 0;

    for (let i = 1; i < boundaries.length; i++) {
      const segment = content.slice(boundaries[i - 1], boundaries[i]);

      if (currentChunk.length + segment.length < maxChunkSize) {
        currentChunk += segment;
      } else {
        if (currentChunk.length > 0) {
          chunks.push({
            content: currentChunk,
            start: currentStart,
            end: boundaries[i - 1],
          });
        }
        currentChunk = segment;
        currentStart = boundaries[i - 1];
      }
    }

    if (currentChunk.length > 0) {
      chunks.push({
        content: currentChunk,
        start: currentStart,
        end: content.length,
      });
    }
  }

  // Fallback: simple sliding window
  if (chunks.length === 0) {
    for (let i = 0; i < content.length; i += maxChunkSize - overlap) {
      chunks.push({
        content: content.slice(i, i + maxChunkSize),
        start: i,
        end: Math.min(i + maxChunkSize, content.length),
      });
    }
  }

  return chunks.map((chunk, index) => ({
    ...chunk,
    filename,
    index,
    lineStart: content.slice(0, chunk.start).split('\n').length,
    lineEnd: content.slice(0, chunk.end).split('\n').length,
  }));
}

/**
 * Index a codebase
 */
export async function indexCodebase(rootDir, options = {}) {
  const {
    extensions = DEFAULT_EXTENSIONS,
    ignore = DEFAULT_IGNORE,
    outputDir = join(rootDir, '.code-index'),
    batchSize = 100,
    verbose = false,
  } = options;

  console.log(chalk.blue(`\n📦 Indexing codebase: ${rootDir}\n`));

  // Find all files
  const pattern = `**/*{${extensions.join(',')}}`;
  const files = await glob(pattern, {
    cwd: rootDir,
    ignore,
    nodir: true,
  });

  console.log(chalk.dim(`Found ${files.length} files to index\n`));

  // Process files and create chunks
  const allChunks = [];

  for (const file of files) {
    const fullPath = join(rootDir, file);
    try {
      const content = readFileSync(fullPath, 'utf-8');
      if (content.length < 10) continue; // Skip tiny files

      const chunks = chunkCode(content, file);
      allChunks.push(...chunks);

      if (verbose) {
        console.log(chalk.dim(`  ${file}: ${chunks.length} chunks`));
      }
    } catch (error) {
      console.warn(chalk.yellow(`  Skipping ${file}: ${error.message}`));
    }
  }

  console.log(chalk.blue(`\n🧮 Creating embeddings for ${allChunks.length} chunks...\n`));

  // Generate embeddings in batches
  const embeddings = [];
  for (let i = 0; i < allChunks.length; i += batchSize) {
    const batch = allChunks.slice(i, i + batchSize);
    const texts = batch.map((c) => `File: ${c.filename}\n\n${c.content}`);

    try {
      const batchEmbeddings = await embedBatch(texts);
      embeddings.push(...batchEmbeddings);

      const progress = Math.min(100, Math.round(((i + batch.length) / allChunks.length) * 100));
      process.stdout.write(`\r  Progress: ${progress}%`);
    } catch (error) {
      console.error(`\nBatch ${i / batchSize} failed:`, error.message);
      // Fill with null embeddings for failed batch
      embeddings.push(...new Array(batch.length).fill(null));
    }
  }

  console.log('\n');

  // Build index
  const index = {
    version: '1.0',
    createdAt: new Date().toISOString(),
    rootDir,
    totalFiles: files.length,
    totalChunks: allChunks.length,
    chunks: allChunks.map((chunk, i) => ({
      ...chunk,
      embedding: embeddings[i],
    })).filter((c) => c.embedding !== null),
  };

  // Save index
  if (!existsSync(outputDir)) {
    mkdirSync(outputDir, { recursive: true });
  }

  const indexPath = join(outputDir, 'index.json');
  writeFileSync(indexPath, JSON.stringify(index, null, 2));

  console.log(chalk.green(`✅ Index saved to ${indexPath}`));
  console.log(chalk.dim(`   ${index.chunks.length} chunks indexed`));

  return index;
}

/**
 * Load an existing index
 */
export function loadIndex(indexPath) {
  if (!existsSync(indexPath)) {
    throw new Error(`Index not found: ${indexPath}`);
  }
  return JSON.parse(readFileSync(indexPath, 'utf-8'));
}

/**
 * Cosine similarity between two vectors
 */
function cosineSimilarity(a, b) {
  let dotProduct = 0;
  let normA = 0;
  let normB = 0;

  for (let i = 0; i < a.length; i++) {
    dotProduct += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }

  return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
}

/**
 * Search the codebase
 */
export async function searchCodebase(query, options = {}) {
  const {
    indexPath,
    index: providedIndex,
    topK = 10,
    minSimilarity = 0.5,
  } = options;

  // Load or use provided index
  const index = providedIndex || loadIndex(indexPath);

  console.log(chalk.blue(`\n🔍 Searching: "${query}"\n`));

  // Generate query embedding
  const queryEmbedding = await embed(query);

  // Calculate similarities
  const results = index.chunks
    .map((chunk) => ({
      ...chunk,
      similarity: cosineSimilarity(queryEmbedding, chunk.embedding),
    }))
    .filter((r) => r.similarity >= minSimilarity)
    .sort((a, b) => b.similarity - a.similarity)
    .slice(0, topK);

  return results;
}

/**
 * Format search results for display
 */
export function formatSearchResults(results) {
  const lines = [];

  for (const result of results) {
    const similarity = (result.similarity * 100).toFixed(1);
    lines.push(chalk.bold(`\n📄 ${result.filename} (${similarity}% match)`));
    lines.push(chalk.dim(`   Lines ${result.lineStart}-${result.lineEnd}`));
    lines.push('');

    // Show preview (first 300 chars)
    const preview = result.content.slice(0, 300).trim();
    const previewLines = preview.split('\n').map((l) => chalk.dim(`   ${l}`));
    lines.push(...previewLines);

    if (result.content.length > 300) {
      lines.push(chalk.dim('   ...'));
    }
  }

  return lines.join('\n');
}

/**
 * Find similar code (duplicate detection)
 */
export async function findSimilarCode(code, options = {}) {
  const { indexPath, index: providedIndex, threshold = 0.85, topK = 5 } = options;

  const index = providedIndex || loadIndex(indexPath);
  const codeEmbedding = await embed(code);

  const similar = index.chunks
    .map((chunk) => ({
      ...chunk,
      similarity: cosineSimilarity(codeEmbedding, chunk.embedding),
    }))
    .filter((r) => r.similarity >= threshold)
    .sort((a, b) => b.similarity - a.similarity)
    .slice(0, topK);

  return similar;
}
