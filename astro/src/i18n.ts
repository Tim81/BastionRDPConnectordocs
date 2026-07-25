/**
 * Chrome vocabulary. The words around the content, not in it.
 *
 * Page titles are not here. Every translated Markdown file carries its own
 * `title` in frontmatter, and `nav.ts` reads that straight from the content
 * collection for the current locale. This file holds only what has no other
 * source: the four sidebar group headings and a handful of UI labels,
 * "On this page", pager directions, breadcrumb words, the applies-to line,
 * and the language switcher.
 *
 * The vocabulary below is taken verbatim from the live site, which is a
 * human translation of this same product.
 */

export type Locale = 'en' | 'nl' | 'de' | 'fr' | 'es' | 'pt';

export const locales: Locale[] = ['en', 'nl', 'de', 'fr', 'es', 'pt'];

/** Each locale's own name for itself, for the language switcher. */
export const localeNames: Record<Locale, string> = {
  en: 'English',
  nl: 'Nederlands',
  de: 'Deutsch',
  fr: 'Français',
  es: 'Español',
  pt: 'Português',
};

type Dict = Record<string, string>;

const en: Dict = {
  'group.start': 'Getting started',
  'group.connect': 'Connection methods',
  'group.configure': 'Features',
  'group.reference': 'Reference',
  onThisPage: 'On this page',
  previous: 'Previous',
  next: 'Next',
  home: 'Home',
  docs: 'Docs',
  appliesTo: 'Applies to',
  lastReviewed: 'Last reviewed',
  language: 'Language',
};

const nl: Dict = {
  'group.start': 'Aan de slag',
  'group.connect': 'Verbindingsmethoden',
  'group.configure': 'Functies',
  'group.reference': 'Naslag',
  onThisPage: 'Op deze pagina',
  previous: 'Vorige',
  next: 'Volgende',
  home: 'Home',
  docs: 'Documentatie',
  appliesTo: 'Geldt voor',
  lastReviewed: 'Laatst gecontroleerd',
  language: 'Taal',
};

const de: Dict = {
  'group.start': 'Erste Schritte',
  'group.connect': 'Verbindungsmethoden',
  'group.configure': 'Funktionen',
  'group.reference': 'Referenz',
  onThisPage: 'Auf dieser Seite',
  previous: 'Zurück',
  next: 'Weiter',
  home: 'Start',
  docs: 'Dokumentation',
  appliesTo: 'Gilt für',
  lastReviewed: 'Zuletzt geprüft',
  language: 'Sprache',
};

const fr: Dict = {
  'group.start': 'Démarrage',
  'group.connect': 'Méthodes de connexion',
  'group.configure': 'Fonctionnalités',
  'group.reference': 'Référence',
  onThisPage: 'Sur cette page',
  previous: 'Précédent',
  next: 'Suivant',
  home: 'Accueil',
  docs: 'Documentation',
  appliesTo: "S'applique à",
  lastReviewed: 'Dernière révision',
  language: 'Langue',
};

const es: Dict = {
  'group.start': 'Introducción',
  'group.connect': 'Métodos de conexión',
  'group.configure': 'Funciones',
  'group.reference': 'Referencia',
  onThisPage: 'En esta página',
  previous: 'Anterior',
  next: 'Siguiente',
  home: 'Inicio',
  docs: 'Documentación',
  appliesTo: 'Se aplica a',
  lastReviewed: 'Última revisión',
  language: 'Idioma',
};

const pt: Dict = {
  'group.start': 'Introdução',
  'group.connect': 'Métodos de ligação',
  'group.configure': 'Funcionalidades',
  'group.reference': 'Referência',
  onThisPage: 'Nesta página',
  previous: 'Anterior',
  next: 'Seguinte',
  home: 'Início',
  docs: 'Documentação',
  appliesTo: 'Aplica-se a',
  lastReviewed: 'Última revisão',
  language: 'Idioma',
};

const dicts: Record<Locale, Dict> = { en, nl, de, fr, es, pt };

/**
 * Looks up `key` for `locale`. Falls back to the English value when the
 * locale is unknown or missing that key, so a translation gap degrades to
 * English rather than showing a raw key on the page.
 */
export function t(locale: string, key: string): string {
  const dict = dicts[locale as Locale];
  return dict?.[key] ?? en[key] ?? key;
}
