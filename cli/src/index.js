import * as p from '@clack/prompts';
import { Command } from 'commander';
import chalk from 'chalk';
import { scaffoldProject } from './scaffold.js';
import { PRESETS } from './templates.js';
import { validateProjectName, getProjectPath } from './utils.js';

const program = new Command();

program
  .name('create-claude-project')
  .description('Create a new project with Claude Code Sidekick')
  .version('1.0.0')
  .argument('[project-name]', 'Name of the project')
  .option(
    '-p, --preset <preset>',
    'Project preset (static|astro|react|nextjs|nuxt|svelte|fullstack)'
  )
  .option('--skip-install', 'Skip dependency installation')
  .option('--skip-git', 'Skip git initialization')
  .action(async (projectName, options) => {
    await createProject(projectName, options);
  });

/**
 *
 * @param cliProjectName
 * @param cliOptions
 */
export async function createProject(cliProjectName, cliOptions = {}) {
  console.clear();

  p.intro(chalk.bold.cyan('Create Claude Project'));

  // Project name
  let projectName = cliProjectName;
  if (!projectName) {
    const nameResult = await p.text({
      message: 'What is your project named?',
      placeholder: 'my-awesome-app',
      validate: (value) => {
        const result = validateProjectName(value);
        if (!result.valid) {
          return result.error;
        }
      },
    });

    if (p.isCancel(nameResult)) {
      p.cancel('Operation cancelled');
      process.exit(0);
    }

    projectName = nameResult;
  }

  // Preset selection
  let preset = cliOptions.preset;
  if (!preset) {
    const presetResult = await p.select({
      message: 'Choose your project type:',
      options: [
        {
          value: 'static',
          label: 'Static Website',
          hint: 'HTML, Modern CSS, Vanilla JS - Perfect for landing pages',
        },
        {
          value: 'astro',
          label: 'Astro Site',
          hint: 'Astro 5, Modern CSS, Islands - Best for content sites',
        },
        {
          value: 'react',
          label: 'React App',
          hint: 'React, TypeScript, Vite - Modern SPA development',
        },
        {
          value: 'nextjs',
          label: 'Next.js App',
          hint: 'Next.js 15, App Router - Full-stack React framework',
        },
        {
          value: 'nuxt',
          label: 'Vue/Nuxt',
          hint: 'Vue 3, Nuxt, Composition API - Full-stack Vue framework',
        },
        {
          value: 'svelte',
          label: 'SvelteKit',
          hint: 'Svelte 5, SvelteKit, Runes - Modern reactive framework',
        },
        {
          value: 'fullstack',
          label: 'Full Stack',
          hint: 'Complete backend + frontend + database stack',
        },
      ],
      initialValue: 'astro',
    });

    if (p.isCancel(presetResult)) {
      p.cancel('Operation cancelled');
      process.exit(0);
    }

    preset = presetResult;
  }

  // Optional features
  const features = await p.multiselect({
    message: 'Select additional features:',
    options: [
      {
        value: 'database',
        label: 'Database',
        hint: 'Neon PostgreSQL with Prisma',
      },
      {
        value: 'auth',
        label: 'Authentication',
        hint: 'User authentication system',
      },
      {
        value: 'analytics',
        label: 'Analytics',
        hint: 'Sentry error tracking',
      },
      {
        value: 'deployment',
        label: 'Deployment Config',
        hint: 'Vercel/Cloudflare setup',
      },
    ],
    initialValues: [],
  });

  if (p.isCancel(features)) {
    p.cancel('Operation cancelled');
    process.exit(0);
  }

  // Confirmation
  const shouldContinue = await p.confirm({
    message: `Create project "${chalk.cyan(projectName)}" with ${chalk.green(PRESETS[preset].name)}?`,
    initialValue: true,
  });

  if (p.isCancel(shouldContinue) || !shouldContinue) {
    p.cancel('Operation cancelled');
    process.exit(0);
  }

  // Create the project
  const s = p.spinner();

  try {
    const projectPath = getProjectPath(projectName);

    s.start('Creating project structure...');
    await scaffoldProject({
      projectName,
      projectPath,
      preset,
      features,
      skipInstall: cliOptions.skipInstall,
      skipGit: cliOptions.skipGit,
    });
    s.stop('Project created successfully!');

    // Show next steps
    p.note(
      `${chalk.cyan('cd')} ${projectName}\n${chalk.cyan('npm install')}\n${chalk.cyan('npm run dev')}`,
      'Next steps'
    );

    p.outro(
      `${chalk.green('✓')} Your project is ready! ${chalk.dim('Start building with Claude.')}`
    );
  } catch (error) {
    s.stop('Error creating project');
    p.cancel(chalk.red(error.message));
    process.exit(1);
  }
}

program.parse();
