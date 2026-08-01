# Font metrics and the screen collision check

Two browser snippets support the schematic screens. Both need a built site
with the webfonts loaded, so run `npm run build && npm run preview` first and
open any page carrying an `.appshot` figure, for example
`/BastionRDPConnectordocs/next/de/connect-vm/`.

## Why measured metrics

The screens carry the application's own labels in six languages, and the
labels decide where the next control starts. Estimating width as
`characters x font-size x constant` does not work: across these locales the
real per-character ratio runs from **0.446** for "All subscriptions" to
**0.631** for "VM-Abonnement", a 1.4x spread. A constant tuned to English put
the "Alle Abonnements" radio button on top of the "VM-Abonnement" label.

`src/font-metrics.ts` therefore holds a per-character advance table measured
from the real fonts, and `tw()` in `src/components/screen.ts` sums it.

## 1. Regenerate the metrics

Paste into the devtools console, save the result as `metrics.json`, then run
`node scripts/gen-metrics.mjs metrics.json`.

```js
(() => {
  const svg = document.querySelector('.appshot svg');
  const NS = 'http://www.w3.org/2000/svg';
  const charset =
    ' !"#$%&\'()*+,-./0123456789:;<=>?@' +
    'ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`' +
    'abcdefghijklmnopqrstuvwxyz{|}~' +
    'áàâäãåéèêëíìîïóòôöõúùûüçñýÁÀÂÄÃÅÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜÇÑß' +
    '…·→↻ℹ°';
  const REF = 100;
  const measure = (cls) => {
    const table = {};
    for (const ch of charset) {
      const t = document.createElementNS(NS, 'text');
      t.setAttribute('class', cls);
      t.setAttribute('style', `font-size:${REF}px`);
      t.textContent = ch;
      svg.appendChild(t);
      table[ch] = +(t.getComputedTextLength() / REF).toFixed(4);
      svg.removeChild(t);
    }
    return table;
  };
  return { sans: measure('ui-tb'), bold: measure('ui-bt'), mono: measure('ui-v') };
})()
```

Rerun this whenever the fonts in `DocsLayout.astro` change.

## 2. Check every locale for collisions

Run after changing any screen component. It fetches each locale's copy of a
page, lays the figures out off-screen, and reports text that leaves the window
or lands on top of another label or a radio button. Expect `issues: []`
everywhere.

```js
(async () => {
  const base = location.origin + '/BastionRDPConnectordocs/next';
  const page = 'connect-vm';            // change per page under test
  const locales = [['en',''],['nl','/nl'],['de','/de'],['fr','/fr'],['es','/es'],['pt','/pt']];
  const holder = document.createElement('div');
  holder.style.cssText = 'position:absolute;left:-9999px;top:0;visibility:hidden;width:1200px';
  document.body.appendChild(holder);
  const box = (el) => { const b = el.getBBox(); return { x: b.x, y: b.y, r: b.x + b.width, b: b.y + b.height }; };
  const hit = (a, c) => a.x < c.r - 0.4 && c.x < a.r - 0.4 && a.y < c.b - 0.4 && c.y < a.b - 0.4;
  const out = {};
  for (const [loc, path] of locales) {
    const html = await (await fetch(`${base}${path}/${page}/`)).text();
    const doc = new DOMParser().parseFromString(html, 'text/html');
    holder.innerHTML = '';
    doc.querySelectorAll('.appshot').forEach(f => holder.appendChild(document.importNode(f, true)));
    await new Promise(r => requestAnimationFrame(r));
    const issues = [];
    holder.querySelectorAll('svg').forEach((svg, si) => {
      const texts = [...svg.querySelectorAll('text')].filter(t => t.textContent.trim());
      texts.forEach(t => { if (box(t).r > 291) issues.push(`[${si}] outside: "${t.textContent}"`); });
      for (let i = 0; i < texts.length; i++)
        for (let j = i + 1; j < texts.length; j++)
          if (hit(box(texts[i]), box(texts[j])))
            issues.push(`[${si}] text/text: "${texts[i].textContent}" x "${texts[j].textContent}"`);
      [...svg.querySelectorAll('circle')].forEach(c => {
        const cb = box(c);
        texts.forEach(t => { if (hit(box(t), cb)) issues.push(`[${si}] text/radio: "${t.textContent}"`); });
      });
    });
    out[loc] = { figures: holder.querySelectorAll('svg').length, issues };
  }
  holder.remove();
  return out;
})()
```
