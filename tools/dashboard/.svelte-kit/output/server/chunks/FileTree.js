import { ae as fallback, ag as attr_style, e as ensure_array_like, a as attr, c as escape_html, b as attr_class, af as bind_props, ah as stringify } from "./index.js";
function FileTree($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let nodes = fallback($$props["nodes"], () => [], true);
    let onSelect = fallback($$props["onSelect"], () => {
    });
    let selectedPath = fallback($$props["selectedPath"], null);
    let depth = fallback($$props["depth"], 0);
    function getIcon(node) {
      if (node.isDir) return "📁";
      if (node.name.endsWith(".md")) return "📄";
      if (node.name.endsWith(".json")) return "📋";
      if (node.name.endsWith(".yaml") || node.name.endsWith(".yml")) return "⚙️";
      return "📝";
    }
    $$renderer2.push(`<ul class="file-tree svelte-124nk1e" role="tree"${attr_style(`padding-inline-start: ${stringify(depth > 0 ? "1rem" : "0")};`)}><!--[-->`);
    const each_array = ensure_array_like(nodes);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let node = each_array[$$index];
      $$renderer2.push(`<li role="treeitem"${attr("aria-expanded", node.isDir ? "true" : void 0)}${attr("aria-selected", selectedPath === node.path ? "true" : "false")}>`);
      if (node.isDir) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<span class="file-tree__dir svelte-124nk1e"><span class="file-tree__icon svelte-124nk1e" aria-hidden="true">${escape_html(getIcon(node))}</span> <span class="file-tree__name svelte-124nk1e">${escape_html(node.name)}</span></span> `);
        if (node.children?.length) {
          $$renderer2.push("<!--[-->");
          FileTree($$renderer2, {
            nodes: node.children,
            onSelect,
            selectedPath,
            depth: depth + 1
          });
          $$renderer2.push(`<!---->`);
        } else {
          $$renderer2.push("<!--[!-->");
        }
        $$renderer2.push(`<!--]-->`);
      } else {
        $$renderer2.push("<!--[!-->");
        $$renderer2.push(`<button${attr_class("file-tree__file svelte-124nk1e", void 0, { "file-tree__file--active": selectedPath === node.path })} type="button"><span class="file-tree__icon svelte-124nk1e" aria-hidden="true">${escape_html(getIcon(node))}</span> <span class="file-tree__name svelte-124nk1e">${escape_html(node.name)}</span></button>`);
      }
      $$renderer2.push(`<!--]--></li>`);
    }
    $$renderer2.push(`<!--]--></ul>`);
    bind_props($$props, { nodes, onSelect, selectedPath, depth });
  });
}
export {
  FileTree as F
};
