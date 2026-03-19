
// this file is generated — do not edit it


declare module "svelte/elements" {
	export interface HTMLAttributes<T> {
		'data-sveltekit-keepfocus'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-noscroll'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-preload-code'?:
			| true
			| ''
			| 'eager'
			| 'viewport'
			| 'hover'
			| 'tap'
			| 'off'
			| undefined
			| null;
		'data-sveltekit-preload-data'?: true | '' | 'hover' | 'tap' | 'off' | undefined | null;
		'data-sveltekit-reload'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-replacestate'?: true | '' | 'off' | undefined | null;
	}
}

export {};


declare module "$app/types" {
	export interface AppTypes {
		RouteId(): "/" | "/agents" | "/agents/[name]" | "/api" | "/api/files" | "/api/history" | "/api/phase" | "/api/review" | "/history" | "/hooks" | "/review" | "/skills";
		RouteParams(): {
			"/agents/[name]": { name: string }
		};
		LayoutParams(): {
			"/": { name?: string };
			"/agents": { name?: string };
			"/agents/[name]": { name: string };
			"/api": Record<string, never>;
			"/api/files": Record<string, never>;
			"/api/history": Record<string, never>;
			"/api/phase": Record<string, never>;
			"/api/review": Record<string, never>;
			"/history": Record<string, never>;
			"/hooks": Record<string, never>;
			"/review": Record<string, never>;
			"/skills": Record<string, never>
		};
		Pathname(): "/" | "/agents" | `/agents/${string}` & {} | "/api/files" | "/api/history" | "/api/phase" | "/api/review" | "/history" | "/hooks" | "/review" | "/skills";
		ResolvedPathname(): `${"" | `/${string}`}${ReturnType<AppTypes['Pathname']>}`;
		Asset(): string & {};
	}
}