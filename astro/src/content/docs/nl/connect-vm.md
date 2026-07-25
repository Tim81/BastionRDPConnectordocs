---
title: Verbinden met een Azure VM
description: Kies een virtuele machine op naam, binnen één subscription of over alle, controleer de energiestatus, start deze indien nodig, en maak verbinding.
appliesTo: '3.3.4'
lastReviewed: '2026-07-25'
---

Het tabblad Azure VM toont virtuele machines op naam in plaats van naar een adres te vragen. Het is verdeeld in twee kolommen: verbindingsinstellingen links, VM-selectie rechts. Welke verbindingsmethode standaard geselecteerd is, hangt af van het platform, dus beide worden hieronder getoond.

## Het tabblad Azure VM

<!-- Mirrors src/components/ScreenAzureVm.astro -->
<figure class="appshot">
  <div class="frame">
    <svg viewBox="0 0 300 372" role="img" aria-labelledby="s-vm-win">
      <title id="s-vm-win">Het tabblad Azure VM op Windows. Bovenaan zijn een subscription en Bastion-host gekozen. Het tabblad bevat de verbindingsmethode, monitorindeling, Entra ID-optie, een doorzoekbare lijst met virtuele machines, de energiestatus van de geselecteerde machine, en de knop Verbinden.</title>
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
      <text class="ui-tb" x="76" y="115">Azure VM</text>
      <line class="ui-tabup" x1="72" y1="120" x2="132" y2="120"/>
      <text class="ui-tb off" x="142" y="115">Actieve tunnels</text>
      <rect class="ui-panel" x="10" y="130" width="134" height="96" rx="4"/>
      <text class="ui-l" x="17" y="144">Verbindingsmethode</text>
      <circle class="ui-ro" cx="22" cy="155" r="4"/>
      <text class="ui-tb" x="31" y="158">Tunnel</text>
      <circle class="ui-ro on" cx="22" cy="169" r="4"/>
      <circle class="ui-rd" cx="22" cy="169" r="2"/>
      <text class="ui-tb" x="31" y="172">RD Gateway</text>
      <text class="ui-l" x="17" y="190">Monitors</text>
      <circle class="ui-ro on" cx="22" cy="200" r="4"/><circle class="ui-rd" cx="22" cy="200" r="2"/>
      <text class="ui-tb" x="31" y="203">Enkel</text>
      <circle class="ui-ro" cx="80" cy="200" r="4"/>
      <text class="ui-tb" x="89" y="203">Alle</text>
      <rect class="ui-ck" x="18" y="213" width="8" height="8" rx="2"/>
      <path d="M20 217 l2 2 l4 -4" stroke="#fff" stroke-width="1.2" fill="none"/>
      <text class="ui-tb" x="31" y="220">Entra ID-auth</text>
      <circle class="ui-ro on" cx="158" cy="138" r="4"/><circle class="ui-rd" cx="158" cy="138" r="2"/>
      <text class="ui-tb" x="167" y="141">VM Subscription</text>
      <circle class="ui-ro" cx="158" cy="152" r="4"/>
      <text class="ui-tb" x="167" y="155">Alle abonnementen</text>
      <rect class="ui-field" x="152" y="162" width="138" height="14" rx="3"/>
      <text class="ui-p" x="157" y="172">Zoeken op naam</text>
      <rect class="ui-field" x="152" y="180" width="138" height="14" rx="3"/>
      <text class="ui-p" x="157" y="190">Filteren op tag</text>
      <rect class="ui-field" x="152" y="198" width="138" height="15" rx="3"/>
      <text class="ui-v" x="157" y="209">vm-app-prod-01</text>
      <rect class="ui-panel" x="152" y="218" width="138" height="30" rx="4"/>
      <circle class="ui-run" cx="161" cy="233" r="3.5"/>
      <text class="ui-tb" x="170" y="236">Actief</text>
      <rect class="ui-btn-2" x="248" y="226" width="36" height="14" rx="3"/>
      <text class="ui-tb" x="254" y="236">Start</text>
      <text class="ui-l" x="10" y="268">Doelpoort</text>
      <rect class="ui-field" x="10" y="272" width="60" height="15" rx="3"/>
      <text class="ui-v" x="15" y="283">3389</text>
      <text class="ui-l" x="80" y="268">Lokale poort</text>
      <rect class="ui-field" x="80" y="272" width="60" height="15" rx="3"/>
      <text class="ui-v" x="85" y="283">55001</text>
      <text class="ui-p" x="10" y="306">Opent in mstsc</text>
      <rect class="ui-btn" x="10" y="320" width="280" height="26" rx="4"/>
      <text class="ui-bt" x="150" y="337" text-anchor="middle">Verbinden</text>
      <text class="ui-p" x="10" y="362">EN · NL · DE · FR · ES · PT</text>
    </svg>
  </div>
  <figcaption><b>Windows</b> Het tabblad Azure VM op Windows. RD Gateway is de standaard.</figcaption>
