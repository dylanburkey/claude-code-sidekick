#!/usr/bin/env node

/**
 * Codebase Indexing CLI
 * Usage: mm-index [directory] [options]
 */

import { program } from 'commander';
import { indexCodebase } from '../lib/embeddings.js';
import chalk from 'chalk';

program
  .name('mm-index')
  .description('Index a codebase for semantic search')
  .argument('[directory]', 'Directory to index', '.')
  .option('-o, --output <dir>', 'Output directory for index')
  .option('-e, --extensions <ext>', 'File extensions to include (comma-separated)')
  .option('-i, --ignore <patterns>', 'Additional ignore patterns (comma-separated)')
  .option('-v, --verbose', 'Show detailed output')
  .action(async (directory, options) => {
    try {
      const indexOptions = {
        verbose: options.verbose,
      };

      if (options.output) {
        indexOptions.outputDir = options.output;
      }

      if (options.extensions) {
        indexOptions.extensions = options.extensions.split(',').map((e) => 
          e.trim().startsWith('.') ? e.trim() : `.${e.trim()}`
        );
      }

      if (options.ignore) {
        indexOptions.ignore = [
          ...indexOptions.ignore || [],
          ...options.ignore.split(',').map((p) => p.trim()),
        ];
      }

      const index = await indexCodebase(directory, indexOptions);

      console.log(chalk.green(`\n✅ Indexed ${index.totalFiles} files (${index.totalChunks} chunks)`));
      console.log(chalk.dim(`   Index saved to: ${directory}/.code-index/index.json`));
    } catch (error) {
      console.error(chalk.red(`Error: ${error.message}`));
      process.exit(1);
    }
  });

program.parse();
