# MCP Configuration System

> Streamlined Model Context Protocol setup for Claude Code projects

## Overview

The MCP Configuration System provides a declarative way to enable and configure MCP servers for your project. Simply mark MCPs as `TRUE` or `FALSE` in `PROJECT_STARTER.md`, run `/mcp-setup`, and everything is configured automatically.

## Quick Start

### 1. Configure in PROJECT_STARTER.md

```markdown
## MCP Configuration

### Database & Storage
- **Neon Database**: `TRUE`
- **Supabase**: `FALSE`

### Cloud & Infrastructure
- **Cloudflare**: `TRUE`

### Development Tools
- **GitHub**: `TRUE`
```

### 2. Run Setup Command

```bash
/mcp-setup
```

### 3. Add API Keys

```bash
# Copy template
cp .env.example .env

# Add your keys
NEON_API_KEY=your_key_here
CLOUDFLARE_API_TOKEN=your_token_here
GITHUB_TOKEN=your_github_token_here
```

### 4. Restart Claude Code

Done! Your MCPs are ready to use.

## Directory Structure

```
.claude/mcp/
├── README.md                  # This file
├── providers/                 # MCP provider configurations
│   ├── neon.json
│   ├── cloudflare.json
│   ├── github.json
│   ├── sentry.json
│   ├── stripe.json
│   ├── ga4.json
│   ├── slack.json
│   ├── supabase.json
│   └── ... (30+ providers)
├── configs/                   # Generated configurations
│   └── mcp-config.json       # Claude Code MCP config
├── templates/                 # Configuration templates
│   ├── provider-template.json
│   └── custom-mcp-guide.md
└── docs/                     # Provider-specific docs
    ├── neon-setup.md
    ├── cloudflare-setup.md
    └── ...
```

## Available MCP Providers

### Database & Storage (4)

| Provider | Purpose | Setup Complexity |
|----------|---------|-----------------|
| **Neon** | PostgreSQL with branching | Easy |
| **Supabase** | PostgreSQL + Auth + Storage | Easy |
| **Turso** | Distributed SQLite | Easy |
| **Pinecone** | Vector database | Medium |

### Cloud & Infrastructure (4)

| Provider | Purpose | Setup Complexity |
|----------|---------|-----------------|
| **Cloudflare** | Workers, D1, KV, R2, Pages | Medium |
| **AWS** | EC2, S3, Lambda, RDS | Complex |
| **Vercel** | Deployment, Edge Functions | Easy |
| **Railway** | App & DB deployment | Easy |

### Development Tools (4)

| Provider | Purpose | Setup Complexity |
|----------|---------|-----------------|
| **GitHub** | Repos, Issues, PRs, Actions | Easy |
| **GitLab** | Repos, CI/CD | Easy |
| **Linear** | Issue tracking | Easy |
| **Sentry** | Error monitoring | Easy |

### Communication (3)

| Provider | Purpose | Setup Complexity |
|----------|---------|-----------------|
| **Slack** | Team notifications | Medium |
| **Discord** | Community communication | Medium |
| **Email** | Transactional email | Easy |

### Analytics & Monitoring (4)

| Provider | Purpose | Setup Complexity |
|----------|---------|-----------------|
| **Google Analytics 4** | Web analytics | Easy |
| **PostHog** | Product analytics | Easy |
| **Axiom** | Log management | Easy |
| **Datadog** | Infrastructure monitoring | Medium |

### Payments & Commerce (3)

| Provider | Purpose | Setup Complexity |
|----------|---------|-----------------|
| **Stripe** | Payments & subscriptions | Medium |
| **PayPal** | Payment processing | Medium |
| **Shopify** | E-commerce platform | Complex |

### AI & ML Services (4)

| Provider | Purpose | Setup Complexity |
|----------|---------|-----------------|
| **OpenAI** | GPT models, embeddings | Easy |
| **Anthropic** | Claude API | Easy |
| **Hugging Face** | ML models | Medium |
| **Replicate** | AI model deployment | Easy |

### Development Services (3)

| Provider | Purpose | Setup Complexity |
|----------|---------|-----------------|
| **Chrome DevTools** | Browser automation | Medium |
| **Playwright** | E2E testing | Easy |
| **Puppeteer** | Headless browser | Easy |

### Content & Media (4)