</figure>

<figure class="appshot">
  <div class="frame">
    <svg viewBox="0 0 300 372" role="img" aria-labelledby="s-vm-mac">
      <title id="s-vm-mac">Het tabblad Azure VM op macOS. Bovenaan zijn een subscription en Bastion-host gekozen. Het tabblad bevat de verbindingsmethode, monitorindeling, Entra ID-optie, een doorzoekbare lijst met virtuele machines, de energiestatus van de geselecteerde machine, en de knop Verbinden.</title>
      <rect class="ui-win" x="1" y="1" width="298" height="370" rx="8"/>
      <path class="ui-bar" d="M2 2 H298 V24 H2 Z"/>
      <circle cx="14" cy="13" r="4" fill="#FF5F57"/>
      <circle cx="27" cy="13" r="4" fill="#FEBC2E"/>
      <circle cx="40" cy="13" r="4" fill="#28C840"/>
      <text class="ui-title" x="150" y="16" text-anchor="middle">Azure Bastion RDP Connector</text>
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
      <text class="ui-tb" x="76" y="115">Azure VM</text>
      <line class="ui-tabup" x1="72" y1="120" x2="132" y2="120"/>
      <text class="ui-tb off" x="142" y="115">Actieve tunnels</text>
      <rect class="ui-panel" x="10" y="130" width="134" height="96" rx="4"/>
      <text class="ui-l" x="17" y="144">Verbindingsmethode</text>
      <circle class="ui-ro on" cx="22" cy="155" r="4"/>
      <circle class="ui-rd" cx="22" cy="155" r="2"/>
      <text class="ui-tb" x="31" y="158">Tunnel</text>
      <circle class="ui-ro" cx="22" cy="169" r="4"/>
      <text class="ui-tb" x="31" y="172">RD Gateway</text>
      <text class="ui-l" x="17" y="190">Monitors</text>
      <circle class="ui-ro on" cx="22" cy="200" r="4"/><circle class="ui-rd" cx="22" cy="200" r="2"/>
      <text class="ui-tb" x="31" y="203">Enkel</text>
      <circle class="ui-ro" cx="80" cy="200" r="4"/>
      <text class="ui-tb" x="89" y="203">Alle</text>
      <rect class="ui-ck" x="18" y="213" width="8" height="8" rx="2"/>
      <path d="M20 217 l2 2 l4 -4" stroke="#fff" stroke-width="1.2" fill="none"/>
      <text class="ui-tb" x="31" y="220">Entra ID-auth</text>
      <circle class="ui-ro on" cx="158" cy="138" r="4"/><circle class="ui-rd" cx="158" cy="138" r="2"/>
      <text class="ui-tb" x="167" y="141">VM Subscription</text>
      <circle class="ui-ro" cx="158" cy="152" r="4"/>
      <text class="ui-tb" x="167" y="155">Alle abonnementen</text>
      <rect class="ui-field" x="152" y="162" width="138" height="14" rx="3"/>
      <text class="ui-p" x="157" y="172">Zoeken op naam</text>
      <rect class="ui-field" x="152" y="180" width="138" height="14" rx="3"/>
      <text class="ui-p" x="157" y="190">Filteren op tag</text>
      <rect class="ui-field" x="152" y="198" width="138" height="15" rx="3"/>
      <text class="ui-v" x="157" y="209">vm-app-prod-01</text>
      <rect class="ui-panel" x="152" y="218" width="138" height="30" rx="4"/>
      <circle class="ui-run" cx="161" cy="233" r="3.5"/>
      <text class="ui-tb" x="170" y="236">Actief</text>
      <rect class="ui-btn-2" x="248" y="226" width="36" height="14" rx="3"/>
      <text class="ui-tb" x="254" y="236">Start</text>
      <text class="ui-l" x="10" y="268">Doelpoort</text>
      <rect class="ui-field" x="10" y="272" width="60" height="15" rx="3"/>
      <text class="ui-v" x="15" y="283">3389</text>
      <text class="ui-l" x="80" y="268">Lokale poort</text>
      <rect class="ui-field" x="80" y="272" width="60" height="15" rx="3"/>
      <text class="ui-v" x="85" y="283">55001</text>
      <text class="ui-p" x="10" y="306">Opent in Windows App</text>
      <rect class="ui-btn" x="10" y="320" width="280" height="26" rx="4"/>
      <text class="ui-bt" x="150" y="337" text-anchor="middle">Verbinden</text>
      <text class="ui-p" x="10" y="362">EN · NL · DE · FR · ES · PT</text>
    </svg>
  </div>
  <figcaption><b>macOS</b> Het tabblad Azure VM op macOS. Tunnel is de standaard. RD Gateway kan nog steeds worden gekozen, en de applicatie waarschuwt voordat deze wordt gebruikt.</figcaption>
