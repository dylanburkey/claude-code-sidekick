import { i as head, c as escape_html, a as attr } from "../../../chunks/index.js";
import { F as FileTree } from "../../../chunks/FileTree.js";
import { E as Editor } from "../../../chunks/Editor.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let tree = [];
    let selectedPath = null;
    let content = "";
    let saving = false;
    async function selectFile(path) {
      selectedPath = path;
      const res = await fetch(`/api/files?path=${encodeURIComponent(path)}`);
      if (res.ok) {
        const data = await res.json();
        content = data.content;
        data.content;
      }
    }
    head("1wa1x9n", $$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>Hooks — Claude Sidekick</title>`);
      });
    });
    $$renderer2.push(`<div class="file-editor svelte-1wa1x9n"><header class="file-editor__header svelte-1wa1x9n"><h1 class="file-editor__title svelte-1wa1x9n">Hooks</h1> <p class="file-editor__subtitle svelte-1wa1x9n">Browse and edit hook definition files from .claude/hooks/.</p></header> <div class="file-editor__body svelte-1wa1x9n"><aside class="file-editor__sidebar svelte-1wa1x9n" aria-label="Hook files">`);
    FileTree($$renderer2, { nodes: tree, selectedPath, onSelect: selectFile });
    $$renderer2.push(`<!----></aside> <div class="file-editor__content svelte-1wa1x9n">`);
    if (selectedPath) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="file-editor__toolbar svelte-1wa1x9n"><span class="file-editor__path svelte-1wa1x9n">${escape_html(selectedPath)}</span> <div class="file-editor__actions svelte-1wa1x9n">`);
      {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--> `);
      {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--> <button type="button" class="file-editor__btn svelte-1wa1x9n"${attr("disabled", saving, true)}>${escape_html("Save")}</button></div></div> <div class="file-editor__editor svelte-1wa1x9n">`);
      Editor($$renderer2, {
        content,
        filePath: selectedPath,
        onChange: (v) => v
      });
      $$renderer2.push(`<!----></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push(`<div class="file-editor__placeholder svelte-1wa1x9n"><p>Select a hook file from the sidebar.</p></div>`);
    }
    $$renderer2.push(`<!--]--></div></div></div>`);
  });
}
export {
  _page as default
};