| Provider | Purpose | Setup Complexity |
|----------|---------|-----------------|
| **Contentful** | Headless CMS | Medium |
| **Sanity** | Structured content | Medium |
| **Cloudinary** | Media management | Easy |
| **Uploadcare** | File CDN | Easy |

### Search & Discovery (3)

| Provider | Purpose | Setup Complexity |
|----------|---------|-----------------|
| **Algolia** | Search as a service | Medium |
| **Meilisearch** | Open-source search | Easy |
| **Typesense** | Fast search | Easy |

**Total: 35+ pre-configured MCP providers**

## Commands

### `/mcp-setup`

Generate MCP configuration from PROJECT_STARTER.md

```bash
/mcp-setup
```

**Options:**
- `--output-only` - Generate config without writing files
- `--validate` - Validate existing configuration
- `--list` - List all available providers
- `--add [provider]` - Add specific provider
- `--remove [provider]` - Remove specific provider

### `/mcp-validate`

Validate MCP configuration and environment

```bash
/mcp-validate
```

Checks:
- Configuration file validity
- Required environment variables
- Package availability
- API connectivity

## Provider Configuration Format

Each MCP provider is defined in a JSON file:

```json
{
  "name": "provider-name",
  "displayName": "Provider Display Name",
  "category": "database|infrastructure|development|communication|analytics|payments|ai|content|search",
  "command": "npx|node|python",
  "args": ["package-name"],
  "env": {
    "ENV_VAR": "${ENV_VAR}"
  },
  "requiredEnvVars": ["ENV_VAR"],
  "optionalEnvVars": ["OPTIONAL_VAR"],
  "documentation": "https://docs-url",
  "setup": "path/to/setup.md",
  "features": [
    "Feature description"
  ],
  "agentIntegration": {
    "categories": ["code-generation"],
    "useCases": [
      "Use case description"
    ]
  }
}
```

## Adding Custom MCPs

### Step 1: Create Provider Configuration

Create `.claude/mcp/providers/custom.json`:

```json
{
  "name": "custom",
  "displayName": "Custom MCP",
  "category": "development",
  "command": "node",
  "args": ["./mcp-servers/custom.js"],
  "env": {
    "CUSTOM_API_KEY": "${CUSTOM_API_KEY}"
  },
  "requiredEnvVars": ["CUSTOM_API_KEY"],
  "documentation": "https://your-docs",
  "setup": ".claude/mcp/providers/custom-setup.md",
  "features": [
    "Custom feature 1",
    "Custom feature 2"
  ]
}
```

### Step 2: Add to PROJECT_STARTER.md

```markdown
### Custom MCPs

**Custom MCP**: `TRUE` <!-- Description: Your custom integration -->
```

### Step 3: Run Setup

```bash
/mcp-setup
```

Your custom MCP will be configured alongside built-in providers.

## Environment Variable Management

### Best Practices

1. **Never commit `.env`** - Add to `.gitignore`
2. **Use `.env.example`** - Template for team members
3. **Rotate keys regularly** - Security best practice
4. **Scope permissions** - Minimum required access
5. **Use different keys per environment** - Dev, staging, prod

### Example `.env`

```bash
# Database
NEON_API_KEY=neon_api_xxx
NEON_PROJECT_ID=proj_xxx

# Infrastructure
CLOUDFLARE_API_TOKEN=cloudflare_xxx
CLOUDFLARE_ACCOUNT_ID=account_xxx

# Development
GITHUB_TOKEN=ghp_xxx

# Monitoring
SENTRY_AUTH_TOKEN=sntrys_xxx
SENTRY_ORG=your-org
SENTRY_PROJECT=your-project

# Payments
STRIPE_SECRET_KEY=sk_test_xxx
STRIPE_WEBHOOK_SECRET=whsec_xxx

# Analytics
GA4_MEASUREMENT_ID=G-XXX
GA4_API_SECRET=api_secret_xxx
```

## Integration with Agents

MCPs enhance agent capabilities across all categories:

### Code Generation Agents

```javascript
// With Neon MCP: Generate models from actual DB schema
const tables = await mcp.neon.getDatabaseTables({
  projectId: process.env.NEON_PROJECT_ID
});

const models = generateModelsFromSchema(tables);
```

### Task Automation Agents

```javascript
// With Cloudflare MCP: Deploy to Workers
await mcp.cloudflare.deploy({
  script: workerCode,
  name: 'api-worker'
});

// With Slack MCP: Notify team
await mcp.slack.postMessage({
  channel: '#deployments',
  text: '✅ Deployed to production'
});
```

