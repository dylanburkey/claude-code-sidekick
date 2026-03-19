import { json } from "@sveltejs/kit";
import simpleGit from "simple-git";
import { P as PROJECT_ROOT, a as readExecutionState } from "../../../../chunks/files.js";
const git = simpleGit(PROJECT_ROOT);
async function getGitLog(count = 50) {
  try {
    const log = await git.log({ maxCount: count });
    return log.all.map((entry) => ({
      hash: entry.hash.slice(0, 8),
      message: entry.message,
      date: entry.date,
      author: entry.author_name
    }));
  } catch {
    return [];
  }
}
async function getCurrentBranch() {
  try {
    const branch = await git.revparse(["--abbrev-ref", "HEAD"]);
    return branch.trim();
  } catch {
    return "unknown";
  }
}
async function GET() {
  const [commits, branch, state] = await Promise.all([
    getGitLog(50),
    getCurrentBranch(),
    readExecutionState()
  ]);
  const executionLog = state?.log ?? [];
  return json({
    branch,
    commits,
    executionLog
  });
}
export {
  GET
};
