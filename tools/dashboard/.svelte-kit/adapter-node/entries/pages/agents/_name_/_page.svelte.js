import { s as store_get, i as head, c as escape_html, a as attr, d as unsubscribe_stores } from "../../../../chunks/index.js";
import { p as page } from "../../../../chunks/stores.js";
import { E as Editor } from "../../../../chunks/Editor.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    let agentName, filePath;
    let content = "";
    let saving = false;
    agentName = store_get($$store_subs ??= {}, "$page", page).params.name;
    filePath = `agents/${agentName}`;
    head("i4cb0t", $$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>${escape_html(agentName)} — Agents — Claude Sidekick</title>`);
      });
    });
    $$renderer2.push(`<div class="agent-page svelte-i4cb0t"><header class="agent-page__header svelte-i4cb0t"><a href="/agents" class="agent-page__back svelte-i4cb0t">← Back to Agents</a> <h1 class="agent-page__title svelte-i4cb0t">${escape_html(agentName)}</h1></header> `);
    {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push(`<div class="agent-page__toolbar svelte-i4cb0t"><span class="agent-page__path svelte-i4cb0t">${escape_html(filePath)}</span> <div class="agent-page__actions svelte-i4cb0t">`);
      {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--> `);
      {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--> <button type="button" class="agent-page__btn svelte-i4cb0t"${attr("disabled", saving, true)}>${escape_html("Save")}</button></div></div> <div class="agent-page__editor svelte-i4cb0t">`);
      Editor($$renderer2, { content, filePath, onChange: (v) => v });
      $$renderer2.push(`<!----></div>`);
    }
    $$renderer2.push(`<!--]--></div>`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
  });
}
export {
  _page as default
};
