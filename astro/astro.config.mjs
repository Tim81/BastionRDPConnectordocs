import { defineConfig } from 'astro/config';

// Azure Bastion RDP Connector docs.
//
// The built site is served from GitHub Pages at
// https://tim81.github.io/BastionRDPConnectordocs/next/ — `base` reflects
// that subpath, and every internal link in this project goes through
// `pageHref` / `baseHref` in `src/nav.ts` (or Astro's own asset pipeline for
// stylesheets) so it stays correct if the repo or path ever changes.
//
// Only English content exists today. The other five locales are wired up
// here so the routing structure is proven before translations exist —
// `prefixDefaultLocale: false` keeps English at the root of `base` instead
// of behind `/en/`.
export default defineConfig({
  site: 'https://tim81.github.io',
  base: '/BastionRDPConnectordocs/next',
  outDir: '../next',
  build: {
    format: 'directory',
  },
  i18n: {
    locales: ['en', 'nl', 'de', 'fr', 'es', 'pt'],
    defaultLocale: 'en',
    routing: {
      prefixDefaultLocale: false,
    },
  },
});
