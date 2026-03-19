import { json } from '@sveltejs/kit';
import { getGitLog, getCurrentBranch } from '$lib/server/git.js';
import { readExecutionState } from '$lib/server/files.js';

/** @type {import('./$types').RequestHandler} */
export async function GET() {
  const [commits, branch, state] = await Promise.all([
    getGitLog(50),
    getCurrentBranch(),
    readExecutionState(),
  ]);

  const executionLog = state?.log ?? [];

  return json({
    branch,
    commits,
    executionLog,
  });
}
