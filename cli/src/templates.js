export const PRESETS = {
  static: {
    name: 'Static Website',
    description: 'Semantic HTML, Modern CSS, Vanilla JavaScript',
    rules: {
      'Modern JavaScript': true,
      'Modern CSS': true,
      'WCAG AA Accessibility': true,
      'SEO Optimization': true,
      'Semantic HTML': true,
    },
    mcp: {
      'Cloudflare': true,
      'Sentry': true,
    },
    hooks: {
      'Pre-commit': true,
      'Post-save': true,
    },
    dependencies: {},
    devDependencies: {
      'vite': '^5.0.0',
    },
  },

  astro: {
    name: 'Astro Site',
    description: 'Astro 5, Modern CSS, Islands Architecture',
    rules: {
      'Modern JavaScript': true,
      'Astro': true,
      'Modern CSS': true,
      'WCAG AA Accessibility': true,
      'SEO Optimization': true,
    },
    mcp: {
      'GitHub': true,
      'Cloudflare': true,
      'Sentry': true,
    },
    hooks: {
      'Pre-commit': true,
      'Post-save': true,
    },
    dependencies: {
      'astro': '^5.0.0',
    },
    devDependencies: {
      '@astrojs/node': '^8.0.0',
    },
  },

  react: {
    name: 'React App',
    description: 'React, TypeScript, Vite, TanStack',
    rules: {
      'TypeScript': true,
      'React': true,
      'Modern CSS': true,
      'WCAG AA Accessibility': true,
      'TanStack': true,
    },
    mcp: {
      'GitHub': true,
      'Vercel': true,
      'Sentry': true,
    },
    hooks: {
      'Pre-commit': true,
      'Post-save': true,
    },
    dependencies: {
      'react': '^18.3.0',
      'react-dom': '^18.3.0',
      '@tanstack/react-query': '^5.0.0',
    },
    devDependencies: {
      'vite': '^5.0.0',
      '@vitejs/plugin-react': '^4.0.0',
      'typescript': '^5.0.0',
    },
  },

  nextjs: {
    name: 'Next.js App',
    description: 'Next.js 15, App Router, TypeScript, TanStack',
    rules: {
      'TypeScript': true,
      'Next.js': true,
      'React': true,
      'Modern CSS': true,
      'WCAG AA Accessibility': true,
      'TanStack': true,
    },
    mcp: {
      'GitHub': true,
      'Vercel': true,
      'Sentry': true,
    },
    hooks: {
      'Pre-commit': true,
      'Post-save': true,
    },
    dependencies: {
      'next': '^15.0.0',
      'react': '^18.3.0',
      'react-dom': '^18.3.0',
      '@tanstack/react-query': '^5.0.0',
    },
    devDependencies: {
      'typescript': '^5.0.0',
      '@types/react': '^18.0.0',
      '@types/node': '^20.0.0',
    },
  },

  nuxt: {
    name: 'Vue/Nuxt',
    description: 'Vue 3, Nuxt, Composition API, Pinia',
    rules: {
      'TypeScript': true,
      'Nuxt': true,
      'Vue': true,
      'Modern CSS': true,
      'WCAG AA Accessibility': true,
      'Pinia': true,
    },
    mcp: {
      'GitHub': true,
      'Neon Database': true,
      'Vercel': true,
      'Sentry': true,
    },
    hooks: {
      'Pre-commit': true,
      'Post-save': true,
    },
    dependencies: {
      'nuxt': '^3.15.0',
      'vue': '^3.5.0',
      'pinia': '^2.0.0',
    },
    devDependencies: {
      'typescript': '^5.0.0',
    },
  },

  svelte: {
    name: 'SvelteKit',
    description: 'Svelte 5, SvelteKit, Runes, TypeScript',
    rules: {
      'TypeScript': true,
      'SvelteKit': true,
      'Svelte': true,
      'Modern CSS': true,
      'WCAG AA Accessibility': true,
    },
    mcp: {
      'GitHub': true,
      'Vercel': true,
      'Sentry': true,
    },
    hooks: {
      'Pre-commit': true,
      'Post-save': true,
    },
    dependencies: {
      'svelte': '^5.0.0',
      '@sveltejs/kit': '^2.0.0',
    },
    devDependencies: {
      'typescript': '^5.0.0',
      '@sveltejs/adapter-auto': '^3.0.0',
      'vite': '^5.0.0',
    },
  },

  fullstack: {
    name: 'Full Stack',
    description: 'Complete backend + frontend + database stack',
    rules: {
      'TypeScript': true,
      'Node.js': true,
      'Modern CSS': true,
      'WCAG AA Accessibility': true,
      'API Design': true,
      'Database Best Practices': true,
    },
    mcp: {
      'GitHub': true,
      'Neon Database': true,
      'Vercel': true,
      'Sentry': true,
    },
    hooks: {
      'Pre-commit': true,
      'Post-save': true,
      'Pre-push': true,
    },
    dependencies: {
      'fastify': '^5.0.0',
      '@prisma/client': '^6.0.0',
    },
    devDependencies: {
      'prisma': '^6.0.0',
      'typescript': '^5.0.0',
    },
  },
};

export const FEATURE_CONFIGS = {
  '440css': {
    files: ['440css/'],
    dependencies: {},
    description: 'Modern CSS system with design tokens and components',
  },

  database: {
    mcp: ['Neon Database'],
    dependencies: {
      '@prisma/client': '^6.0.0',
    },
    devDependencies: {
      'prisma': '^6.0.0',
    },
    description: 'PostgreSQL database with Prisma ORM',
  },

  auth: {
    dependencies: {
      'next-auth': '^5.0.0',
    },
    description: 'Authentication with NextAuth.js',
  },

  analytics: {
    mcp: ['Sentry'],
    dependencies: {
      '@sentry/node': '^8.0.0',
    },
    description: 'Error tracking and performance monitoring',
  },

  deployment: {
    mcp: ['Vercel', 'Cloudflare'],
    files: ['vercel.json', '.cloudflare/'],
    description: 'Deployment configuration for Vercel and Cloudflare',
  },
};
