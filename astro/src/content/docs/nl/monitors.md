---
title: Monitors
description: Kies of een RD Gateway-sessie opent op uw primaire beeldscherm of zich uitstrekt over alle aangesloten monitors.
appliesTo: '3.3.5'
lastReviewed: '2026-07-25'
---

Het tabblad Azure VM heeft een instelling Monitors naast Verbindingsmethode. Deze geldt alleen voor RD Gateway. Tunnel-verbindingen dragen geen monitorvoorkeur, omdat uw eigen remote desktop-client de sessie afhandelt zodra de tunnel open is.

## De twee opties

| Optie | Gedrag |
| --- | --- |
| Enkel beeldscherm | De sessie opent op volledig scherm, alleen op uw primaire beeldscherm. |
| Alle schermen | De sessie strekt zich uit over elk aangesloten beeldscherm, zodat de externe desktop uw hele multi-monitoropstelling vult. |

Enkel beeldscherm is de standaard. Kies Alle schermen als u wilt dat de externe sessie zich gedraagt als een tweede fysiek bureaublad over uw schermen.

## Waarom Tunnel deze instelling niet heeft

Monitorselectie wordt geschreven in het `.rdp`-bestand dat RD Gateway aan uw remote desktop-client doorgeeft. Tunnel genereert geen bestand. Het opent een lokale poort en laat u zelf de client starten, dus er is niets waarin de applicatie de instelling kan schrijven. Als u een sessie overschakelt van RD Gateway naar Tunnel, stelt u het monitorgedrag rechtstreeks in uw RDP-client in.

## Waar de keuze wordt opgeslagen

De monitorinstelling wordt opgeslagen [per tenant](../tenants/), samen met verbindingsmethode en Entra ID-authenticatie. Bij het wisselen van tenant wordt hersteld wat u voor die tenant het laatst koos, en het terugschakelen naar RD Gateway op dezelfde tenant onthoudt dit ook.
