// Helpers shared by the schematic screen components.
//
// The screens are drawn at roughly 0.47 of the application's real pixel size,
// and they carry the application's own strings in six languages. German and
// Spanish labels run considerably longer than English, so nothing in a screen
// may assume an English-sized label: positions that follow a label are
// measured, and long help text is wrapped rather than truncated.
import { s, lines, type Lang } from '../ui-strings';

export { s, lines };
export type { Lang };

/**
 * Approximate rendered width of a label, in SVG units.
 *
 * Instrument Sans averages close to 0.52em per character across the Latin
 * text these six locales use. This only has to be good enough to keep the
 * next control clear of the previous label, which it is — the alternative is
 * measuring text the browser has not laid out yet.
 */
export function tw(text: string, size = 7): number {
  return text.length * size * 0.56;
}

/**
 * Width for a button that must contain its own label. German turns Refresh
 * into "Aktualisieren" and Logout into "Abmelden", so every button in these
 * screens is sized from the label rather than from a number that happened to
 * fit the English one.
 */
export function btnW(label: string, size = 7, pad = 12, min = 20): number {
  return Math.max(min, Math.round(tw(label, size) + pad));
}

/**
 * Trim a value to what its field can actually show. A real Avalonia ComboBox
 * clips its text rather than shrinking it — the application's own VM dropdown
 * reads "vm-fileserver-42 (Identi" — so the schematics clip too, and the
 * available width changes per language because the Refresh button beside the
 * field is sized from its own label.
 */
export function fit(text: string, width: number, size: number): string {
  const room = Math.floor((width - 19) / (size * 0.56));
  return text.length <= room ? text : text.slice(0, Math.max(0, room));
}

/**
 * Greedy word wrap to a character budget, for the grey help text under a
 * control. Returns at most `maxLines` lines; anything beyond that is dropped,
 * because a schematic that grows to fit German would no longer match the
 * window it is drawing.
 */
export function wrap(text: string, maxChars: number, maxLines = 3): string[] {
  const out: string[] = [];
  let line = '';
  for (const word of text.split(/\s+/)) {
    const next = line ? `${line} ${word}` : word;
    if (next.length > maxChars && line) {
      out.push(line);
      line = word;
      if (out.length === maxLines) return out;
    } else {
      line = next;
    }
  }
  if (line && out.length < maxLines) out.push(line);
  return out;
}

/** The language button shows the language it is currently set to. */
export const LANG_NAME: Record<Lang, string> = {
  en: 'English',
  nl: 'Nederlands',
  de: 'Deutsch',
  fr: 'Français',
  es: 'Español',
  pt: 'Português',
};

/** Region code shown on the language button's flag chip. */
export const LANG_FLAG: Record<Lang, string> = {
  en: 'GB', nl: 'NL', de: 'DE', fr: 'FR', es: 'ES', pt: 'PT',
};
