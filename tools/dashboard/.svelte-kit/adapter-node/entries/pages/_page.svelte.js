import { i as head } from "../../chunks/index.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    head("1uha8ag", $$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>Dashboard — Claude Sidekick</title>`);
      });
    });
    $$renderer2.push(`<div class="home svelte-1uha8ag"><header class="home__header svelte-1uha8ag"><h1 class="home__title svelte-1uha8ag">Project Dashboard</h1> <p class="home__subtitle svelte-1uha8ag">Manage your Claude Code Sidekick project from one place.</p></header> `);
    {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<p class="home__loading svelte-1uha8ag" aria-live="polite">Loading project state…</p>`);
    }
    $$renderer2.push(`<!--]--></div>`);
  });
}
export {
  _page as default
};
