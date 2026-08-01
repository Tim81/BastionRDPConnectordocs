// Reads source/Localization.cs and emits astro/src/ui-strings.ts.
// The schematics must never invent a UI label, so every string in the
// figures comes from here, verbatim from the application.
import { readFile, writeFile } from 'node:fs/promises';

const SRC = process.argv[2];
const OUT = process.argv[3];

const LANGS = {
  English: 'en', Dutch: 'nl', German: 'de',
  French: 'fr', Spanish: 'es', Portuguese: 'pt',
};

// Only the keys the drawn screens actually use. Keeping the list explicit
// means an unused key never silently rots in the generated file.
const WANTED = new Set([
  'AppTitle', 'Change', 'Logout', 'Account', 'Bastion', 'BastionSubscription',
  'Refresh', 'Connect', 'OK', 'Exit', 'Show', 'Loading',
  'TabIPAddress', 'TabAzureVM', 'TabActiveTunnels',
  'ConnectionMethod', 'ConnectionMethodTunnel', 'ConnectionMethodRDGateway',
  'MonitorConfiguration', 'SingleMonitor', 'AllMonitors',
  'UseEntraIdAuth', 'EntraIdAuthInfo',
  'VirtualMachine', 'VMSubscription', 'AllSubscriptions',
  'SearchCurrentSubscription', 'SearchAllSubscriptions',
  'VmSearchPlaceholder', 'VmTagFilterPlaceholder',
  'IPAddress', 'TargetPort', 'LocalPort',
  'PowerState', 'RefreshPowerState', 'PowerStateRunning', 'StartVM',
  'StopTunnel', 'ConnectRDP', 'NoActiveTunnels', 'NoActiveTunnelsMessage',
  'TunnelTarget', 'TunnelConnectedMessage', 'AboutMenuItem',
  'OpenLogFolder', 'CopyDiagnosticInfo', 'About', 'Close',
  'SelectTenant', 'Language',
]);

const text = await readFile(SRC, 'utf8');

// Localization.cs declares entries two ways: inside the collection
// initializer as `["Key"] = new() { ... }`, and later as
// `translations["Key"] = new Dictionary<Language, string> { ... }`. Match the
// header of either, then take everything up to the next header as its body.
const headerRe = /\["([A-Za-z0-9_]+)"\]\s*=\s*new\b/g;
const entryRe = /\[Language\.([A-Za-z]+)\]\s*=\s*"((?:[^"\\]|\\.)*)"/g;

const headers = [];
let h;
while ((h = headerRe.exec(text)) !== null) {
  headers.push({ key: h[1], start: h.index + h[0].length });
}

const out = {};
const found = new Set();
headers.forEach((hdr, i) => {
  found.add(hdr.key);
  if (!WANTED.has(hdr.key)) return;
  const body = text.slice(hdr.start, headers[i + 1]?.start ?? text.length);
  const langs = {};
  let e;
  entryRe.lastIndex = 0;
  while ((e = entryRe.exec(body)) !== null) {
    const code = LANGS[e[1]];
    if (!code) continue;
    // Keep the C# escapes as real characters; the figures split on \n themselves.
    langs[code] = e[2].replace(/\\n/g, '\n').replace(/\\"/g, '"').replace(/\\\\/g, '\\');
  }
  if (Object.keys(langs).length) out[hdr.key] = langs;
});

const missing = [...WANTED].filter((k) => !found.has(k));
const got = Object.keys(out).sort();

const banner = `// GENERATED FILE — do not edit by hand.
//
// Every user-visible label in the schematic screens comes from here, lifted
// verbatim from source/Localization.cs in the BastionRDPConnector repo. The
// first version of these figures invented its translations (the German screen
// said "Monitore" and "Einzeln" where the application says "${(out.MonitorConfiguration?.de ?? '').replace(/"/g, '')}" and
// "${(out.SingleMonitor?.de ?? '').replace(/"/g, '')}"), so nothing here is typed by hand any more.
//
// Regenerate with:
//   node scripts/extract-strings.mjs <path-to>/source/Localization.cs src/ui-strings.ts
//
// Keys resolved: ${got.length}${missing.length ? `\n// Keys requested but absent from Localization.cs: ${missing.join(', ')}` : ''}

export type Lang = 'en' | 'nl' | 'de' | 'fr' | 'es' | 'pt';

export const UI: Record<string, Record<Lang, string>> = ${JSON.stringify(out, null, 2)} as const;

/** Look up an application string. Falls back to English, then to the key. */
export function s(key: string, lang: Lang = 'en'): string {
  const row = UI[key];
  if (!row) return key;
  return row[lang] ?? row.en ?? key;
}

/** Split a multi-line application string into lines for <text> runs. */
export function lines(key: string, lang: Lang = 'en'): string[] {
  return s(key, lang).split('\\n');
}
`;

await writeFile(OUT, banner, 'utf8');
console.log(`resolved ${got.length} keys`);
if (missing.length) console.log(`MISSING: ${missing.join(', ')}`);
