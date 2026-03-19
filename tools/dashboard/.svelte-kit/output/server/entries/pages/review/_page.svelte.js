import { ae as fallback, c as escape_html, e as ensure_array_like, af as bind_props, i as head, a as attr } from "../../../chunks/index.js";
function ReviewStream($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let lines = fallback($$props["lines"], () => [], true);
    let done = fallback($$props["done"], false);
    let error = fallback($$props["error"], null);
    $$renderer2.push(`<div class="review-stream svelte-143s0k8">`);
    if (error) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="review-stream__error svelte-143s0k8" role="alert"><strong class="svelte-143s0k8">Error:</strong> ${escape_html(error)}</div>`);
    } else {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push(`<div class="review-stream__output svelte-143s0k8" aria-live="polite" aria-label="Review output"><!--[-->`);
      const each_array = ensure_array_like(lines);
      for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
        let line = each_array[$$index];
        $$renderer2.push(`<p class="review-stream__line svelte-143s0k8">${escape_html(line)}</p>`);
      }
      $$renderer2.push(`<!--]--> `);
      if (!done && lines.length > 0) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<span class="review-stream__cursor svelte-143s0k8" aria-hidden="true">▌</span>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--> `);
      if (done && lines.length === 0) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<p class="review-stream__empty svelte-143s0k8">No output received.</p>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--></div>`);
    }
    $$renderer2.push(`<!--]--> `);
    if (done) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="review-stream__done svelte-143s0k8">Review complete.</div>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div>`);
    bind_props($$props, { lines, done, error });
  });
}
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let filePath = "";
    let deep = false;
    let done = false;
    let streamErr = null;
    let lines = [];
    head("1mr7uv1", $$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>Review — Claude Sidekick</title>`);
      });
    });
    $$renderer2.push(`<div class="review-page svelte-1mr7uv1"><header class="review-page__header svelte-1mr7uv1"><h1 class="review-page__title svelte-1mr7uv1">Multi-Model Review</h1> <p class="review-page__subtitle svelte-1mr7uv1">Run consensus code review using multiple AI models simultaneously.</p></header> <form class="review-page__form svelte-1mr7uv1" aria-label="Review configuration"><div class="review-page__field svelte-1mr7uv1"><label class="review-page__label svelte-1mr7uv1" for="file-path">File path (relative to project root)</label> <input id="file-path" type="text" class="review-page__input svelte-1mr7uv1"${attr("value", filePath)} placeholder="e.g. cli/src/scaffold.js" required="" aria-describedby="file-path-hint"/> <p id="file-path-hint" class="review-page__hint svelte-1mr7uv1">Enter a path relative to the project root. The file will be reviewed by multiple models.</p></div> <div class="review-page__field review-page__field--inline svelte-1mr7uv1"><label class="review-page__label--inline svelte-1mr7uv1"><input type="checkbox"${attr("checked", deep, true)} class="review-page__checkbox svelte-1mr7uv1"/> Deep review (slower, more thorough)</label></div> <button type="submit" class="review-page__btn svelte-1mr7uv1"${attr("disabled", !filePath.trim(), true)} aria-label="Start code review">${escape_html("Start Review")}</button></form> `);
    if (lines.length > 0 || streamErr || done) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<section class="review-page__results" aria-label="Review results"><h2 class="review-page__results-title svelte-1mr7uv1">Results</h2> <div class="review-page__stream svelte-1mr7uv1">`);
      ReviewStream($$renderer2, { lines, done, error: streamErr });
      $$renderer2.push(`<!----></div></section>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div>`);
  });
}
export {
  _page as default
};
