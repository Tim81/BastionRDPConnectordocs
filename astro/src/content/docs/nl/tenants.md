---
title: Meerdere tenants
description: Hoe de applicatie een aparte set voorkeuren bijhoudt voor elke Entra ID-tenant die uw account kan zien, en wat globaal blijft.
appliesTo: '3.3.5'
lastReviewed: '2026-07-25'
---

Als uw account toegang heeft tot meer dan één Entra ID-tenant, bijvoorbeeld via Azure Lighthouse, houdt de applicatie voor elke tenant een aparte set voorkeuren bij in plaats van telkens een enkele gedeelde set te overschrijven wanneer u wisselt.

## Van tenant wisselen

[Eerste aanmelding](../sign-in/) behandelt het tenantselectiedialoogvenster dat direct na het authenticeren verschijnt, wanneer uw account meer dan één tenant kan zien. U kunt ook later van tenant wisselen, op elk moment terwijl de app actief is, via dezelfde bediening in de bovenste balk.

Van tenant wisselen meldt u niet af. Het herlaadt de subscriptionlijst voor de gekozen tenant en herstelt wat u daar het laatst gebruikte.

## Wat er per tenant wordt opgeslagen

Elke tenant krijgt zijn eigen plek voor:

- De laatst gebruikte Bastion-subscription en Bastion-host
- De laatst gebruikte VM-subscription en virtuele machine
- Het laatst gebruikte IP-adres
- Doelpoort en lokale poort
- Verbindingsmethode, Tunnel of RD Gateway
- Monitormodus
- Entra ID-authenticatie

Schakel van tenant A naar tenant B en weer terug, en de Bastion, VM en poorten van tenant A komen precies terug zoals u ze achterliet. Niets van tenant B blijft hangen.

## Wat globaal blijft

Uw taalkeuze geldt voor elke tenant. Wijzig deze terwijl u in de ene tenant werkt, en deze blijft gewijzigd nadat u naar een andere overschakelt. Taal is een voorkeur over uzelf, niet over de omgeving waarmee u verbonden bent.

## Waar dit op schijf staat

Alles, per tenant en globaal samen, staat in één bestand: `%APPDATA%\BastionRDPConnector\settings.json`. [Bestanden en instellingen](../files-and-settings/) behandelt de bestandsindeling en wat elk pad bevat.
