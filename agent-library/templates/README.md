# Agent Templates

> Standard templates for creating new agents in the Agent Library

## Overview

This directory contains templates and guidelines for creating new agents. Using these templates ensures consistency across the agent library and makes agents easier to understand, use, and maintain.

## Available Templates

### [agent-template.md](./agent-template.md)

The main template for creating new agents. This template includes all sections that should be present in an agent definition:

- Purpose and capabilities
- Usage examples
- Configuration options
- MCP integration
- Dependencies
- Best practices
- Error handling
- Testing guidelines
- Troubleshooting

## Creating a New Agent

### Step 1: Choose the Right Category

Determine which category your agent belongs to:

- **code-generation**: Generates code, components, or boilerplate
- **task-automation**: Automates development workflows
- **testing**: Quality assurance and testing
- **documentation**: Creates or maintains documentation
- **blockchain**: Web3 and smart contract development

### Step 2: Copy the Template

```bash
# Copy template to appropriate category
cp agent-library/templates/agent-template.md agent-library/[category]/your-agent-name.md
```

### Step 3: Fill Out the Template

Work through each section of the template:

1. **Header**: Clear name and one-line description
2. **Purpose**: Detailed explanation of what and why
3. **Capabilities**: Specific features and functionality
4. **Usage**: Real-world usage examples
5. **Configuration**: Options and settings
6. **Examples**: Multiple concrete examples
7. **MCP Integration**: How it uses MCP (if applicable)
8. **Dependencies**: Required tools and libraries
9. **Best Practices**: Do's and don'ts
10. **Error Handling**: Common errors and solutions
11. **Testing**: How to test the agent
12. **Troubleshooting**: Common issues and fixes

### Step 4: Add Real Examples

Include at least 3 real-world examples showing:
- Basic usage
- Advanced usage with configuration
- Complex scenario with multiple features

### Step 5: Test Your Agent

Before adding to the library:
- [ ] Test with multiple scenarios
- [ ] Verify all examples work
- [ ] Check documentation completeness
- [ ] Validate dependencies
- [ ] Test MCP integration (if applicable)
- [ ] Review for security considerations

### Step 6: Update Category README

Add your agent to the appropriate category's README:

```markdown
### [Your Agent Name](./your-agent-name.md)
Brief description of what this agent does
```

## Agent Naming Conventions

### File Names
- Use kebab-case: `api-endpoint-generator.md`
- Be descriptive: `react-component-generator.md` not `component.md`
- Include the type if relevant: `unit-test-generator.md`

### Agent Names in Documentation
- Use Title Case: "API Endpoint Generator"
- Be specific: "React Component Generator" not "Component Generator"
- Avoid redundant words: "Test Generator" not "Test Generation Generator"

## Documentation Standards

### Writing Style

**Be Clear and Concise:**
```markdown
✓ "Generates REST API endpoints with validation and error handling"
✗ "This agent can be used to create endpoints for APIs"
```

**Use Active Voice:**
```markdown
✓ "The agent generates unit tests for all exported functions"
✗ "Unit tests are generated for all exported functions by the agent"
```

**Provide Context:**
```markdown
✓ "Use this agent when you need to scaffold a complete CRUD feature with database models, API endpoints, and frontend components"
✗ "Use this agent for CRUD stuff"
```

### Code Examples

**Always Include:**
- Language identifier for syntax highlighting
- Complete, runnable examples
- Comments explaining non-obvious parts
- Expected output or behavior

```javascript
// ✓ Good example - complete and clear
async function fetchUser(id) {
  const response = await fetch(`/api/users/${id}`);
  if (!response.ok) throw new Error('User not found');
  return response.json();
}
```

### Configuration Documentation

Always document configuration in a table:

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| framework | string | 'react' | Frontend framework to use |
| typescript | boolean | true | Enable TypeScript |
| tests | boolean | true | Generate tests |

## Quality Checklist

Before submitting an agent to the library:

### Completeness
- [ ] All template sections filled out
- [ ] At least 3 real examples included
- [ ] All configuration options documented
- [ ] Dependencies clearly listed
- [ ] MCP integration explained (if used)

