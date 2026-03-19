import { error } from '@sveltejs/kit';
import { spawnReview } from '$lib/server/review.js';

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
  let body;
  try {
    body = await request.json();
  } catch {
    throw error(400, 'Invalid JSON body');
  }

  const { filePath, deep = false } = body;

  if (!filePath) {
    throw error(400, 'filePath is required');
  }

  // Prevent path traversal - only allow relative paths within the project
  if (filePath.includes('..') || filePath.startsWith('/')) {
    throw error(400, 'Invalid file path');
  }

  const stream = spawnReview(filePath, deep);

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
    },
  });
}
