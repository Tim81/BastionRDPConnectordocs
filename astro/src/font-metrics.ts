// GENERATED FILE — do not edit by hand.
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
  [" ", 0],
  ["·", 0.103],
  ["'", 0.232],
  ["ijlíìîï", 0.24],
  ["|", 0.242],
  ["IÍÌÎÏ", 0.2541],
  [",.:;", 0.2551],
  ["!", 0.273],
  ["ℹ", 0.3267],
  ["`f", 0.354],
  ["r", 0.375],
  ["t", 0.3771],
  ["\"", 0.384],
  ["°", 0.386],
  ["1", 0.391],
  ["()[]{}", 0.406],
  ["*", 0.408],
  ["_", 0.4261],
  ["/\\", 0.443],
  ["J", 0.455],
  ["s", 0.473],
  ["z", 0.496],
  ["-", 0.5061],
  ["vyý", 0.523],
  ["+<=>^~", 0.531],
  ["7", 0.532],
  ["acáàâäãåç", 0.5331],
  ["k", 0.535],
  ["2", 0.545],
  ["x", 0.551],
  ["eéèêë", 0.564],
  ["?", 0.567],
  ["35", 0.574],
  ["8", 0.582],
  ["oóòôöõ", 0.584],
  ["L", 0.588],
  ["uúùûü", 0.589],
  ["6hnñ", 0.599],
  ["4", 0.6],
  ["F", 0.6021],
  ["bdgpq", 0.606],
  ["$S", 0.608],
  ["9", 0.61],
  ["ß", 0.612],
  ["Z", 0.6231],
  ["B", 0.636],
  ["EÉÈÊË", 0.638],
  ["T", 0.648],
  ["…", 0.655],
  ["PR", 0.656],
  ["0", 0.6661],
  ["Y", 0.676],
  ["X", 0.688],
  ["K", 0.692],
  ["UÚÙÛÜ", 0.712],
  ["#", 0.716],
  ["AVÁÀÂÄÃÅ", 0.728],
  ["HNÑ", 0.736],
  ["CÇ", 0.7411],
  ["D", 0.752],
  ["&", 0.755],
  ["G", 0.765],
  ["w", 0.767],
  ["↻", 0.7817],
  ["%OÓÒÔÖÕ", 0.786],
  ["Q", 0.787],
  ["@", 0.8531],
  ["→", 0.8628],
  ["M", 0.906],
  ["m", 0.922],
  ["W", 1.089],
]);

/** Instrument Sans 600 — .ui-bt, the button captions */
export const BOLD: Table = expand([
  [" ", 0],
  ["·", 0.144],
  ["|", 0.2341],
  ["IÍÌÎÏ", 0.2541],
  ["'", 0.256],
  ["ijlíìîï", 0.2601],
  [",.:;", 0.275],
  ["!", 0.295],
  ["ℹ", 0.3267],
  ["`", 0.354],
  ["f", 0.37],
  ["°", 0.3731],
  ["1", 0.387],
  ["r", 0.39],
  ["t", 0.406],
  ["J", 0.427],
  ["*", 0.43],
  ["()[]{}", 0.439],
  ["/\\", 0.444],
  ["\"", 0.449],
  ["_", 0.466],
  ["-", 0.493],
  ["s", 0.494],
  ["z", 0.513],
  ["vyý", 0.536],
  ["+<=>^~", 0.544],
  ["cç", 0.552],
  ["2", 0.557],
  ["akáàâäãå", 0.558],
  ["7", 0.561],
  ["eéèêë", 0.571],
  ["3", 0.579],
  ["?", 0.58],
  ["5", 0.5811],
  ["x", 0.587],
  ["L", 0.589],
  ["F", 0.594],
  ["oóòôöõ", 0.5971],
  ["8", 0.598],
  ["uúùûü", 0.604],
  ["hnñ", 0.612],
  ["46", 0.615],
  ["9", 0.619],
  ["bdgpq", 0.621],
  ["EÉÈÊË", 0.63],
  ["Zß", 0.631],
  ["$S", 0.637],
  ["B", 0.6451],
  ["RT", 0.664],
  ["P", 0.667],
  ["0", 0.6771],
  ["Y", 0.7],
  ["UÚÙÛÜ", 0.704],
  ["X", 0.707],
  ["K", 0.712],
  ["HNÑ", 0.7251],
  ["#", 0.727],
  ["…", 0.728],
  ["AVÁÀÂÄÃÅ", 0.733],
  ["CÇ", 0.747],
  ["D", 0.755],
  ["G", 0.764],
  ["&", 0.768],
  ["%", 0.786],
  ["OÓÒÔÖÕ", 0.794],
  ["w", 0.8],
  ["↻", 0.8018],
  ["Q", 0.806],
  ["→", 0.8628],
  ["@", 0.867],
  ["M", 0.898],
  ["m", 0.941],
  ["W", 1.087],
]);

/** DM Mono 400 — .ui-v, the values. Monospaced for the Latin set; the few
    symbols that DM Mono does not carry fall back to another face and are
    measured here at their real width. */
export const MONO: Table = expand([
  [" ", 0],
  ["ℹ", 0.3267],
  ["→", 0.5498],
  ["0123456789!\"#$%&'()*+,-./:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~áàâäãåéèêëíìîïóòôöõúùûüçñýÁÀÂÄÃÅÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜÇÑß…·°", 0.6],
  ["↻", 0.7817],
]);

/** The uniform DM Mono advance, for the ordinary Latin characters. */
export const MONO_ADVANCE = 0.6;

/** Advance assumed for a character missing from the tables. */
export const FALLBACK = 0.55;
