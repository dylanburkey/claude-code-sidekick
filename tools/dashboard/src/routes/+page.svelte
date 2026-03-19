<script>
  import { onMount } from 'svelte';
  import PhaseCard from '$lib/components/PhaseCard.svelte';

  let state = null;
  let tasks = { total: 0, pending: 0, complete: 0, blocked: 0 };
  let loading = true;
  let err = null;

  onMount(async () => {
    try {
      const res = await fetch('/api/phase');
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      state = data.state;
      tasks = data.tasks;
    } catch (e) {
      err = e.message;
    } finally {
      loading = false;
    }
  });
</script>

<svelte:head>
  <title>Dashboard — Claude Sidekick</title>
</svelte:head>

<div class="home">
  <header class="home__header">
    <h1 class="home__title">Project Dashboard</h1>
    <p class="home__subtitle">
      Manage your Claude Code Sidekick project from one place.
    </p>
  </header>

  {#if loading}
    <p class="home__loading" aria-live="polite">Loading project state…</p>
  {:else if err}
    <div class="home__error" role="alert">
      <strong>Error loading project state:</strong> {err}
    </div>
  {:else}
    <section class="home__section" aria-label="Phase status">
      <PhaseCard phase={state} {tasks} />
    </section>

    {#if state?.authorizedPhases?.length}
      <section class="home__section">
        <h2 class="home__section-title">Authorized Phases</h2>
        <ul class="home__phase-list">
          {#each state.authorizedPhases as phase}
            <li class="home__phase-item">Phase {phase}</li>
          {/each}
        </ul>
      </section>
    {/if}

    {#if state?.violations?.length}
      <section class="home__section">
        <h2 class="home__section-title" style="color: var(--color-error);">
          Scope Violations
        </h2>
        <ul class="home__violations">
          {#each state.violations as v}
            <li class="home__violation-item">{v}</li>
          {/each}
        </ul>
      </section>
    {/if}
  {/if}
</div>

<style>
  .home {
    max-width: 900px;
    display: flex;
    flex-direction: column;
    gap: var(--space-xl);
  }

  .home__header {
    border-block-end: 1px solid var(--color-border);
    padding-block-end: var(--space-lg);
  }

  .home__title {
    font-size: 1.75rem;
    margin-block-end: var(--space-sm);
  }

  .home__subtitle {
    color: var(--color-text-muted);
    margin: 0;
  }

  .home__loading {
    color: var(--color-text-muted);
  }

  .home__error {
    padding: var(--space-md);
    background: color-mix(in srgb, var(--color-error) 10%, transparent);
    border: 1px solid var(--color-error);
    border-radius: 6px;
    color: var(--color-error);
    font-size: 0.875rem;
  }

  .home__section-title {
    font-size: 1rem;
    margin-block-end: var(--space-md);
  }

  .home__phase-list,
  .home__violations {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: var(--space-xs);
  }

  .home__phase-item {
    padding: var(--space-sm) var(--space-md);
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: 4px;
    font-size: 0.875rem;
  }

  .home__violation-item {
    padding: var(--space-sm) var(--space-md);
    background: color-mix(in srgb, var(--color-error) 8%, transparent);
    border: 1px solid var(--color-error);
    border-radius: 4px;
    font-size: 0.875rem;
    color: var(--color-error);
  }
</style>
