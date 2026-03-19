import { ai as ssr_context, ae as fallback, af as bind_props } from "./index.js";
function onDestroy(fn) {
  /** @type {SSRContext} */
  ssr_context.r.on_destroy(fn);
}
function Editor($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let content = fallback($$props["content"], "");
    let filePath = fallback($$props["filePath"], "");
    let onChange = fallback($$props["onChange"], () => {
    });
    onDestroy(() => {
    });
    function setContent(newContent) {
      return;
    }
    $$renderer2.push(`<div class="editor-wrapper svelte-1ctqrjb"></div>`);
    bind_props($$props, { content, filePath, onChange, setContent });
  });
}
export {
  Editor as E
};
