<script>
  export let phase = null;
  export let tasks = { total: 0, pending: 0, complete: 0, blocked: 0 };

  $: completionPct =
    tasks.total > 0 ? Math.round((tasks.complete / tasks.total) * 100) : 0;

  $: statusColor =
    phase?.status === 'complete'
      ? 'var(--color-success)'
      : phase?.status === 'blocked'
        ? 'var(--color-error)'
        : 'var(--color-accent)';
</script>

<div class="phase-card">
  <div class="phase-card__header">
    <h2 class="phase-card__title">
      {#if phase}
        Phase {phase.currentPhase ?? '—'}
      {:else}
        No Active Phase
      {/if}
    </h2>
    {#if phase}
      <span
        class="phase-card__status"
        style="color: {statusColor}; border-color: {statusColor};"
      >
        {phase.status ?? 'unknown'}
      </span>
    {/if}
  </div>

  <div class="phase-card__body">
    <div class="phase-card__stat-row">
      <div class="phase-card__stat">
        <span class="phase-card__stat-value">{tasks.total}</span>
        <span class="phase-card__stat-label">Total Tasks</span>
      </div>
      <div class="phase-card__stat">
        <span class="phase-card__stat-value" style="color: var(--color-success);"
          >{tasks.complete}</span
        >
        <span class="phase-card__stat-label">Complete</span>
      </div>
      <div class="phase-card__stat">
        <span class="phase-card__stat-value" style="color: var(--color-warning);"
          >{tasks.pending}</span
        >
        <span class="phase-card__stat-label">Pending</span>
      </div>
      <div class="phase-card__stat">
        <span class="phase-card__stat-value" style="color: var(--color-error);"
          >{tasks.blocked}</span
        >
        <span class="phase-card__stat-label">Blocked</span>
      </div>
    </div>

    {#if tasks.total > 0}
      <div class="phase-card__progress" role="progressbar" aria-valuenow={completionPct} aria-valuemin="0" aria-valuemax="100" aria-label="Task completion">
        <div class="phase-card__progress-bar" style="width: {completionPct}%;"></div>
      </div>
      <p class="phase-card__pct">{completionPct}% complete</p>
    {/if}
  </div>
</div>

<style>
  .phase-card {
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: 8px;
    padding: var(--space-lg);
  }

  .phase-card__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-block-end: var(--space-md);
  }

  .phase-card__title {
    font-size: 1.1rem;
    font-weight: 600;
    margin: 0;
  }

  .phase-card__status {
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    padding: 2px var(--space-sm);
    border: 1px solid;
    border-radius: 4px;
  }

  .phase-card__body {
    display: flex;
    flex-direction: column;
    gap: var(--space-md);
  }

  .phase-card__stat-row {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: var(--space-md);
  }

  .phase-card__stat {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--space-xs);
  }

  .phase-card__stat-value {
    font-size: 1.5rem;
    font-weight: 700;
    line-height: 1;
  }

  .phase-card__stat-label {
    font-size: 0.75rem;
    color: var(--color-text-muted);
  }

  .phase-card__progress {
    height: 6px;
    background: var(--color-border);
    border-radius: 3px;
    overflow: hidden;
  }

  .phase-card__progress-bar {
    height: 100%;
    background: var(--color-accent);
    border-radius: 3px;
    transition: width 0.3s ease;
  }

  .phase-card__pct {
    font-size: 0.8rem;
    color: var(--color-text-muted);
    margin: 0;
    text-align: end;
  }
</style>
