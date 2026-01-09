# MCP Integration Guide

> Comprehensive guide to integrating Model Context Protocol (MCP) with the Agent Library

## Table of Contents

- [What is MCP?](#what-is-mcp)
- [Why Use MCP with Agents?](#why-use-mcp-with-agents)
- [Available MCP Servers](#available-mcp-servers)
- [MCP in the Agent Library](#mcp-in-the-agent-library)
- [Integration Patterns](#integration-patterns)
- [Best Practices](#best-practices)
- [Examples](#examples)
- [Configuration](#configuration)
- [Troubleshooting](#troubleshooting)

---

## What is MCP?

The Model Context Protocol (MCP) is a standardized protocol that enables AI assistants like Claude to:

- **Access Resources**: Files, databases, APIs, and other data sources
- **Execute Tools**: Run functions and commands with parameters
- **Share Context**: Maintain state and share information across interactions
- **Integrate Services**: Connect to external services seamlessly

MCP servers expose resources and tools that can be used by AI assistants to extend their capabilities beyond simple text generation.

### Key Concepts

#### Resources

Resources are data sources that can be read by the AI:

- Files on the filesystem
- Database tables and queries
- API endpoints
- Configuration data
- External service data

#### Tools

Tools are functions that can be executed with parameters:

- Database queries
- API calls
- File operations
- Data transformations
- Service integrations

#### Servers

MCP servers provide resources and tools. Common servers include:

- **Neon**: PostgreSQL database operations
- **Filesystem**: File and directory access
- **GitHub**: Repository operations
- **Slack**: Team communication
- **Custom**: Project-specific integrations

---

## Why Use MCP with Agents?

### Enhanced Capabilities

MCP extends agent capabilities beyond code generation:

```javascript
// Without MCP: Agent generates code
const schema = `
  CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL
  );
`;

// With MCP: Agent queries actual database and generates based on real schema
const tables = await mcp.neon.getDatabaseTables({ projectId: 'id' });
const schema = generateMigrationFromExisting(tables);
```

### Context Awareness

Agents can make informed decisions based on real data:

- Query database schema before generating models
- Read existing files before generating new ones
- Check API responses before writing integration code
- Analyze codebase structure before scaffolding

### Stateful Operations

Maintain state across agent invocations:

- Track migration progress
- Store test results
- Cache expensive operations
- Coordinate multi-step workflows

### Real-World Integration

Connect to production systems:

- Deploy to actual infrastructure
- Query production databases (safely)
- Interact with external APIs
- Monitor live applications

---

## Available MCP Servers

### Neon Database (Built-in)

The Neon MCP server is pre-configured and provides PostgreSQL database operations:

#### Available Tools

| Tool | Purpose | Example Use Case |
|------|---------|------------------|
| `list_projects` | List Neon projects | Find databases to work with |
| `create_project` | Create new project | Set up test environment |
| `run_sql` | Execute SQL | Query or modify data |
| `run_sql_transaction` | Execute transaction | Multiple related queries |
| `describe_table_schema` | Get table structure | Generate models from schema |
| `get_database_tables` | List all tables | Understand database structure |
| `create_branch` | Create database branch | Isolated testing environment |
| `prepare_database_migration` | Prepare migration | Safe schema changes |
| `complete_database_migration` | Apply migration | Finalize schema updates |
| `prepare_query_tuning` | Analyze query performance | Optimize slow queries |
| `complete_query_tuning` | Apply optimizations | Implement performance fixes |
| `get_connection_string` | Get database URL | Connect applications |
| `provision_neon_auth` | Set up authentication | Add auth to project |
| `compare_database_schema` | Diff schemas | Find schema differences |
| `explain_sql_statement` | Analyze query plan | Debug performance issues |

#### Example: Database-Aware Code Generation

```javascript
// Agent generates models based on actual database schema
async function generateModelsFromDatabase() {
  // Get actual database tables via MCP
  const tables = await mcp.neon.getDatabaseTables({
    projectId: process.env.NEON_PROJECT_ID
  });

  // Generate TypeScript types from real schema
  for (const tableName of tables) {
    const schema = await mcp.neon.describeTableSchema({
      projectId: process.env.NEON_PROJECT_ID,
      tableName
    });

    const typeDefinition = generateTypeScriptType(schema);
    await writeFile(`src/types/${tableName}.ts`, typeDefinition);
  }
}
```

### Adding Custom MCP Servers

You can add additional MCP servers to extend capabilities:

#### Filesystem Server

```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "/path/to/allowed/files"]
    }
  }
}
```

#### GitHub Server

```json
{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_TOKEN": "${GITHUB_TOKEN}"
      }
    }
  }
}
```

#### Custom Server

```json
{
  "mcpServers": {
    "custom": {
      "command": "node",
      "args": ["./mcp-servers/custom-server.js"],
      "env": {
        "API_KEY": "${CUSTOM_API_KEY}"
      }
    }
  }
}
```

---

## MCP in the Agent Library

### How Agents Use MCP

Agents in the library can leverage MCP for:

1. **Context Gathering**: Read files, query databases, fetch API data
2. **Validation**: Check constraints before generating code
3. **Integration**: Connect generated code to real systems
4. **Testing**: Set up test databases, seed data, run queries
5. **Deployment**: Execute deployments, run migrations, verify health

### Agent MCP Integration Levels

#### Level 1: MCP-Aware

Agent can optionally use MCP if available:

```markdown
## MCP Integration (Optional)

This agent can use MCP to enhance its output:
- Query database schema for accurate models
- Read existing files to match patterns
- Validate generated code against real constraints
```

#### Level 2: MCP-Enhanced

Agent works better with MCP but doesn't require it:

```markdown
## MCP Integration (Recommended)

This agent benefits significantly from MCP:
- Generates accurate code based on real schemas
- Validates against actual database constraints
- Tests generated code in real environment
```

#### Level 3: MCP-Required

Agent requires MCP to function:

```markdown
## MCP Integration (Required)

This agent requires MCP to operate:
- Must connect to database for migrations
- Requires access to production schema
- Needs to execute queries for validation
```

### MCP-Enabled Agents by Category

#### Code Generation

- **Database Model Generator**: Reads actual schema via MCP
- **API Endpoint Generator**: Validates against existing endpoints
- **Migration Generator**: Analyzes current database state

#### Task Automation

- **Deployment Automator**: Executes actual deployments
- **Database Migration Runner**: Applies schema changes
- **Environment Manager**: Provisions real infrastructure

#### Testing

- **Integration Test Generator**: Uses test databases
- **Data Seeder**: Populates test data
- **Performance Tester**: Runs against real databases

#### Documentation

- **Database Schema Documenter**: Queries actual schema
- **API Documentation Generator**: Reads live endpoints
- **Architecture Documenter**: Analyzes real code structure

---

## Integration Patterns

### Pattern 1: Schema-First Generation

Generate code based on existing database schema:

```javascript
// 1. Query database schema via MCP
const schema = await mcp.neon.describeTableSchema({
  projectId: 'project-id',
  tableName: 'users'
});

// 2. Generate TypeScript types
const types = generateTypes(schema);

// 3. Generate API endpoints
const endpoints = generateEndpoints(schema);

// 4. Generate tests
const tests = generateTests(schema, endpoints);
```

### Pattern 2: Safe Migrations

Test migrations in isolated branches:

```javascript
// 1. Create temporary branch for testing
const branch = await mcp.neon.createBranch({
  projectId: 'project-id',
  branchName: `test-migration-${Date.now()}`
});

// 2. Apply migration to test branch
await mcp.neon.runSql({
  projectId: 'project-id',
  branchId: branch.id,
  sql: migrationSQL
});

// 3. Run tests against test branch
const testsPass = await runTests(branch.connectionString);

// 4. Apply to main if tests pass
if (testsPass) {
  await mcp.neon.runSql({
    projectId: 'project-id',
    sql: migrationSQL
  });
}

// 5. Cleanup test branch
await mcp.neon.deleteBranch({
  projectId: 'project-id',
  branchId: branch.id
});
```

### Pattern 3: Context-Aware Code Generation

Use MCP to understand existing codebase:

```javascript
// 1. Read existing models via filesystem MCP
const existingModels = await mcp.filesystem.listFiles({
  pattern: 'src/models/*.ts'
});

// 2. Analyze patterns
const patterns = analyzePatterns(existingModels);

// 3. Generate new model matching patterns
const newModel = generateModel({
  name: 'Product',
  patterns: patterns,
  schema: await mcp.neon.describeTableSchema({
    projectId: 'project-id',
    tableName: 'products'
  })
});
```

### Pattern 4: Validation and Verification

Validate generated code against real constraints:

```javascript
// 1. Generate database migration
const migration = generateMigration(specification);

// 2. Validate SQL syntax via MCP
try {
  await mcp.neon.explainSqlStatement({
    projectId: 'project-id',
    sql: migration,
    analyze: false // Just validate syntax
  });
} catch (error) {
  console.error('Invalid SQL:', error);
  // Fix and regenerate
}

// 3. Test in temporary branch
const testBranch = await mcp.neon.createBranch({
  projectId: 'project-id'
});

await mcp.neon.runSql({
  projectId: 'project-id',
  branchId: testBranch.id,
  sql: migration
});

// 4. Verify schema change
const newSchema = await mcp.neon.describeTableSchema({
  projectId: 'project-id',
  branchId: testBranch.id,
  tableName: 'target_table'
});

// 5. Verify meets requirements
assert(validateSchema(newSchema, requirements));
```

### Pattern 5: Multi-Step Workflows

Coordinate complex operations across MCP servers:

```javascript
// Complex deployment workflow using multiple MCP servers
async function deployFeature() {
  // 1. Get latest code from GitHub
  const latestCommit = await mcp.github.getLatestCommit({
    repo: 'org/repo',
    branch: 'main'
  });

  // 2. Run database migration
  const migration = await mcp.neon.prepareDatabaseMigration({
    projectId: 'project-id',
    migrationSql: migrationScript
  });

  // 3. Deploy application
  await deployApp(latestCommit.sha);

  // 4. Complete migration
  await mcp.neon.completeDatabaseMigration({
    migrationId: migration.id,
    applyChanges: true
  });

  // 5. Notify team via Slack
  await mcp.slack.postMessage({
    channel: '#deployments',
    text: `✅ Deployed ${latestCommit.sha} with database migration`
  });
}
```

---

## Best Practices

### Security

#### Never Hardcode Credentials

```javascript
// ✗ Bad: Hardcoded credentials
const projectId = 'proj_abc123def456';

// ✓ Good: Use environment variables
const projectId = process.env.NEON_PROJECT_ID;
```

#### Use Temporary Branches for Testing

```javascript
// ✓ Always test in isolated branches
const testBranch = await mcp.neon.createBranch({
  projectId: process.env.NEON_PROJECT_ID
});

try {
  await testOperation(testBranch.id);
} finally {
  await mcp.neon.deleteBranch({
    projectId: process.env.NEON_PROJECT_ID,
    branchId: testBranch.id
  });
}
```

#### Validate Inputs

```javascript
// ✓ Validate all inputs before MCP calls
function validateProjectId(id) {
  if (!id || !id.startsWith('proj_')) {
    throw new Error('Invalid project ID');
  }
  return id;
}

const tables = await mcp.neon.getDatabaseTables({
  projectId: validateProjectId(userInput)
});
```

### Performance

#### Cache Expensive Operations

```javascript
// ✓ Cache database schema queries
const schemaCache = new Map();

async function getSchema(tableName) {
  if (schemaCache.has(tableName)) {
    return schemaCache.get(tableName);
  }

  const schema = await mcp.neon.describeTableSchema({
    projectId: process.env.NEON_PROJECT_ID,
    tableName
  });

  schemaCache.set(tableName, schema);
  return schema;
}
```

#### Batch Operations

```javascript
// ✓ Batch multiple queries into transactions
await mcp.neon.runSqlTransaction({
  projectId: process.env.NEON_PROJECT_ID,
  sqlStatements: [
    'INSERT INTO users ...',
    'INSERT INTO profiles ...',
    'UPDATE settings ...'
  ]
});
```

### Error Handling

#### Handle MCP Errors Gracefully

```javascript
// ✓ Graceful degradation when MCP unavailable
try {
  const schema = await mcp.neon.getDatabaseTables({
    projectId: process.env.NEON_PROJECT_ID
  });
  return generateFromSchema(schema);
} catch (error) {
  if (error.code === 'MCP_UNAVAILABLE') {
    console.warn('MCP unavailable, using fallback');
    return generateFromTemplate();
  }
  throw error;
}
```

#### Retry Transient Failures

```javascript
// ✓ Retry with exponential backoff
async function runSqlWithRetry(sql, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await mcp.neon.runSql({
        projectId: process.env.NEON_PROJECT_ID,
        sql
      });
    } catch (error) {
      if (i === maxRetries - 1) throw error;
      if (!isRetryable(error)) throw error;

      await sleep(Math.pow(2, i) * 1000);
    }
  }
}
```

### Testing

#### Mock MCP in Tests

```javascript
// ✓ Mock MCP for unit tests
const mockMcp = {
  neon: {
    getDatabaseTables: jest.fn().mockResolvedValue(['users', 'posts']),
    describeTableSchema: jest.fn().mockResolvedValue(mockSchema)
  }
};

test('generates models from schema', async () => {
  const models = await generateModels(mockMcp);
  expect(models).toHaveLength(2);
});
```

#### Integration Tests with Real MCP

```javascript
// ✓ Integration tests with real MCP in CI
describe('Database operations', () => {
  let testBranch;

  beforeAll(async () => {
    testBranch = await mcp.neon.createBranch({
      projectId: process.env.TEST_PROJECT_ID
    });
  });

  afterAll(async () => {
    await mcp.neon.deleteBranch({
      projectId: process.env.TEST_PROJECT_ID,
      branchId: testBranch.id
    });
  });

  test('runs migration successfully', async () => {
    await expect(runMigration(testBranch.id)).resolves.toBeDefined();
  });
});
```

---

## Examples

### Example 1: Type-Safe Model Generation

```typescript
// Generate TypeScript models from database with full type safety
async function generateTypeScriptModels() {
  // 1. Get all tables
  const tables = await mcp.neon.getDatabaseTables({
    projectId: process.env.NEON_PROJECT_ID
  });

  // 2. For each table, generate types
  for (const tableName of tables) {
    const schema = await mcp.neon.describeTableSchema({
      projectId: process.env.NEON_PROJECT_ID,
      tableName
    });

    const typeDefinition = `
export interface ${pascalCase(tableName)} {
${schema.columns.map(col => `  ${col.name}: ${pgTypeToTS(col.type)};`).join('\n')}
}

export type ${pascalCase(tableName)}Create = Omit<${pascalCase(tableName)}, 'id' | 'createdAt'>;
export type ${pascalCase(tableName)}Update = Partial<${pascalCase(tableName)}Create>;
`;

    await writeFile(`src/types/${tableName}.ts`, typeDefinition);
  }
}
```

### Example 2: Automated Migration Testing

```typescript
// Test migrations automatically before applying
async function testAndApplyMigration(migrationSQL: string) {
  // 1. Create test branch
  const testBranch = await mcp.neon.createBranch({
    projectId: process.env.NEON_PROJECT_ID,
    branchName: `migration-test-${Date.now()}`
  });

  try {
    // 2. Apply migration to test branch
    await mcp.neon.runSql({
      projectId: process.env.NEON_PROJECT_ID,
      branchId: testBranch.id,
      sql: migrationSQL
    });

    // 3. Run integration tests
    const testConnectionString = await mcp.neon.getConnectionString({
      projectId: process.env.NEON_PROJECT_ID,
      branchId: testBranch.id
    });

    const testResults = await runIntegrationTests(testConnectionString);

    if (!testResults.passed) {
      throw new Error(`Tests failed: ${testResults.failures.join(', ')}`);
    }

    // 4. Compare schema changes
    const schemaDiff = await mcp.neon.compareDatabaseSchema({
      projectId: process.env.NEON_PROJECT_ID,
      branchId: testBranch.id
    });

    console.log('Schema changes:', schemaDiff);

    // 5. Apply to production if tests pass
    await mcp.neon.runSql({
      projectId: process.env.NEON_PROJECT_ID,
      sql: migrationSQL
    });

    console.log('✅ Migration applied successfully');

  } finally {
    // 6. Cleanup test branch
    await mcp.neon.deleteBranch({
      projectId: process.env.NEON_PROJECT_ID,
      branchId: testBranch.id
    });
  }
}
```

### Example 3: Query Performance Optimization

```typescript
// Automatically optimize slow queries
async function optimizeSlowQueries() {
  // 1. Find slow queries
  const slowQueries = await mcp.neon.listSlowQueries({
    projectId: process.env.NEON_PROJECT_ID,
    minExecutionTime: 1000, // > 1 second
    limit: 10
  });

  for (const query of slowQueries) {
    console.log(`Optimizing: ${query.query}`);

    // 2. Analyze query
    const tuning = await mcp.neon.prepareQueryTuning({
      projectId: process.env.NEON_PROJECT_ID,
      sql: query.query
    });

    // 3. Review suggested optimizations
    console.log('Suggested optimizations:', tuning.suggestions);

    // 4. Apply if improvement is significant
    if (tuning.improvementPercent > 50) {
      await mcp.neon.completeQueryTuning({
        tuningId: tuning.id,
        projectId: process.env.NEON_PROJECT_ID,
        suggestedSqlStatements: tuning.suggestedStatements,
        temporaryBranchId: tuning.tempBranchId,
        applyChanges: true
      });

      console.log(`✅ Optimized with ${tuning.improvementPercent}% improvement`);
    }
  }
}
```

---

## Configuration

### MCP Server Configuration

Configure MCP servers in your Claude Code settings:

```json
{
  "mcpServers": {
    "neon": {
      "command": "npx",
      "args": ["-y", "@neondatabase/mcp-server-neon"],
      "env": {
        "NEON_API_KEY": "${NEON_API_KEY}"
      }
    }
  }
}
```

### Environment Variables

Set up environment variables for MCP:

```bash
# .env
NEON_API_KEY=your_api_key_here
NEON_PROJECT_ID=proj_abc123def456
```

### Agent Configuration

Configure agents to use MCP:

```yaml
# .claude/agents/database-generator.yaml
agent: database-generator
mcp:
  enabled: true
  required_servers:
    - neon
  fallback: generate-from-template
```

---

## Troubleshooting

### MCP Server Not Available

**Symptom:** `Error: MCP server 'neon' not found`

**Solution:**

1. Check MCP configuration in Claude Code settings
2. Verify environment variables are set
3. Restart Claude Code to reload configuration

### Authentication Errors

**Symptom:** `Error: Authentication failed`

**Solution:**

1. Verify API keys are correct
2. Check environment variables are properly loaded
3. Ensure API key has required permissions

### Connection Timeouts

**Symptom:** `Error: Request timeout`

**Solution:**

1. Check network connectivity
2. Increase timeout in configuration
3. Retry with exponential backoff

### Rate Limiting

**Symptom:** `Error: Rate limit exceeded`

**Solution:**

1. Implement request throttling
2. Cache responses when possible
3. Use batch operations to reduce API calls

---

## Resources

- [MCP Specification](https://modelcontextprotocol.io/)
- [Neon MCP Server](https://github.com/neondatabase/mcp-server-neon)
- [Claude Code MCP Documentation](https://docs.anthropic.com/claude/mcp)
- [Agent Library README](../README.md)

---

*MCP integration enables agents to work with real systems, making generated code production-ready and context-aware.*
