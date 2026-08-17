---
title: Diagnostiek
description: Wat het dialoogvenster Over toont, wat Diagnostische info kopiëren verzamelt, en wat erbuiten blijft.
appliesTo: '3.3.6'
lastReviewed: '2026-07-25'
---

Een **i**-knop in de bovenste balk opent het dialoogvenster Over. Deze toont de applicatieversie, een regel over uw platform, en twee acties om informatie uit de applicatie te halen wanneer er iets moet worden opgelost.

## Het dialoogvenster Over

<!-- Mirrors src/components/ScreenAbout.astro -->
<figure class="appshot">
  <div class="frame">
    <svg viewBox="0 0 300 372" role="img" aria-labelledby="s-about-win">
      <title id="s-about-win">Het dialoogvenster Over op Windows. Het toont de applicatienaam, versie en platform, gevolgd door twee knoppen: Open logmap en Diagnostische info kopiëren.</title>
      <rect class="ui-win" x="1" y="1" width="298" height="370" rx="6"/>
      <path class="ui-bar" d="M2 2 H298 V22 H2 Z"/>
      <text class="ui-title" x="10" y="15">Over</text>
      <path d="M280 9 l7 7 M287 9 l-7 7" stroke="#7B8794" stroke-width="1.1" fill="none"/>
      <text class="ui-tb" x="10" y="46">Azure Bastion RDP Connector</text>
      <text class="ui-p" x="10" y="60">Versie 3.3.6</text>
      <text class="ui-p" x="10" y="72">Windows 11 · x64</text>
      <line x1="10" y1="86" x2="290" y2="86" stroke="#DCE2EA" stroke-width="1"/>
      <text class="ui-l" x="10" y="104">Diagnostiek</text>
      <rect class="ui-btn-2" x="10" y="110" width="280" height="24" rx="4"/>
      <text class="ui-tb" x="150" y="126" text-anchor="middle">Open logmap</text>
      <text class="ui-p" x="10" y="148">Opent de map met debug.log</text>
      <text class="ui-p" x="10" y="159">en de tien gearchiveerde sessies.</text>
      <rect class="ui-btn-2" x="10" y="170" width="280" height="24" rx="4"/>
      <text class="ui-tb" x="150" y="186" text-anchor="middle">Diagnostische info kopiëren</text>
      <text class="ui-p" x="10" y="208">Kopieert systeeminfo, het huidige logboek,</text>
      <text class="ui-p" x="10" y="219">en gearchiveerde sessies naar het klembord.</text>
      <text class="ui-p" x="10" y="230">Al geredigeerd, beperkt tot ~1 MB.</text>
      <rect class="ui-btn" x="190" y="320" width="100" height="26" rx="4"/>
      <text class="ui-bt" x="240" y="337" text-anchor="middle">Sluiten</text>
    </svg>
  </div>
  <figcaption><b>Windows</b> Het dialoogvenster Over op Windows. Het toont de applicatieversie en het platform, en biedt Open logmap en Diagnostische info kopiëren.</figcaption>
</figure>

| Actie | Wat het doet |
| --- | --- |
| Open logmap | Opent de map met `debug.log` en de tien gearchiveerde sessies, in Verkenner op Windows of Finder op macOS. |
| Diagnostische info kopiëren | Kopieert een diagnostisch pakket naar het klembord. |

## Wat er in het diagnostische pakket zit

Diagnostische info kopiëren bouwt een tekstpakket op uit:

- Systeeminformatie: besturingssysteem, applicatieversie, platform.
- Het `debug.log` van de huidige sessie.
- De gearchiveerde sessies, `debug.0.log` tot en met `debug.9.log`, nieuwste eerst.

Elke logboekregel in het pakket wordt beperkt tot 100 KB, en het hele pakket stopt met groeien bij ongeveer 1 MB. Die limiet houdt een pakket van een lange reeks sessies praktisch genoeg om in een supportticket of chatbericht te plakken.

## Wat wordt geredigeerd, en wat niet

Alles in het pakket wordt geredigeerd voordat het het klembord bereikt, op dezelfde manier waarop het wordt geredigeerd voordat het naar `debug.log` wordt geschreven. Bearer-tokens, JWT's, wachtwoorden en API-sleutels worden vervangen voordat er iets naar schijf gaat.

Subscription-ID's, resource-ID's, GUID's en IP-adressen blijven staan. Dit zijn geen geheimen, en ze verwijderen zou het logboek veel minder bruikbaar maken om uit te zoeken bij welke VM, subscription of Bastion-host een probleem optrad.

<div class="callout note">
<span class="eyebrow">Opmerking</span>
<p>Redactie gebeurt op het moment van schrijven, niet op het moment van kopiëren. Een logboekregel wordt nooit met een actief token naar schijf geschreven, dus er staat niets gevoeligs in <code>debug.log</code> te wachten om later geredigeerd te worden.</p>
</div>

## Een logboek naar support sturen

Plak de uitvoer van Diagnostische info kopiëren rechtstreeks in een supportticket of chatbericht. Als het pakket is afgekapt en u het volledige logboek van een sessie nodig heeft, gebruik dan Open logmap om het exacte bestand te vinden en dat bij te voegen.