### Accuracy
- [ ] Examples tested and working
- [ ] Code snippets are syntactically correct
- [ ] Configuration options match implementation
- [ ] Links are valid and working

### Clarity
- [ ] Purpose is clear and specific
- [ ] Usage examples are realistic
- [ ] Instructions are easy to follow
- [ ] Technical terms are explained

### Consistency
- [ ] Follows template structure
- [ ] Uses consistent terminology
- [ ] Matches style of other agents
- [ ] Formatting is consistent

## Agent Categories Guide

### Code Generation Agents

**Focus on:** Creating production-ready code

**Should include:**
- Output examples (show generated code)
- Customization options
- Code style/standards followed
- Integration with existing code

**Example agents:**
- API endpoint generator
- Component scaffolder
- Database model generator

### Task Automation Agents

**Focus on:** Automating workflows

**Should include:**
- Trigger conditions
- Step-by-step workflow
- Error handling and rollback
- Monitoring and logging

**Example agents:**
- Build pipeline
- Deployment automator
- Dependency updater

### Testing Agents

**Focus on:** Quality assurance

**Should include:**
- Test coverage approach
- Testing frameworks used
- Assertion patterns
- CI/CD integration

**Example agents:**
- Unit test generator
- Accessibility auditor
- Performance tester

### Documentation Agents

**Focus on:** Creating/maintaining docs

**Should include:**
- Documentation format/style
- Update triggers
- Version control
- Output locations

**Example agents:**
- API documentation generator
- README builder
- Changelog maintainer

### Blockchain Agents

**Focus on:** Web3 development

**Should include:**
- Security considerations
- Gas optimization
- Network support
- Testing with testnets

**Example agents:**
- Smart contract generator
- DApp scaffolder
- Subgraph generator

## Common Patterns

### Agent Structure Pattern

```markdown
# Agent Name

> One-line description

## Purpose
Why this agent exists

## Capabilities
What it can do

## Usage
How to use it

## Examples
Real-world examples

## Configuration
Options and settings

[... other sections ...]
```

### Example Structure Pattern

```markdown
### Example N: [Use Case]

**Scenario:** What user wants to accomplish

**Prompt:**
```
[Exact user prompt]
```

**Result:**
```[language]
[Generated output]
```

**Explanation:** Why/how it works
```

### Configuration Pattern

```yaml
agent: category/agent-name
config:
  # Group related options
  generation:
    option1: value1
    option2: value2

  # Use clear names
  testing:
    framework: jest
    coverage: true

  # Document defaults
  output:
    path: ./generated
    format: typescript
```

## Troubleshooting Template Creation

### Issue: Too Much Content

**Solution:** Break into multiple focused agents rather than one large agent

### Issue: Not Enough Examples

**Solution:** Create examples for:
- Simple case
- Complex case
- Error case
- Edge case

### Issue: Unclear Purpose

**Solution:** Answer these questions:
- What problem does this solve?
- When would someone use this?
- What makes this better than manual work?

### Issue: Missing Configuration

**Solution:** Document:
- All available options
- Default values
- Required vs optional
- Valid values/ranges

## Version Control

Track agent changes with version numbers:

```yaml
version: 1.2.0  # major.minor.patch

# Increment:
# - major: Breaking changes
# - minor: New features
# - patch: Bug fixes
```

## Getting Help

If you need help creating an agent:

1. Review existing agents in the same category
2. Check this template and guidelines
3. Open a discussion in the repository
4. Ask in the community channels

## Contributing

Contributions to templates are welcome! To suggest improvements:

1. Open an issue describing the improvement
2. Provide examples of why it's needed
3. Submit a PR with updated templates
4. Update this README if necessary

## Resources

- [Agent Library Main README](../README.md)
- [Category READMEs](../)
- [Code Style Guide](../../.claude/rules/code-style.md)
- [Documentation Standards](../../.claude/rules/documentation.md)

---

*These templates ensure consistency and quality across the Agent Library*
