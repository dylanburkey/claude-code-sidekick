# Code Generation Agents

> Agents that generate production-ready code following best practices and
> project conventions.

## Overview

Code generation agents automate the creation of boilerplate code, components,
configurations, and entire features. These agents understand your project
structure, follow your coding conventions, and generate code that integrates
seamlessly with your existing codebase.

## Available Agents

### Component Generators

- **UI Component Generator**: Create React, Vue, or Web Components with proper
  structure
- **API Endpoint Generator**: Generate RESTful or GraphQL endpoints with
  validation
- **Database Model Generator**: Create ORM models with relationships and
  migrations

### Configuration Generators

- **Config File Generator**: Generate ESLint, Prettier, TypeScript configs
- **Environment Setup**: Create .env templates with documentation
- **CI/CD Pipeline Generator**: Generate GitHub Actions, GitLab CI configs

### Feature Scaffolding

- **CRUD Generator**: Complete create-read-update-delete operations
- **Authentication Module**: Generate auth flows with JWT/OAuth
- **Form Generator**: Create forms with validation and accessibility

## Usage Patterns

### Basic Code Generation

```markdown
Generate a REST API endpoint for managing blog posts with full CRUD operations
```

### With Specifications

```markdown
Generate a React component for a product card with:

- Image display with lazy loading
- Title and description
- Price with currency formatting
- Add to cart button
- Accessibility features (ARIA labels, keyboard nav)
```

### Batch Generation

```markdown
Generate the following for a "tasks" resource:

1. Database model with relationships
2. REST API endpoints
3. Frontend components
4. Unit tests
5. API documentation
```

## Best Practices

### Before Generating Code

1. **Understand the Context**: Review existing code patterns
2. **Define Requirements**: Clear specs lead to better code
3. **Check Dependencies**: Ensure required libraries are available
4. **Plan Integration**: Consider how generated code fits existing architecture

### After Generation

1. **Review Generated Code**: Always review before committing
2. **Run Tests**: Ensure generated code passes tests
3. **Check Standards**: Verify code follows project conventions
4. **Update Documentation**: Document what was generated and why

## Agent Configuration

Most code generation agents support configuration options:

```yaml
agent: code-generation/api-generator
config:
  framework: express
  validation: zod
  auth: jwt
  database: postgresql
  testing: jest
  documentation: openapi
```

## Examples

### Example 1: API Endpoint

**Prompt:**

```
Generate a REST API endpoint for user profile management with:
- GET /api/users/:id (fetch profile)
- PUT /api/users/:id (update profile)
- DELETE /api/users/:id (soft delete)
- Validation using Zod
- JWT authentication required
- PostgreSQL database
```

**Output:**

- Route definitions
- Controller logic
- Validation schemas
- Database queries
- Error handling
- Tests

### Example 2: React Component

**Prompt:**

```
Generate a ProductCard component with:
- Product image with loading state
- Title, description, price
- Add to cart button
- Favorite toggle
- Responsive design
- Full accessibility
```

**Output:**

- Component file with TypeScript
- CSS module
- Props interface
- Event handlers
- Unit tests
- Storybook story

### Example 3: Database Schema

**Prompt:**

```
Generate a database schema for an e-commerce system:
- Users (auth, profile)
- Products (catalog, inventory)
- Orders (transactions, status)
- Reviews (ratings, comments)
```

**Output:**

- Migration files
- Model definitions
- Relationships
- Indexes
- Seed data
- Documentation

## Integration with MCP

Code generation agents can leverage MCP for:

- **Database Schema Analysis**: Query Neon databases to understand existing
  schema
- **Code Context**: Access existing files to match patterns
- **API Discovery**: Analyze existing endpoints before generating new ones
- **Dependency Management**: Check installed packages and versions

### MCP Example

```javascript
// Agent uses MCP to analyze existing schema before generating
const existingTables = await mcp.neon.getDatabaseTables({
  projectId: 'project-id',
  databaseName: 'main',
});

// Generate new tables that integrate with existing schema
generateSchema({
  existing: existingTables,
  new: userSpecifications,
});
```

## Testing Generated Code

All generated code should be tested:

```bash
# Run generated tests
npm test

# Check code quality
npm run lint

# Verify accessibility (for UI components)
npm run test:a11y

# Check bundle size impact
npm run build:analyze
```

## Customizing Agents

### Override Templates

```javascript
// Customize the template used by an agent
const customAgent = extendAgent('api-generator', {
  templates: {
    controller: './custom-templates/controller.hbs',
    routes: './custom-templates/routes.hbs',
  },
});
```

### Add Post-Generation Hooks

```javascript
// Run custom logic after code generation
const agentWithHooks = extendAgent('component-generator', {
  afterGenerate: async (files) => {
    // Format generated files
    await formatFiles(files);

    // Add to git
    await gitAdd(files);

    // Update index files
    await updateExports(files);
  },
});
```

## Common Patterns

### Pattern 1: Feature Module

Generate a complete feature with all necessary files:

- Models
- Controllers
- Routes
- Views/Components
- Tests
- Documentation

### Pattern 2: Microservice Scaffold

Generate a complete microservice:

- API gateway configuration
- Service implementation
- Database setup
- Docker configuration
- CI/CD pipeline

### Pattern 3: Component Library

Generate a set of reusable components:

- Component files
- Shared styles
- Type definitions
- Storybook stories
- Documentation site

## Troubleshooting

### Generated Code Doesn't Match Style

- Update agent configuration to match your conventions
- Provide examples of existing code for reference
- Use post-generation formatting tools

### Missing Dependencies

- Ensure required packages are in package.json
- Specify exact versions in agent config
- Use peer dependencies appropriately

### Integration Issues

- Review existing code structure before generating
- Test generated code in isolation first
- Check for naming conflicts

## Contributing

To add a new code generation agent:

1. Create agent definition using the template
2. Include clear usage examples
3. Provide configuration options
4. Document output format
5. Add integration tests
6. Update this README

## Resources

- [Agent Template](../templates/agent-template.md)
- [Code Style Guide](../../.claude/rules/code-style.md)
- [Testing Guidelines](../../.claude/rules/accessibility.md)

---

_Code generation agents are designed to accelerate development while maintaining
quality and consistency._
