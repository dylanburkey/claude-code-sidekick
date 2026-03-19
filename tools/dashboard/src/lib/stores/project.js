import { writable } from 'svelte/store';

export const phaseState = writable(null);
export const taskStats = writable({ total: 0, pending: 0, complete: 0, blocked: 0 });
export const currentFile = writable({ path: null, content: '' });
export const reviewResults = writable([]);
