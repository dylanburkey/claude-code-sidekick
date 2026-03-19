import { e as ensure_array_like, a as attr, b as attr_class, c as escape_html, s as store_get, d as unsubscribe_stores, f as slot } from "../../chunks/index.js";
import { p as page } from "../../chunks/stores.js";
function Sidebar($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    const navItems = [
      { href: "/", label: "Dashboard", icon: "⚡" },
      { href: "/agents", label: "Agents", icon: "🤖" },
      { href: "/skills", label: "Skills", icon: "🛠" },
      { href: "/hooks", label: "Hooks", icon: "🔗" },
      { href: "/history", label: "History", icon: "📜" },
      { href: "/review", label: "Review", icon: "🔍" }
    ];
    $$renderer2.push(`<nav class="sidebar svelte-129hoe0"><div class="sidebar__brand svelte-129hoe0"><span class="sidebar__logo svelte-129hoe0">◆</span> <span class="sidebar__title svelte-129hoe0">Claude Sidekick</span></div> <ul class="sidebar__nav svelte-129hoe0"><!--[-->`);
    const each_array = ensure_array_like(navItems);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let item = each_array[$$index];
      $$renderer2.push(`<li><a${attr("href", item.href)}${attr_class("sidebar__link svelte-129hoe0", void 0, {
        "sidebar__link--active": store_get($$store_subs ??= {}, "$page", page).url.pathname === item.href || store_get($$store_subs ??= {}, "$page", page).url.pathname.startsWith(item.href) && item.href !== "/"
      })}${attr("aria-current", store_get($$store_subs ??= {}, "$page", page).url.pathname === item.href ? "page" : void 0)}><span class="sidebar__icon svelte-129hoe0" aria-hidden="true">${escape_html(item.icon)}</span> <span>${escape_html(item.label)}</span></a></li>`);
    }
    $$renderer2.push(`<!--]--></ul> <div class="sidebar__footer svelte-129hoe0"><span class="sidebar__version svelte-129hoe0">v0.1.0</span></div></nav>`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
  });
}
function _layout($$renderer, $$props) {
  $$renderer.push(`<div class="app-shell svelte-12qhfyh">`);
  Sidebar($$renderer);
  $$renderer.push(`<!----> <main class="app-shell__main svelte-12qhfyh"><!--[-->`);
  slot($$renderer, $$props, "default", {});
  $$renderer.push(`<!--]--></main></div>`);
}
export {
  _layout as default
};