</figure>

De standaard geldt alleen totdat u zelf een methode kiest; daarna wordt uw keuze per tenant opgeslagen en hersteld de volgende keer dat u de app opent.

## Een VM kiezen

Een paar keuzerondjes boven de VM-lijst bepaalt hoe het zoeken werkt.

| Modus | Gedrag |
| --- | --- |
| VM Subscription (standaard) | Toont direct elke VM in de geselecteerde subscription. Typ in het filtervak om te filteren op naam. Het subscription-dropdown toont alleen subscriptions die daadwerkelijk VM's bevatten. |
| Alle abonnementen | Zoekt over elke subscription die uw account kan zien, via Azure Resource Graph. Vereist minimaal drie tekens voordat resultaten worden getoond. VM's laden over ongeveer 200 subscriptions duurt 2 tot 4 seconden, tegenover 30 tot 60 seconden wanneer elke subscription apart wordt bevraagd. |

<div class="callout note">
<span class="eyebrow">Opmerking</span>
<p>Filteren op tag werkt naast het naamfilter in beide modi, zodat u een grote lijst verder kunt versmallen voordat u een VM kiest.</p>
</div>

## Velden

| Veld | Beschrijving |
| --- | --- |
| Verbindingsmethode | Tunnel of RD Gateway. Standaard is RD Gateway op Windows en Tunnel op macOS. |
| Monitors | Enkel beeldscherm of alle schermen. Geldt alleen voor RD Gateway. |
| Entra ID-authenticatie | Optioneel, alleen getoond voor RD Gateway. Schakelt single sign-on in wanneer uw account en de VM dezelfde tenant delen. |
| Virtuele machine | De VM waarmee verbinding wordt gemaakt, gekozen uit de lijst rechts. |
| Doelpoort, lokale poort | Alleen gebruikt in Tunnelmodus, en gedeeld met het tabblad IP-adres. |

Voordat er verbinding wordt gemaakt, controleert de applicatie de Bastion-SKU en de bijbehorende functievlaggen, en de energiestatus van de VM, en laat weten wat ontbreekt als een controle mislukt. Deze controles zijn fail-open: een controle die niet kan worden voltooid, blokkeert de verbinding niet.

## Energiestatus en een VM starten

De energiestatus van de geselecteerde VM staat naast de naam.

| Status | Betekenis |
| --- | --- |
| Actief (groen) | De VM staat aan en is klaar voor verbindingen. |
| Gestopt of vrijgegeven (rood) | De VM staat uit. Er verschijnt een knop **Start VM**. |
| Starten, stoppen of anders (oranje) | De VM bevindt zich tussen statussen in. Er verschijnt een voortgangsindicator terwijl de app wacht tot deze tot rust komt. |

Om een gestopte VM te starten, selecteert u **Start VM**. De knop wordt vervangen door een voortgangsindicator terwijl de applicatie Azure bevraagt op de bijgewerkte status, elke 5 seconden gedurende maximaal 5 minuten. Wanneer de status groen wordt, bevestigt een toastmelding dat de VM klaar is en wordt **Verbinden** beschikbaar.

<div class="callout warn">
<span class="eyebrow">Starten vereist meer dan Reader</span>
<p>Om een VM te starten is Virtual Machine Contributor nodig, of een rol met gelijkwaardige rechten. Als de knop Start VM niet verschijnt, heeft uw account op die VM hoogstwaarschijnlijk alleen Reader.</p>
</div>

<div class="callout note">
<span class="eyebrow">Actief is niet hetzelfde als klaar</span>
<p>Actief betekent dat Azure de VM heeft ingeschakeld. Het gastbesturingssysteem heeft nog een minuut of twee nodig om het opstarten te voltooien voordat het RDP-verbindingen accepteert. Als een verbinding meteen wordt geweigerd nadat de status groen is geworden, wacht dan een paar minuten en probeer het opnieuw. Verbinden controleert de energiestatus opnieuw op het moment dat u erop klikt, zelfs als u er direct na het wijzigen van de indicator op klikte.</p>
</div>
