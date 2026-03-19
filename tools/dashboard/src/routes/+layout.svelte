<script>
  import Sidebar from '$lib/components/Sidebar.svelte';
</script>

<div class="app-shell">
  <Sidebar />
  <main class="app-shell__main">
    <slot />
  </main>
</div>

<style>
  :global(*),
  :global(*::before),
  :global(*::after) {
    box-sizing: border-box;
  }

  :global(:root) {
    --color-bg: #0f1117;
    --color-surface: #161b22;
    --color-border: #30363d;
    --color-text: #e6edf3;
    --color-text-muted: #8b949e;
    --color-accent: #58a6ff;
    --color-accent-subtle: rgba(88, 166, 255, 0.1);
    --color-hover: rgba(255, 255, 255, 0.05);
    --color-success: #3fb950;
    --color-warning: #d29922;
    --color-error: #f85149;

    --space-xs: 0.25rem;
    --space-sm: 0.5rem;
    --space-md: 1rem;
    --space-lg: 1.5rem;
    --space-xl: 2rem;

    color-scheme: dark;
  }

  :global(body) {
    margin: 0;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    background: var(--color-bg);
    color: var(--color-text);
    line-height: 1.5;
    font-size: 1rem;
  }

  :global(h1, h2, h3, h4, h5, h6) {
    margin: 0;
    font-weight: 600;
    line-height: 1.25;
  }

  :global(a) {
    color: var(--color-accent);
  }

  :global(:focus-visible) {
    outline: 2px solid var(--color-accent);
    outline-offset: 2px;
  }

  :global(:focus:not(:focus-visible)) {
    outline: none;
  }

  @media (prefers-reduced-motion: reduce) {
    :global(*),
    :global(*::before),
    :global(*::after) {
      animation-duration: 0.01ms !important;
      transition-duration: 0.01ms !important;
    }
  }

  .app-shell {
    display: flex;
    min-height: 100vh;
  }

  .app-shell__main {
    flex: 1;
    overflow: auto;
    padding: var(--space-xl);
    min-width: 0;
  }
</style>
