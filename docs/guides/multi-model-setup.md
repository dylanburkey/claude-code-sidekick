# Multi-Model Setup Guide

> Use Claude, GPT-4, and Gemini together for better results

Claude Code Sidekick supports multiple AI providers. This guide shows you how to configure and use them together for cross-validation, cost optimization, and specialized tasks.

---

## Why Use Multiple Models?

### 1. Cross-Validation

Different models have different strengths. Getting a second opinion can catch issues:

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│   Claude plans architecture                                     │
│              ↓                                                  │
│   Gemini reviews the plan                                       │
│              ↓                                                  │
│   Differences are highlighted                                   │
│              ↓                                                  │
│   You make the final decision                                   │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### 2. Independent Code Review

Have one model write code, another review it:

```
Claude writes code → GPT-4 reviews it → Issues caught early
```

### 3. Cost Optimization

Use cheaper/faster models for simple tasks:

| Task | Model | Why |
|------|-------|-----|
| Documentation | Gemini Flash | Fast, cheap, good enough |
| Architecture | Claude Opus | Complex reasoning needed |
| Code review | GPT-4o | Independent perspective |
| Simple refactoring | Gemini Flash | Cost-effective |

---

## Setup

### Step 1: Get API Keys

You need API keys from the providers you want to use:

| Provider | Get Key From | Env Variable |
|----------|--------------|--------------|
| Anthropic | [console.anthropic.com](https://console.anthropic.com) | `ANTHROPIC_API_KEY` |
| OpenAI | [platform.openai.com](https://platform.openai.com) | `OPENAI_API_KEY` |
| Google | [aistudio.google.com](https://aistudio.google.com) | `GOOGLE_API_KEY` |

### Step 2: Set Environment Variables

```bash
# Add to ~/.bashrc, ~/.zshrc, or .env
export ANTHROPIC_API_KEY="sk-ant-..."
export OPENAI_API_KEY="sk-..."
export GOOGLE_API_KEY="AIza..."
```

### Step 3: Configure Models

Edit `.claude/config/models.yml`:

```yaml
providers:
  anthropic:
    enabled: true
  openai:
    enabled: true   # ← Enable if you have the key
  google:
    enabled: true   # ← Enable if you have the key
```

---

## Configuration

### Basic: Default Models Per Task

```yaml
# .claude/config/models.yml

defaults:
  primary:
    planning: "claude-sonnet-4-20250514"
    development: "claude-sonnet-4-20250514"
    review: "claude-sonnet-4-20250514"
```

### Cross-Validation: Second Opinion

```yaml
defaults:
  secondary:
    planning: "gemini-2.5-pro"    # Gemini reviews Claude's plans
    review: "gpt-4o"               # GPT-4 reviews Claude's code
```

### Per-Agent Configuration

```yaml
agent_overrides:
  planner:
    primary: "claude-sonnet-4-20250514"
    secondary: "gemini-2.5-pro"
    cross_validate: true           # ← Enable cross-validation
    
  review:
    primary: "gpt-4o"              # ← Use GPT-4 as primary reviewer
    secondary: "claude-sonnet-4-20250514"
    cross_validate: true
```

---

## Usage

### Planning with Cross-Validation

When you run `/project-planner` with cross-validation enabled:

```
> /project-planner

┌──────────────────────────────────────────────────────────────────┐
│ PROJECT PLANNER                                                  │
├──────────────────────────────────────────────────────────────────┤
│                                                                  │
│ Primary Model: Claude Sonnet 4                                   │
│ ▶ Analyzing PROJECT_STARTER.md...                                │
│ ▶ Generating project plan...                                     │
│ ✅ Plan generated                                                │
│                                                                  │
│ Cross-Validation: Gemini 2.5 Pro                                 │
│ ▶ Reviewing plan...                                              │
│ ✅ Review complete                                               │
│                                                                  │
│ ┌────────────────────────────────────────────────────────────┐   │
│ │ 📊 CROSS-VALIDATION RESULTS                                │   │
│ ├────────────────────────────────────────────────────────────┤   │
│ │                                                            │   │
│ │ ✅ Agreement: 8/10 decisions                               │   │
│ │                                                            │   │
│ │ ⚠️  Differences:                                           │   │
│ │                                                            │   │
│ │ 1. Database Choice                                         │   │
│ │    Claude: SQLite for simplicity                           │   │
│ │    Gemini: PostgreSQL for scalability                      │   │
│ │                                                            │   │
│ │ 2. Auth Approach                                           │   │
│ │    Claude: Session-based                                   │   │
│ │    Gemini: JWT tokens                                      │   │
│ │                                                            │   │
│ │ → Review differences and choose your approach              │   │
│ │                                                            │   │
│ └────────────────────────────────────────────────────────────┘   │
│                                                                  │
└──────────────────────────────────────────────────────────────────┘
```

### Code Review with Second Opinion

```
> /review src/components/Auth.tsx

┌──────────────────────────────────────────────────────────────────┐
│ CODE REVIEW                                                      │
├──────────────────────────────────────────────────────────────────┤
│                                                                  │
│ Primary Review: Claude Sonnet 4                                  │
│ ├─ Security: ✅ No issues found                                  │
│ ├─ Performance: ⚠️ Consider memoization                         │
│ └─ Accessibility: ✅ ARIA labels present                         │
│                                                                  │
│ Secondary Review: GPT-4o                                         │
│ ├─ Security: ⚠️ Token stored in localStorage (XSS risk)         │
│ ├─ Performance: ✅ Looks good                                    │
│ └─ Accessibility: ⚠️ Missing focus management                   │
│                                                                  │
│ ┌────────────────────────────────────────────────────────────┐   │
│ │ Combined Issues (deduplicated):                            │   │
│ │                                                            │   │
│ │ 1. [HIGH] Token in localStorage - XSS risk (GPT-4)         │   │
│ │ 2. [MED]  Add React.memo for performance (Claude)          │   │
│ │ 3. [MED]  Add focus management on modal (GPT-4)            │   │
│ └────────────────────────────────────────────────────────────┘   │
│                                                                  │
└──────────────────────────────────────────────────────────────────┘
```

---

## Best Practices

### 1. Use Cross-Validation for Important Decisions

Enable for:
- Architecture planning
- Security-sensitive code
- API design
- Database schema

Skip for:
- Simple bug fixes
- Documentation updates
- Formatting changes

### 2. Match Model to Task

| Model | Best For |
|-------|----------|
| Claude Opus | Complex reasoning, nuanced decisions |
| Claude Sonnet | General development, balanced |
| GPT-4o | Fast iteration, multimodal |
| GPT-4 Turbo | Instruction following |
| o1 | Math, algorithms, complex logic |
| Gemini Flash | Speed, large contexts, docs |
| Gemini Pro | Balanced, large codebase analysis |

### 3. Cost-Conscious Configuration

```yaml
cost_optimization:
  enabled: true
  
  # Cheap model for simple stuff
  use_budget_model:
    - "documentation-updates"
    - "code-formatting"
    - "simple-tests"
  budget_model: "gemini-2.0-flash"
  
  # Premium model only when needed
  use_premium_model:
    - "architecture-decisions"
    - "security-reviews"
  premium_model: "claude-opus-4-20250514"
```

---

## Commands

### Check Available Models

```bash
/models status
```

Output:
```
Available Models:

✅ Anthropic (ANTHROPIC_API_KEY set)
   - claude-sonnet-4-20250514
   - claude-opus-4-20250514

✅ OpenAI (OPENAI_API_KEY set)
   - gpt-4o
   - gpt-4-turbo
   - o1

❌ Google (GOOGLE_API_KEY not set)
   - gemini-2.0-flash (unavailable)
   - gemini-2.5-pro (unavailable)
```

### Switch Primary Model

```bash
/models set-primary planning gemini-2.5-pro
```

### Enable/Disable Cross-Validation

```bash
/models cross-validate on
/models cross-validate off
```

### One-Time Second Opinion

```bash
/review --cross-validate src/auth.ts
```

---

## Troubleshooting

### "API key not found"

Check your environment:
```bash
echo $OPENAI_API_KEY
echo $GOOGLE_API_KEY
```

If empty, set them and restart your terminal.

### "Model not available"

The model ID may have changed. Check provider documentation for current model IDs.

### "Cross-validation taking too long"

Disable for non-critical tasks:
```yaml
cross_validation:
  triggers:
    planning:
      always: false
      on_request: true  # Only when you ask
```

---

## Security Notes

- API keys are never logged or committed
- Cross-validation sends code to multiple providers
- Review `.claude/config/models.yml` before enabling providers
- For sensitive code, limit to trusted providers only

---

## Related

- [Getting Started Tutorial](./getting-started-tutorial.md)
- [Agent Configuration](../.claude/agents.yml)
- [Model Configuration](../.claude/config/models.yml)
