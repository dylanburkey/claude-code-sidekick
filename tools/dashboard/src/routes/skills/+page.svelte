<script>
  import { onMount } from 'svelte';
  import FileTree from '$lib/components/FileTree.svelte';
  import Editor from '$lib/components/Editor.svelte';

  let tree = [];
  let selectedPath = null;
  let content = '';
  let editedContent = '';
  let saving = false;
  let saved = false;
  let saveErr = null;
  let editorRef;

  onMount(async () => {
    const res = await fetch('/api/files');
    if (res.ok) {
      const data = await res.json();
      const skillsNode = data.tree?.find((n) => n.name === 'skills' || n.name === 'commands');
      tree = skillsNode?.children ?? data.tree ?? [];
    }
  });

  async function selectFile(path) {
    selectedPath = path;
    const res = await fetch(`/api/files?path=${encodeURIComponent(path)}`);
    if (res.ok) {
      const data = await res.json();
      content = data.content;
      editedContent = data.content;
      editorRef?.setContent(content);
    }
  }

  async function saveFile() {
    if (!selectedPath) return;
    saving = true;
    saveErr = null;
    saved = false;

    const res = await fetch('/api/files', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ path: selectedPath, content: editedContent }),
    });

    saving = false;
    if (res.ok) {
      saved = true;
      setTimeout(() => (saved = false), 2000);
    } else {
      saveErr = 'Save failed.';
    }
  }
</script>

<svelte:head>
  <title>Skills — Claude Sidekick</title>
</svelte:head>

<div class="file-editor">
  <header class="file-editor__header">
    <h1 class="file-editor__title">Skills</h1>
    <p class="file-editor__subtitle">Browse and edit skill definition files from .claude/.</p>
  </header>

  <div class="file-editor__body">
    <aside class="file-editor__sidebar" aria-label="Skill files">
      <FileTree nodes={tree} {selectedPath} onSelect={selectFile} />
    </aside>

    <div class="file-editor__content">
      {#if selectedPath}
        <div class="file-editor__toolbar">
          <span class="file-editor__path">{selectedPath}</span>
          <div class="file-editor__actions">
            {#if saveErr}<span class="file-editor__err" role="alert">{saveErr}</span>{/if}
            {#if saved}<span class="file-editor__saved" aria-live="polite">Saved ✓</span>{/if}
            <button
              type="button"
              class="file-editor__btn"
              on:click={saveFile}
              disabled={saving}
            >{saving ? 'Saving…' : 'Save'}</button>
          </div>
        </div>
        <div class="file-editor__editor">
          <Editor
            bind:this={editorRef}
            {content}
            filePath={selectedPath}
            onChange={(v) => (editedContent = v)}
          />
        </div>
      {:else}
        <div class="file-editor__placeholder">
          <p>Select a skill file from the sidebar.</p>
        </div>
      {/if}
    </div>
  </div>
</div>

<style>
  .file-editor { display: flex; flex-direction: column; height: 100%; gap: var(--space-lg); }
  .file-editor__header { border-block-end: 1px solid var(--color-border); padding-block-end: var(--space-md); }
  .file-editor__title { font-size: 1.5rem; margin-block-end: var(--space-xs); }
  .file-editor__subtitle { color: var(--color-text-muted); margin: 0; font-size: 0.875rem; }
  .file-editor__body { display: grid; grid-template-columns: 220px 1fr; gap: var(--space-md); flex: 1; min-height: 0; height: calc(100vh - 200px); }
  .file-editor__sidebar { background: var(--color-surface); border: 1px solid var(--color-border); border-radius: 6px; padding: var(--space-sm); overflow-y: auto; }
  .file-editor__content { display: flex; flex-direction: column; gap: var(--space-sm); min-height: 0; }
  .file-editor__toolbar { display: flex; align-items: center; justify-content: space-between; padding: var(--space-sm) var(--space-md); background: var(--color-surface); border: 1px solid var(--color-border); border-radius: 6px; }
  .file-editor__path { font-family: monospace; font-size: 0.8rem; color: var(--color-text-muted); }
  .file-editor__actions { display: flex; align-items: center; gap: var(--space-sm); }
  .file-editor__btn { padding: var(--space-xs) var(--space-md); background: var(--color-accent); color: #000; border: none; border-radius: 4px; cursor: pointer; font-size: 0.875rem; font-weight: 600; min-height: 44px; }
  .file-editor__btn:disabled { opacity: 0.6; cursor: not-allowed; }
  .file-editor__saved { font-size: 0.8rem; color: var(--color-success); }
  .file-editor__err { font-size: 0.8rem; color: var(--color-error); }
  .file-editor__editor { flex: 1; min-height: 0; }
  .file-editor__placeholder { display: flex; align-items: center; justify-content: center; height: 100%; color: var(--color-text-muted); border: 1px dashed var(--color-border); border-radius: 6px; }
</style>
