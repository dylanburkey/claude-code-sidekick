import { error } from "@sveltejs/kit";
import { spawn } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { P as PROJECT_ROOT } from "../../../../chunks/files.js";
const __dirname$1 = path.dirname(fileURLToPath(import.meta.url));
const REVIEW_BIN = path.resolve(__dirname$1, "../../../../../multi-model/bin/review.js");
function spawnReview(filePath, deep = false) {
  const absolutePath = path.resolve(PROJECT_ROOT, filePath);
  const args = [REVIEW_BIN, absolutePath];
  if (deep) args.push("--deep");
  return new ReadableStream({
    start(controller) {
      const child = spawn("node", args, {
        cwd: PROJECT_ROOT,
        env: process.env
      });
      const send = (data) => {
        controller.enqueue(`data: ${JSON.stringify({ text: data })}

`);
      };
      child.stdout.on("data", (chunk) => send(chunk.toString()));
      child.stderr.on("data", (chunk) => send(`[stderr] ${chunk.toString()}`));
      child.on("close", (code) => {
        controller.enqueue(`data: ${JSON.stringify({ done: true, code })}

`);
        controller.close();
      });
      child.on("error", (err) => {
        controller.enqueue(`data: ${JSON.stringify({ error: err.message })}

`);
        controller.close();
      });
    }
  });
}
async function POST({ request }) {
  let body;
  try {
    body = await request.json();
  } catch {
    throw error(400, "Invalid JSON body");
  }
  const { filePath, deep = false } = body;
  if (!filePath) {
    throw error(400, "filePath is required");
  }
  if (filePath.includes("..") || filePath.startsWith("/")) {
    throw error(400, "Invalid file path");
  }
  const stream = spawnReview(filePath, deep);
  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive"
    }
  });
}
export {
  POST
};
