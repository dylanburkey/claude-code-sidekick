# Documentation Generator Hook

## Trigger
This hook activates when any file is saved in the project.

## Purpose
Automatically generate and maintain project documentation by:
1. Creating the docs directory structure if it doesn't exist
2. Generating documentation based on file type and content
3. Organizing documentation in a clean, navigable structure
4. Keeping documentation in sync with code changes

---

## Directory Structure

When triggered, ensure this structure exists:

```
docs/
├── index.md                 # Documentation home/overview
├── api/                     # API and code documentation
│   ├── index.md             # API overview
│   ├── components/          # Component documentation
│   ├── utilities/           # Utility function docs
│   └── types/               # Type definitions
├── guides/                  # How-to guides
│   ├── index.md             # Guides overview
│   ├── getting-started.md   # Quick start guide
│   └── configuration.md     # Configuration guide
├── architecture/            # Architecture documentation
│   ├── index.md             # Architecture overview
│   ├── decisions/           # Architecture Decision Records (ADRs)
│   └── diagrams/            # System diagrams
├── changelog/               # Version history
│   └── index.md             # Changelog
└── assets/                  # Documentation assets
    └── images/              # Screenshots, diagrams
```

---

## Initialization Process

### Step 1: Check for docs directory

```yaml
check:
  path: "docs/"
  if_missing: create_structure
  if_exists: verify_structure
```

### Step 2: Create Directory Structure

```bash
# Create main docs directory
mkdir -p docs

# Create subdirectories
mkdir -p docs/api/components
mkdir -p docs/api/utilities
mkdir -p docs/api/types
mkdir -p docs/guides
mkdir -p docs/architecture/decisions
mkdir -p docs/architecture/diagrams
mkdir -p docs/changelog
mkdir -p docs/assets/images
```

### Step 3: Create Index Files

If missing, create these index files:

#### docs/index.md
```markdown
# Project Documentation

Welcome to the project documentation.

## Quick Links

- [Getting Started](guides/getting-started.md)
- [API Reference](api/index.md)
- [Architecture](architecture/index.md)
- [Changelog](changelog/index.md)

## Overview

{{PROJECT_DESCRIPTION}}

## Documentation Structure

| Section | Description |
|---------|-------------|
| [API](api/) | Code documentation, components, utilities |
| [Guides](guides/) | How-to guides and tutorials |
| [Architecture](architecture/) | System design and decisions |
| [Changelog](changelog/) | Version history and changes |
```

#### docs/api/index.md
```markdown
# API Reference

Code documentation for all exported modules.

## Sections

- [Components](components/) - UI components
- [Utilities](utilities/) - Helper functions
- [Types](types/) - Type definitions

## Quick Reference

{{AUTO_GENERATED_EXPORT_LIST}}
```

#### docs/guides/index.md
```markdown
# Guides

Step-by-step guides for common tasks.

## Available Guides

- [Getting Started](getting-started.md) - Initial setup and first steps
- [Configuration](configuration.md) - Configure the project

## Contributing a Guide

1. Create a new `.md` file in this directory
2. Follow the guide template format
3. Add link to this index
```

#### docs/architecture/index.md
```markdown
# Architecture

System architecture and design documentation.

## Overview

{{ARCHITECTURE_OVERVIEW}}

## Sections

- [Decisions](decisions/) - Architecture Decision Records
- [Diagrams](diagrams/) - System diagrams

## Key Patterns

{{KEY_PATTERNS}}
```

---

## File Type Handlers

### JavaScript/TypeScript Files (*.js, *.ts, *.jsx, *.tsx)

**Output location:** `docs/api/`

**Extract and document:**
- Exported functions with JSDoc
- Exported classes and methods
- Exported constants
- Type definitions

**Template:**
```markdown
# {{MODULE_NAME}}

> {{BRIEF_DESCRIPTION}}

## Exports

### Functions

#### `{{functionName}}({{params}})`

{{description}}

**Parameters:**
| Name | Type | Description |
|------|------|-------------|
| {{name}} | `{{type}}` | {{description}} |

**Returns:** `{{returnType}}` - {{returnDescription}}

**Example:**
\`\`\`javascript
{{example}}
\`\`\`
```

### CSS Files (*.css)

**Output location:** `docs/api/styles/`

