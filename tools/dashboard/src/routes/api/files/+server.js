import { json, error } from '@sveltejs/kit';
import { readClaudeFile, writeClaudeFile, buildFileTree } from '$lib/server/files.js';

/** @type {import('./$types').RequestHandler} */
export async function GET({ url }) {
  const filePath = url.searchParams.get('path');

  if (!filePath) {
    // Return file tree when no path is specified
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
    if (err.message === 'Path traversal detected') {
      throw error(400, 'Invalid path');
    }
    throw error(404, 'File not found');
  }
}

/** @type {import('./$types').RequestHandler} */
export async function PUT({ request }) {
  let body;
  try {
    body = await request.json();
  } catch {
    throw error(400, 'Invalid JSON body');
  }

  const { path: filePath, content } = body;

  if (!filePath || content === undefined) {
    throw error(400, 'path and content are required');
  }

  try {
    await writeClaudeFile(filePath, content);
    return json({ ok: true });
  } catch (err) {
    if (err.message === 'Path traversal detected') {
      throw error(400, 'Invalid path');
    }
    throw error(500, err.message);
  }
}
