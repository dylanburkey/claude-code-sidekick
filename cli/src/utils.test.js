import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import path from 'path';
import fs from 'fs-extra';
import {
  validateProjectName,
  getProjectPath,
  isDirectoryEmpty,
  formatFileSize,
  getPackageManager,
  getInstallCommand,
  toKebabCase,
  toPascalCase,
} from './utils.js';

describe('validateProjectName', () => {
  it('should validate correct project names', () => {
    expect(validateProjectName('my-project')).toEqual({ valid: true });
    expect(validateProjectName('my_project')).toEqual({ valid: true });
    expect(validateProjectName('my-project-123')).toEqual({ valid: true });
    expect(validateProjectName('@scope/package')).toEqual({ valid: true });
  });

  it('should reject empty names', () => {
    expect(validateProjectName('')).toEqual({
      valid: false,
      error: 'Project name is required',
    });
    expect(validateProjectName('   ')).toEqual({
      valid: false,
      error: 'Project name is required',
    });
  });

  it('should reject names that are too long', () => {
    const longName = 'a'.repeat(215);
    expect(validateProjectName(longName)).toEqual({
      valid: false,
      error: 'Project name must be less than 214 characters',
    });
  });

  it('should reject invalid characters', () => {
    expect(validateProjectName('My Project')).toEqual({
      valid: false,
      error: 'Project name can only contain lowercase letters, numbers, hyphens, and underscores',
    });
    expect(validateProjectName('MY-PROJECT')).toEqual({
      valid: false,
      error: 'Project name can only contain lowercase letters, numbers, hyphens, and underscores',
    });
  });

  it('should reject reserved names', () => {
    expect(validateProjectName('node_modules')).toEqual({
      valid: false,
      error: '"node_modules" is a reserved name',
    });
    expect(validateProjectName('.git')).toEqual({
      valid: false,
      error: '".git" is a reserved name',
    });
  });
});

describe('getProjectPath', () => {
  it('should return absolute path to project', () => {
    const projectName = 'my-project';
    const expected = path.resolve(process.cwd(), projectName);
    expect(getProjectPath(projectName)).toBe(expected);
  });

  it('should handle nested paths', () => {
    const projectName = 'folder/my-project';
    const expected = path.resolve(process.cwd(), projectName);
    expect(getProjectPath(projectName)).toBe(expected);
  });
});

describe('isDirectoryEmpty', () => {
  const testDir = path.join(process.cwd(), 'test-temp-dir');

  afterEach(async () => {
    await fs.remove(testDir);
  });

  it('should return true for non-existent directory', async () => {
    const result = await isDirectoryEmpty('/non/existent/path');
    expect(result).toBe(true);
  });

  it('should return true for empty directory', async () => {
    await fs.ensureDir(testDir);
    const result = await isDirectoryEmpty(testDir);
    expect(result).toBe(true);
  });

  it('should return false for directory with files', async () => {
    await fs.ensureDir(testDir);
    await fs.writeFile(path.join(testDir, 'test.txt'), 'test');
    const result = await isDirectoryEmpty(testDir);
    expect(result).toBe(false);
  });
});

describe('formatFileSize', () => {
  it('should format bytes correctly', () => {
    expect(formatFileSize(0)).toBe('0.0 B');
    expect(formatFileSize(500)).toBe('500.0 B');
    expect(formatFileSize(1023)).toBe('1023.0 B');
  });

  it('should format kilobytes correctly', () => {
    expect(formatFileSize(1024)).toBe('1.0 KB');
    expect(formatFileSize(5120)).toBe('5.0 KB');
    expect(formatFileSize(1024 * 100)).toBe('100.0 KB');
  });

  it('should format megabytes correctly', () => {
    expect(formatFileSize(1024 * 1024)).toBe('1.0 MB');
    expect(formatFileSize(1024 * 1024 * 5)).toBe('5.0 MB');
    expect(formatFileSize(1024 * 1024 * 100)).toBe('100.0 MB');
  });

  it('should format gigabytes correctly', () => {
    expect(formatFileSize(1024 * 1024 * 1024)).toBe('1.0 GB');
    expect(formatFileSize(1024 * 1024 * 1024 * 2)).toBe('2.0 GB');
  });
});

