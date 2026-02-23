#!/usr/bin/env node

/**
 * Pre-Commit Hook Example
 *
 * Install: Add to .husky/pre-commit or package.json scripts
 *
 * This hook runs a quick multi-model review on staged files
 * and blocks commits with critical issues.
 */

import { execSync } from 'child_process';
import { readFileSync } from 'fs';
import { quickReview } from '../lib/code-review.js';
import chalk from 'chalk';

const EXTENSIONS = ['.js', '.ts', '.jsx', '.tsx', '.py', '.go'];

async function main() {
  console.log(chalk.blue('\n🔍 Running multi-model code review...\n'));

  // Get staged files
  const staged = execSync('git diff --cached --name-only --diff-filter=ACM', {
    encoding: 'utf-8',
  })
    .split('\n')
    .filter((f) => f && EXTENSIONS.some((ext) => f.endsWith(ext)));

  if (staged.length === 0) {
    console.log(chalk.dim('No code files staged, skipping review.\n'));
    process.exit(0);
  }

  console.log(chalk.dim(`Reviewing ${staged.length} file(s)...\n`));

  let hasBlockingIssues = false;
  const allIssues = [];

  for (const file of staged) {
    try {
      const code = readFileSync(file, 'utf-8');

      // Skip small files
      if (code.length < 50) continue;

      const results = await quickReview(code, file);

      // Check for critical/high severity issues
      const blocking = results.confirmedIssues.filter(
        (i) => i.severity === 'critical' || i.severity === 'high'
      );

      if (blocking.length > 0) {
        hasBlockingIssues = true;
        console.log(chalk.red(`\n❌ ${file}: ${blocking.length} blocking issue(s)`));

        for (const issue of blocking) {
          console.log(chalk.red(`   [${issue.severity.toUpperCase()}] ${issue.description}`));
          console.log(chalk.yellow(`   → ${issue.suggestion}`));
        }

        allIssues.push(...blocking.map((i) => ({ ...i, file })));
      } else if (results.confirmedIssues.length > 0) {
        console.log(
          chalk.yellow(
            `⚠️  ${file}: ${results.confirmedIssues.length} minor issue(s) (non-blocking)`
          )
        );
      } else {
        console.log(chalk.green(`✓  ${file}`));
      }
    } catch (error) {
      console.error(chalk.yellow(`⚠️  Could not review ${file}: ${error.message}`));
    }
  }

  console.log('');

  if (hasBlockingIssues) {
    console.log(chalk.red('═══════════════════════════════════════════'));
    console.log(chalk.red(' COMMIT BLOCKED: Fix critical/high issues  '));
    console.log(chalk.red('═══════════════════════════════════════════\n'));
    console.log(chalk.dim('To bypass: git commit --no-verify\n'));
    process.exit(1);
  }

  console.log(chalk.green('✅ All checks passed!\n'));
  process.exit(0);
}

main().catch((error) => {
  console.error(chalk.red(`Hook error: ${error.message}`));
  process.exit(1);
});
