# Multi-Model AI Toolkit

> Leverage OpenAI, Anthropic, Google Gemini, and Venice AI together for superior
> code quality.

**Part of [Claude Code Sidekick](../../README.md)**

---

## Features

- **🔍 Consensus Code Review** - Run code through multiple models, find issues
  all agree on
- **🎯 Intelligent Routing** - Automatically route tasks to the optimal model
- **🔎 Semantic Search** - Index your codebase and search by meaning, not
  keywords
- **💰 Cost Optimization** - Use cheap models for simple tasks, reserve power
  for complex ones
- **🔧 Flexible Configuration** - Works with just one API key or all four
- **🔓 Venice AI Integration** - Access uncensored models with private inference
  via [VVV token](https://venice.ai/token)

## File Structure

```
tools/multi-model/
├── bin/
│   ├── review.js          # mm-review CLI
│   ├── index-codebase.js  # mm-index CLI
│   └── search.js          # mm-search CLI
├── lib/
│   ├── clients.js         # Unified API for all 3 providers
│   ├── code-review.js     # Consensus review system
│   ├── model-router.js    # Intelligent task routing
│   └── embeddings.js      # Codebase indexing & search
├── examples/
│   ├── pre-commit-hook.js # Git hook integration
│   └── agent-integration.js # Claude Code workflows
├── index.js               # Main exports
├── package.json
└── README.md
```

## Quick Start

```bash
# Install dependencies
cd tools/multi-model
pnpm install

# Set up your API keys in .env (root of claude-code-sidekick)
OPENAI_API_KEY=sk-...
ANTHROPIC_API_KEY=sk-ant-...
GEMINI_API_KEY=...
VENICE_API_KEY=...  # Optional: Venice AI for uncensored models
```

## Configuration

### Single-Model vs Multi-Model Mode

The toolkit automatically adapts based on your available API keys:

| API Keys Available | Mode         | Behavior                       |
| ------------------ | ------------ | ------------------------------ |
| 3+ keys            | Multi-model  | Consensus review across models |
| 2 keys             | Multi-model  | Consensus with 2 models        |
| 1 key              | Single-model | Direct review with one model   |

### Supported Providers

| Provider  | Env Variable        | Models                               |
| --------- | ------------------- | ------------------------------------ |
| OpenAI    | `OPENAI_API_KEY`    | GPT-4o, GPT-4o-mini                  |
| Anthropic | `ANTHROPIC_API_KEY` | Claude Sonnet, Claude Haiku          |
| Google    | `GEMINI_API_KEY`    | Gemini Pro, Gemini Flash             |
| Venice AI | `VENICE_API_KEY`    | Llama 3.3 70B, DeepSeek R1, Qwen 2.5 |

**To explicitly disable multi-model mode** (even if you have multiple keys):

```bash
# In your .env file
USE_MULTI_MODEL=FALSE
```

This is useful for:

- Reducing API costs
- Faster reviews (single API call)
- Testing with a specific model

### Minimum Requirements

You only need **one API key** to use this toolkit:

```bash
# Option 1: OpenAI only
OPENAI_API_KEY=sk-...

# Option 2: Anthropic/Claude only
ANTHROPIC_API_KEY=sk-ant-...

# Option 3: Gemini only
GEMINI_API_KEY=...

# Option 4: Venice AI only (uncensored models)
VENICE_API_KEY=...
```

The toolkit will automatically use the best available model for your
configuration.

### Venice AI (VVV Token)

[Venice AI](https://venice.ai) provides uncensored AI models with private
inference. Powered by the [VVV token](https://venice.ai/token).

Available models:

- `llama-3.3-70b` - Llama 3.3 70B (fast, capable)
- `llama-3.2-3b` - Llama 3.2 3B (lightweight, cheap)
- `deepseek-r1-671b` - DeepSeek R1 671B (reasoning, most capable)
- `deepseek-r1-llama-70b` - DeepSeek R1 Llama 70B
- `dolphin-2.9.2-qwen2-72b` - Dolphin (uncensored)
- `qwen-2.5-72b` - Qwen 2.5 72B

```javascript
import { MODELS, complete } from '@claude-sidekick/multi-model';

// Use Venice models directly
const result = await complete(
  MODELS.VENICE_LLAMA_70B,
  'Explain quantum computing'
);

// Or use venice/ prefix
const result2 = await complete('venice/llama-3.3-70b', prompt);
```

## CLI Tools

### Multi-Model Code Review

```bash
# Quick review (Gemini Flash + GPT-4o-mini)
pnpm review -- src/app.js --quick

# Deep review (GPT-4o + Claude Sonnet + Gemini Pro)
pnpm review -- src/app.js --deep

# Custom models
pnpm review -- src/app.js --models "gpt-4o,claude-3-5-sonnet-20241022"

# Output as JSON (for CI integration)
pnpm review -- src/app.js --json
```

### Codebase Indexing

```bash
# Index current directory
pnpm index

# Index specific directory
pnpm index -- /path/to/project

# With options
pnpm index -- . --verbose --extensions ".ts,.tsx"
```

### Semantic Search

```bash
# Search your codebase
pnpm search -- "authentication middleware"

# More results, lower threshold
pnpm search -- "error handling" --top 20 --similarity 0.4

# JSON output
pnpm search -- "database connection" --json
```

## Programmatic Usage

### Code Review

```javascript
import {
  reviewCode,
  quickReview,
  deepReview,
} from '@claude-sidekick/multi-model';

// Basic review (3 models, consensus required)
const results = await reviewCode(code, {
  filename: 'auth.js',
  consensusThreshold: 2, // 2+ models must agree
});

console.log(results.confirmedIssues); // Issues multiple models found
console.log(results.possibleIssues); // Issues only one model found

// Quick review for CI
const quick = await quickReview(code, 'app.js');

// Deep review for important changes
const deep = await deepReview(code, 'payment.js');
```

### Intelligent Model Routing

```javascript
import { createRouter, ModelRouter } from '@claude-sidekick/multi-model';

// Use a preset profile
const router = createRouter('balanced'); // 'cost', 'speed', 'quality', 'balanced'

// Tasks are automatically routed to optimal models
const result = await router.route(
  'Explain the architecture of this codebase...'
);
console.log(result.model); // e.g., 'claude-3-5-sonnet-20241022'
console.log(result.taskType); // e.g., 'architecture'
console.log(result.routing); // 'Claude excels at complex reasoning...'

// Estimate costs
const cost = router.estimateCost('documentation', 5000, 2000);
console.log(cost.formatted); // '$0.0215'
```

### Semantic Code Search

```javascript
import {
  indexCodebase,
  searchCodebase,
  findSimilarCode,
} from '@claude-sidekick/multi-model';

// Index a codebase (do this once, or on changes)
await indexCodebase('/path/to/project', {
  extensions: ['.js', '.ts', '.tsx'],
  verbose: true,
});

// Search for code by meaning
const results = await searchCodebase('user authentication logic', {
  indexPath: '/path/to/project/.code-index/index.json',
  topK: 10,
  minSimilarity: 0.5,
});

// Find duplicate/similar code
const similar = await findSimilarCode(myCode, {
  indexPath: '/path/to/project/.code-index/index.json',
  threshold: 0.85,
});
```

## Model Selection Guide

| Task               | Best Model    | Why                     |
| ------------------ | ------------- | ----------------------- |
| Long file analysis | Claude Sonnet | 200k context window     |
| Code generation    | GPT-4o        | Mature function calling |
| Quick refactors    | GPT-4o-mini   | Fast, accurate          |
| Documentation      | Claude Sonnet | Nuanced, thorough       |
| Image analysis     | Gemini Pro    | Native multimodal       |
| Security review    | Claude Sonnet | Careful reasoning       |
| Linting/style      | Gemini Flash  | Cheapest                |

## Cost Comparison (per 1M tokens)

| Model         | Input  | Output |
| ------------- | ------ | ------ |
| Gemini Flash  | $0.075 | $0.30  |
| GPT-4o-mini   | $0.15  | $0.60  |
| Claude Haiku  | $0.25  | $1.25  |
| Claude Sonnet | $3.00  | $15.00 |
| Gemini Pro    | $3.50  | $10.50 |
| GPT-4o        | $5.00  | $15.00 |

## CI/CD Integration

```yaml
# GitHub Actions example
- name: Multi-Model Code Review
  run: |
    cd tools/multi-model
    pnpm review -- ${{ github.event.pull_request.changed_files }} --json > review.json

- name: Fail on Critical Issues
  run: |
    if jq -e '.confirmedIssues[] | select(.severity == "critical")' review.json; then
      echo "Critical issues found!"
      exit 1
    fi
```

## Environment Variables

```bash
# Required (at least one)
OPENAI_API_KEY=sk-...
ANTHROPIC_API_KEY=sk-ant-...
GEMINI_API_KEY=...  # or GEMENI_API_KEY (typo-tolerant)

# Optional
DEBUG=true          # Enable debug logging
```

## Examples

### Pre-Commit Hook

Block commits that have critical/high severity issues detected by multiple
models.

📄 **[examples/pre-commit-hook.js](examples/pre-commit-hook.js)**

```javascript
// Install in .husky/pre-commit or run directly
import { quickReview } from '../lib/code-review.js';

// Reviews staged files, blocks on critical issues
const results = await quickReview(code, filename);
if (results.confirmedIssues.some((i) => i.severity === 'critical')) {
  process.exit(1); // Block commit
}
```

### Agent Integration

Smart assistant that routes tasks to optimal models and uses semantic search for
context.

📄 **[examples/agent-integration.js](examples/agent-integration.js)**

```javascript
import { createRouter, searchCodebase } from '../index.js';

const router = createRouter('balanced');

// Search for relevant code context
const context = await searchCodebase('authentication', { indexPath });

// Route to optimal model based on task type
const result = await router.route(userRequest, { context });
// → Automatically picks Claude for architecture, GPT-4 for code gen, etc.
```

## Supported Models

### OpenAI

- `gpt-4o` - Most capable, best for complex tasks
- `gpt-4o-mini` - Fast and cheap, good for simple tasks

### Anthropic

- `claude-sonnet-4-20250514` - Best reasoning, 200k context
- `claude-3-5-haiku-20241022` - Fast and cheap

### Google

- `gemini-1.5-pro` - Multimodal, good reasoning
- `gemini-2.0-flash` - Very fast, very cheap

## Related Documentation

- [Claude Code Sidekick README](../../README.md)
- [CLAUDE.md - AI Context](../../CLAUDE.md)
- [Agent Library](../../agent-library/README.md)

---

## License

Proprietary - © 2026 Dylan Burkey
