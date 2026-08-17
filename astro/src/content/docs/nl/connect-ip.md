---
title: Verbinden met een IP-adres
description: Het tabblad IP-adres bereikt alles waar het virtuele netwerk van Bastion een route naartoe heeft, niet alleen Azure-VM's, via een Tunnel-verbinding.
appliesTo: '3.3.6'
lastReviewed: '2026-07-25'
---

Gebruik dit tabblad wanneer de machine die u wilt bereiken geen VM-record heeft dat u op naam kunt kiezen, of helemaal geen Azure-VM is. Het bereikt on-premises machines via VPN of ExpressRoute, Windows-systemen in andere clouds, en elke Azure-VM die u liever rechtstreeks adresseert dan opzoekt.

## Het tabblad IP-adres

<!-- Mirrors src/components/ScreenIpAddress.astro -->
<figure class="appshot">
  <div class="frame">
    <svg viewBox="0 0 300 372" role="img" aria-labelledby="s-ip-win">
      <title id="s-ip-win">Het tabblad IP-adres op Windows. Bovenaan zijn een subscription en Bastion-host gekozen. Het tabblad bevat een adresveld, doelpoort, lokale poort en de knop Verbinden.</title>
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
      <text class="ui-tb" x="14" y="115">IP-adres</text>
      <line class="ui-tabup" x1="10" y1="120" x2="70" y2="120"/>
      <text class="ui-tb off" x="76" y="115">Azure VM</text>
      <text class="ui-tb off" x="142" y="115">Actieve tunnels</text>
      <rect class="ui-panel" x="10" y="132" width="280" height="112" rx="4"/>
      <text class="ui-l" x="20" y="150">IP-adres</text>
      <rect class="ui-field" x="20" y="154" width="260" height="16" rx="3"/>
      <text class="ui-v" x="25" y="165">10.20.4.15</text>
      <text class="ui-l" x="20" y="185">Doelpoort</text>
      <rect class="ui-field" x="20" y="189" width="120" height="15" rx="3"/>
      <text class="ui-v" x="25" y="200">3389</text>
      <text class="ui-l" x="160" y="185">Lokale poort</text>
      <rect class="ui-field" x="160" y="189" width="120" height="15" rx="3"/>
      <text class="ui-v" x="165" y="200">55000</text>
      <text class="ui-p" x="20" y="220">Bereikt elk adres waar het virtuele</text>
      <text class="ui-p" x="20" y="231">netwerk van Bastion een route naartoe heeft.</text>
      <text class="ui-p" x="10" y="268">Opent in mstsc</text>
      <rect class="ui-btn" x="10" y="282" width="280" height="26" rx="4"/>
      <text class="ui-bt" x="150" y="299" text-anchor="middle">Verbinden</text>
      <text class="ui-p" x="10" y="352">EN · NL · DE · FR · ES · PT</text>
    </svg>
  </div>
  <figcaption><b>Windows</b> Het tabblad IP-adres op Windows. Tunnel is hier de enige beschikbare methode, omdat RD Gateway een getypt adres niet kan omzetten. Op macOS is de indeling identiek; Verbinden opent de Windows App in plaats van mstsc.</figcaption>
</figure>

Dit tabblad gebruikt altijd Tunnel. RD Gateway heeft Bastion nodig om het doel zelf om te zetten, en een getypt adres geeft daar niets voor.

## Velden

| Veld | Beschrijving | Standaard |
| --- | --- | --- |
| IP-adres | Het privéadres van de doelmachine. Dit moet bereikbaar zijn vanuit het virtuele netwerk van de Bastion-host. | geen |
| Doelpoort | De RDP-poort die op de externe machine luistert. | 3389 |
| Lokale poort | De poort op uw computer waar de tunnel luistert. Uw remote desktop-client maakt verbinding met `localhost:[Lokale poort]`. | 55000 |

Doelpoort en lokale poort worden gedeeld met het tabblad Azure VM. Wijzig er één daar, en het verandert ook hier.

## Verbinding maken

1. Typ het doeladres.
2. Laat de doelpoort op 3389 staan tenzij de machine op iets anders luistert, en wijzig de lokale poort alleen als 55000 al bezet is op uw computer.
3. Selecteer **Verbinden**. De applicatie opent een WebSocket-tunnel naar Bastion en start uw remote desktop-client gericht op `localhost:[Lokale poort]`.

<div class="callout warn">
<span class="eyebrow">Bereikbaarheid, geen naamgeving</span>
<p>De applicatie kan niet verder dan een formaatcontrole bevestigen dat een doeladres correct is. Als het virtuele netwerk van Bastion dat adres niet kan bereiken, opent de tunnel wel, maar kan de remote desktop-client de verbinding niet voltooien. Neem contact op met wie uw netwerk beheert als u niet zeker weet of er een route bestaat.</p>
</div>
