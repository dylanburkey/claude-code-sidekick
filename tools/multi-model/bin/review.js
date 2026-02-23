#!/usr/bin/env node

/**
 * Multi-Model Code Review CLI
 * Usage: mm-review <file> [options]
 */

import { program } from 'commander';
import { readFileSync } from 'fs';
import chalk from 'chalk';
import { reviewCode, quickReview, deepReview, formatReviewResults } from '../lib/code-review.js';
import { MODELS } from '../lib/clients.js';

program
  .name('mm-review')
  .description('Multi-model consensus code review')
  .argument('<file>', 'File to review')
  .option('-q, --quick', 'Quick review (fast models only)')
  .option('-d, --deep', 'Deep review (most capable models)')
  .option('-m, --models <models>', 'Comma-separated list of models')
  .option('-t, --threshold <n>', 'Consensus threshold (default: 2)', parseInt)
  .option('-v, --verbose', 'Show detailed output')
  .option('--json', 'Output as JSON')
  .action(async (file, options) => {
    try {
      const code = readFileSync(file, 'utf-8');

      let results;

      if (options.quick) {
        results = await quickReview(code, file);
      } else if (options.deep) {
        results = await deepReview(code, file);
      } else {
        const reviewOptions = {
          filename: file,
          verbose: options.verbose,
        };

        if (options.models) {
          reviewOptions.models = options.models.split(',').map((m) => m.trim());
        }

        if (options.threshold) {
          reviewOptions.consensusThreshold = options.threshold;
        }

        results = await reviewCode(code, reviewOptions);
      }

      if (options.json) {
        // Remove embeddings from output for cleaner JSON
        const output = {
          ...results,
          reviews: results.reviews.map(({ model, issues, summary }) => ({
            model,
            issues,
            summary,
          })),
        };
        console.log(JSON.stringify(output, null, 2));
      } else {
        console.log(formatReviewResults(results));
      }

      // Exit with error code if critical/high issues found
      const hasCritical = results.confirmedIssues.some(
        (i) => i.severity === 'critical' || i.severity === 'high'
      );
      process.exit(hasCritical ? 1 : 0);
    } catch (error) {
      console.error(chalk.red(`Error: ${error.message}`));
      process.exit(1);
    }
  });

program.parse();
