import { i as head } from "../../../chunks/index.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    head("1xl2tfr", $$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>History — Claude Sidekick</title>`);
      });
    });
    $$renderer2.push(`<div class="history svelte-1xl2tfr"><header class="history__header svelte-1xl2tfr"><h1 class="history__title svelte-1xl2tfr">History</h1> `);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></header> `);
    {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<p class="history__loading svelte-1xl2tfr" aria-live="polite">Loading history…</p>`);
    }
    $$renderer2.push(`<!--]--></div>`);
  });
}
export {
  _page as default
};
