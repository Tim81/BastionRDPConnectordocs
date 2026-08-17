---
title: Verbindungsmethoden
description: 'Tunnel und RD Gateway im Vergleich: wie jede die Sitzung überträgt, welche Ziele sie erreichen, und welche unter Windows und macOS der Standard ist.'
appliesTo: '3.3.6'
lastReviewed: '2026-07-25'
---

Beide Methoden erreichen dieselbe virtuelle Maschine über denselben Bastion-Host. Sie unterscheiden sich darin, wie die Remotedesktopsitzung übertragen wird, und dieser Unterschied entscheidet, welche Ziele jede Methode erreichen kann.

<figure>
<div class="frame">
<svg viewBox="0 0 620 186" role="img" aria-labelledby="fig1t">
  <title id="fig1t">Ihr Computer kann die virtuelle Maschine nicht direkt erreichen. Beide Verbindungsmethoden werden über den Azure Bastion-Host geleitet.</title>
  <!-- direct path, blocked -->
  <path class="w-dead" d="M104 40 H516"/>
  <line class="w-x" x1="300" y1="30" x2="320" y2="50"/>
  <line class="w-x" x1="320" y1="30" x2="300" y2="50"/>
  <text class="n-s" x="310" y="21" text-anchor="middle">keine öffentliche IP · 3389 geschlossen</text>
  <!-- routed path -->
  <path class="w-live" d="M104 120 H256"/>
  <path class="w-live" d="M364 120 H516"/>
  <text class="n-s" x="180" y="112" text-anchor="middle">443 ausgehend</text>
  <text class="n-s" x="440" y="112" text-anchor="middle">3389 innerhalb des VNet</text>
  <!-- nodes -->
  <rect class="n-box" x="8" y="18" width="96" height="124" rx="5"/>
  <text class="n-t" x="56" y="74" text-anchor="middle">Ihr PC</text>
  <text class="n-s" x="56" y="92" text-anchor="middle">mstsc</text>
  <rect class="n-box n-hop" x="256" y="96" width="108" height="48" rx="5"/>
  <text class="n-t on" x="310" y="118" text-anchor="middle">Bastion</text>
  <text class="n-s" x="310" y="133" text-anchor="middle" fill="#98A2B3">Standard-SKU</text>
  <rect class="n-box" x="516" y="18" width="96" height="124" rx="5"/>
  <text class="n-t" x="564" y="74" text-anchor="middle">Azure VM</text>
  <text class="n-s" x="564" y="92" text-anchor="middle">private IP</text>
  <text class="n-s" x="310" y="172" text-anchor="middle">Tunnel und RD Gateway nutzen beide die untere Route</text>
</svg>
</div>
<figcaption><b>Abbildung 1</b> Der direkte Pfad existiert nicht. Jede Sitzung wird über den Bastion-Host auf Port 443 geleitet.</figcaption>
</figure>

## Tunnel

Die Anwendung öffnet einen WebSocket zum Bastion-Host und lauscht auf einem lokalen Port auf Ihrem Computer. Ihr Remotedesktop-Client verbindet sich mit `localhost` auf diesem Port, und der Datenverkehr wird über den WebSocket weitergeleitet.

Da das Ziel für den Tunnel immer nur eine Adresse auf der anderen Seite ist, erreicht diese Methode jede IP-Adresse, zu der das virtuelle Netzwerk von Bastion eine Route hat. Das schließt Computer ein, die keine Azure-VMs sind.

Wenn der WebSocket abbricht, verbindet sich der Tunnel selbstständig neu, bis zu fünf Mal mit wachsendem Abstand zwischen den Versuchen. Eine offene Remotedesktopsitzung übersteht eine kurze Wiederverbindung.

### Wann Sie ihn verwenden

