import { json } from '@sveltejs/kit';
import { readExecutionState, scanTaskFiles } from '$lib/server/files.js';

/** @type {import('./$types').RequestHandler} */
export async function GET() {
  const [state, tasks] = await Promise.all([readExecutionState(), scanTaskFiles()]);

  return json({
    state,
    tasks,
  });
}
