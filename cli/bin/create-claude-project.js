#!/usr/bin/env node

import { createProject } from '../src/index.js';

createProject().catch((error) => {
  console.error(error);
  process.exit(1);
});
