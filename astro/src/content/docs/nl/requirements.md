---
title: Vereisten
description: Wat moet kloppen op uw machine en in Azure voordat Azure Bastion RDP Connector een sessie kan openen.
appliesTo: '3.3.5'
lastReviewed: '2026-07-25'
---

De applicatie is zelfstandig. Er hoeft geen .NET apart geïnstalleerd te worden, en sinds 3.0 is Azure CLI niet nodig. Wat wel nodig is: een ondersteund besturingssysteem, een remote desktop-client, en een Bastion-host die is geconfigureerd om native-clientverbindingen te accepteren.

## Op uw machine

| Vereiste | Opmerkingen |
| --- | --- |
| Windows 10 of hoger, x64 | Geïnstalleerd vanuit de Microsoft Store |
| macOS 12 Monterey of hoger | Ondersteund sinds 3.1.2 voor Apple Silicon en Intel, maar nog niet publiek beschikbaar |
| Remote desktop-client, Windows | `mstsc.exe`, al onderdeel van Windows |
| Remote desktop-client, macOS | De Windows App, uit de Mac App Store. Gebruik hiermee Tunnel. Een RD Gateway-sessie opent en valt daarna na een paar seconden weg met fout `0x3000064`, een cipher-mismatch die Microsoft op deze client niet ondersteunt |

<div class="callout note">
<span class="eyebrow">Opmerking</span>
<p>Azure CLI is niet vereist. Eerdere versies riepen <code>az network bastion tunnel</code> aan; sinds 3.0 wordt de tunnel native opgebouwd met .NET. Als u nog een 2.x-build gebruikt, zijn Azure CLI en de <code>azure-bastion</code>-extensie nog steeds nodig.</p>
</div>

## In Azure

| Vereiste | Opmerkingen |
| --- | --- |
| Azure Bastion, Standard- of Premium-SKU | Basic- en Developer-SKU's ondersteunen de native client niet |
| Native client-ondersteuning, ingeschakeld op de Bastion-host | Apart ingeschakeld van de SKU-keuze |
| Op IP gebaseerde verbinding, ingeschakeld op de Bastion-host | Alleen nodig als u het tabblad IP-adres wilt gebruiken |
| Reader-rol op de Bastion-resource en het bijbehorende virtuele netwerk | Het minimum dat nodig is om Bastion-hosts weer te geven en er verbinding mee te maken |
| Reader-rol op de doel-VM | Nodig om die VM weer te geven en er verbinding mee te maken. Virtual Machine Contributor of hoger is nodig om een gestopte VM te starten |
| Een Azure-subscription | De applicatie toont elke subscription die uw account kan zien |

<div class="callout note">
<span class="eyebrow">Opmerking</span>
<p>De applicatie controleert de Bastion-SKU en de bijbehorende functievlaggen voordat er verbinding wordt gemaakt, en noemt de ontbrekende als een controle mislukt. Deze controles zijn fail-open: als de controle zelf niet kan worden voltooid, bijvoorbeeld door een tijdelijk netwerkprobleem, gaat de verbindingspoging toch door.</p>
</div>

## Netwerkbereikbaarheid

Een doel hoeft alleen bereikbaar te zijn vanuit het virtuele netwerk van Bastion. Het hoeft geen Azure-VM te zijn, en het hoeft helemaal niet in Azure te staan.

- Bastion geïmplementeerd in hetzelfde virtuele netwerk, of een daaraan gepeerd netwerk, is het eenvoudige geval.
- In een hub-and-spoke- of landing zone-opstelling zit Bastion vaak in een gecentraliseerde connectivity landing zone en bereikt spoke-virtuele netwerken via Azure Virtual WAN. In die topologie is de Bastion-resource niet zichtbaar vanuit een afzonderlijke spoke in de Azure Portal, ook al kan het daar nog steeds VM's bereiken. Deze applicatie is precies voor dat geval gebouwd: kies de gedeelde Bastion één keer, en maak dan verbinding met een VM in elke spoke die deze kan bereiken.
- On-premises machines zijn ook bereikbaar, via een site-to-site VPN of ExpressRoute, en Windows-systemen in andere clouds ook, zolang er een route bestaat.

Als u niet zeker weet of een Bastion-host een bepaald doel kan bereiken, vraag het dan aan wie uw netwerk beheert. De applicatie kan geen routes zien die niet via de API's die het aanroept worden blootgesteld.