**Extract and document:**
- Custom properties (CSS variables)
- Key class names
- Media query breakpoints
- Animation definitions

### Component Files

**Output location:** `docs/api/components/{{component-name}}.md`

**Document:**
- Component purpose
- Props/attributes
- Events emitted
- Slots/children
- Usage examples

### Configuration Files (*.yml, *.yaml, *.json)

**Output location:** `docs/guides/configuration.md`

**Document:**
- Available options
- Default values
- Example configurations

---

## Documentation Generation Process

### On File Save

```yaml
process:
  trigger: file_save
  
  steps:
    - name: "Ensure docs structure"
      action: create_directories_if_missing
      
    - name: "Analyze file"
      action: parse_file_content
      extract:
        - exports
        - jsdoc_comments
        - type_definitions
        - dependencies
        
    - name: "Determine doc location"
      action: map_file_to_docs
      rules:
        "src/components/**": "docs/api/components/"
        "src/utils/**": "docs/api/utilities/"
        "src/types/**": "docs/api/types/"
        "*.config.*": "docs/guides/configuration.md"
        
    - name: "Generate documentation"
      action: render_documentation
      template: "{{file_type_template}}"
      
    - name: "Update indexes"
      action: update_index_files
      
    - name: "Update README link"
      action: ensure_docs_link_in_readme
```

### Index Update Logic

When new documentation is generated:

1. Parse the docs directory structure
2. Update relevant index.md files with links
3. Regenerate navigation if needed

```yaml
update_index:
  - file: "docs/index.md"
    section: "## Quick Links"
    regenerate: true
    
  - file: "docs/api/index.md"
    section: "## Quick Reference"
    regenerate: true
```

---

## README.md Integration

### Ensure Documentation Link

After documentation is generated, verify README.md contains a docs link:

**Check for existing link:**
```markdown
## Documentation

See the [full documentation](docs/index.md) for detailed guides and API reference.
```

**If missing, add after the first section:**
```yaml
readme_update:
  action: insert_section
  after: "## Quick Start"  # or first heading
  content: |
    ## Documentation
    
    See the [full documentation](docs/index.md) for detailed guides and API reference.
    
    - [Getting Started](docs/guides/getting-started.md)
    - [API Reference](docs/api/index.md)
    - [Architecture](docs/architecture/index.md)
```

---

## Configuration

### In .claude/config.yml

```yaml
hooks:
  doc_generator:
    enabled: true
    
    # Debounce rapid saves
    debounce_ms: 3000
    
    # Directories to ignore
    exclude:
      - "node_modules/**"
      - "dist/**"
      - "*.test.*"
      - "*.spec.*"
      - ".git/**"
      
    # Documentation output
    output:
      directory: "docs"
      format: "markdown"
      
    # Auto-update README
    readme_integration:
      enabled: true
      link_position: "after_quickstart"
      
    # Generation options
    options:
      include_private: false
      include_examples: true
      include_source_links: true
```

---

## Execution Flow Diagram

```
┌─────────────────┐
│   File Saved    │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Check Exclusions│
└────────┬────────┘
         │ (not excluded)
         ▼
┌─────────────────┐
│  Ensure docs/   │
│  Structure      │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Parse File     │
│  Extract Info   │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Map to Doc Path │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Generate Doc   │
│  from Template  │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Update Indexes  │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Update README   │
│ (if needed)     │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│     Done        │
└─────────────────┘
```

---

## Output Examples

### Log Entry
```
[HOOK] doc-generator triggered
  File: src/components/Button.js
  Action: Generated docs/api/components/button.md
  Indexes: Updated docs/api/index.md, docs/api/components/index.md
  README: Verified docs link present
```

### Generated Documentation Example

**File:** `docs/api/components/button.md`

```markdown
# Button

> A reusable button component with multiple variants.

## Import

\`\`\`javascript
import { Button } from '@/components/Button';
\`\`\`

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'primary' \| 'secondary'` | `'primary'` | Button style variant |
| `disabled` | `boolean` | `false` | Disable button interactions |
| `onClick` | `function` | - | Click handler |

## Examples

### Primary Button
\`\`\`html
<Button variant="primary">Click Me</Button>
\`\`\`

### Disabled Button
\`\`\`html
<Button disabled>Can't Click</Button>
\`\`\`

---

*Generated from `src/components/Button.js`*
```