### Testing Agents

```javascript
// With Neon MCP: Create test database branch
const testBranch = await mcp.neon.createBranch({
  projectId: process.env.NEON_PROJECT_ID
});

await runTests(testBranch.connectionString);
```

## Troubleshooting

### MCP Server Won't Start

**Check:**
1. Package is installed: `npm info @package/name`
2. Environment variables are set
3. API keys are valid
4. Network connectivity

**Debug:**
```bash
# Test MCP manually
npx @package/name

# Check Claude Code logs
# Look for MCP error messages
```

### Environment Variables Not Loading

**Solutions:**
1. Ensure `.env` is in project root
2. Verify variable names match exactly
3. Restart Claude Code
4. Check for syntax errors in `.env`

### Authentication Failures

**Steps:**
1. Verify API key format
2. Check key permissions/scopes
3. Confirm key is not expired
4. Test key with API directly

### Configuration Not Applied

**Actions:**
1. Validate JSON: `cat .claude/mcp/configs/mcp-config.json | jq .`
2. Check file permissions
3. Restart Claude Code
4. Run `/mcp-setup --validate`

## Security Considerations

### API Key Security

- Store keys in `.env`, never in code
- Use environment-specific keys
- Rotate keys quarterly
- Monitor key usage
- Revoke unused keys

### Permission Scoping

Grant minimum required permissions:

```javascript
// ✓ Good: Scoped permissions
GITHUB_TOKEN=ghp_xxx  // repo:read, issues:write

// ✗ Bad: Overly broad permissions
GITHUB_TOKEN=ghp_xxx  // admin:everything
```

### Network Security

- Use HTTPS for all API calls
- Validate SSL certificates
- Implement rate limiting
- Monitor for unusual activity

## Best Practices

### 1. Start Small

Enable only MCPs you need:

```markdown
## MCP Configuration

- **Neon Database**: `TRUE`
- **GitHub**: `TRUE`
```

Add more as requirements grow.

### 2. Document Configuration

Add notes in PROJECT_STARTER.md:

```markdown
### MCP Configuration Notes

**Neon**: Using main project for prod, branch for development
**GitHub**: Read-only token for CI, write token for releases
```

### 3. Test Before Production

1. Enable MCP in development
2. Test all integrations
3. Verify error handling
4. Monitor performance
5. Deploy to production

### 4. Monitor Usage

Track MCP usage:
- API call volume
- Error rates
- Response times
- Cost implications

### 5. Keep Updated

- Review provider configurations quarterly
- Update packages: `npm update`
- Check for security updates
- Test after updates

## Examples

### Example 1: Basic Web App

```markdown
- **Neon Database**: `TRUE`
- **GitHub**: `TRUE`
- **Vercel**: `TRUE`
```

Features: Database, version control, deployment

### Example 2: Full-Stack SaaS

```markdown
- **Neon Database**: `TRUE`
- **Cloudflare**: `TRUE`
- **GitHub**: `TRUE`
- **Sentry**: `TRUE`
- **Stripe**: `TRUE`
- **Google Analytics 4**: `TRUE`
- **Slack**: `TRUE`
```

Features: Complete development, deployment, monitoring, payments, analytics

### Example 3: Blockchain DApp

```markdown
- **Neon Database**: `TRUE`
- **GitHub**: `TRUE`
- **Vercel**: `TRUE`
- **Sentry**: `TRUE`
```

Features: Off-chain data, version control, hosting, monitoring

## Resources

- [MCP Specification](https://modelcontextprotocol.io/)
- [Agent Library Integration](../../agent-library/docs/mcp-integration.md)
- [Provider Documentation](./providers/)
- [Custom MCP Guide](./templates/custom-mcp-guide.md)

## Support

### Getting Help

1. Check provider-specific setup docs
2. Review troubleshooting section
3. Validate configuration: `/mcp-setup --validate`
4. Check Claude Code documentation
5. Open issue with configuration details

### Contributing

To add a new MCP provider:

1. Create provider JSON in `providers/`
2. Create setup guide in `docs/`
3. Test configuration
4. Submit PR with examples
5. Update this README

---

*The MCP Configuration System makes it easy to extend Claude Code with powerful integrations, enabling agents to work with real systems and services.*
