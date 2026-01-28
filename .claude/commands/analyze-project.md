# Analyze Project Command

## Purpose

Analyzes an **existing** codebase and generates a `PROJECT_CONTEXT.md` that can
feed into the existing `/project-planner` workflow. This enables Claude Sidekick
to work on projects that weren't started from scratch.

## Trigger

Run this command when:

- Joining an existing project
- Starting work on a legacy codebase
- Wanting AI to understand existing patterns before making changes
- PROJECT_STARTER.md isn't appropriate (project already exists)

## Arguments

- `depth` (optional): Analysis depth - `quick`, `standard` (default), or `deep`
- `focus` (optional): Specific area to focus on - `structure`, `patterns`,
  `dependencies`, `all` (default)

## Instructions

### Step 1: Scan Project Structure

Map the entire project directory structure:

```yaml
scan:
  include:
    - '**/*.{js,ts,jsx,tsx,vue,svelte}'
    - '**/*.{css,scss,sass,less}'
    - '**/*.{html,liquid,njk,ejs}'
    - '**/*.{json,yml,yaml,toml}'
    - '**/*.{php,twig}'
    - '**/*.md'
    - 'package.json'
    - 'Cargo.toml'
    - 'requirements.txt'
    - 'composer.json'
    - 'Gemfile'
    - 'config/settings_schema.json'
    - 'layout/*.liquid'
    - 'templates/**/*.liquid'
    - 'sections/*.liquid'
    - 'snippets/*.liquid'
    - 'wp-config.php'
    - 'functions.php'
    - 'style.css'

  exclude:
    - 'node_modules/**'
    - 'vendor/**'
    - 'dist/**'
    - 'build/**'
    - '.git/**'
    - '*.lock'
    - 'wp-admin/**'
    - 'wp-includes/**'
```

Create a structure map:

```markdown
project-root/ ├── src/ # Source code │ ├── components/ # UI components (47
files) │ ├── utils/ # Utility functions (12 files) │ └── pages/ # Page templates
(8 files) ├── tests/ # Test files (23 files) ├── docs/ # Documentation (5 files)
└── config/ # Configuration (3 files)
```

### Step 2: Detect Technology Stack

Analyze project files to identify:

#### Package Managers & Languages

| Indicator                  | Technology |
| -------------------------- | ---------- |
| `package.json`             | Node.js    |
| `requirements.txt`         | Python     |
| `Cargo.toml`               | Rust       |
| `composer.json`            | PHP        |
| `Gemfile`                  | Ruby       |
| `go.mod`                   | Go         |
| `pom.xml` / `build.gradle` | Java       |

#### Frameworks

| Indicator                          | Framework         |
| ---------------------------------- | ----------------- |
| `astro.config.*`                   | Astro             |
| `next.config.*`                    | Next.js           |
| `nuxt.config.*`                    | Nuxt              |
| `svelte.config.*`                  | SvelteKit         |
| `angular.json`                     | Angular           |
| `vite.config.*` + React            | Vite + React      |
| `remix.config.*`                   | Remix             |
| Dependencies: `express`, `fastify` | Node backend      |
| Dependencies: `hono`               | Hono              |
| Dependencies: `django`, `flask`    | Python web        |
| `config/settings_schema.json`      | Shopify Theme     |
| `.theme-check.yml`                 | Shopify Theme     |
| `layout/theme.liquid`              | Shopify Theme     |
| Dependencies: `@shopify/cli`       | Shopify CLI       |
| Dependencies: `@shopify/theme`     | Shopify Theme Kit |
| `wp-config.php` or `wp-content/`   | WordPress         |
| `functions.php` in theme directory | WordPress Theme   |
| `style.css` with WordPress header  | WordPress Theme   |

#### Styling Approach

| Indicator                      | Approach     |
| ------------------------------ | ------------ |
| `tailwind.config.*`            | Tailwind CSS |
| `.scss` / `.sass` files        | Sass         |
| `styled-components` dependency | CSS-in-JS    |
| `.module.css` files            | CSS Modules  |
| Plain `.css` with variables    | Modern CSS   |

#### Testing

| Indicator                    | Framework  |
| ---------------------------- | ---------- |
| `vitest.config.*`            | Vitest     |
| `jest.config.*`              | Jest       |
| `playwright.config.*`        | Playwright |
| `cypress.config.*`           | Cypress    |
| `pytest.ini` / `conftest.py` | Pytest     |

### Step 3: Identify Patterns & Conventions

Analyze code to detect:

#### Naming Conventions

```yaml
patterns:
  files:
    - pattern: 'PascalCase.tsx'
      indicates: 'React components'
    - pattern: 'kebab-case.js'
      indicates: 'Utility modules'
    - pattern: '*.test.ts'
      indicates: 'Test files collocated'
    - pattern: '__tests__/'
      indicates: 'Test files in folders'

  code:
    - pattern: 'camelCase'
      used_for: 'variables, functions'
    - pattern: 'PascalCase'
      used_for: 'components, classes'
    - pattern: 'SCREAMING_SNAKE'
      used_for: 'constants'
```

#### Architecture Patterns

```yaml
architecture:
  - pattern: 'src/components/{Component}/index.tsx'
    indicates: 'Component-per-folder'

  - pattern: 'src/features/{feature}/'
    indicates: 'Feature-based architecture'

  - pattern: 'pages/*.tsx'
    indicates: 'File-based routing'

  - pattern: 'src/{layer}/' # where layer in [domain, application, infrastructure]
    indicates: 'Clean architecture'
```

#### Code Style

Analyze for:

