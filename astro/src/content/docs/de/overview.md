---
title: Übersicht
description: Öffnen Sie eine Remotedesktopsitzung über Azure Bastion zu einer Azure-VM oder zu jedem Windows-System, zu dem das Bastion-Netzwerk eine Route hat.
appliesTo: '3.3.4'
lastReviewed: '2026-07-25'
---

Azure Bastion RDP Connector öffnet eine Remotedesktopsitzung über Azure Bastion und verwendet dabei den Remotedesktop-Client, der bereits auf Ihrem Computer installiert ist. Azure-VMs werden nach Namen ausgewählt. Alles andere wird über eine Adresse erreicht, einschließlich lokaler Computer und Computer in anderen Clouds.

## Was die Anwendung tut

Azure Bastion ist eine Route in ein Netzwerk, nicht nur nach Azure. Es erreicht alles, was sein eigenes virtuelles Netzwerk erreichen kann – ein Computer muss also weder eine Azure-VM noch überhaupt in Azure sein, um darüber erreichbar zu sein.

Diese Anwendung fragt Bastion nach dieser Route und übergibt das Ergebnis an Ihren Remotedesktop-Client. Sie kopieren keine Verbindungszeichenfolgen, verwalten keine Zertifikate und öffnen keine Firewallports.

Azure CLI ist nicht erforderlich. Frühere Versionen riefen `az network bastion` auf, um den Tunnel aufzubauen. Seit 3.0 spricht die Anwendung direkt mit den Bastion- und Azure Resource Manager-APIs, sodass nichts weiter installiert werden muss.

## Was Sie erreichen können

| Ziel | Wie Sie es auswählen | Erfordert |
| --- | --- | --- |
| Azure-VM | Auf der Registerkarte Azure VM nach Namen auswählen, über alle Ihre Subscriptions hinweg | Leserzugriff auf die VM |
| Alles andere | Adresse auf der Registerkarte IP-Adresse eingeben | IP-basierte Verbindung auf dem Bastion-Host aktiviert |

Die Adressroute ist die umfassendere der beiden. Sie erreicht jedes System, zu dem das virtuelle Netzwerk von Bastion eine Route hat:

- Azure-VMs im selben virtuellen Netzwerk oder in einem damit gepeerten Netzwerk
- Lokale Windows-Server und -Desktops über eine Site-to-Site-VPN- oder ExpressRoute-Verbindung
- Windows-Systeme in anderen Clouds, etwa AWS, oder in einer privaten Cloud

Alles mit einer Route und einem lauschenden RDP-Port ist erreichbar. Ob es in Azure läuft, spielt keine Rolle.

Microsoft dokumentiert den lokalen Fall ausdrücklich: Die IP-basierte Verbindung von Bastion „ermöglicht die Konnektivität zu lokalen Computern, wenn zwischen der Azure Bastion-Ressource und dem Computer, zu dem Sie eine Verbindung herstellen möchten, eine Hybridkonnektivität besteht." Siehe [Herstellen einer Verbindung mit einer VM über eine angegebene private IP-Adresse](https://learn.microsoft.com/en-us/azure/bastion/connect-ip-address).

## Zwei Wege, eine Verbindung herzustellen

Die Anwendung bietet zwei Verbindungsmethoden. Beide erreichen denselben Computer und unterscheiden sich darin, wie die Sitzung übertragen wird.

| Methode | Überträgt die Sitzung über | Funktioniert mit IP-Adressen |
| --- | --- | --- |
| Tunnel | Einen lokalen Port, der über einen WebSocket zu Bastion weitergeleitet wird | Ja |
| RD Gateway | Eine .rdp-Datei, die Bastion als Gateway angibt | Nein |

[Verbindungsmethoden](../connection-methods/) erklärt, wann Sie welche Methode verwenden und warum der Standard sich zwischen Windows und macOS unterscheidet.

## Bevor Sie beginnen

- Ein Azure Bastion-Host mit der Standard- oder Premium-SKU. Die Basic- und Developer-SKUs unterstützen den nativen Client nicht.
- **Native Client-Unterstützung** auf diesem Bastion-Host aktiviert.
- Leserzugriff auf den Bastion-Host und auf die virtuellen Maschinen, die Sie erreichen möchten.
- Windows 10 oder neuer. Installiert über den Microsoft Store.
- Es gibt einen macOS-Build, unterstützt seit 3.1.2 für Apple Silicon und Intel, der jedoch noch nicht öffentlich verfügbar ist.

<div class="callout note">
<span class="eyebrow">Hinweis</span>
<p>Die Anwendung prüft die Bastion-SKU und ihre Feature-Flags, bevor sie eine Verbindung herstellt, und nennt Ihnen die fehlende Voraussetzung, wenn eine Prüfung fehlschlägt. Diese Prüfungen sind fail-open: Eine Prüfung, die nicht abgeschlossen werden kann, hindert Sie nicht am Verbinden.</p>
</div>

## Wo die Daten gespeichert werden

Einstellungen wandern mit Ihrem Windows-Profil. Anmeldedaten und Protokolle verbleiben auf dem Computer.

| Pfad | Enthält |
| --- | --- |
| `%APPDATA%\BastionRDPConnector` | `settings.json`: zuletzt verwendete Subscription, Bastion, VM und Sprache |
| `%LOCALAPPDATA%\BastionRDPConnector` | Anmelde-Token-Cache, das Profil des Anmeldebrowsers und `debug.log` mit den letzten zehn Sitzungen |
