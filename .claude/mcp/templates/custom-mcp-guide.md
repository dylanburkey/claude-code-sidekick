# Custom MCP Provider Guide

> Step-by-step guide to adding custom MCP providers to your project

## Overview

Custom MCP providers allow you to extend Claude Code with project-specific
integrations, proprietary APIs, or internal services. This guide walks through
creating and configuring custom MCPs.

## When to Create a Custom MCP

Create a custom MCP when you need to:

- Integrate with internal/proprietary APIs
- Connect to custom databases or services
- Add specialized tooling not covered by built-in providers
- Create project-specific automation
- Bridge legacy systems with Claude Code

## Step-by-Step Guide

### Step 1: Plan Your MCP

Define what your MCP will do:

**Example: Internal API Integration**

- **Name**: company-api
- **Purpose**: Access internal REST API
- **Features**: CRUD operations, search, reports
- **Environment**: API URL, API key
- **Use Cases**: Generate client code, automate deployments

### Step 2: Create Provider Configuration

Create `.claude/mcp/providers/your-provider.json`:

```json
{
  "name": "company-api",
  "displayName": "Company Internal API",
  "category": "custom",
  "command": "node",
  "args": ["./mcp-servers/company-api-server.js"],
  "env": {
    "COMPANY_API_URL": "${COMPANY_API_URL}",
    "COMPANY_API_KEY": "${COMPANY_API_KEY}"
  },
  "requiredEnvVars": ["COMPANY_API_URL", "COMPANY_API_KEY"],
  "optionalEnvVars": ["COMPANY_API_TIMEOUT"],
  "documentation": "https://internal-docs.company.com/api",
  "setup": ".claude/mcp/docs/company-api-setup.md",
  "features": [
    "CRUD operations for all resources",
    "Full-text search",
    "Report generation",
    "Bulk operations"
  ],
  "agentIntegration": {
    "categories": ["code-generation", "task-automation"],
    "useCases": [
      "Generate API client code",
      "Automate report generation",
      "Sync data between systems"
    ]
  }
}
```

### Step 3: Implement MCP Server

Create `mcp-servers/company-api-server.js`:

```javascript
#!/usr/bin/env node
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';

// Your API client
import CompanyAPIClient from './company-api-client.js';

const API_URL = process.env.COMPANY_API_URL;
const API_KEY = process.env.COMPANY_API_KEY;

const client = new CompanyAPIClient(API_URL, API_KEY);

// Create MCP server
const server = new Server(
  {
    name: 'company-api',
    version: '1.0.0',
  },
  {
    capabilities: {
      tools: {},
      resources: {},
    },
  }
);

// Define tools
server.setRequestHandler('tools/list', async () => {
  return {
    tools: [
      {
        name: 'get_resource',
        description: 'Get a resource by ID',
        inputSchema: {
          type: 'object',
          properties: {
            resourceType: {
              type: 'string',
              description: 'Type of resource (users, products, orders)',
            },
            id: {
              type: 'string',
              description: 'Resource ID',
            },
          },
          required: ['resourceType', 'id'],
        },
      },
      {
        name: 'search',
        description: 'Search resources',
        inputSchema: {
          type: 'object',
          properties: {
            query: {
              type: 'string',
              description: 'Search query',
            },
            type: {
              type: 'string',
              description: 'Resource type to search',
            },
          },
          required: ['query'],
        },
      },
    ],
  };
});

// Implement tool handlers
server.setRequestHandler('tools/call', async (request) => {
  const { name, arguments: args } = request.params;

  switch (name) {
    case 'get_resource':
      const resource = await client.get(args.resourceType, args.id);
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(resource, null, 2),
          },
        ],
      };

    case 'search':
      const results = await client.search(args.query, args.type);
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(results, null, 2),
          },
        ],
      };

    default:
      throw new Error(`Unknown tool: ${name}`);
  }
});

// Start server
const transport = new StdioServerTransport();
await server.connect(transport);
```

