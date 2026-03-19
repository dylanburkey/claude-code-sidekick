import { i as head, c as escape_html, a as attr } from "../../../chunks/index.js";
import { F as FileTree } from "../../../chunks/FileTree.js";
import { E as Editor } from "../../../chunks/Editor.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let tree = [];
    let selectedPath = null;
    let content = "";
    let saving = false;
    let loadErr = null;
    async function selectFile(path) {
      selectedPath = path;
      loadErr = null;
      const res = await fetch(`/api/files?path=${encodeURIComponent(path)}`);
      if (res.ok) {
        const data = await res.json();
        content = data.content;
        data.content;
      } else {
        loadErr = `Failed to load ${path}`;
      }
    }
    head("h3sa6j", $$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>Agents — Claude Sidekick</title>`);
      });
    });
    $$renderer2.push(`<div class="file-editor svelte-h3sa6j"><header class="file-editor__header svelte-h3sa6j"><h1 class="file-editor__title svelte-h3sa6j">Agents</h1> <p class="file-editor__subtitle svelte-h3sa6j">Browse and edit agent definition files.</p></header> <div class="file-editor__body svelte-h3sa6j"><aside class="file-editor__sidebar svelte-h3sa6j" aria-label="Agent files">`);
    FileTree($$renderer2, { nodes: tree, selectedPath, onSelect: selectFile });
    $$renderer2.push(`<!----></aside> <div class="file-editor__content svelte-h3sa6j">`);
    if (loadErr) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="file-editor__alert svelte-h3sa6j" role="alert">${escape_html(loadErr)}</div>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> `);
    if (selectedPath) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="file-editor__toolbar svelte-h3sa6j"><span class="file-editor__path svelte-h3sa6j">${escape_html(selectedPath)}</span> <div class="file-editor__actions svelte-h3sa6j">`);
      {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--> `);
      {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--> <button type="button" class="file-editor__btn svelte-h3sa6j"${attr("disabled", saving, true)} aria-label="Save file">${escape_html("Save")}</button></div></div> <div class="file-editor__editor svelte-h3sa6j">`);
      Editor($$renderer2, {
        content,
        filePath: selectedPath,
        onChange: (val) => val
      });
      $$renderer2.push(`<!----></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push(`<div class="file-editor__placeholder svelte-h3sa6j"><p>Select an agent file from the sidebar to edit it.</p></div>`);
    }
    $$renderer2.push(`<!--]--></div></div></div>`);
  });
}
export {
  _page as default
};
