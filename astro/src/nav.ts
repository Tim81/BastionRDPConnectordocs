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
 */

export interface NavEntry {
  title: string;
  slug: string | null;
}

export interface NavGroup {
  title: string;
  entries: NavEntry[];
}

export const nav: NavGroup[] = [
  {
    title: 'Get started',
    entries: [
      { title: 'Overview', slug: 'overview' },
      { title: 'Requirements', slug: null },
      { title: 'Install', slug: null },
      { title: 'Sign in', slug: null },
    ],
  },
  {
    title: 'Connect',
    entries: [
      { title: 'Connection methods', slug: 'connection-methods' },
      { title: 'Connect to an IP address', slug: null },
      { title: 'Connect to an Azure VM', slug: null },
      { title: 'Active tunnels', slug: null },
    ],
  },
  {
    title: 'Configure',
    entries: [
      { title: 'Monitors', slug: null },
      { title: 'Entra ID authentication', slug: null },
      { title: 'Multiple tenants', slug: null },
      { title: 'Files and settings', slug: null },
    ],
  },
  {
    title: 'Reference',
    entries: [
      { title: 'Troubleshooting', slug: null },
      { title: 'Diagnostics', slug: null },
      { title: 'Release notes', slug: null },
    ],
  },
];

/** Flattened, in sidebar order, real pages only — what `Pager.astro` walks. */
export const flatNav: { title: string; slug: string }[] = nav
  .flatMap((group) => group.entries)
  .filter((entry): entry is { title: string; slug: string } => entry.slug !== null);

/** The group heading a slug lives under, for the breadcrumb. */
export function groupTitleFor(slug: string): string {
  const group = nav.find((g) => g.entries.some((e) => e.slug === slug));
  return group?.title ?? '';
}

/**
 * Base-aware root href, e.g. `/BastionRDPConnectordocs/next/`.
 * `import.meta.env.BASE_URL` reflects the `base` set in astro.config.mjs —
 * reading it here means nothing in the project hardcodes the subpath.
 */
export function baseHref(): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return `${base}/`;
}

/** Base-aware href for an English docs page, e.g. `/BastionRDPConnectordocs/next/overview/`. */
export function pageHref(slug: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return `${base}/${slug}/`;
}
