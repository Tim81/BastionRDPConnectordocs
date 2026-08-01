// Helpers shared by the schematic screen components.
//
// The screens are drawn at roughly 0.47 of the application's real pixel size,
// and they carry the application's own strings in six languages. German and
// Spanish labels run considerably longer than English, so nothing in a screen
// may assume an English-sized label: positions that follow a label are
// measured, and long help text is wrapped rather than truncated.
import { s, lines, type Lang } from '../ui-strings';
import { SANS, BOLD, MONO, FALLBACK } from '../font-metrics';

/** Which of the three faces a run of text is drawn in. */
export type Font = 'sans' | 'bold' | 'mono';

export { s, lines };
export type { Lang };

/**
 * Rendered width of a label, in SVG units, summed from the measured advance
 * of each character.
 *
 * An average character width was tried first and does not work: across these
 * six locales the real per-character ratio runs from 0.446 to 0.631, so a
 * constant that suits English lets German overrun. "VM-Abonnement" measures
 * 50.0 units at 6.1px where the constant predicted 44.4, and the radio button
 * positioned after it landed on top of the label.
 */
export function tw(text: string, size = 7, font: Font = 'sans'): number {
  const table = font === 'bold' ? BOLD : font === 'mono' ? MONO : SANS;
  let em = 0;
  for (const ch of text) em += table[ch] ?? FALLBACK;
  // Kerning is not modelled, and a label that just touches the next control
  // reads as a bug. Two percent covers both.
  return em * size * 1.02;
}

/**
 * Width for a button that must contain its own label. German turns Refresh
 * into "Aktualisieren" and Logout into "Abmelden", so every button in these
 * screens is sized from the label rather than from a number that happened to
 * fit the English one.
 */
export function btnW(label: string, size = 7, pad = 12, min = 20, font: Font = 'sans'): number {
  return Math.max(min, Math.round(tw(label, size, font) + pad));
}

/**
 * Largest type size at which a row of labels still fits the space it has.
 *
 * Radio buttons sit side by side in the real window, and the labels are the
 * application's own, so the drawing cannot shorten them. French
 * "Tous les abonnements" beside "Abonnement VM" overruns the column at the
 * nominal size where German and English do not; stepping that one row down
 * keeps the layout honest without shrinking every screen to the worst case.
 */
export function fitRow(
  labels: string[],
  available: number,
  gaps: number,
  max = 7,
  min = 4.8,
): number {
  let size = max;
  while (size > min) {
    const used = labels.reduce((a, l) => a + tw(l, size), 0) + gaps;
    if (used <= available) break;
    size -= 0.1;
  }
  return Math.round(size * 10) / 10;
}

/**
 * Trim a value to what its field can actually show. A real Avalonia ComboBox
 * clips its text rather than shrinking it — the application's own VM dropdown
 * reads "vm-fileserver-42 (Identi" — so the schematics clip too, and the
 * available width changes per language because the Refresh button beside the
 * field is sized from its own label.
 */
export function fit(text: string, width: number, size: number, font: Font = 'mono'): string {
  const room = width - 23;
  if (tw(text, size, font) <= room) return text;
  let out = text;
  while (out.length > 1 && tw(out, size, font) > room) out = out.slice(0, -1);
  return out;
}

/**
 * Greedy word wrap to a pixel budget, for the grey help text under a
 * control. Returns at most `maxLines` lines; anything beyond that is dropped,
 * because a schematic that grows to fit German would no longer match the
 * window it is drawing.
 */
export function wrap(text: string, maxWidth: number, maxLines = 3, size = 5.6): string[] {
  const out: string[] = [];
  let line = '';
  for (const word of text.split(/\s+/)) {
    const next = line ? `${line} ${word}` : word;
    if (tw(next, size) > maxWidth && line) {
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
