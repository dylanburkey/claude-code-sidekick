import simpleGit from 'simple-git';
import { PROJECT_ROOT } from './files.js';

const git = simpleGit(PROJECT_ROOT);

/**
 * Get recent git log entries.
 * @param {number} count
 * @returns {Promise<Array<{hash: string, message: string, date: string, author: string}>>}
 */
export async function getGitLog(count = 50) {
  try {
    const log = await git.log({ maxCount: count });
    return log.all.map((entry) => ({
      hash: entry.hash.slice(0, 8),
      message: entry.message,
      date: entry.date,
      author: entry.author_name,
    }));
  } catch {
    return [];
  }
}

/**
 * Get current branch name.
 * @returns {Promise<string>}
 */
export async function getCurrentBranch() {
  try {
    const branch = await git.revparse(['--abbrev-ref', 'HEAD']);
    return branch.trim();
  } catch {
    return 'unknown';
  }
}
