# Default MCP Servers

These MCP servers are recommended for all projects using Claude Code Sidekick. They provide essential capabilities for structured development.

## Required MCPs

### 1. Serena (Structured Reasoning)

**Purpose:** Provides structured reasoning, code analysis, and semantic understanding of your codebase.

**Installation:**
```bash
claude mcp add serena -- uvx --from git+https://github.com/oraios/serena \
  serena start-mcp-server --project "$(pwd)"
```

**When Used:**
- During project analysis (`/project-planner`)
- Code review and quality checks
- Architecture decisions
- Complex refactoring tasks

**Integration with Sidekick:**
- Planner agent uses Serena for requirement analysis
- Review agent uses Serena for code quality assessment
- Orchestrator consults Serena for task dependency resolution

### 2. Chrome DevTools

**Purpose:** Browser automation, testing, and debugging capabilities.

**Installation:**
```bash
claude mcp add chrome-devtools -- npx @anthropic/mcp-chrome-devtools
```

**When Used:**
- Frontend testing and validation
- Accessibility audits (WCAG compliance)
- Performance profiling
- Visual regression testing

**Integration with Sidekick:**
- Test agent uses for browser-based tests
- Dev agent uses for live preview during development
- Review agent uses for accessibility validation

### 3. Context7

**Purpose:** Documentation lookup and context enrichment from external sources.

**Installation:**
```bash
claude mcp add context7 -- npx @anthropic/mcp-context7
```

**When Used:**
- Looking up framework documentation
- API reference queries
- Best practices lookup
- Integration guidance

**Integration with Sidekick:**
- All agents can query for relevant documentation
- Reduces hallucination by grounding in real docs

## Configuration

Add to your Claude Code settings (`~/.claude/settings.json`):

```json
{
  "mcpServers": {
    "serena": {
      "command": "uvx",
      "args": ["--from", "git+https://github.com/oraios/serena", "serena", "start-mcp-server", "--project", "."],
      "env": {}
    },
    "chrome-devtools": {
      "command": "npx",
      "args": ["@anthropic/mcp-chrome-devtools"],
      "env": {}
    },
    "context7": {
      "command": "npx", 
      "args": ["@anthropic/mcp-context7"],
      "env": {}
    }
  }
}
```

## Quick Setup Command

Run `/mcp-setup` after filling out PROJECT_STARTER.md to automatically configure all required MCPs based on your project type.

## MCP Usage in Agents

### Planner Agent + Serena
```yaml
When analyzing PROJECT_STARTER.md:
  1. Use Serena to parse requirements
  2. Use Serena to identify code patterns
  3. Use Context7 to lookup framework best practices
```

### Dev Agent + Chrome DevTools
```yaml
During implementation:
  1. Use Chrome DevTools for live preview
  2. Run accessibility checks after each component
  3. Profile performance of new features
```

### Test Agent + Chrome DevTools
```yaml
During testing:
  1. Run automated browser tests
  2. Capture screenshots for visual regression
  3. Validate responsive behavior
```

### Review Agent + All MCPs
```yaml
During review:
  1. Serena: Code quality analysis
  2. Chrome DevTools: Accessibility audit
  3. Context7: Best practices validation
```