describe('getPackageManager', () => {
  const originalUserAgent = process.env.npm_config_user_agent;

  afterEach(() => {
    process.env.npm_config_user_agent = originalUserAgent;
  });

  it('should detect npm', () => {
    process.env.npm_config_user_agent = 'npm/8.1.0 node/v16.13.0';
    expect(getPackageManager()).toBe('npm');
  });

  it('should detect yarn', () => {
    process.env.npm_config_user_agent = 'yarn/1.22.0 npm/? node/v16.13.0';
    expect(getPackageManager()).toBe('yarn');
  });

  it('should detect pnpm', () => {
    process.env.npm_config_user_agent = 'pnpm/7.0.0 npm/? node/v16.13.0';
    expect(getPackageManager()).toBe('pnpm');
  });

  it('should detect bun', () => {
    process.env.npm_config_user_agent = 'bun/1.0.0';
    expect(getPackageManager()).toBe('bun');
  });

  it('should default to npm when no user agent', () => {
    delete process.env.npm_config_user_agent;
    expect(getPackageManager()).toBe('npm');
  });
});

describe('getInstallCommand', () => {
  it('should return correct install command for each package manager', () => {
    expect(getInstallCommand('npm')).toBe('npm install');
    expect(getInstallCommand('yarn')).toBe('yarn');
    expect(getInstallCommand('pnpm')).toBe('pnpm install');
    expect(getInstallCommand('bun')).toBe('bun install');
  });

  it('should default to npm install for unknown package manager', () => {
    expect(getInstallCommand('unknown')).toBe('npm install');
  });

  it('should default to npm install when no argument provided', () => {
    expect(getInstallCommand()).toBe('npm install');
  });
});

describe('toKebabCase', () => {
  it('should convert camelCase to kebab-case', () => {
    expect(toKebabCase('camelCase')).toBe('camel-case');
    expect(toKebabCase('myProjectName')).toBe('my-project-name');
  });

  it('should convert PascalCase to kebab-case', () => {
    expect(toKebabCase('PascalCase')).toBe('pascal-case');
    expect(toKebabCase('MyProjectName')).toBe('my-project-name');
  });

  it('should convert spaces to hyphens', () => {
    expect(toKebabCase('my project name')).toBe('my-project-name');
    expect(toKebabCase('hello world')).toBe('hello-world');
  });

  it('should convert underscores to hyphens', () => {
    expect(toKebabCase('my_project_name')).toBe('my-project-name');
    expect(toKebabCase('hello_world')).toBe('hello-world');
  });

  it('should handle mixed formats', () => {
    expect(toKebabCase('myProject_Name With Spaces')).toBe('my-project-name-with-spaces');
  });

  it('should handle already kebab-cased strings', () => {
    expect(toKebabCase('already-kebab-case')).toBe('already-kebab-case');
  });
});

describe('toPascalCase', () => {
  it('should convert kebab-case to PascalCase', () => {
    expect(toPascalCase('kebab-case')).toBe('KebabCase');
    expect(toPascalCase('my-project-name')).toBe('MyProjectName');
  });

  it('should convert snake_case to PascalCase', () => {
    expect(toPascalCase('snake_case')).toBe('SnakeCase');
    expect(toPascalCase('my_project_name')).toBe('MyProjectName');
  });

  it('should convert space-separated to PascalCase', () => {
    expect(toPascalCase('hello world')).toBe('HelloWorld');
    expect(toPascalCase('my project name')).toBe('MyProjectName');
  });

  it('should handle mixed formats', () => {
    expect(toPascalCase('my-project_name with spaces')).toBe('MyProjectNameWithSpaces');
  });

  it('should handle camelCase input', () => {
    expect(toPascalCase('camelCase')).toBe('Camelcase');
  });

  it('should handle already PascalCase strings', () => {
    expect(toPascalCase('AlreadyPascalCase')).toBe('Alreadypascalcase');
  });
});
