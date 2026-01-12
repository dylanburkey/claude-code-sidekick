# Documentation Agents

> Agents that create and maintain comprehensive, up-to-date project
> documentation.

## Overview

Documentation agents automate the creation and maintenance of documentation
across your project. From API docs to inline comments, these agents ensure your
code is always well-documented and easy to understand.

## Available Agents

### API Documentation

- **OpenAPI Generator**: Generate OpenAPI/Swagger specs from code
- **API Reference Builder**: Create comprehensive API documentation
- **Endpoint Documenter**: Document REST/GraphQL endpoints
- **SDK Documentation**: Generate client SDK documentation

### Code Documentation

- **JSDoc Generator**: Create JSDoc comments for functions/classes
- **Type Documentation**: Document TypeScript types and interfaces
- **Inline Comment Generator**: Add explanatory comments to code
- **Architecture Documenter**: Document system architecture

### Project Documentation

- **README Generator**: Create comprehensive README files
- **Changelog Maintainer**: Automated changelog updates
- **Contributing Guide**: Generate contribution guidelines
- **Setup Guide**: Create installation and setup instructions

### User Documentation

- **User Guide Generator**: Create end-user documentation
- **Tutorial Builder**: Generate step-by-step tutorials
- **FAQ Generator**: Build FAQ sections from common questions
- **Troubleshooting Guide**: Document common issues and solutions

## Usage Patterns

### Generate API Documentation

```markdown
Generate OpenAPI documentation for all API endpoints in src/api/ including:

- Request/response schemas
- Authentication requirements
- Error responses
- Example requests
```

### Create README

```markdown
Generate a comprehensive README for this project including:

- Project description and features
- Installation instructions
- Quick start guide
- API reference links
- Contributing guidelines
- License information
```

### Document Functions

```markdown
Add JSDoc comments to all exported functions in src/utils/ including:

- Function description
- Parameter types and descriptions
- Return value documentation
- Usage examples
- Related functions
```

## Best Practices

### Good Documentation

```javascript
/**
 * Calculates the total price including tax and discounts
 *
 * @param {number} basePrice - The original price before modifications
 * @param {number} taxRate - Tax rate as decimal (e.g., 0.08 for 8%)
 * @param {Discount[]} discounts - Array of applicable discount objects
 * @returns {number} Final price with tax and discounts applied
 *
 * @example
 * const total = calculateTotal(100, 0.08, [{ type: 'percentage', value: 10 }]);
 * console.log(total); // 97.20
 *
 * @throws {Error} If basePrice is negative
 * @throws {Error} If taxRate is not between 0 and 1
 */
function calculateTotal(basePrice, taxRate, discounts = []) {
  // Implementation
}
```

### Documentation Structure

```markdown
# Component/Module Name

Brief description (1-2 sentences)

## Overview

Detailed explanation of purpose and functionality

## Installation

How to install/import

## Usage

Basic usage examples

## API Reference

Detailed API documentation

## Examples

Real-world usage examples

## Configuration

Available options and settings

## Troubleshooting

Common issues and solutions

## Related

Links to related documentation
```

### Keeping Docs Current

- Update docs when code changes
- Use automated doc generation where possible
- Include version information
- Mark deprecated features
- Review docs in code reviews

## Agent Configuration

### API Documentation Config

```yaml
agent: documentation/openapi-generator
config:
  source: src/api
  output: docs/api
  format: openapi-3.0
  include:
    - schemas
    - examples
    - security
  exclude:
    - internal-endpoints
  validation: strict
```

### README Generator Config

```yaml
agent: documentation/readme-generator
config:
  sections:
    - title
    - badges
    - description
    - features
    - installation
    - quick-start
    - documentation
    - contributing
    - license
  badges:
    - build-status
    - coverage
    - npm-version
    - license
```

## Examples

### Example 1: API Endpoint Documentation

**Prompt:**

```
Document the POST /api/users endpoint including:
- Request body schema
- Validation rules
- Success/error responses
- Authentication requirements
- Rate limiting
- Code examples in JavaScript and cURL
```

**Generated Output:**

````markdown
## POST /api/users

Create a new user account.

### Authentication

Requires admin API key in `Authorization` header.

### Request Body

```json
{
  "email": "user@example.com",
  "name": "John Doe",
  "role": "user"
}
```
````

| Field | Type   | Required | Description                    |
| ----- | ------ | -------- | ------------------------------ |
| email | string | Yes      | Valid email address            |
| name  | string | Yes      | User's full name (2-100 chars) |
| role  | string | No       | User role (default: "user")    |

### Response

**Success (201):**

```json
{
  "id": "user_123",
  "email": "user@example.com",
  "name": "John Doe",
  "role": "user",
  "createdAt": "2024-01-15T10:30:00Z"
}
```

**Error (400):**

```json
{
  "error": "Invalid email address",
  "field": "email"
}
```

### Examples

**JavaScript:**

