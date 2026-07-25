/**
 * Navigation — the single source of truth for the docs sidebar.
 *
 * This is the "add one entry, nothing else" contract: a new page means one
 * new `{ slug, title }` in the right group below. `Rail.astro` renders this
 * data and marks the current page; `Pager.astro` flattens it to derive
 * previous/next. Nothing else in the project hand-maintains a page list.
 *
 * `slug` is `null` for sections the legacy site linked to but never wrote
 * content for (they were `href="#"` in the hand-built prototype). They still
 * render in the rail as inert placeholders, matching the prototype, but they
 * are excluded from the pager's previous/next flattening since there is
 * nothing to page to.
 *
 * The `title` on each entry is English, and stays that way even where
 * translations exist. It is the fallback shown when a locale has no
 * Markdown file for that slug yet. The actual per-locale title comes from
 * that file's own frontmatter, read via `titlesForLocale` below. Group
 * headings work the same way in spirit but have no English fallback text
 * here at all: `group.key` maps to a label in `src/i18n.ts`.
 */

import { getCollection } from 'astro:content';

export type GroupKey = 'start' | 'connect' | 'configure' | 'reference';

export interface NavEntry {
  title: string;
  slug: string | null;
}

export interface NavGroup {
  key: GroupKey;
  entries: NavEntry[];
}

export const nav: NavGroup[] = [
  {
    key: 'start',
    entries: [
      { title: 'Overview', slug: 'overview' },
      { title: 'Requirements', slug: 'requirements' },
      { title: 'Install', slug: 'install' },
      { title: 'Sign in', slug: 'sign-in' },
    ],
  },
  {
    key: 'connect',
    entries: [
      { title: 'Connection methods', slug: 'connection-methods' },
      { title: 'Connect to an IP address', slug: 'connect-ip' },
      { title: 'Connect to an Azure VM', slug: 'connect-vm' },
      { title: 'Active tunnels', slug: 'active-tunnels' },
    ],
  },
  {
    key: 'configure',
    entries: [
      { title: 'Monitors', slug: 'monitors' },
      { title: 'Entra ID authentication', slug: 'entra-id' },
      { title: 'Multiple tenants', slug: 'tenants' },
      { title: 'Files and settings', slug: 'files-and-settings' },
    ],
  },
  {
    key: 'reference',
    entries: [
      { title: 'Troubleshooting', slug: 'troubleshooting' },
      { title: 'Diagnostics', slug: 'diagnostics' },
      { title: 'Release notes', slug: 'release-notes' },
    ],
  },
];

/** Flattened, in sidebar order, real pages only — what `Pager.astro` walks. */
export const flatNav: { title: string; slug: string }[] = nav
  .flatMap((group) => group.entries)
  .filter((entry): entry is { title: string; slug: string } => entry.slug !== null);

/** The group key a slug lives under, for the breadcrumb. Translate it with `t(locale, \`group.${key}\`)` from `src/i18n.ts`. */
export function groupKeyFor(slug: string): GroupKey | undefined {
  return nav.find((g) => g.entries.some((e) => e.slug === slug))?.key;
}

/**
 * Base-aware root href, e.g. `/BastionRDPConnectordocs/next/`. Always
 * English. The landing page this points at has no translation yet.
 * `import.meta.env.BASE_URL` reflects the `base` set in astro.config.mjs —
 * reading it here means nothing in the project hardcodes the subpath.
 */
export function baseHref(): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return `${base}/`;
}

/**
 * Base-aware href for a docs page, e.g. `/BastionRDPConnectordocs/next/overview/`
 * for English or `/BastionRDPConnectordocs/next/nl/overview/` for Dutch.
 * `locale` is optional and defaults to English, which keeps every existing
 * single-argument call (the landing page, `LandingLayout`) working as-is.
 * English has no prefix, per `prefixDefaultLocale: false` in astro.config.mjs.
 */
export function pageHref(slug: string, locale?: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const prefix = locale && locale !== 'en' ? `${locale}/` : '';
  return `${base}/${prefix}${slug}/`;
}

/**
 * Page titles for one locale, keyed by the locale-independent slug used
 * throughout `nav.ts`. Read straight from each Markdown file's own
 * frontmatter `title`. Translating a page's name in the sidebar means
 * editing that one file, not a second slug-to-title table here.
 */
export async function titlesForLocale(locale: string): Promise<Map<string, string>> {
  const entries = await getCollection('docs');
  const titles = new Map<string, string>();
  for (const entry of entries) {
    const [entryLocale, ...rest] = entry.id.split('/');
    if (entryLocale === locale) {
      titles.set(rest.join('/'), entry.data.title);
    }
  }
  return titles;
}

/** Resolves a nav entry's title for `locale`, falling back to the English title in `nav.ts` when that locale has no file for the slug yet. */
export function resolveTitle(titles: Map<string, string>, entry: NavEntry): string {
  return (entry.slug ? titles.get(entry.slug) : undefined) ?? entry.title;
}

/**
 * Which locales have a translation of `slug`, used by the language
 * switcher to link to the equivalent page only where one exists, and to
 * that locale's overview otherwise, instead of a URL that would 404.
 */
export async function localesWithSlug(slug: string): Promise<Set<string>> {
  const entries = await getCollection('docs');
  const withSlug = new Set<string>();
  for (const entry of entries) {
    const [entryLocale, ...rest] = entry.id.split('/');
    if (rest.join('/') === slug) withSlug.add(entryLocale);
  }
  return withSlug;
}
