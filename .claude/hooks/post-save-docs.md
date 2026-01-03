# Post-Save Documentation Hook

## Trigger
This hook activates after any file is saved in the project.

## Purpose
Automatically maintain documentation consistency by:
1. Updating inline documentation
2. Syncing README.md with project changes
3. Updating CLAUDE.md with architectural context
4. Generating API documentation for new exports

## Activation Conditions

### Always Trigger
- New file created
- Existing file significantly modified
- File deleted

### File Type Handlers

| File Pattern | Action |
|--------------|--------|
| `*.js`, `*.ts` | Update API docs, check exports |
| `*.css` | Update style documentation |
| `*.md` | Validate links, update TOC |
| `*.yml`, `*.yaml` | Update config documentation |
| `*.liquid` | Update section/snippet docs |
| `*.json` | Update schema documentation |

## Documentation Updates

### README.md Updates
Trigger README update when:
- New major feature added
- Installation steps change
- Dependencies added/removed
- Usage examples need updating

```markdown
## Sections to Check
- [ ] Project description still accurate
- [ ] Installation instructions current
- [ ] Usage examples work
- [ ] Feature list complete
- [ ] Dependencies listed
```

### CLAUDE.md Updates
Trigger CLAUDE.md update when:
- New patterns introduced
- Architecture decisions made
- New directories/files with special purpose
- Conventions established

```markdown
## Sections to Check
- [ ] Project structure accurate
- [ ] Key patterns documented
- [ ] File purposes explained
- [ ] Commands listed
- [ ] Agent capabilities current
```

## Implementation

### Hook Script
```yaml
hook:
  name: "post-save-docs"
  trigger: "file_save"
  agent: "docs"
  
  conditions:
    # Skip documentation files themselves to prevent loops
    exclude:
      - "README.md"
      - "CLAUDE.md"
      - ".claude/docs/**"
    
    # Skip generated/vendor files
    exclude_patterns:
      - "node_modules/**"
      - "dist/**"
      - "*.min.*"
      - "*.lock"
  
  actions:
    - analyze_change
    - determine_doc_impact
    - update_relevant_docs
    - validate_links
```

### Change Analysis
```yaml
analyze:
  file: "{{changed_file}}"
  detect:
    - new_exports
    - removed_exports
    - signature_changes
    - new_dependencies
    - pattern_changes
```

### Documentation Impact Assessment
```yaml
impact:
  readme:
    - installation_change
    - usage_change
    - feature_change
  claude:
    - structure_change
    - pattern_change
    - architecture_change
  api_docs:
    - export_change
    - type_change
```

## Execution Flow

```
1. File saved
2. Check exclusion rules
3. Analyze changes
4. Determine documentation impact
5. Queue documentation updates
6. Invoke docs-agent with context
7. Validate updated documentation
8. Commit documentation changes (if auto-commit enabled)
```

## Rate Limiting

To prevent excessive updates during rapid saves:
- Debounce: 5 second delay after last save
- Batch: Collect multiple file changes
- Dedupe: Don't update same doc section twice

## Output

### Log Entry
```
[HOOK] post-save-docs triggered
  File: src/components/header.js
  Changes: new export (Header), updated props
  Impact: API docs, CLAUDE.md (patterns)
  Actions: Updated docs/api/components.md
           Added pattern to CLAUDE.md
```

### Documentation Diff
When significant changes made, output diff for review:
```diff
+ ## Header Component
+ Responsive header with navigation support.
+ 
+ ### Props
+ - `logo`: Logo image source
+ - `navItems`: Navigation items array
```

## Configuration

In `.claude/config.yml`:
```yaml
hooks:
  post_save_docs:
    enabled: true
    debounce_ms: 5000
    auto_commit: false
    verbose: true
    excluded_paths:
      - "test/**"
      - "*.test.*"
```
