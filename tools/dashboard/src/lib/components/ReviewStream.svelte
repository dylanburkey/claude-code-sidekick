<script>
  export let lines = [];
  export let done = false;
  export let error = null;

  import { afterUpdate } from 'svelte';

  let outputEl;

  afterUpdate(() => {
    outputEl?.scrollTo({ top: outputEl.scrollHeight, behavior: 'smooth' });
  });
</script>

<div class="review-stream">
  {#if error}
    <div class="review-stream__error" role="alert">
      <strong>Error:</strong>
      {error}
    </div>
  {:else}
    <div class="review-stream__output" bind:this={outputEl} aria-live="polite" aria-label="Review output">
      {#each lines as line}
        <p class="review-stream__line">{line}</p>
      {/each}
      {#if !done && lines.length > 0}
        <span class="review-stream__cursor" aria-hidden="true">▌</span>
      {/if}
      {#if done && lines.length === 0}
        <p class="review-stream__empty">No output received.</p>
      {/if}
    </div>
  {/if}

  {#if done}
    <div class="review-stream__done">Review complete.</div>
  {/if}
</div>

<style>
  .review-stream {
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  .review-stream__output {
    flex: 1;
    overflow-y: auto;
    background: #0d0d0d;
    border: 1px solid var(--color-border);
    border-radius: 6px;
    padding: var(--space-md);
    font-family: 'JetBrains Mono', 'Fira Code', monospace;
    font-size: 0.8rem;
    line-height: 1.6;
    color: #e4e4e4;
  }

  .review-stream__line {
    margin: 0;
    white-space: pre-wrap;
    word-break: break-word;
  }

  .review-stream__cursor {
    display: inline-block;
    animation: blink 1s step-end infinite;
    color: var(--color-accent);
  }

  @keyframes blink {
    50% { opacity: 0; }
  }

  .review-stream__empty {
    color: var(--color-text-muted);
    font-style: italic;
  }

  .review-stream__error {
    padding: var(--space-md);
    background: color-mix(in srgb, var(--color-error) 15%, transparent);
    border: 1px solid var(--color-error);
    border-radius: 6px;
    color: var(--color-error);
    font-size: 0.875rem;
  }

  .review-stream__done {
    margin-block-start: var(--space-sm);
    font-size: 0.8rem;
    color: var(--color-success);
    text-align: end;
  }

  @media (prefers-reduced-motion: reduce) {
    .review-stream__cursor {
      animation: none;
    }
  }
</style>
