export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set([]),
	mimeTypes: {},
	_: {
		client: {start:"_app/immutable/entry/start.pLNKgCra.js",app:"_app/immutable/entry/app.BVDNpiAH.js",imports:["_app/immutable/entry/start.pLNKgCra.js","_app/immutable/chunks/FGktreMj.js","_app/immutable/chunks/BlbD1D1N.js","_app/immutable/chunks/xwCKsplZ.js","_app/immutable/entry/app.BVDNpiAH.js","_app/immutable/chunks/BlbD1D1N.js","_app/immutable/chunks/DX63-N0w.js","_app/immutable/chunks/C9f0I-2d.js","_app/immutable/chunks/BP-BiP18.js","_app/immutable/chunks/BXSy5WS_.js","_app/immutable/chunks/O5oXyVZb.js","_app/immutable/chunks/xwCKsplZ.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js')),
			__memo(() => import('./nodes/3.js')),
			__memo(() => import('./nodes/4.js')),
			__memo(() => import('./nodes/5.js')),
			__memo(() => import('./nodes/6.js')),
			__memo(() => import('./nodes/7.js')),
			__memo(() => import('./nodes/8.js'))
		],
		remotes: {
			
		},
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			},
			{
				id: "/agents",
				pattern: /^\/agents\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 3 },
				endpoint: null
			},
			{
				id: "/agents/[name]",
				pattern: /^\/agents\/([^/]+?)\/?$/,
				params: [{"name":"name","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,], errors: [1,], leaf: 4 },
				endpoint: null
			},
			{
				id: "/api/files",
				pattern: /^\/api\/files\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/api/files/_server.js'))
			},
			{
				id: "/api/history",
				pattern: /^\/api\/history\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/api/history/_server.js'))
			},
			{
				id: "/api/phase",
				pattern: /^\/api\/phase\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/api/phase/_server.js'))
			},
			{
				id: "/api/review",
				pattern: /^\/api\/review\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/api/review/_server.js'))
			},
			{
				id: "/history",
				pattern: /^\/history\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 5 },
				endpoint: null
			},
			{
				id: "/hooks",
				pattern: /^\/hooks\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 6 },
				endpoint: null
			},
			{
				id: "/review",
				pattern: /^\/review\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 7 },
				endpoint: null
			},
			{
				id: "/skills",
				pattern: /^\/skills\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 8 },
				endpoint: null
			}
		],
		prerendered_routes: new Set([]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();

export const prerendered = new Set([]);

export const base = "";