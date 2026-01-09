# Agent Name

> Brief one-line description of what this agent does

## Purpose

Detailed explanation of the agent's purpose and the problem it solves. Include:
- What specific task or workflow this agent handles
- Why this agent is useful
- When to use this agent

## Capabilities

List the specific capabilities and features of this agent:

- Capability 1: Description
- Capability 2: Description
- Capability 3: Description
- Capability 4: Description

## Usage

### Basic Usage

```markdown
[Prompt example for basic usage]
```

### Advanced Usage

```markdown
[Prompt example with more options and configurations]
```

### With Specifications

```markdown
[Prompt example with detailed specifications]
```

## Configuration

Document any configuration options the agent supports:

```yaml
agent: category/agent-name
config:
  option1: value1
  option2: value2
  features:
    - feature1
    - feature2
  settings:
    setting1: value
    setting2: value
```

### Configuration Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| option1 | string | 'default' | What this option does |
| option2 | number | 100 | What this option controls |
| option3 | boolean | true | Enable/disable feature |

## Examples

### Example 1: [Use Case Name]

**Scenario:** Brief description of the scenario

**Prompt:**
```markdown
[Exact prompt user would provide]
```

**Expected Output:**
```
[Description of what the agent will generate/do]
```

**Result:**
```[language]
[Example of actual generated code/output]
```

### Example 2: [Use Case Name]

**Scenario:** Brief description of the scenario

**Prompt:**
```markdown
[Exact prompt user would provide]
```

**Expected Output:**
```
[Description of what the agent will generate/do]
```

**Result:**
```[language]
[Example of actual generated code/output]
```

### Example 3: [Use Case Name]

**Scenario:** Brief description of the scenario

**Prompt:**
```markdown
[Exact prompt user would provide]
```

**Expected Output:**
```
[Description of what the agent will generate/do]
```

**Result:**
```[language]
[Example of actual generated code/output]
```

## Integration with MCP

Document how this agent leverages the Model Context Protocol:

### MCP Capabilities Used

- **Resource Access**: What MCP resources does this agent access?
- **Tool Integration**: What MCP tools does this agent use?
- **Context Sharing**: What context does this agent share?
- **State Management**: How does this agent manage state?

### MCP Example

```javascript
// Example of how this agent uses MCP
async function agentFunction() {
  // MCP integration example
  const resource = await mcp.tool.method({
    param: 'value'
  });

  // Process and use MCP resources
  return processResource(resource);
}
```

## Dependencies

List any dependencies required for this agent to function:

### Required

- **Dependency 1**: Why it's needed
- **Dependency 2**: Why it's needed

### Optional

- **Dependency 3**: What additional functionality it provides
- **Dependency 4**: What additional functionality it provides

### Other Agents

If this agent works with or requires other agents:

- **Agent Name 1**: How they work together
- **Agent Name 2**: How they work together

## Best Practices

### Do's ✓

- Best practice 1
- Best practice 2
- Best practice 3

### Don'ts ✗

- Anti-pattern 1
- Anti-pattern 2
- Anti-pattern 3

## Error Handling

Document common errors and how the agent handles them:

### Error 1: [Error Type]

**Cause:** What causes this error

**Solution:** How to resolve it

**Agent Behavior:** How the agent handles this error

### Error 2: [Error Type]

**Cause:** What causes this error

**Solution:** How to resolve it

**Agent Behavior:** How the agent handles this error

## Performance Considerations

- Performance tip 1
- Performance tip 2
- Optimization suggestion 1
- Scalability note

## Testing

How to test this agent:

### Manual Testing

```bash
# Command to manually test the agent
npm run test:agent agent-name
```

### Automated Testing

```javascript
// Example test for this agent
describe('AgentName', () => {
  test('should perform expected action', async () => {
    const result = await agent.execute(input);
    expect(result).toMatchExpectedOutput();
  });
});
```

## Troubleshooting

### Issue 1: [Common Issue]

**Symptoms:** What the user will see

**Cause:** Why this happens

**Solution:** How to fix it

### Issue 2: [Common Issue]

**Symptoms:** What the user will see

**Cause:** Why this happens

**Solution:** How to fix it

## Customization

How to customize this agent for specific needs:

### Extending the Agent

```javascript
// Example of extending the agent
const customAgent = extendAgent('agent-name', {
  customOption: value,
  overrideMethod: customMethod
});
```

### Template Override

If this agent uses templates, explain how to override them:

```javascript
// Override default templates
const agentWithCustomTemplate = {
  ...baseAgent,
  templates: {
    main: './custom-templates/main.hbs',
    partial: './custom-templates/partial.hbs'
  }
};
```

## Related Agents

List related agents that users might find useful:

- **[Agent Name 1](../category/agent-name-1.md)**: How it relates
- **[Agent Name 2](../category/agent-name-2.md)**: How it relates
- **[Agent Name 3](../category/agent-name-3.md)**: How it relates

## Changelog

Track major changes to this agent:

### Version 1.0.0 - 2024-01-15

- Initial release
- Core functionality implemented
- Basic examples added

### Version 1.1.0 - 2024-02-01

- Added feature X
- Improved performance
- Fixed bug Y

## Contributing

Guidelines for contributing to this agent:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Update documentation
6. Submit pull request

## Resources

Links to additional resources:

- [Related Documentation](../../docs/related-guide.md)
- [API Reference](../../docs/api-reference.md)
- [Tutorial](../../docs/tutorials/agent-tutorial.md)
- [External Resource](https://example.com/resource)

## Metadata

```yaml
version: 1.0.0
author: Your Name
category: category-name
tags:
  - tag1
  - tag2
  - tag3
license: MIT
created: 2024-01-15
updated: 2024-01-15
```

---

*This agent is part of the Claude Code Sidekick Agent Library*