### Step 4: Create Setup Documentation

Create `.claude/mcp/docs/company-api-setup.md`:

````markdown
# Company API MCP Setup

## Prerequisites

- Access to internal Company API
- API key with appropriate permissions
- Node.js 18+ installed

## Setup Steps

### 1. Obtain API Credentials

1. Log in to internal portal: https://portal.company.com
2. Navigate to API Settings
3. Generate new API key
4. Note the API URL and key

### 2. Configure Environment Variables

Add to your `.env`:

```bash
COMPANY_API_URL=https://api.company.com
COMPANY_API_KEY=your_api_key_here
COMPANY_API_TIMEOUT=5000  # Optional, default 5 seconds
```
````

### 3. Install Dependencies

```bash
cd mcp-servers
npm install
```

### 4. Test Connection

```bash
node company-api-server.js
```

Should connect without errors.

### 5. Enable in PROJECT_STARTER.md

```markdown
### Custom MCPs

**Company API**: `TRUE`
```

### 6. Run Setup

```bash
/mcp-setup
```

### 7. Restart Claude Code

## Usage Examples

### Get User by ID

```javascript
const user = await mcp.companyApi.getResource({
  resourceType: 'users',
  id: '12345',
});
```

### Search Products

```javascript
const products = await mcp.companyApi.search({
  query: 'laptop',
  type: 'products',
});
```

## Troubleshooting

### Connection Timeout

- Check VPN connection
- Verify API URL is correct
- Increase timeout in environment variables

### Authentication Errors

- Verify API key is valid
- Check key permissions
- Regenerate key if necessary

## Security Notes

- Never commit API keys to version control
- Use different keys for dev/staging/prod
- Rotate keys quarterly
- Monitor API usage for anomalies

````

### Step 5: Add to PROJECT_STARTER.md

In the Custom MCPs section:

```markdown
### Custom MCPs

**Company API**: `TRUE` <!-- Internal REST API integration -->
````

### Step 6: Generate Configuration

```bash
/mcp-setup
```

This will:

- Add your MCP to Claude Code configuration
- Include environment variables in `.env.example`
- Generate setup instructions

### Step 7: Test Your MCP

1. Restart Claude Code
2. Verify MCP loads without errors
3. Test a simple operation
4. Confirm agent integration works

## Advanced Topics

### Adding Resources

MCPs can provide resources (not just tools):

```javascript
server.setRequestHandler('resources/list', async () => {
  return {
    resources: [
      {
        uri: 'company://api-docs',
        name: 'API Documentation',
        mimeType: 'text/markdown',
      },
    ],
  };
});

server.setRequestHandler('resources/read', async (request) => {
  const { uri } = request.params;

  if (uri === 'company://api-docs') {
    const docs = await client.getDocs();
    return {
      contents: [
        {
          uri: uri,
          mimeType: 'text/markdown',
          text: docs,
        },
      ],
    };
  }
});
```

### Error Handling

Implement robust error handling:

```javascript
try {
  const result = await client.operation();
  return { content: [{ type: 'text', text: JSON.stringify(result) }] };
} catch (error) {
  if (error.status === 401) {
    throw new Error('Authentication failed. Check COMPANY_API_KEY.');
  } else if (error.status === 404) {
    throw new Error('Resource not found.');
  } else {
    throw new Error(`API error: ${error.message}`);
  }
}
```

### Caching

Add caching for expensive operations:

```javascript
const cache = new Map();

async function getCached(key, fetchFn, ttl = 60000) {
  const cached = cache.get(key);
  if (cached && Date.now() - cached.timestamp < ttl) {
    return cached.data;
  }

  const data = await fetchFn();
  cache.set(key, { data, timestamp: Date.now() });
  return data;
}

