// Converts a docs page from an inlined <figure class="appshot"> SVG to the
// shared component, and renames it .md -> .mdx.
//
// The figures were copied by hand into six locales, which is how the German
// screen ended up saying "Monitore" where the application says
// "Monitor-Konfiguration". After this runs there is one drawing per screen.
//
// Usage: node scripts/to-mdx.mjs <Component> <slug> [...slug]
import { readFile, writeFile, unlink } from 'node:fs/promises';

const [component, ...slugs] = process.argv.slice(2);
const LOCALES = ['en', 'nl', 'de', 'fr', 'es', 'pt'];
const BASE = 'src/content/docs';

const figureRe = /(?:[ \t]*<!--\s*Mirrors[^>]*-->\s*\n)?[ \t]*<figure class="appshot">[\s\S]*?<\/figure>\n?/g;
const platformRe = /<figcaption><b>([^<]*)<\/b>([\s\S]*?)<\/figcaption>/;

for (const slug of slugs) {
  for (const loc of LOCALES) {
    const src = `${BASE}/${loc}/${slug}.md`;
    let text;
    try {
      text = await readFile(src, 'utf8');
    } catch {
      console.log(`skip  ${loc}/${slug} (no such file)`);
      continue;
    }

    let n = 0;
    const body = text.replace(figureRe, (block) => {
      const m = block.match(platformRe);
      const props = [];
      if (m) {
        const label = m[1].trim().toLowerCase();
        if (label === 'macos') props.push('platform="macos"');
        else if (label === 'windows') props.push('platform="windows"');
        const caption = m[2].replace(/\s+/g, ' ').trim();
        if (caption) props.push(`caption={\`${caption.replace(/`/g, '\\`').replace(/\$\{/g, '\\${')}\`}`);
      }
      props.push(`lang="${loc}"`);
      n += 1;
      return `<${component} ${props.join(' ')} />\n`;
    });

    if (!n) {
      console.log(`skip  ${loc}/${slug} (no figure found)`);
      continue;
    }

    // Drop the import in right after the frontmatter block.
    const fmEnd = body.indexOf('\n---', 3) + 4;
    const withImport =
      body.slice(0, fmEnd) +
      `\nimport ${component} from '../../../components/${component}.astro';\n` +
      body.slice(fmEnd);

    await writeFile(`${BASE}/${loc}/${slug}.mdx`, withImport, 'utf8');
    await unlink(src);
    console.log(`ok    ${loc}/${slug}.mdx  (${n} figure${n > 1 ? 's' : ''})`);
  }
}
