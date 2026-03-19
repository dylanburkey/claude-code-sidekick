<script>
  import { page } from '$app/stores';

  const navItems = [
    { href: '/', label: 'Dashboard', icon: '⚡' },
    { href: '/agents', label: 'Agents', icon: '🤖' },
    { href: '/skills', label: 'Skills', icon: '🛠' },
    { href: '/hooks', label: 'Hooks', icon: '🔗' },
    { href: '/history', label: 'History', icon: '📜' },
    { href: '/review', label: 'Review', icon: '🔍' },
  ];
</script>

<nav class="sidebar">
  <div class="sidebar__brand">
    <span class="sidebar__logo">◆</span>
    <span class="sidebar__title">Claude Sidekick</span>
  </div>

  <ul class="sidebar__nav">
    {#each navItems as item}
      <li>
        <a
          href={item.href}
          class="sidebar__link"
          class:sidebar__link--active={$page.url.pathname === item.href ||
            ($page.url.pathname.startsWith(item.href) && item.href !== '/')}
          aria-current={$page.url.pathname === item.href ? 'page' : undefined}
        >
          <span class="sidebar__icon" aria-hidden="true">{item.icon}</span>
          <span>{item.label}</span>
        </a>
      </li>
    {/each}
  </ul>

  <div class="sidebar__footer">
    <span class="sidebar__version">v0.1.0</span>
  </div>
</nav>

<style>
  .sidebar {
    display: flex;
    flex-direction: column;
    width: 220px;
    min-height: 100vh;
    background: var(--color-surface);
    border-inline-end: 1px solid var(--color-border);
    padding-block: var(--space-md);
  }

  .sidebar__brand {
    display: flex;
    align-items: center;
    gap: var(--space-sm);
    padding-inline: var(--space-md);
    padding-block-end: var(--space-lg);
    border-block-end: 1px solid var(--color-border);
    margin-block-end: var(--space-md);
  }

  .sidebar__logo {
    font-size: 1.5rem;
    color: var(--color-accent);
  }

  .sidebar__title {
    font-size: 0.9rem;
    font-weight: 600;
    color: var(--color-text);
  }

  .sidebar__nav {
    list-style: none;
    padding: 0;
    margin: 0;
    flex: 1;
  }

  .sidebar__link {
    display: flex;
    align-items: center;
    gap: var(--space-sm);
    padding: var(--space-sm) var(--space-md);
    color: var(--color-text-muted);
    text-decoration: none;
    font-size: 0.9rem;
    border-radius: 6px;
    margin-inline: var(--space-xs);
    transition: background-color 0.15s ease, color 0.15s ease;
  }

  .sidebar__link:hover {
    background: var(--color-hover);
    color: var(--color-text);
  }

  .sidebar__link--active {
    background: var(--color-accent-subtle);
    color: var(--color-accent);
    font-weight: 500;
  }

  .sidebar__icon {
    font-size: 1rem;
    width: 1.25rem;
    text-align: center;
  }

  .sidebar__footer {
    padding-inline: var(--space-md);
    padding-block-start: var(--space-md);
    border-block-start: 1px solid var(--color-border);
  }

  .sidebar__version {
    font-size: 0.75rem;
    color: var(--color-text-muted);
  }
</style>
