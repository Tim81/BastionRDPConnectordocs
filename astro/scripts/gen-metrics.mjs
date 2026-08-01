// One-off generator for src/font-metrics.ts from a metrics.json produced by
// the measurement snippet in scripts/measure-font.md.
//
// Usage: node scripts/gen-metrics.mjs <metrics.json>
import { readFile, writeFile } from 'node:fs/promises';

const m = JSON.parse(await readFile(process.argv[2], 'utf8'));

const enc = (t) => {
  const byW = {};
  for (const [c, w] of Object.entries(t)) (byW[w] ||= []).push(c);
  return Object.entries(byW)
    .sort((a, b) => Number(a[0]) - Number(b[0]))
    .map(([w, cs]) => `  [${JSON.stringify(cs.join(''))}, ${w}],`)
    .join('\n');
};

const monoW = [...new Set(Object.values(m.mono))];

const out = `// GENERATED FILE — do not edit by hand.
//
// Per-character advance widths for the fonts the schematic screens draw with,
// as a fraction of font-size. Measured in a real browser with the webfonts
// loaded, via getComputedTextLength on one character at a time.
//
// This exists because a single average character width cannot work. Across the
// six locales the real ratio runs from 0.446 for "All subscriptions" to 0.631
// for "VM-Abonnement" — a 1.4x spread. Estimating with one constant is what put
// the "Alle Abonnements" radio button on top of the "VM-Abonnement" label in
// the German screen.
//
// Regenerate with the snippet in scripts/measure-font.md, then:
//   node scripts/gen-metrics.mjs metrics.json

type Table = Record<string, number>;

function expand(pairs: [string, number][]): Table {
  const t: Table = {};
  for (const [chars, w] of pairs) for (const c of chars) t[c] = w;
  return t;
}

/** Instrument Sans 400 — .ui-tb, .ui-l, .ui-p */
export const SANS: Table = expand([
${enc(m.sans)}
]);

/** Instrument Sans 600 — .ui-bt, the button captions */
export const BOLD: Table = expand([
${enc(m.bold)}
]);

/** DM Mono 400 — .ui-v, the values. Monospaced for the Latin set; the few
    symbols that DM Mono does not carry fall back to another face and are
    measured here at their real width. */
export const MONO: Table = expand([
${enc(m.mono)}
]);

/** The uniform DM Mono advance, for the ordinary Latin characters. */
export const MONO_ADVANCE = ${m.mono['a']};

/** Advance assumed for a character missing from the tables. */
export const FALLBACK = 0.55;
`;

await writeFile('src/font-metrics.ts', out, 'utf8');
console.log(`written — sans ${Object.keys(m.sans).length} chars, mono advances: ${monoW.length}`);
