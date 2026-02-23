#!/usr/bin/env node

/**
 * Codebase Search CLI
 * Usage: mm-search <query> [options]
 */

import { program } from 'commander';
import { searchCodebase, formatSearchResults, loadIndex } from '../lib/embeddings.js';
import { join } from 'path';
import chalk from 'chalk';

program
  .name('mm-search')
  .description('Semantic search across your codebase')
  .argument('<query>', 'Search query')
  .option('-d, --directory <dir>', 'Directory with index', '.')
  .option('-k, --top <n>', 'Number of results', parseInt, 10)
  .option('-s, --similarity <n>', 'Minimum similarity (0-1)', parseFloat, 0.5)
  .option('--json', 'Output as JSON')
  .action(async (query, options) => {
    try {
      const indexPath = join(options.directory, '.code-index', 'index.json');

      const results = await searchCodebase(query, {
        indexPath,
        topK: options.top,
        minSimilarity: options.similarity,
      });

      if (results.length === 0) {
        console.log(chalk.yellow('\nNo matching results found.\n'));
        console.log(chalk.dim('Try:'));
        console.log(chalk.dim('  - Using different keywords'));
        console.log(chalk.dim('  - Lowering the similarity threshold with -s 0.3'));
        process.exit(0);
      }

      if (options.json) {
        // Remove embeddings from output
        const output = results.map(({ embedding, ...rest }) => rest);
        console.log(JSON.stringify(output, null, 2));
      } else {
        console.log(chalk.blue(`\n📊 Found ${results.length} results:\n`));
        console.log(formatSearchResults(results));
      }
    } catch (error) {
      if (error.message.includes('Index not found')) {
        console.error(
          chalk.red('\nNo index found. Run `mm-index` first to index your codebase.\n')
        );
      } else {
        console.error(chalk.red(`Error: ${error.message}`));
      }
      process.exit(1);
    }
  });

program.parse();
