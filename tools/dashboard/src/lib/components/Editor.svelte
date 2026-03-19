<script>
  import { onMount, onDestroy } from 'svelte';
  import { EditorView, basicSetup } from 'codemirror';
  import { EditorState } from '@codemirror/state';
  import { oneDark } from '@codemirror/theme-one-dark';
  import { json as jsonLang } from '@codemirror/lang-json';
  import { markdown as mdLang } from '@codemirror/lang-markdown';

  export let content = '';
  export let filePath = '';
  export let onChange = () => {};

  let container;
  let view;

  function getLanguage(fp) {
    if (!fp) return [];
    if (fp.endsWith('.json')) return [jsonLang()];
    if (fp.endsWith('.md')) return [mdLang()];
    return [];
  }

  function createEditor(doc, fp) {
    return new EditorView({
      state: EditorState.create({
        doc,
        extensions: [
          basicSetup,
          oneDark,
          ...getLanguage(fp),
          EditorView.updateListener.of((update) => {
            if (update.docChanged) {
              onChange(update.state.doc.toString());
            }
          }),
        ],
      }),
      parent: container,
    });
  }

  onMount(() => {
    view = createEditor(content, filePath);
  });

  onDestroy(() => {
    view?.destroy();
  });

  // When filePath changes, rebuild editor with new language
  $: if (view && filePath) {
    const currentDoc = view.state.doc.toString();
    view.destroy();
    view = createEditor(currentDoc, filePath);
  }

  // When content changes externally (file load), update editor
  export function setContent(newContent) {
    if (!view) return;
    view.dispatch({
      changes: { from: 0, to: view.state.doc.length, insert: newContent },
    });
  }
</script>

<div class="editor-wrapper" bind:this={container}></div>

<style>
  .editor-wrapper {
    height: 100%;
    overflow: auto;
    border-radius: 6px;
    border: 1px solid var(--color-border);
  }

  .editor-wrapper :global(.cm-editor) {
    height: 100%;
    font-family: 'JetBrains Mono', 'Fira Code', 'Cascadia Code', monospace;
    font-size: 0.875rem;
  }

  .editor-wrapper :global(.cm-scroller) {
    overflow: auto;
  }
</style>
