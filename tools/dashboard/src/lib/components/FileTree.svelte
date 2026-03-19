<script>
  export let nodes = [];
  export let onSelect = () => {};
  export let selectedPath = null;
  export let depth = 0;

  function getIcon(node) {
    if (node.isDir) return '📁';
    if (node.name.endsWith('.md')) return '📄';
    if (node.name.endsWith('.json')) return '📋';
    if (node.name.endsWith('.yaml') || node.name.endsWith('.yml')) return '⚙️';
    return '📝';
  }
</script>

<ul class="file-tree" role="tree" style="padding-inline-start: {depth > 0 ? '1rem' : '0'};">
  {#each nodes as node (node.path)}
    <li role="treeitem" aria-expanded={node.isDir ? 'true' : undefined} aria-selected={selectedPath === node.path ? 'true' : 'false'}>
      {#if node.isDir}
        <span class="file-tree__dir">
          <span class="file-tree__icon" aria-hidden="true">{getIcon(node)}</span>
          <span class="file-tree__name">{node.name}</span>
        </span>
        {#if node.children?.length}
          <svelte:self nodes={node.children} {onSelect} {selectedPath} depth={depth + 1} />
        {/if}
      {:else}
        <button
          class="file-tree__file"
          class:file-tree__file--active={selectedPath === node.path}
          on:click={() => onSelect(node.path)}
          type="button"
        >
          <span class="file-tree__icon" aria-hidden="true">{getIcon(node)}</span>
          <span class="file-tree__name">{node.name}</span>
        </button>
      {/if}
    </li>
  {/each}
</ul>

<style>
  .file-tree {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .file-tree__dir {
    display: flex;
    align-items: center;
    gap: var(--space-xs);
    padding: var(--space-xs) var(--space-sm);
    color: var(--color-text-muted);
    font-size: 0.85rem;
    font-weight: 600;
    cursor: default;
  }

  .file-tree__file {
    display: flex;
    align-items: center;
    gap: var(--space-xs);
    width: 100%;
    padding: var(--space-xs) var(--space-sm);
    background: none;
    border: none;
    color: var(--color-text);
    font-size: 0.85rem;
    text-align: start;
    cursor: pointer;
    border-radius: 4px;
    transition: background-color 0.15s ease;
  }

  .file-tree__file:hover {
    background: var(--color-hover);
  }

  .file-tree__file--active {
    background: var(--color-accent-subtle);
    color: var(--color-accent);
  }

  .file-tree__icon {
    font-size: 0.9rem;
    flex-shrink: 0;
  }

  .file-tree__name {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
</style>
