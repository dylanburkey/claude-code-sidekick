# Project Planner Command

## Purpose
Analyzes `PROJECT_STARTER.md` and creates a structured project plan in `project-plan/phase_1.md`.

## Trigger
Run this command when starting a new project or when `PROJECT_STARTER.md` has been updated.

## Instructions

### Step 1: Read and Parse PROJECT_STARTER.md

Read the `PROJECT_STARTER.md` file from the project root. Extract:

1. **Project Overview** - What is being built
2. **Goals** - What success looks like
3. **Requirements** - Functional and non-functional requirements
4. **Constraints** - Technical, time, or resource constraints
5. **Questions** - Any questions the user has included
6. **References** - Links, examples, or inspiration

### Step 2: Analyze the Project

For each section extracted, analyze:

1. **Complexity Assessment**
   - Estimate overall project complexity (Low/Medium/High/Critical)
   - Identify the most complex components
   - Flag any potential blockers

2. **Dependency Mapping**
   - Identify external dependencies (libraries, APIs, services)
   - Map internal dependencies between components
   - Determine critical path

3. **Risk Assessment**
   - Technical risks
   - Scope risks
   - Timeline risks

4. **Answer Questions**
   - Address any questions in PROJECT_STARTER.md
   - Provide recommendations where appropriate
   - Flag questions that need user input

### Step 3: Create Phase Breakdown

Divide the project into logical phases:

**Phase 1: Foundation**
- Project structure
- Core configurations
- Base components

**Phase 2: Core Features**
- Primary functionality
- Essential integrations

**Phase 3: Enhancement**
- Secondary features
- Polish and optimization

**Phase 4: Finalization**
- Testing
- Documentation
- Deployment preparation

### Step 4: Generate phase_1.md

Create `.claude/project-plan/phase_1.md` with the following structure:

```markdown
# Phase 1: {{PHASE_NAME}}

Generated: {{TIMESTAMP}}
Source: PROJECT_STARTER.md

## Project Summary

### Overview
{{Brief description of the project}}

### Goals
{{List of primary goals}}

### Success Criteria
{{Measurable criteria for project success}}

## Analysis

### Complexity Assessment
- **Overall Complexity:** {{Low/Medium/High/Critical}}
- **Key Challenges:** {{List challenges}}

### Dependencies
- **External:** {{List external dependencies}}
- **Internal:** {{Describe internal component dependencies}}

### Risks
{{List identified risks and mitigation strategies}}

## Phase 1 Scope

### Objectives
{{What this phase will accomplish}}

### Deliverables
{{Specific outputs from this phase}}

### Out of Scope
{{What is NOT included in this phase}}

## Technical Approach

### Architecture
{{High-level architecture decisions}}

### Technology Stack
{{Technologies, frameworks, tools}}

### Patterns
{{Design patterns and conventions to follow}}

## Criteria for Completion

- [ ] {{Criterion 1}}
- [ ] {{Criterion 2}}
- [ ] {{Criterion 3}}

## Questions Answered

{{Address questions from PROJECT_STARTER.md}}

## Open Questions

{{Questions requiring user input}}

## Next Steps

After this phase is complete, proceed to:
1. Run `task-planner` to generate tasks
2. Review generated tasks
3. Run `task-runner` to execute tasks
```

### Step 5: Update CLAUDE.md

If the project plan reveals important context, update CLAUDE.md with:
- Project architecture overview
- Key patterns and conventions
- Important file locations

## Output

The command produces:
1. `.claude/project-plan/phase_1.md` - Detailed phase plan
2. Updates to `CLAUDE.md` if needed
3. Console summary of the analysis

## Example Usage

```bash
# In Claude Code, run:
/project-planner
```

## Notes

- Always read PROJECT_STARTER.md first
- Be thorough in answering embedded questions
- Flag anything that seems unclear for user review
- Consider accessibility, performance, and maintainability in planning
