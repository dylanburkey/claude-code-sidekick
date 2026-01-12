# Agent Library

> A comprehensive collection of specialized agents for Claude Code that automate
> development workflows, generate code, ensure quality, and enhance
> productivity.

## Overview

The Agent Library is a curated collection of specialized agents designed to work
with Claude Code. Each agent focuses on specific aspects of software
development, from code generation to testing to documentation. These agents can
be used individually or composed together to create powerful development
workflows.

## Categories

### 🔧 [Code Generation](./code-generation/)

Agents that generate specific types of code, components, and boilerplate.

- API endpoint generators
- Component scaffolding
- Database schema generators
- Configuration file creators

### ⚙️ [Task Automation](./task-automation/)

Agents that automate repetitive development tasks and workflows.

- Build process automation
- Deployment pipelines
- File organization
- Dependency management

### ✅ [Testing](./testing/)

Agents focused on quality assurance, testing, and validation.

- Unit test generators
- Integration test builders
- Accessibility auditors
- Performance testers

### 📚 [Documentation](./documentation/)

Agents that create and maintain project documentation.

- API documentation generators
- README builders
- Code comment generators
- Changelog maintainers

### ⛓️ [Blockchain](./blockchain/)

Specialized agents for blockchain development workflows.

- Smart contract generators
- Web3 integration helpers
- Blockchain testing utilities
- DApp scaffolding

## Quick Start

### Using an Agent

1. **Navigate to the category** that matches your needs
2. **Read the agent's documentation** to understand its capabilities
3. **Copy the agent definition** to your project's `.claude/agents/` directory
4. **Invoke the agent** using Claude Code's Task tool or command system

### Example Usage

```bash
# Using an agent through Claude Code
/task "Generate a REST API endpoint for user authentication" --agent=api-generator
```

Or programmatically:

```javascript
// In your Claude Code workflow
const agent = loadAgent('code-generation/api-generator');
await agent.execute({
  resource: 'users',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  auth: true,
});
```

## Agent Structure

All agents in this library follow a consistent structure:

```markdown
# Agent Name

## Purpose

Brief description of what this agent does

## Capabilities

- Capability 1
- Capability 2

## Usage

How to use this agent

## Configuration

Any configuration options

## Examples

Real-world usage examples

## Dependencies

Required tools, libraries, or other agents
```

## Creating Your Own Agent

Use the [agent template](./templates/agent-template.md) to create new agents:

1. Copy `templates/agent-template.md` to the appropriate category
2. Fill in all sections following the template structure
3. Test the agent with real-world scenarios
4. Document any dependencies or requirements
5. Submit a PR or add to your local collection

## MCP Integration

The Agent Library is designed to work seamlessly with the Model Context Protocol
(MCP).

### MCP Capabilities

- **Context Sharing**: Agents can share context across tools and workflows
- **Resource Access**: Direct access to MCP resources like databases (Neon),
  files, and APIs
- **Tool Integration**: Agents can invoke MCP tools for enhanced functionality
- **State Management**: Persistent state across agent invocations

### Using Agents with MCP

Agents in this library can leverage MCP servers for:

- Database operations (via Neon MCP)
- File system access
- External API integrations
- Custom tool integrations

See the [MCP Integration Guide](./docs/mcp-integration.md) for detailed
information.

## Best Practices

### Agent Design

1. **Single Responsibility**: Each agent should do one thing well
2. **Composability**: Agents should work together seamlessly
3. **Error Handling**: Always handle errors gracefully
4. **Documentation**: Clear docs make agents reusable

### Agent Organization

- Place agents in the most appropriate category
- Use descriptive names that explain the agent's purpose
- Include comprehensive examples
- Document all dependencies

### Testing Agents

Before adding an agent to the library:

- [ ] Test with multiple scenarios
- [ ] Verify error handling
- [ ] Check documentation completeness
- [ ] Validate dependencies
- [ ] Test MCP integration (if applicable)

## Contributing

### Adding a New Agent

1. Choose the appropriate category directory
2. Create a new markdown file with a descriptive name
3. Use the agent template as your starting point
4. Include real-world examples
5. Test thoroughly
6. Submit for review

### Improving Existing Agents

- Open issues for bugs or enhancement requests
- Submit PRs with improvements
- Update documentation
- Add more examples

## Agent Categories in Detail

### Code Generation Agents

Generate production-ready code following best practices and project conventions.
These agents understand your codebase structure and generate code that fits
naturally.

### Task Automation Agents

Automate repetitive workflows like building, testing, deploying, and maintaining
code. These agents handle the boring stuff so you can focus on creative work.

### Testing Agents

Ensure code quality through automated testing. Generate test suites, run
accessibility audits, validate performance, and catch bugs before they reach
production.

### Documentation Agents

Keep documentation up-to-date automatically. Generate API docs, maintain
READMEs, create inline documentation, and ensure your code is always
well-documented.

### Blockchain Agents

Specialized tools for Web3 development. Generate smart contracts, integrate with
blockchain APIs, create DApp scaffolding, and test blockchain interactions.

## Advanced Usage

### Chaining Agents

Create powerful workflows by chaining multiple agents:

```javascript
// Example: Generate API + Tests + Docs
await chain([
  agents.codeGeneration.apiGenerator,
  agents.testing.unitTestGenerator,
  agents.documentation.apiDocGenerator,
]);
```

### Custom Agent Workflows

Build custom workflows that combine agents with your specific logic:

```javascript
const customWorkflow = {
  name: 'full-feature-pipeline',
  steps: [
    { agent: 'code-generation/component-generator', config: {...} },
    { agent: 'testing/unit-test-generator', config: {...} },
    { agent: 'documentation/component-doc-generator', config: {...} },
    { custom: async () => { /* custom logic */ } }
  ]
};
```

## Troubleshooting

### Agent Not Found

Ensure the agent file exists in the correct category directory and follows the
naming convention.

### Dependency Issues

Check the agent's documentation for required dependencies and ensure they're
installed.

### MCP Connection Issues

Verify your MCP server configuration and ensure the required MCP tools are
available.

## Resources

- [Agent Template](./templates/agent-template.md)
- [MCP Integration Guide](./docs/mcp-integration.md)
- [Contributing Guidelines](../CONTRIBUTING.md)
- [Claude Code Documentation](../.claude/README.md)

## Support

- **Issues**: Open an issue in the GitHub repository
- **Discussions**: Join the discussions for questions and ideas
- **Examples**: Check each category's README for specific examples

---

_This agent library is part of the Claude Code Sidekick toolkit and follows the
structured development approach outlined in CLAUDE.md_
