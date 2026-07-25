---
title: Voraussetzungen
description: Was auf Ihrem Computer und in Azure erfüllt sein muss, bevor Azure Bastion RDP Connector eine Sitzung öffnen kann.
appliesTo: '3.3.4'
lastReviewed: '2026-07-25'
---

Die Anwendung ist eigenständig. Sie benötigt kein separat installiertes .NET, und seit 3.0 benötigt sie auch keine Azure CLI. Was sie braucht, ist ein unterstütztes Betriebssystem, ein Remotedesktop-Client und ein Bastion-Host, der für native Client-Verbindungen konfiguriert ist.

## Auf Ihrem Computer

| Anforderung | Hinweise |
| --- | --- |
| Windows 10 oder neuer, x64 | Installiert über den Microsoft Store |
| macOS 12 Monterey oder neuer | Unterstützt seit 3.1.2 für Apple Silicon und Intel, aber noch nicht öffentlich verfügbar |
| Remotedesktop-Client, Windows | `mstsc.exe`, bereits Teil von Windows |
| Remotedesktop-Client, macOS | Die Windows App aus dem Mac App Store. Verwenden Sie damit Tunnel. Eine RD Gateway-Sitzung öffnet sich und wird nach wenigen Sekunden mit dem Fehler `0x3000064` getrennt – ein Cipher-Mismatch, den Microsoft auf diesem Client nicht unterstützt |

<div class="callout note">
<span class="eyebrow">Hinweis</span>
<p>Azure CLI ist nicht erforderlich. Frühere Versionen riefen <code>az network bastion tunnel</code> auf; seit 3.0 wird der Tunnel nativ mit .NET aufgebaut. Wenn Sie noch einen 2.x-Build verwenden, werden Azure CLI und die <code>azure-bastion</code>-Erweiterung weiterhin benötigt.</p>
</div>

## In Azure

| Anforderung | Hinweise |
| --- | --- |
| Azure Bastion, Standard- oder Premium-SKU | Die Basic- und Developer-SKUs unterstützen den nativen Client nicht |
| Native Client-Unterstützung, auf dem Bastion-Host aktiviert | Wird getrennt von der SKU-Wahl aktiviert |
| IP-basierte Verbindung, auf dem Bastion-Host aktiviert | Nur nötig, wenn Sie die Registerkarte IP-Adresse verwenden möchten |
| Leserrolle auf der Bastion-Ressource und ihrem virtuellen Netzwerk | Das Minimum, um Bastion-Hosts aufzulisten und über sie zu verbinden |
| Leserrolle auf der Ziel-VM | Nötig, um diese VM aufzulisten und mit ihr zu verbinden. Virtual Machine Contributor oder höher wird benötigt, um eine gestoppte VM zu starten |
| Eine Azure-Subscription | Die Anwendung listet jede Subscription auf, die Ihr Konto sehen kann |

<div class="callout note">
<span class="eyebrow">Hinweis</span>
<p>Die Anwendung prüft die Bastion-SKU und ihre Feature-Flags vor dem Verbinden und nennt die fehlende Voraussetzung, wenn eine Prüfung fehlschlägt. Diese Prüfungen sind fail-open: Wenn die Prüfung selbst nicht abgeschlossen werden kann, etwa wegen eines vorübergehenden Netzwerkproblems, wird der Verbindungsversuch trotzdem fortgesetzt.</p>
</div>

## Netzwerkerreichbarkeit

Ein Ziel muss nur vom virtuellen Netzwerk von Bastion aus erreichbar sein. Es muss weder eine Azure-VM sein noch überhaupt in Azure liegen.

- Bastion, bereitgestellt im selben virtuellen Netzwerk oder in einem damit gepeerten Netzwerk, ist der einfache Fall.
- In einem Hub-and-Spoke- oder Landing-Zone-Setup sitzt Bastion oft in einer zentralen Connectivity Landing Zone und erreicht Spoke-VNets über Azure Virtual WAN. In dieser Topologie ist die Bastion-Ressource von innerhalb eines einzelnen Spokes im Azure-Portal nicht sichtbar, obwohl sie VMs dort trotzdem erreichen kann. Diese Anwendung ist genau für diesen Fall gebaut: das gemeinsam genutzte Bastion einmal auswählen und dann mit einer VM in jedem erreichbaren Spoke verbinden.
- Auch lokale Computer sind erreichbar, über eine Site-to-Site-VPN- oder ExpressRoute-Verbindung, ebenso wie Windows-Systeme in anderen Clouds, solange eine Route besteht.

Wenn Sie nicht sicher sind, ob ein Bastion-Host ein bestimmtes Ziel erreichen kann, fragen Sie, wer Ihr Netzwerk verwaltet. Die Anwendung hat keine Möglichkeit, Routen zu sehen, die nicht über die von ihr aufgerufenen APIs offengelegt werden.
