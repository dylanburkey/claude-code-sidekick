#!/usr/bin/env node

/**
 * create-claude-project - CLI Entry Point
 *
 * Copyright (c) 2026 Dylan Burkey. All Rights Reserved.
 *
 * PROPRIETARY AND CONFIDENTIAL
 *
 * This software and all associated files are the exclusive property of Dylan Burkey.
 * Unauthorized copying, modification, distribution, or use of this software,
 * via any medium, is strictly prohibited without explicit written permission.
 *
 * This software is provided "AS IS" without warranty of any kind.
 *
 * For licensing inquiries: https://github.com/dylanburkey
 */

import { createProject } from '../src/index.js';

createProject().catch((error) => {
  console.error(error);
  process.exit(1);
});
