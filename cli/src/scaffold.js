import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';
import { exec } from 'child_process';
import { promisify } from 'util';
import { PRESETS, FEATURE_CONFIGS } from './templates.js';

const execAsync = promisify(exec);
const __dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 * Scaffolds a new project with the specified configuration, including base files,
 * package.json, environment files, git initialization, and dependency installation.
 *
 * @param {object} root0 - Project configuration object.
 * @param {string} root0.projectName - Name of the project to create.
 * @param {string} root0.projectPath - Absolute path where the project will be created.
 * @param {string} root0.preset - Selected preset (static, astro, react, nextjs, nuxt, svelte, fullstack).
 * @param {Array<string>} root0.features - Array of additional features to include (database, auth, analytics, deployment).
 * @param {boolean} root0.skipInstall - Whether to skip dependency installation.
 * @param {boolean} root0.skipGit - Whether to skip git initialization.
 * @returns {Promise<string>} Resolves with the project path when scaffolding is complete.
 */
export async function scaffoldProject({
  projectName,
  projectPath,
  preset,
  features = [],
  skipInstall = false,
  skipGit = false,
}) {
  const presetConfig = PRESETS[preset];

  // Create project directory
  await fs.ensureDir(projectPath);

  // Copy base template files
  const templateDir = path.join(__dirname, '../../../');
  await copyBaseFiles(templateDir, projectPath);

  // Create PROJECT_STARTER.md with selected preset
  await createProjectStarter(projectPath, projectName, preset, features);

  // Create package.json
  await createPackageJson(projectPath, projectName, presetConfig, features);

  // Create environment file
  await createEnvFile(projectPath, features);

  // Initialize git
  if (!skipGit) {
    await initGit(projectPath);
  }

  // Install dependencies
  if (!skipInstall) {
    await installDependencies(projectPath);
  }

  return projectPath;
}

/**
 *
 * @param templateDir
 * @param projectPath
 */
async function copyBaseFiles(templateDir, projectPath) {
  const filesToCopy = ['.claude/', '.gitignore', 'README.md'];

  for (const file of filesToCopy) {
    const src = path.join(templateDir, file);
    const dest = path.join(projectPath, file);

    if (await fs.pathExists(src)) {
      await fs.copy(src, dest);
    }
  }
}

/**
 *
 * @param projectPath
 * @param projectName
 * @param preset
 * @param features
 */
async function createProjectStarter(projectPath, projectName, preset, features) {
  const presetConfig = PRESETS[preset];

  const content = `# ${projectName}

> Project created with Claude Code Sidekick

## Quick Start Configuration

### Project Preset

Selected: **${presetConfig.name}** - ${presetConfig.description}

### Master Toggles

- **MCP Servers**: \`TRUE\`
- **Development Hooks**: \`TRUE\`
- **Code Quality Rules**: \`TRUE\`
- **AI Agents**: \`TRUE\`

### Selected Features

${features.map((f) => `- ${FEATURE_CONFIGS[f]?.description || f}`).join('\n')}

---

## Project Information

### Project Name
${projectName}

### Project Description
[Describe your project here]

### Primary Goal
[What is the main goal of this project?]

---

## Getting Started

1. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`

2. Start development server:
   \`\`\`bash
   npm run dev
   \`\`\`

3. Generate project plan:
   \`\`\`bash
   /project-planner
   \`\`\`

4. Generate tasks:
   \`\`\`bash
   /task-planner
   \`\`\`

5. Run tasks with AI agents:
   \`\`\`bash
   /task-runner
   \`\`\`

---

## Code Rules Configuration

${Object.entries(presetConfig.rules)
  .map(([rule, enabled]) => `- **${rule}**: \`${enabled ? 'TRUE' : 'FALSE'}\``)
  .join('\n')}

---

## MCP Configuration

${Object.entries(presetConfig.mcp)
  .map(([mcp, enabled]) => `- **${mcp}**: \`${enabled ? 'TRUE' : 'FALSE'}\``)
  .join('\n')}

---

## Development Hooks

${Object.entries(presetConfig.hooks)
  .map(([hook, enabled]) => `- **${hook}**: \`${enabled ? 'TRUE' : 'FALSE'}\``)
  .join('\n')}
`;

  await fs.writeFile(path.join(projectPath, 'PROJECT_STARTER.md'), content);
}

/**
 *
 * @param projectPath
 * @param projectName
 * @param presetConfig
 * @param features
 */
async function createPackageJson(projectPath, projectName, presetConfig, features) {
  const dependencies = { ...presetConfig.dependencies };
  const devDependencies = { ...presetConfig.devDependencies };

  // Add feature dependencies
  for (const feature of features) {
    const featureConfig = FEATURE_CONFIGS[feature];
    if (featureConfig?.dependencies) {
      Object.assign(dependencies, featureConfig.dependencies);
    }
    if (featureConfig?.devDependencies) {
      Object.assign(devDependencies, featureConfig.devDependencies);
    }
  }

  const packageJson = {
    name: projectName,
    version: '0.1.0',
    private: true,
    type: 'module',
    scripts: {
      dev: 'vite dev',
      build: 'vite build',
      preview: 'vite preview',
      lint: 'eslint .',
      format: 'prettier --write .',
    },
    dependencies,
    devDependencies: {
      ...devDependencies,
      eslint: '^9.0.0',
      prettier: '^3.0.0',
    },
  };

  await fs.writeFile(path.join(projectPath, 'package.json'), JSON.stringify(packageJson, null, 2));
}

/**
 *
 * @param projectPath
 * @param features
 */
async function createEnvFile(projectPath, features) {
  let envContent = `# Environment Variables

# Claude Code
CLAUDE_API_KEY=

# Claude Code MCP
ANTHROPIC_API_KEY=
`;

  if (features.includes('database')) {
    envContent += `
# Database
DATABASE_URL=
NEON_API_KEY=
`;
  }

  if (features.includes('analytics')) {
    envContent += `
# Sentry
SENTRY_DSN=
SENTRY_AUTH_TOKEN=
`;
  }

  if (features.includes('deployment')) {
    envContent += `
# Deployment
VERCEL_TOKEN=
CLOUDFLARE_API_TOKEN=
`;
  }

  await fs.writeFile(path.join(projectPath, '.env.example'), envContent);
}

/**
 *
 * @param projectPath
 */
async function initGit(projectPath) {
  try {
    await execAsync('git init', { cwd: projectPath });
    await execAsync('git add .', { cwd: projectPath });
    await execAsync('git commit -m "Initial commit from create-claude-project"', {
      cwd: projectPath,
    });
  } catch {
    // Git init is optional, don't fail if it doesn't work
    console.warn('Warning: Could not initialize git repository');
  }
}

/**
 *
 * @param projectPath
 */
async function installDependencies(projectPath) {
  try {
    await execAsync('npm install', { cwd: projectPath });
  } catch (error) {
    throw new Error(`Failed to install dependencies: ${error.message}`);
  }
}
