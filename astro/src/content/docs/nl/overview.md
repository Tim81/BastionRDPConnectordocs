---
title: Overzicht
description: Open een externe bureaubladsessie via Azure Bastion naar een Azure-VM, of naar elk Windows-systeem dat het Bastion-netwerk kan bereiken.
appliesTo: '3.3.5'
lastReviewed: '2026-07-25'
---

Azure Bastion RDP Connector opent een externe bureaubladsessie via Azure Bastion, met de remote desktop-client die al op uw computer is geïnstalleerd. Azure-VM's worden op naam gekozen. Al het andere wordt bereikt via een adres, waaronder on-premises machines en machines in andere clouds vallen.

## Wat het doet

Azure Bastion is een route naar een netwerk, niet alleen naar Azure. Het bereikt alles wat het eigen virtuele netwerk kan bereiken, dus een machine hoeft geen Azure-VM te zijn, of zelfs maar in Azure te staan, om er via bereikbaar te zijn.

Deze applicatie vraagt Bastion om die route en geeft het resultaat door aan uw remote desktop-client. U kopieert geen verbindingsreeksen, beheert geen certificaten en opent geen firewallpoorten.

Azure CLI is niet vereist. Eerdere versies riepen `az network bastion` aan om de tunnel op te bouwen. Sinds 3.0 communiceert de applicatie rechtstreeks met de Bastion- en Azure Resource Manager-API's, dus er hoeft niets anders geïnstalleerd te worden.

## Wat u kunt bereiken

| Doel | Hoe u het kiest | Vereist |
| --- | --- | --- |
| Azure-VM | Kies op naam vanuit het tabblad Azure VM, over al uw subscriptions | Reader-toegang tot de VM |
| Al het andere | Typ het adres op het tabblad IP-adres | Op IP gebaseerde verbinding ingeschakeld op de Bastion-host |

De adresroute is de breedste van de twee. Deze bereikt elk systeem waar het virtuele netwerk van Bastion een route naartoe heeft:

- Azure-VM's, in hetzelfde virtuele netwerk of daaraan gepeerd
- On-premises Windows-servers en -werkstations, via een site-to-site VPN of ExpressRoute
- Windows-systemen in andere clouds, zoals AWS, of in een private cloud

Alles met een route en een luisterende RDP-poort is bereikbaar. Of het in Azure draait, doet er niet toe.

Microsoft documenteert het on-premises scenario rechtstreeks: de op IP gebaseerde verbinding van Bastion "allows for connectivity to on-premises-based machines if hybrid connectivity exists between the Azure Bastion resource and the machine that you want to connect to." Zie [Connect to a VM via a specified private IP address](https://learn.microsoft.com/en-us/azure/bastion/connect-ip-address).

## Twee manieren om verbinding te maken

De applicatie biedt twee verbindingsmethoden. Ze bereiken dezelfde machine en verschillen in hoe de sessie wordt overgebracht.

| Methode | Draagt de sessie via | Werkt met IP-adressen |
| --- | --- | --- |
| Tunnel | Een lokale poort doorgestuurd via een WebSocket naar Bastion | Ja |
| RD Gateway | Een .rdp-bestand dat naar Bastion als gateway wijst | Nee |

[Verbindingsmethoden](../connection-methods/) legt uit wanneer u welke methode gebruikt, en waarom de standaard verschilt tussen Windows en macOS.

## Voordat u begint

- Een Azure Bastion-host met de Standard- of Premium-SKU. De Basic- en Developer-SKU's ondersteunen de native client niet.
- **Native client-ondersteuning** ingeschakeld op die Bastion-host.
- Reader-toegang tot de Bastion-host en tot de virtuele machines die u wilt bereiken.
- Windows 10 of hoger. Geïnstalleerd vanuit de Microsoft Store.
- Er bestaat een macOS-build, ondersteund sinds 3.1.2 voor Apple Silicon en Intel, maar deze is nog niet publiek beschikbaar.

<div class="callout note">
<span class="eyebrow">Opmerking</span>
<p>De applicatie controleert de Bastion-SKU en de bijbehorende functievlaggen voordat er verbinding wordt gemaakt, en laat weten welke ontbreekt als een controle mislukt. Deze controles zijn fail-open, dus een controle die niet kan worden voltooid, weerhoudt u er niet van om verbinding te maken.</p>
</div>

## Waar dingen worden opgeslagen

Instellingen roamen mee met uw Windows-profiel. Aanmeldgegevens en logboeken blijven op de machine.

| Pad | Bevat |
| --- | --- |
| `%APPDATA%\BastionRDPConnector` | `settings.json`: laatst gebruikte subscription, Bastion, VM en taal |
| `%LOCALAPPDATA%\BastionRDPConnector` | Aanmeldtokencache, het aanmeldbrowserprofiel en `debug.log` met de laatste tien sessies |