// Usage
const resource = await getCached(
  `resource:${id}`,
  () => client.get(type, id),
  300000 // 5 minutes
);
```

### Rate Limiting

Implement rate limiting:

```javascript
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 60000, // 1 minute
  max: 100, // 100 requests per minute
});

// Apply to API calls
async function rateLimitedCall(fn) {
  await limiter();
  return await fn();
}
```

## Testing

### Unit Tests

```javascript
import { describe, test, expect, beforeEach } from 'vitest';
import CompanyAPIServer from './company-api-server.js';

describe('Company API MCP', () => {
  let server;

  beforeEach(() => {
    server = new CompanyAPIServer({
      url: 'https://test-api.company.com',
      key: 'test-key',
    });
  });

  test('should get resource by ID', async () => {
    const result = await server.getResource({
      resourceType: 'users',
      id: '123',
    });

    expect(result).toHaveProperty('id', '123');
  });

  test('should search resources', async () => {
    const results = await server.search({
      query: 'test',
      type: 'products',
    });

    expect(Array.isArray(results)).toBe(true);
  });
});
```

### Integration Tests

```javascript
describe('MCP Integration', () => {
  test('should work with Claude Code', async () => {
    // Mock MCP client
    const mcp = {
      companyApi: {
        getResource: async (params) => {
          // Test implementation
        },
      },
    };

    // Test agent integration
    const result = await generateClientCode(mcp);
    expect(result).toContain('function getUser');
  });
});
```

## Deployment

### Production Considerations

1. **Error Handling**: Comprehensive error handling
2. **Logging**: Structured logging for debugging
3. **Monitoring**: Track usage and performance
4. **Security**: Validate inputs, sanitize outputs
5. **Performance**: Implement caching and rate limiting

### Environment-Specific Configuration

```javascript
const config = {
  development: {
    url: 'https://dev-api.company.com',
    timeout: 10000,
    debug: true,
  },
  production: {
    url: 'https://api.company.com',
    timeout: 5000,
    debug: false,
  },
};

const env = process.env.NODE_ENV || 'development';
const apiConfig = config[env];
```

## Examples

### Example 1: Database MCP

```json
{
  "name": "mongodb-custom",
  "displayName": "Custom MongoDB",
  "category": "database",
  "command": "node",
  "args": ["./mcp-servers/mongodb-server.js"],
  "env": {
    "MONGODB_URI": "${MONGODB_URI}"
  },
  "requiredEnvVars": ["MONGODB_URI"]
}
```

### Example 2: CI/CD Integration

```json
{
  "name": "jenkins",
  "displayName": "Jenkins CI/CD",
  "category": "development",
  "command": "node",
  "args": ["./mcp-servers/jenkins-server.js"],
  "env": {
    "JENKINS_URL": "${JENKINS_URL}",
    "JENKINS_TOKEN": "${JENKINS_TOKEN}"
  },
  "requiredEnvVars": ["JENKINS_URL", "JENKINS_TOKEN"]
}
```

### Example 3: Custom Analytics

```json
{
  "name": "analytics",
  "displayName": "Custom Analytics",
  "category": "analytics",
  "command": "python",
  "args": ["./mcp-servers/analytics-server.py"],
  "env": {
    "ANALYTICS_DB": "${ANALYTICS_DB}"
  },
  "requiredEnvVars": ["ANALYTICS_DB"]
}
```

## Resources

- [MCP SDK Documentation](https://github.com/modelcontextprotocol/sdk)
- [MCP Specification](https://modelcontextprotocol.io/)
- [Example MCP Servers](https://github.com/modelcontextprotocol/servers)
- [Provider Template](./provider-template.json)

## Support

For help with custom MCPs:

1. Review existing provider implementations
2. Check MCP SDK documentation
3. Test with simple operations first
4. Use debugging tools (console.log, breakpoints)
5. Ask for help in project discussions

---

_Custom MCPs enable Claude Code to integrate with any system or service, making
it a truly extensible development environment._
