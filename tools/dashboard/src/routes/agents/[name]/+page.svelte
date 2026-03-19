<script>
  import { page } from '$app/stores';
  import { onMount } from 'svelte';
  import Editor from '$lib/components/Editor.svelte';

  $: agentName = $page.params.name;
  $: filePath = `agents/${agentName}`;

  let content = '';
  let editedContent = '';
  let saving = false;
  let saved = false;
  let loadErr = null;
  let saveErr = null;
  let editorRef;

  onMount(async () => {
    await loadFile();
  });

  async function loadFile() {
    loadErr = null;
    const res = await fetch(`/api/files?path=${encodeURIComponent(filePath)}`);
    if (res.ok) {
      const data = await res.json();
      content = data.content;
      editedContent = data.content;
      editorRef?.setContent(content);
    } else {
      loadErr = `Could not load ${filePath}`;
    }
  }

  async function saveFile() {
    saving = true;
    saveErr = null;
    saved = false;

    const res = await fetch('/api/files', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ path: filePath, content: editedContent }),
    });

    saving = false;
    if (res.ok) {
      saved = true;
      setTimeout(() => (saved = false), 2000);
    } else {
      saveErr = 'Failed to save.';
    }
  }
</script>

<svelte:head>
  <title>{agentName} — Agents — Claude Sidekick</title>
</svelte:head>

<div class="agent-page">
  <header class="agent-page__header">
    <a href="/agents" class="agent-page__back">← Back to Agents</a>
    <h1 class="agent-page__title">{agentName}</h1>
  </header>

  {#if loadErr}
    <div class="agent-page__alert" role="alert">{loadErr}</div>
  {:else}
    <div class="agent-page__toolbar">
      <span class="agent-page__path">{filePath}</span>
      <div class="agent-page__actions">
        {#if saved}
          <span class="agent-page__saved" aria-live="polite">Saved ✓</span>
        {/if}
        {#if saveErr}
          <span class="agent-page__err" role="alert">{saveErr}</span>
        {/if}
        <button
          type="button"
          class="agent-page__btn"
          on:click={saveFile}
          disabled={saving}
        >
          {saving ? 'Saving…' : 'Save'}
        </button>
      </div>
    </div>

    <div class="agent-page__editor">
      <Editor
        bind:this={editorRef}
        {content}
        {filePath}
        onChange={(v) => (editedContent = v)}
      />
    </div>
  {/if}
</div>

<style>
  .agent-page {
    display: flex;
    flex-direction: column;
    gap: var(--space-md);
    height: calc(100vh - 4rem);
  }

  .agent-page__header {
    display: flex;
    align-items: center;
    gap: var(--space-md);
    border-block-end: 1px solid var(--color-border);
    padding-block-end: var(--space-md);
  }

  .agent-page__back {
    font-size: 0.875rem;
    color: var(--color-text-muted);
    text-decoration: none;
  }

  .agent-page__back:hover {
    color: var(--color-text);
  }

  .agent-page__title {
    font-size: 1.25rem;
  }

  .agent-page__toolbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: var(--space-sm) var(--space-md);
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: 6px;
  }

  .agent-page__path {
    font-family: monospace;
    font-size: 0.8rem;
    color: var(--color-text-muted);
  }

  .agent-page__actions {
    display: flex;
    align-items: center;
    gap: var(--space-sm);
  }

  .agent-page__btn {
    padding: var(--space-xs) var(--space-md);
    background: var(--color-accent);
    color: #000;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 0.875rem;
    font-weight: 600;
    min-height: 44px;
  }

  .agent-page__btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  .agent-page__saved {
    font-size: 0.8rem;
    color: var(--color-success);
  }

  .agent-page__err {
    font-size: 0.8rem;
    color: var(--color-error);
  }

  .agent-page__editor {
    flex: 1;
    min-height: 0;
  }

  .agent-page__alert {
    padding: var(--space-md);
    background: color-mix(in srgb, var(--color-error) 10%, transparent);
    border: 1px solid var(--color-error);
    border-radius: 6px;
    color: var(--color-error);
    font-size: 0.875rem;
  }
</style>
