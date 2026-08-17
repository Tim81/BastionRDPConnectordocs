---
title: Installatie
description: Azure Bastion RDP Connector wordt uitgebracht via de Microsoft Store. Er is geen directe download en geen apart installatieprogramma.
appliesTo: '3.3.6'
lastReviewed: '2026-07-25'
---

Azure Bastion RDP Connector wordt gedistribueerd als een Microsoft Store-app, product-ID `9N9MJ1V43Z6T`. Windows handelt de download, de installatie en elke latere update af. Er is geen ZIP-bestand om uit te pakken en geen SmartScreen-melding om weg te klikken.

## Installeren op Windows

1. Open de Store-vermelding, hetzij met de deep link `ms-windows-store://pdp/?productid=9N9MJ1V43Z6T`, die de Store-app direct opent, hetzij vanuit een browser op [apps.microsoft.com/detail/9N9MJ1V43Z6T](https://apps.microsoft.com/detail/9N9MJ1V43Z6T).
2. Selecteer **Ophalen** of **Installeren**. Voor een installatie per gebruiker zijn geen beheerdersrechten nodig.
3. Start de app vanuit het Start-menu. Zoek naar "Bastion RDP Connector".

<div class="callout note">
<span class="eyebrow">Opmerking</span>
<p>Omdat de Store de installatie beheert, gebeuren updates op de achtergrond. U hoeft zelf niet te controleren op een nieuwe versie.</p>
</div>

## macOS

Er bestaat een macOS-build sinds versie 3.1.2, voor zowel Apple Silicon als Intel Macs, maar deze is nog niet publiek beschikbaar. Er is hier geen macOS-download aan te bieden. Zodra die er is, krijgt deze pagina dezelfde Store-achtige vermelding die Windows al heeft.

## Wat de eerste start doet

Tijdens de installatie zelf wordt niets geconfigureerd. De applicatie leest bij het opstarten `%APPDATA%\BastionRDPConnector\settings.json`, en als dat bestand nog niet bestaat, start deze met standaardwaarden en maakt het bestand aan bij de eerste keer opslaan. [Eerste aanmelding](../sign-in/) behandelt wat er gebeurt de eerste keer dat u de app opent en deze zich moet authenticeren.
