<script>
  import ReviewStream from '$lib/components/ReviewStream.svelte';

  let filePath = '';
  let deep = false;
  let running = false;
  let done = false;
  let streamErr = null;
  let lines = [];

  async function startReview() {
    if (!filePath.trim()) return;
    running = true;
    done = false;
    streamErr = null;
    lines = [];

    try {
      const res = await fetch('/api/review', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ filePath: filePath.trim(), deep }),
      });

      if (!res.ok) {
        const text = await res.text();
        streamErr = `Server error: ${text}`;
        running = false;
        return;
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';

      while (true) {
        const { done: streamDone, value } = await reader.read();
        if (streamDone) break;

        buffer += decoder.decode(value, { stream: true });

        const events = buffer.split('\n\n');
        buffer = events.pop() ?? '';

        for (const event of events) {
          const dataLine = event.split('\n').find((l) => l.startsWith('data: '));
          if (!dataLine) continue;

          try {
            const payload = JSON.parse(dataLine.slice(6));
            if (payload.text) lines = [...lines, payload.text];
            if (payload.error) streamErr = payload.error;
            if (payload.done) done = true;
          } catch {
            // ignore parse errors
          }
        }
      }
    } catch (e) {
      streamErr = e.message;
    } finally {
      running = false;
      done = true;
    }
  }
</script>

<svelte:head>
  <title>Review — Claude Sidekick</title>
</svelte:head>

<div class="review-page">
  <header class="review-page__header">
    <h1 class="review-page__title">Multi-Model Review</h1>
    <p class="review-page__subtitle">
      Run consensus code review using multiple AI models simultaneously.
    </p>
  </header>

  <form class="review-page__form" on:submit|preventDefault={startReview} aria-label="Review configuration">
    <div class="review-page__field">
      <label class="review-page__label" for="file-path">File path (relative to project root)</label>
      <input
        id="file-path"
        type="text"
        class="review-page__input"
        bind:value={filePath}
        placeholder="e.g. cli/src/scaffold.js"
        required
        aria-describedby="file-path-hint"
      />
      <p id="file-path-hint" class="review-page__hint">
        Enter a path relative to the project root. The file will be reviewed by multiple models.
      </p>
    </div>

    <div class="review-page__field review-page__field--inline">
      <label class="review-page__label--inline">
        <input type="checkbox" bind:checked={deep} class="review-page__checkbox" />
        Deep review (slower, more thorough)
      </label>
    </div>

    <button
      type="submit"
      class="review-page__btn"
      disabled={running || !filePath.trim()}
      aria-label="Start code review"
    >
      {running ? 'Reviewing…' : 'Start Review'}
    </button>
  </form>

  {#if lines.length > 0 || streamErr || (done && !running)}
    <section class="review-page__results" aria-label="Review results">
      <h2 class="review-page__results-title">Results</h2>
      <div class="review-page__stream">
        <ReviewStream {lines} {done} error={streamErr} />
      </div>
    </section>
  {/if}
</div>

<style>
  .review-page {
    display: flex;
    flex-direction: column;
    gap: var(--space-xl);
    max-width: 900px;
  }

  .review-page__header {
    border-block-end: 1px solid var(--color-border);
    padding-block-end: var(--space-md);
  }

  .review-page__title {
    font-size: 1.5rem;
    margin-block-end: var(--space-xs);
  }

  .review-page__subtitle {
    color: var(--color-text-muted);
    margin: 0;
    font-size: 0.875rem;
  }

  .review-page__form {
    display: flex;
    flex-direction: column;
    gap: var(--space-md);
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: 8px;
    padding: var(--space-lg);
  }

  .review-page__field {
    display: flex;
    flex-direction: column;
    gap: var(--space-xs);
  }

  .review-page__field--inline {
    flex-direction: row;
    align-items: center;
  }

  .review-page__label {
    font-size: 0.875rem;
    font-weight: 500;
  }

  .review-page__label--inline {
    display: flex;
    align-items: center;
    gap: var(--space-sm);
    font-size: 0.875rem;
    cursor: pointer;
  }

  .review-page__input {
    padding: var(--space-sm) var(--space-md);
    background: var(--color-bg);
    border: 1px solid var(--color-border);
    border-radius: 4px;
    color: var(--color-text);
    font-size: 0.875rem;
    font-family: monospace;
    min-height: 44px;
    transition: border-color 0.15s ease;
  }

  .review-page__input:focus {
    border-color: var(--color-accent);
    outline: none;
  }

  .review-page__checkbox {
    width: 16px;
    height: 16px;
    cursor: pointer;
  }

  .review-page__hint {
    font-size: 0.75rem;
    color: var(--color-text-muted);
    margin: 0;
  }

  .review-page__btn {
    align-self: flex-start;
    padding: var(--space-sm) var(--space-lg);
    background: var(--color-accent);
    color: #000;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 0.875rem;
    font-weight: 600;
    min-height: 44px;
    transition: opacity 0.15s ease;
  }

  .review-page__btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  .review-page__results-title {
    font-size: 1rem;
    margin-block-end: var(--space-md);
  }

  .review-page__stream {
    height: 500px;
  }
</style>
