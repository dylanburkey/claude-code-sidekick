import { json, error } from "@sveltejs/kit";
import { b as buildFileTree, r as readClaudeFile, w as writeClaudeFile } from "../../../../chunks/files.js";
async function GET({ url }) {
  const filePath = url.searchParams.get("path");
  if (!filePath) {
    try {
      const tree = await buildFileTree();
      return json({ tree });
    } catch (err) {
      throw error(500, err.message);
    }
  }
  try {
    const content = await readClaudeFile(filePath);
    return json({ path: filePath, content });
  } catch (err) {
    if (err.message === "Path traversal detected") {
      throw error(400, "Invalid path");
    }
    throw error(404, "File not found");
  }
}
async function PUT({ request }) {
  let body;
  try {
    body = await request.json();
  } catch {
    throw error(400, "Invalid JSON body");
  }
  const { path: filePath, content } = body;
  if (!filePath || content === void 0) {
    throw error(400, "path and content are required");
  }
  try {
    await writeClaudeFile(filePath, content);
    return json({ ok: true });
  } catch (err) {
    if (err.message === "Path traversal detected") {
      throw error(400, "Invalid path");
    }
    throw error(500, err.message);
  }
}
export {
  GET,
  PUT
};