- Semicolons usage
- Quote style (single/double)
- Indentation (tabs/spaces, size)
- Import organization
- Comment style

### Step 4: Map Dependencies

Create dependency analysis:

```yaml
dependencies:
  runtime:
    - name: 'react'
      version: '^18.2.0'
      category: 'framework'
    - name: 'hono'
      version: '^3.0.0'
      category: 'backend'

  development:
    - name: 'vitest'
      version: '^1.0.0'
      category: 'testing'
    - name: 'eslint'
      version: '^8.0.0'
      category: 'linting'

  outdated:
    - name: 'lodash'
      current: '^4.17.0'
      latest: '^4.17.21'
      risk: 'low'
```

### Step 5: Identify Improvement Opportunities

Based on analysis, identify:

#### Technical Debt

```yaml
technical_debt:
  - area: 'Testing'
    issue: 'No test files found'
    severity: 'high'
    recommendation: 'Add unit tests with Vitest'

  - area: 'Accessibility'
    issue: 'No ARIA attributes found in components'
    severity: 'medium'
    recommendation: 'Audit and add accessibility attributes'

  - area: 'Dependencies'
    issue: '5 packages have known vulnerabilities'
    severity: 'high'
    recommendation: 'Run npm audit fix'
```

#### Missing Configurations

```yaml
missing_configs:
  - file: '.prettierrc'
    purpose: 'Code formatting'
    recommended: true

  - file: 'eslint.config.js'
    purpose: 'Code linting'
    recommended: true

  - file: 'CLAUDE.md'
    purpose: 'AI context'
    recommended: true
```

### Step 6: Generate PROJECT_CONTEXT.md

Create `.claude/PROJECT_CONTEXT.md`:

```markdown
# Project Context

> Auto-generated by `/analyze-project` on {{TIMESTAMP}}

## Project Overview

### Detected Stack

| Layer     | Technology     | Version |
| --------- | -------------- | ------- |
| Language  | {{LANGUAGE}}   | {{VER}} |
| Framework | {{FRAMEWORK}}  | {{VER}} |
| Styling   | {{STYLING}}    | {{VER}} |
| Testing   | {{TESTING}}    | {{VER}} |
| Build     | {{BUILD_TOOL}} | {{VER}} |

### Project Structure

\`\`\` {{STRUCTURE_TREE}} \`\`\`

### Entry Points

- **Main Application:** `{{MAIN_ENTRY}}`
- **Configuration:** `{{CONFIG_FILES}}`
- **Tests:** `{{TEST_ENTRY}}`

---

## Detected Patterns

### Naming Conventions

{{NAMING_PATTERNS}}

### Architecture

{{ARCHITECTURE_PATTERNS}}

### Code Style

{{CODE_STYLE}}

---

## Dependencies

### Key Dependencies

{{DEPENDENCY_TABLE}}

### Outdated/Vulnerable

{{OUTDATED_DEPS}}

---

## Improvement Opportunities

### High Priority

{{HIGH_PRIORITY_IMPROVEMENTS}}

### Medium Priority

{{MEDIUM_PRIORITY_IMPROVEMENTS}}

---

## AI Instructions

Based on this analysis, when working on this project:

1. **Follow existing patterns:** {{PATTERN_SUMMARY}}
2. **Use detected conventions:** {{CONVENTION_SUMMARY}}
3. **Respect architecture:** {{ARCHITECTURE_SUMMARY}}
4. **Address tech debt:** {{TECH_DEBT_SUMMARY}}

---

## Next Steps

This context document is ready for `/project-planner`. Run:

\`\`\`bash /project-planner --context=PROJECT_CONTEXT.md \`\`\`

Or if you have specific goals, fill out `PROJECT_STARTER.md` with:

- Goals section (what you want to accomplish)
- Requirements section (specific features)
- Constraints section (must respect existing patterns)
```

### Step 7: Update CLAUDE.md

If `CLAUDE.md` doesn't exist or is minimal, create/update it:

```markdown
# {{PROJECT_NAME}}

> AI-assisted development context

## Project Type

{{PROJECT_TYPE}} built with {{STACK}}

## Key Directories

- `{{SRC_DIR}}` - Source code
- `{{TEST_DIR}}` - Tests
- `{{CONFIG_DIR}}` - Configuration

## Patterns to Follow

{{KEY_PATTERNS}}

## Commands

- `{{DEV_CMD}}` - Start development
- `{{TEST_CMD}}` - Run tests
- `{{BUILD_CMD}}` - Build for production

## Important Notes

{{NOTES_FROM_ANALYSIS}}
```

## Output

The command produces:

1. `.claude/PROJECT_CONTEXT.md` - Complete project analysis
2. `CLAUDE.md` - Created or updated with project context
3. Console summary with key findings

## Example Usage

```bash
# Quick analysis of current project
/analyze-project

# Deep analysis with all features
/analyze-project depth=deep focus=all

# Focus only on patterns
/analyze-project focus=patterns
```

## Integration with Existing Workflow

After running `/analyze-project`:

1. Review generated `PROJECT_CONTEXT.md`
2. Add your goals to `PROJECT_STARTER.md` (optional)
3. Run `/project-planner` which will:
   - Read both documents if present
   - Prioritize user goals from STARTER
   - Use detected context from CONTEXT
4. Continue with `/task-planner` and `/task-runner`

## Best Practices

1. **Review before proceeding** - Analysis is automated but may miss nuances
2. **Add business context** - AI can't detect business requirements
3. **Verify patterns** - Confirm detected patterns are intentional
4. **Note exceptions** - Some detected "issues" may be intentional choices
