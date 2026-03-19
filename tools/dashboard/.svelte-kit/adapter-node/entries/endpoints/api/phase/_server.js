import { json } from "@sveltejs/kit";
import { a as readExecutionState, s as scanTaskFiles } from "../../../../chunks/files.js";
async function GET() {
  const [state, tasks] = await Promise.all([readExecutionState(), scanTaskFiles()]);
  return json({
    state,
    tasks
  });
}
export {
  GET
};
