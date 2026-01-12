/**
 * create-claude-project - Utility Functions
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

import path from 'node:path';
import { readdir } from 'node:fs/promises';

/**
 * Validate project name
 * @param {string} name - Project name to validate
 * @returns {{ valid: boolean, error?: string }}
 */
export function validateProjectName(name) {
  if (!name || name.trim().length === 0) {
    return {
      valid: false,
      error: 'Project name is required',
    };
  }

  if (name.length > 214) {
    return {
      valid: false,
      error: 'Project name must be less than 214 characters',
    };
  }

  if (!/^[@a-z0-9-~][a-z0-9-._~]*$/.test(name)) {
    return {
      valid: false,
      error: 'Project name can only contain lowercase letters, numbers, hyphens, and underscores',
    };
  }

  const reservedNames = ['node_modules', 'favicon.ico', '.git', '.github', '.claude'];

  if (reservedNames.includes(name)) {
    return {
      valid: false,
      error: `"${name}" is a reserved name`,
    };
  }

  return { valid: true };
}

/**
 * Get absolute project path
 * @param {string} projectName - Name of the project
 * @returns {string} Absolute path to project directory
 */
export function getProjectPath(projectName) {
  return path.resolve(process.cwd(), projectName);
}

/**
 * Check if directory exists and is empty
 * @param {string} dirPath - Directory path to check
 * @returns {Promise<boolean>}
 */
export async function isDirectoryEmpty(dirPath) {
  try {
    const files = await readdir(dirPath);
    return files.length === 0;
  } catch {
    // Directory doesn't exist, so it's "empty"
    return true;
  }
}

/**
 * Format file size in human-readable format
 * @param {number} bytes - Size in bytes
 * @returns {string}
 */
export function formatFileSize(bytes) {
  const units = ['B', 'KB', 'MB', 'GB'];
  let size = bytes;
  let unitIndex = 0;

  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024;
    unitIndex++;
  }

  return `${size.toFixed(1)} ${units[unitIndex]}`;
}

/**
 * Get package manager (npm, yarn, pnpm, bun)
 * @returns {string}
 */
export function getPackageManager() {
  const userAgent = process.env.npm_config_user_agent;

  if (userAgent) {
    if (userAgent.startsWith('yarn')) {
      return 'yarn';
    }
    if (userAgent.startsWith('pnpm')) {
      return 'pnpm';
    }
    if (userAgent.startsWith('bun')) {
      return 'bun';
    }
  }

  return 'npm';
}

/**
 * Get install command for package manager
 * @param {string} pm - Package manager name
 * @returns {string}
 */
export function getInstallCommand(pm = 'npm') {
  const commands = {
    npm: 'npm install',
    yarn: 'yarn',
    pnpm: 'pnpm install',
    bun: 'bun install',
  };

  return commands[pm] || commands.npm;
}

/**
 * Convert string to kebab-case
 * @param {string} str - String to convert
 * @returns {string}
 */
export function toKebabCase(str) {
  return str
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .toLowerCase();
}

/**
 * Convert string to PascalCase
 * @param {string} str - String to convert
 * @returns {string}
 */
export function toPascalCase(str) {
  return str
    .split(/[-_\s]+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join('');
}
