<script>
  import { onMount } from 'svelte';

  let commits = [];
  let executionLog = [];
  let branch = '';
  let loading = true;
  let err = null;

  onMount(async () => {
    try {
      const res = await fetch('/api/history');
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      commits = data.commits ?? [];
      executionLog = data.executionLog ?? [];
      branch = data.branch ?? '';
    } catch (e) {
      err = e.message;
    } finally {
      loading = false;
    }
  });

  function formatDate(dateStr) {
    try {
      return new Date(dateStr).toLocaleString();
    } catch {
      return dateStr;
    }
  }
</script>

<svelte:head>
  <title>History — Claude Sidekick</title>
</svelte:head>

<div class="history">
  <header class="history__header">
    <h1 class="history__title">History</h1>
    {#if branch}
      <span class="history__branch">
        <span aria-hidden="true">⎇</span> {branch}
      </span>
    {/if}
  </header>

  {#if loading}
    <p class="history__loading" aria-live="polite">Loading history…</p>
  {:else if err}
    <div class="history__error" role="alert">{err}</div>
  {:else}
    <div class="history__columns">
      <section class="history__section" aria-label="Git log">
        <h2 class="history__section-title">Git Log</h2>
        {#if commits.length === 0}
          <p class="history__empty">No git history found.</p>
        {:else}
          <ol class="history__timeline">
            {#each commits as commit}
              <li class="history__event history__event--commit">
                <div class="history__event-dot" aria-hidden="true"></div>
                <div class="history__event-content">
                  <code class="history__hash">{commit.hash}</code>
                  <p class="history__message">{commit.message}</p>
                  <span class="history__meta">{commit.author} · {formatDate(commit.date)}</span>
                </div>
              </li>
            {/each}
          </ol>
        {/if}
      </section>

      <section class="history__section" aria-label="Execution log">
        <h2 class="history__section-title">Execution Log</h2>
        {#if executionLog.length === 0}
          <p class="history__empty">No execution log entries found.</p>
        {:else}
          <ol class="history__timeline">
            {#each executionLog as entry}
              <li class="history__event history__event--phase">
                <div class="history__event-dot" aria-hidden="true"></div>
                <div class="history__event-content">
                  <p class="history__message">{entry.message ?? JSON.stringify(entry)}</p>
                  {#if entry.timestamp}
                    <span class="history__meta">{formatDate(entry.timestamp)}</span>
                  {/if}
                </div>
              </li>
            {/each}
          </ol>
        {/if}
      </section>
    </div>
  {/if}
</div>

<style>
  .history {
    display: flex;
    flex-direction: column;
    gap: var(--space-xl);
    max-width: 1100px;
  }

  .history__header {
    display: flex;
    align-items: center;
    gap: var(--space-md);
    border-block-end: 1px solid var(--color-border);
    padding-block-end: var(--space-md);
  }

  .history__title {
    font-size: 1.5rem;
  }

  .history__branch {
    font-size: 0.85rem;
    color: var(--color-text-muted);
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    padding: var(--space-xs) var(--space-sm);
    border-radius: 4px;
    font-family: monospace;
  }

  .history__loading,
  .history__empty {
    color: var(--color-text-muted);
  }

  .history__error {
    padding: var(--space-md);
    background: color-mix(in srgb, var(--color-error) 10%, transparent);
    border: 1px solid var(--color-error);
    border-radius: 6px;
    color: var(--color-error);
  }

  .history__columns {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--space-xl);
  }

  .history__section-title {
    font-size: 1rem;
    margin-block-end: var(--space-md);
    color: var(--color-text-muted);
    text-transform: uppercase;
    letter-spacing: 0.05em;
    font-size: 0.75rem;
  }

  .history__timeline {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 0;
    border-inline-start: 2px solid var(--color-border);
    padding-inline-start: var(--space-md);
  }

  .history__event {
    position: relative;
    padding-block: var(--space-sm);
  }

  .history__event-dot {
    position: absolute;
    inset-inline-start: calc(-1 * var(--space-md) - 5px);
    inset-block-start: calc(var(--space-sm) + 0.4rem);
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--color-border);
  }

  .history__event--commit .history__event-dot {
    background: var(--color-accent);
  }

  .history__event--phase .history__event-dot {
    background: var(--color-success);
  }

  .history__event-content {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .history__hash {
    font-size: 0.75rem;
    color: var(--color-accent);
    font-family: monospace;
  }

  .history__message {
    margin: 0;
    font-size: 0.875rem;
    color: var(--color-text);
  }

  .history__meta {
    font-size: 0.75rem;
    color: var(--color-text-muted);
  }

  @media (max-width: 768px) {
    .history__columns {
      grid-template-columns: 1fr;
    }
  }
</style>
