import { spawn } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { PROJECT_ROOT } from './files.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REVIEW_BIN = path.resolve(__dirname, '../../../../../multi-model/bin/review.js');

/**
 * Spawn mm-review as a child process and return a ReadableStream of SSE events.
 * @param {string} filePath - Path relative to PROJECT_ROOT to review
 * @param {boolean} deep - Whether to do a deep review
 * @returns {ReadableStream}
 */
export function spawnReview(filePath, deep = false) {
  const absolutePath = path.resolve(PROJECT_ROOT, filePath);
  const args = [REVIEW_BIN, absolutePath];
  if (deep) args.push('--deep');

  return new ReadableStream({
    start(controller) {
      const child = spawn('node', args, {
        cwd: PROJECT_ROOT,
        env: process.env,
      });

      const send = (data) => {
        controller.enqueue(`data: ${JSON.stringify({ text: data })}\n\n`);
      };

      child.stdout.on('data', (chunk) => send(chunk.toString()));
      child.stderr.on('data', (chunk) => send(`[stderr] ${chunk.toString()}`));

      child.on('close', (code) => {
        controller.enqueue(`data: ${JSON.stringify({ done: true, code })}\n\n`);
        controller.close();
      });

      child.on('error', (err) => {
        controller.enqueue(`data: ${JSON.stringify({ error: err.message })}\n\n`);
        controller.close();
      });
    },
  });
}
