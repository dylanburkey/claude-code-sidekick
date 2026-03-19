import { readFile, writeFile, readdir } from "node:fs/promises";
import path from "node:path";
const PROJECT_ROOT = process.env.PROJECT_ROOT || process.cwd();
const CLAUDE_DIR = path.join(PROJECT_ROOT, ".claude");
function resolveSafe(relativePath) {
  const resolved = path.resolve(CLAUDE_DIR, relativePath);
  if (!resolved.startsWith(CLAUDE_DIR + path.sep) && resolved !== CLAUDE_DIR) {
    throw new Error("Path traversal detected");
  }
  return resolved;
}
async function readClaudeFile(relativePath) {
  const fullPath = resolveSafe(relativePath);
  return readFile(fullPath, "utf-8");
}
async function writeClaudeFile(relativePath, content) {
  const fullPath = resolveSafe(relativePath);
  await writeFile(fullPath, content, "utf-8");
}
async function listClaudeDir(relativePath = "") {
  const fullPath = relativePath ? resolveSafe(relativePath) : CLAUDE_DIR;
  const entries = await readdir(fullPath, { withFileTypes: true });
  return entries.map((entry) => ({
    name: entry.name,
    path: relativePath ? `${relativePath}/${entry.name}` : entry.name,
    isDir: entry.isDirectory()
  }));
}
async function buildFileTree(relativePath = "") {
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
async function readExecutionState() {
  try {
    const content = await readFile(
      path.join(PROJECT_ROOT, ".claude", "state", "execution.json"),
      "utf-8"
    );
    return JSON.parse(content);
  } catch {
    return null;
  }
}
async function scanTaskFiles() {
  const tasksDir = path.join(PROJECT_ROOT, "tasks");
  try {
    const files = await readdir(tasksDir);
    const mdFiles = files.filter((f) => f.endsWith(".md"));
    let pending = 0;
    let complete = 0;
    let blocked = 0;
    for (const file of mdFiles) {
      const content = await readFile(path.join(tasksDir, file), "utf-8");
      pending += (content.match(/\[ \]/g) || []).length;
      complete += (content.match(/\[x\]/gi) || []).length;
      blocked += (content.match(/\[!\]/g) || []).length;
    }
    return { total: pending + complete + blocked, pending, complete, blocked, files: mdFiles };
  } catch {
    return { total: 0, pending: 0, complete: 0, blocked: 0, files: [] };
  }
}
export {
  PROJECT_ROOT as P,
  readExecutionState as a,
  buildFileTree as b,
  readClaudeFile as r,
  scanTaskFiles as s,
  writeClaudeFile as w
};