```javascript
const response = await fetch('https://api.example.com/users', {
  method: 'POST',
  headers: {
    Authorization: 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    email: 'user@example.com',
    name: 'John Doe',
  }),
});
```

**cURL:**

```bash
curl -X POST https://api.example.com/users \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","name":"John Doe"}'
```

### Rate Limiting

100 requests per hour per API key

```

### Example 2: Component Documentation

**Prompt:**
```

Generate documentation for the Button component including:

- Component props
- Usage examples
- Accessibility features
- Styling options
- Related components

```

### Example 3: Architecture Documentation

**Prompt:**
```

Document the application architecture including:

- System overview
- Component relationships
- Data flow
- External dependencies
- Deployment architecture

````

## Integration with MCP

Documentation agents leverage MCP for:

- **Code Analysis**: Read source files to extract documentation
- **Database Schema**: Document database structure via Neon MCP
- **API Discovery**: Analyze endpoints and generate docs
- **Version Control**: Track documentation changes over time

### MCP Example

```javascript
// Generate database documentation using MCP
async function generateDatabaseDocs() {
  // Get database schema via MCP
  const tables = await mcp.neon.getDatabaseTables({
    projectId: 'project-id'
  });

  // Document each table
  for (const table of tables) {
    const schema = await mcp.neon.describeTableSchema({
      projectId: 'project-id',
      tableName: table.name
    });

    // Generate markdown documentation
    const docs = generateTableDocs(table, schema);
    await writeFile(`docs/database/${table.name}.md`, docs);
  }
}
````

## Documentation Types

### API Documentation

Complete reference for API endpoints, parameters, and responses.

### Code Documentation

Inline comments and docstrings explaining code functionality.

### User Documentation

End-user guides, tutorials, and help articles.

### Architecture Documentation

System design, component relationships, and technical decisions.

### Process Documentation

Development workflows, deployment procedures, and best practices.

## Automated Documentation

### Doc Generation Pipeline

```yaml
name: Documentation

on:
  push:
    branches: [main]

jobs:
  generate-docs:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2

      - name: Generate API Docs
        run: npm run docs:api

      - name: Generate Type Docs
        run: npm run docs:types

      - name: Build Documentation Site
        run: npm run docs:build

      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./docs/dist
```

### Post-Save Hook

```yaml
# .claude/hooks/post-save-docs.yaml
name: post-save-docs
description: Update documentation when code changes

triggers:
  - file-save

files:
  - 'src/**/*.ts'
  - 'src/**/*.tsx'

actions:
  - name: Update API Docs
    run: npm run docs:api:update

  - name: Update README
    run: npm run docs:readme:sync
```

## Documentation Tools

### Static Site Generators

- **VitePress**: Modern documentation sites
- **Docusaurus**: React-based documentation
- **MkDocs**: Python documentation generator
- **Sphinx**: Comprehensive documentation tool

### API Documentation

- **Swagger UI**: Interactive API documentation
- **ReDoc**: OpenAPI documentation viewer
- **GraphQL Playground**: GraphQL API explorer
- **Postman**: API documentation and testing

### Code Documentation

- **JSDoc**: JavaScript documentation
- **TypeDoc**: TypeScript documentation
- **Storybook**: Component documentation
- **Styleguidist**: React component docs

## Version Documentation

### Changelog Format

```markdown
# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/), and this
project adheres to [Semantic Versioning](https://semver.org/).

## [Unreleased]

### Added

- New feature X
- New API endpoint Y

### Changed

- Updated dependency Z

### Fixed

- Bug in component A

## [1.2.0] - 2024-01-15

### Added

- Feature B with improved performance
- Support for new configuration option

### Deprecated

- Old API endpoint (will be removed in 2.0.0)
```

### Migration Guides

````markdown
# Migration Guide: v1.x to v2.0

## Breaking Changes

### API Changes

- `oldMethod()` renamed to `newMethod()`
- `config.oldOption` replaced with `config.newOption`

### Before

```javascript
api.oldMethod({ oldOption: true });
```
````

### After

```javascript
api.newMethod({ newOption: true });
```

## Step-by-Step Migration

1. Update dependencies
2. Replace deprecated methods
3. Update configuration
4. Run tests
5. Deploy

```

## Troubleshooting

### Outdated Documentation
- Set up automated doc generation
- Include docs in code review process
- Use version control for documentation

### Missing Documentation
- Use linting tools to enforce doc comments
- Generate documentation templates
- Include docs in definition of done

### Inconsistent Documentation
- Use documentation templates
- Establish style guide
- Automate formatting

## Contributing

To add a new documentation agent:

1. Define documentation scope
2. Choose output format
3. Include examples and templates
4. Add automation workflows
5. Provide customization options
6. Test with real codebases

## Resources

- [Agent Template](../templates/agent-template.md)
- [Documentation Standards](../../.claude/rules/documentation.md)
- [API Documentation Guide](../../docs/api-docs.md)

---

*Documentation agents ensure your code is accessible, understandable, and maintainable through comprehensive automated documentation.*
```
