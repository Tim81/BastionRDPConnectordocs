---
title: Actieve tunnels
description: Elke Tunnel-verbinding die de applicatie open heeft staan, met de lokale poort, verstreken tijd, en bedieningselementen om uw RDP-client opnieuw te verbinden of te stoppen.
appliesTo: '3.3.5'
lastReviewed: '2026-07-25'
---

Elke Tunnel-verbinding die u opent, vanuit het tabblad IP-adres of het tabblad Azure VM, verschijnt hier zolang deze open blijft. RD Gateway-verbindingen verschijnen niet op dit tabblad, omdat ze geen lokale poort openen om bij te houden.

## Het tabblad Actieve tunnels

<!-- Mirrors src/components/ScreenActiveTunnels.astro -->
<figure class="appshot">
  <div class="frame">
    <svg viewBox="0 0 300 372" role="img" aria-labelledby="s-tun-win">
      <title id="s-tun-win">Het tabblad Actieve tunnels op Windows. Bovenaan zijn een subscription en Bastion-host gekozen. Het tabblad toont elke open tunnel met naam, lokale poort, verstreken tijd, en een stopknop.</title>
      <rect class="ui-win" x="1" y="1" width="298" height="370" rx="6"/>
      <path class="ui-bar" d="M2 2 H298 V22 H2 Z"/>
      <text class="ui-title" x="10" y="15">Azure Bastion RDP Connector</text>
      <path d="M266 9 h7 M280 9 l7 7 M287 9 l-7 7" stroke="#7B8794" stroke-width="1.1" fill="none"/>
      <text class="ui-l" x="10" y="40">Subscription</text>
      <rect class="ui-field" x="10" y="44" width="182" height="15" rx="3"/>
      <text class="ui-v" x="15" y="55">Production - West Europe</text>
      <rect class="ui-btn-2" x="197" y="44" width="42" height="15" rx="3"/>
      <text class="ui-tb" x="204" y="55">Wijzig</text>
      <rect class="ui-btn-2" x="244" y="44" width="18" height="15" rx="3"/>
      <text class="ui-tb" x="250" y="55">i</text>
      <rect class="ui-btn-2" x="266" y="44" width="24" height="15" rx="3"/>
      <text class="ui-tb" x="270" y="55">uit</text>
      <text class="ui-l" x="10" y="76">Bastion-host</text>
      <rect class="ui-field" x="10" y="80" width="252" height="15" rx="3"/>
      <text class="ui-v" x="15" y="91">bastion-hub-weu</text>
      <rect class="ui-btn-2" x="266" y="80" width="24" height="15" rx="3"/>
      <text class="ui-tb" x="273" y="91">↻</text>
      <line x1="10" y1="120" x2="290" y2="120" stroke="#DCE2EA" stroke-width="1"/>
      <text class="ui-tb off" x="14" y="115">IP-adres</text>
      <text class="ui-tb off" x="76" y="115">Azure VM</text>
      <text class="ui-tb" x="142" y="115">Actieve tunnels</text>
      <line class="ui-tabup" x1="138" y1="120" x2="230" y2="120"/>
      <rect class="ui-btn-2" x="246" y="130" width="44" height="15" rx="3"/>
      <text class="ui-tb" x="256" y="141">Ververs</text>
      <rect class="ui-panel" x="10" y="152" width="280" height="50" rx="4"/>
      <circle class="ui-run" cx="22" cy="167" r="3.5"/>
      <text class="ui-tb" x="32" y="171">vm-dev-web-01</text>
      <text class="ui-p" x="32" y="184">localhost:55000 · open 4m 12s</text>
      <rect class="ui-btn-2" x="244" y="163" width="34" height="15" rx="3"/>
      <text class="ui-tb" x="252" y="174">Stop</text>
      <rect class="ui-panel" x="10" y="210" width="280" height="50" rx="4"/>
      <circle class="ui-run" cx="22" cy="225" r="3.5"/>
      <text class="ui-tb" x="32" y="229">10.20.4.15</text>
      <text class="ui-p" x="32" y="242">localhost:55001 · open 41s</text>
      <rect class="ui-btn-2" x="244" y="221" width="34" height="15" rx="3"/>
      <text class="ui-tb" x="252" y="232">Stop</text>
      <text class="ui-p" x="10" y="284">Tunnels verbinden zelf opnieuw als de</text>
      <text class="ui-p" x="10" y="295">WebSocket wegvalt, tot vijf pogingen.</text>
      <text class="ui-p" x="10" y="352">EN · NL · DE · FR · ES · PT</text>
    </svg>
  </div>
  <figcaption><b>Windows</b> Het tabblad Actieve tunnels op Windows. Elke rij is één open tunnel, met de lokale poort, verstreken tijd, en een stopknop. De lijst werkt op dezelfde manier op macOS.</figcaption>
</figure>

Elke rij noemt het doel, de lokale poort waarop deze luistert, en hoe lang deze al open is.

| Besturingselement | Actie |
| --- | --- |
| Ververs | Laadt de lijst met open tunnels opnieuw. |
| Verbind RDP | Start uw remote desktop-client opnieuw, gericht op de lokale poort van deze tunnel. Handig als u het RDP-venster sloot zonder de tunnel te stoppen. |
| Stop | Sluit de WebSocket-verbinding met Bastion en beëindigt de tunnel. |

<div class="callout warn">
<span class="eyebrow">Stop beëindigt de sessie</span>
<p>Het stoppen van een tunnel verbreekt onmiddellijk elke RDP-sessie die deze gebruikt. Sla eerst uw werk op in de externe sessie.</p>
</div>

## Opnieuw verbinden

Als de WebSocket-verbinding met Bastion wegvalt, bijvoorbeeld door een korte netwerkonderbreking of Bastion-onderhoud, verbindt de tunnel zelf opnieuw. Deze probeert het tot vijf keer, met een groeiende tussenpoos tussen pogingen. Uw RDP-sessie blijft doorgaans verbonden tijdens zo'n korte herverbinding, dus mogelijk merkt u er niets van.

Als alle vijf pogingen mislukken, stopt de tunnel en toont het systeemvak een foutmelding. Open vanaf daar opnieuw het tabblad Azure VM of het tabblad IP-adres en maak handmatig opnieuw verbinding.
