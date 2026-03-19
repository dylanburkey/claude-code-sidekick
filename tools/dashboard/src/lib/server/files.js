import { readFile, writeFile, readdir } from 'node:fs/promises';
import path from 'node:path';

const PROJECT_ROOT = process.env.PROJECT_ROOT || process.cwd();
const CLAUDE_DIR = path.join(PROJECT_ROOT, '.claude');

/**
 * Resolve a relative path within .claude/, preventing traversal.
 * @param {string} relativePath
 * @returns {string} Absolute path
 */
export function resolveSafe(relativePath) {
  const resolved = path.resolve(CLAUDE_DIR, relativePath);
  if (!resolved.startsWith(CLAUDE_DIR + path.sep) && resolved !== CLAUDE_DIR) {
    throw new Error('Path traversal detected');
  }
  return resolved;
}

/**
 * Read a file relative to PROJECT_ROOT/.claude/
 * @param {string} relativePath
 * @returns {Promise<string>}
 */
export async function readClaudeFile(relativePath) {
  const fullPath = resolveSafe(relativePath);
  return readFile(fullPath, 'utf-8');
}

/**
 * Write a file relative to PROJECT_ROOT/.claude/
 * @param {string} relativePath
 * @param {string} content
 */
export async function writeClaudeFile(relativePath, content) {
  const fullPath = resolveSafe(relativePath);
  await writeFile(fullPath, content, 'utf-8');
}

/**
 * List files in a directory relative to PROJECT_ROOT/.claude/
 * @param {string} relativePath
 * @returns {Promise<Array<{name: string, path: string, isDir: boolean}>>}
 */
export async function listClaudeDir(relativePath = '') {
  const fullPath = relativePath ? resolveSafe(relativePath) : CLAUDE_DIR;
  const entries = await readdir(fullPath, { withFileTypes: true });
  return entries.map((entry) => ({
    name: entry.name,
    path: relativePath ? `${relativePath}/${entry.name}` : entry.name,
    isDir: entry.isDirectory(),
  }));
}

/**
 * Recursively build a file tree from a directory relative to .claude/
 * @param {string} relativePath
 * @returns {Promise<Array>}
 */
export async function buildFileTree(relativePath = '') {
  const entries = await listClaudeDir(relativePath);
  const result = [];

  for (const entry of entries) {
    if (entry.isDir) {
      const children = await buildFileTree(entry.path);
      result.push({ ...entry, children });
    } else {
      result.push(entry);
    }
  }

  return result;
}

/**
 * Read execution.json from .claude/state/
 * @returns {Promise<object|null>}
 */
export async function readExecutionState() {
  try {
    const content = await readFile(
      path.join(PROJECT_ROOT, '.claude', 'state', 'execution.json'),
      'utf-8'
    );
    return JSON.parse(content);
  } catch {
    return null;
  }
}

/**
 * Scan tasks/ directory for task files and count statuses.
 * @returns {Promise<{total: number, pending: number, complete: number, blocked: number, files: string[]}>}
 */
export async function scanTaskFiles() {
  const tasksDir = path.join(PROJECT_ROOT, 'tasks');
  try {
    const files = await readdir(tasksDir);
    const mdFiles = files.filter((f) => f.endsWith('.md'));

    let pending = 0;
    let complete = 0;
    let blocked = 0;

    for (const file of mdFiles) {
      const content = await readFile(path.join(tasksDir, file), 'utf-8');
      pending += (content.match(/\[ \]/g) || []).length;
      complete += (content.match(/\[x\]/gi) || []).length;
      blocked += (content.match(/\[!\]/g) || []).length;
    }

    return { total: pending + complete + blocked, pending, complete, blocked, files: mdFiles };
  } catch {
    return { total: 0, pending: 0, complete: 0, blocked: 0, files: [] };
  }
}

export { CLAUDE_DIR, PROJECT_ROOT };