- Sie verbinden sich mit einer IP-Adresse, statt eine VM auszuwählen.
- Sie verwenden macOS, wo eine RD Gateway-Sitzung nach wenigen Sekunden abbricht. Siehe [RD Gateway unter macOS](#rd-gateway-unter-macos).
- Sie möchten mehrere Sitzungen gleichzeitig offen halten, jede auf ihrem eigenen lokalen Port.

## RD Gateway

Die Anwendung fragt Bastion nach einer vorkonfigurierten `.rdp`-Datei, die Bastion als Remotedesktop-Gateway angibt, und übergibt diese Datei dann an Ihren Client. Es gibt keinen lokalen Port und keinen Tunnelprozess.

Das ist der kürzere Weg, und unter Windows ist er der Standard. Er funktioniert nur, wenn Bastion das Ziel selbst auflösen kann, das heißt, er funktioniert für Azure-VMs und nicht für eingegebene IP-Adressen.

<div class="callout warn">
<span class="eyebrow">Mandantenübergreifende Anmeldung</span>
<p>Die Entra ID-Authentifizierung ist standardmäßig deaktiviert und sollte deaktiviert bleiben, wenn die virtuelle Maschine einem anderen Mandanten gehört als das Konto, mit dem Sie angemeldet sind – der übliche Fall bei Azure Lighthouse. Azure AD gibt für diese Kombination <code>AADSTS293004</code> zurück. Wenn Sie sie trotzdem aktivieren und Bastion ablehnt, fragt die Anwendung erneut mit deaktivierter Einstellung an, sodass die Sitzung trotzdem geöffnet wird. Siehe <a href="../entra-id/">Entra ID-Authentifizierung</a>.</p>
</div>

### RD Gateway unter macOS

RD Gateway ist unter macOS auswählbar, und die Verbindung öffnet sich tatsächlich. Sie bricht dann nach etwa zehn bis fünfzehn Sekunden mit dem Fehler `0x3000064` ab.

Die Ursache ist ein Cipher-Mismatch, kein Konfigurationsfehler. Der TLS-Stack des macOS-Clients bietet nur RSA-Cipher-Suites an, und das Gateway von Azure Bastion präsentiert ECDSA. Keine Seite kann sich mit der anderen einigen, sodass die Sitzung kurz nach dem Start abgebrochen wird. Das ist eine Client-Einschränkung auf Microsoft-Seite, für die es keine Einstellung als Umgehung gibt.

Microsoft unterstützt den RD Gateway-Pfad von Bastion mit dem Windows-Client. Mit der Windows App unter macOS ist das keine unterstützte Kombination.

Da die Verbindung scheinbar zunächst gelingt, bevor sie fehlschlägt, fragt die Anwendung nach, bevor sie es versucht. Die Wahl von RD Gateway unter macOS zeigt eine Meldung, die den Fehlercode nennt und stattdessen Tunnel anbietet. Wird trotzdem mit Ja geantwortet, wird der Versuch dennoch unternommen, sodass sich das Verhalten überprüfen statt nur glauben lässt.

Verwenden Sie unter macOS Tunnel. Er erreicht dieselben Computer und ist dort aus diesem Grund der Standard.

## Vergleich

| &nbsp; | Tunnel | RD Gateway |
| --- | --- | --- |
| Verbindung zu einer Azure-VM | Ja | Ja |
| Verbindung zu einer IP-Adresse | Ja | Nein |
| Öffnet einen lokalen Port | Ja, einer pro Sitzung | Nein |
| Verbindet sich automatisch neu | Ja, bis zu 5 Versuche | Nein |
| Entra ID-Authentifizierung | Nicht zutreffend | Standardmäßig aus, optional |
| Standard unter Windows | Nein | Ja |
| Standard unter macOS | Ja | Nein |
| Erfordert Azure CLI | Nein | Nein |

Der Standard gilt nur, bis Sie selbst eine Methode wählen. Danach wird Ihre Wahl pro Mandant gespeichert und beim nächsten Start der Anwendung wiederhergestellt.

## Ports

Keine der beiden Methoden benötigt eine eingehende Firewallregel. Beide verwenden ausgehenden Port 443 von Ihrem Computer zum Bastion-Host.

| Von | Nach | Port |
| --- | --- | --- |
| Ihr Computer | bst-*.bastion.azure.com | 443/TCP ausgehend |
| Ihr Computer | login.microsoftonline.com | 443/TCP ausgehend |
| Bastion-Host | Zielcomputer | 3389/TCP innerhalb des virtuellen Netzwerks |
