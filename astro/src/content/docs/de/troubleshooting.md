---
title: Fehlerbehebung
description: Häufige Probleme, in den Worten, mit denen Sie sie beschreiben würden, und was Sie für jedes einzelne prüfen sollten.
appliesTo: '3.3.5'
lastReviewed: '2026-07-25'
---

## Bevor Sie sich verbinden

### Ich habe die App erneut gestartet, und nichts ist passiert

Die Anwendung erlaubt nur eine laufende Instanz. Ist sie bereits geöffnet, minimiert oder befindet sich im Systembenachrichtigungsbereich, bringt ein zweiter Start das vorhandene Fenster in den Vordergrund, statt ein neues zu öffnen. Prüfen Sie unter Windows den Systembenachrichtigungsbereich auf das Anwendungssymbol.

<!-- Mirrors src/components/ScreenTray.astro -->
<figure class="appshot">
  <div class="frame">
    <svg viewBox="0 0 300 372" role="img" aria-labelledby="s-tray-win">
      <title id="s-tray-win">Das Kontextmenü des Windows-Systembenachrichtigungsbereichs, aufgeklappt. Zwei offene Tunnel werden aufgelistet, jeweils mit den Schaltflächen Verbinden und Stoppen. Darunter Über und Beenden.</title>
      <rect class="ui-win" x="1" y="1" width="298" height="370" rx="6"/>
      <path class="ui-bar" d="M2 2 H298 V22 H2 Z"/>
      <text class="ui-title" x="10" y="15">Azure Bastion RDP Connector</text>
      <path d="M266 9 h7 M280 9 l7 7 M287 9 l-7 7" stroke="#7B8794" stroke-width="1.1" fill="none"/>
      <text class="ui-l" x="10" y="40">Systembenachrichtigungsbereich, Rechtsklickmenü</text>
      <rect class="ui-panel" x="10" y="48" width="280" height="50" rx="4"/>
      <circle class="ui-run" cx="22" cy="63" r="3.5"/>
      <text class="ui-tb" x="32" y="67">vm-dev-web-01</text>
      <text class="ui-p" x="32" y="80">localhost:55000 · offen 4m 12s</text>
      <rect class="ui-btn-2" x="194" y="59" width="46" height="15" rx="3"/>
      <text class="ui-tb" x="200" y="70">Verbinden</text>
      <rect class="ui-btn-2" x="244" y="59" width="34" height="15" rx="3"/>
      <text class="ui-tb" x="252" y="70">Stoppen</text>
      <rect class="ui-panel" x="10" y="106" width="280" height="50" rx="4"/>
      <circle class="ui-run" cx="22" cy="121" r="3.5"/>
      <text class="ui-tb" x="32" y="125">10.20.4.15</text>
      <text class="ui-p" x="32" y="138">localhost:55001 · offen 41s</text>
      <rect class="ui-btn-2" x="194" y="117" width="46" height="15" rx="3"/>
      <text class="ui-tb" x="200" y="128">Verbinden</text>
      <rect class="ui-btn-2" x="244" y="117" width="34" height="15" rx="3"/>
      <text class="ui-tb" x="252" y="128">Stoppen</text>
      <line x1="10" y1="170" x2="290" y2="170" stroke="#DCE2EA" stroke-width="1"/>
      <text class="ui-tb" x="20" y="190">Über</text>
      <text class="ui-tb" x="20" y="212">Beenden</text>
      <text class="ui-p" x="10" y="352">Doppelklicken Sie auf das Taskleistensymbol, um das Hauptfenster wiederherzustellen.</text>
    </svg>
  </div>
  <figcaption><b>Windows</b> Das Kontextmenü des Systembenachrichtigungsbereichs unter Windows, aufgeklappt. Jeder offene Tunnel erhält eigene Schaltflächen Verbinden und Stoppen, gefolgt von Über und Beenden.</figcaption>
</figure>

Das Schließen des Hauptfensters oder das Minimieren beendet die Anwendung nicht. Beides blendet das Fenster nur aus und lässt es im Benachrichtigungsbereich weiterlaufen, sodass offene Tunnel verbunden bleiben. Klicken Sie mit der rechten Maustaste auf das Taskleistensymbol und wählen Sie **Beenden**, um sie vollständig zu schließen. Das Taskleistensymbol gibt es nur unter Windows; macOS hat bewusst kein Taskleistensymbol.

### Keine Subscriptions erscheinen, oder die Bastion-Liste ist leer

Das bedeutet meist entweder, dass Ihr Konto keine Rollenzuweisung für eine Subscription hat, oder dass der Mandant, in dem Sie sich befinden, keine Bastion-Ressource enthält. Versuchen Sie:

- Wählen Sie **Aktualisieren** neben dem Bastion-Feld.
- Wählen Sie **Ändern**, um eine andere Subscription auszuwählen.
- Melden Sie sich ab und wieder an, falls Ihre Sitzung abgelaufen ist.
- Bitten Sie, wer Ihre Azure-Rollen verwaltet, zu bestätigen, dass Sie Reader auf dem Bastion-Host und seinem virtuellen Netzwerk haben.

## Verbinden

### mstsc öffnet sich, aber die Verbindung schlägt für eine Azure-VM über RD Gateway fehl

Prüfen Sie Folgendes:

- Der Energiestatus der VM zeigt **Aktiv**, und geben Sie dem Gastbetriebssystem danach ein bis zwei Minuten zum vollständigen Hochfahren.
- Der Bastion-Host hat die Standard- oder Premium-SKU. Basic unterstützt den nativen Client nicht.
- Keine Network Security Group-Regel blockiert eingehenden Datenverkehr von Bastion zur VM auf Port 3389.
- Es besteht eine Route von Bastion zur VM, sei es dasselbe virtuelle Netzwerk, ein Peering oder Virtual WAN.

### mstsc öffnet sich, aber die Verbindung schlägt für eine Azure-VM über Tunnel fehl

Alles oben Genannte gilt weiterhin, zusätzlich:

- Prüfen Sie die Registerkarte [Aktive Tunnel](../active-tunnels/). Ist der Tunnel nicht aufgelistet oder als gestoppt markiert, versuchen Sie erneut zu verbinden, um einen neuen zu starten.
- War der von Ihnen konfigurierte lokale Port bereits belegt, hat die Anwendung automatisch den nächsten freien gewählt. Vergleichen Sie den auf der Registerkarte Aktive Tunnel angezeigten Port mit dem, den Ihr Client verwendet.

### Die Verbindung schlägt fehl, wenn ich eine IP-Adresse eingebe

- Bestätigen Sie, dass die Adresse vom virtuellen Netzwerk von Bastion aus erreichbar ist, nicht nur von Ihrem eigenen Computer. Für lokale Ziele bedeutet das eine funktionierende Site-to-Site-VPN- oder ExpressRoute-Verbindung; für eine andere Cloud eine VPN-Verbindung nach Azure.
- Bestätigen Sie den Zielport. 3389 ist der Standard für RDP, aber ein Nicht-Azure- oder lokaler Host kann auf etwas anderem lauschen.
- Prüfen Sie, ob eine Host-Firewall auf dem Ziel eingehendes RDP aus dem Bastion-Subnetz blockiert.

### Die Schaltfläche Start erscheint nicht für eine gestoppte VM

Das Starten einer VM erfordert Virtual Machine Contributor oder eine gleichwertige Rolle; Reader allein reicht nicht. Bitten Sie, wer Ihre Azure-Rollen verwaltet, sie zu erteilen, oder starten Sie die VM stattdessen über das Azure-Portal.

### Ich habe einen AADSTS293004-Fehler erhalten

Azure AD gibt diesen Fehler zurück, wenn [Entra ID-Authentifizierung](../entra-id/) gegen eine virtuelle Maschine in einem anderen Mandanten als Ihr angemeldetes Konto verwendet wird – der übliche Fall bei Azure Lighthouse.

Deaktivieren Sie das Entra ID-Auth-Kontrollkästchen auf der Registerkarte Azure VM und verbinden Sie sich erneut. Die Einstellung ist standardmäßig deaktiviert; wenn Sie dies sehen, wurde sie irgendwann aktiviert und für diesen Mandanten gespeichert.

Sie können dies im Protokoll sehen, ohne dass die Verbindung fehlschlägt. Lehnt Bastion eine Entra ID-Anfrage ab, fragt die Anwendung erneut mit deaktivierter Einstellung an und verwendet diese Datei, sodass die Sitzung nach einem zusätzlichen Roundtrip trotzdem geöffnet wird.

Erscheint der Fehler beim direkten Öffnen einer gespeicherten `.rdp`-Datei, verbinden Sie sich stattdessen erneut über die Registerkarte Azure VM. Eine aus einer früheren Sitzung aufbewahrte Datei trägt die Einstellung, die beim Schreiben verwendet wurde.

## Anmeldung und Zurücksetzen

### Ich werde ständig erneut zur Anmeldung aufgefordert

Die Conditional-Access-Richtlinie Ihrer Organisation kann eine regelmäßige erneute Authentifizierung oder MFA bei jeder Anmeldung erfordern. Das ist zu erwarten. Schließen Sie die Aufforderung ab, wenn sie erscheint; die Anwendung hat keinen Einfluss darauf, wie oft Ihr Mandant dies verlangt.

### Ich möchte ganz neu anfangen

Wählen Sie **Abmelden** in der oberen Leiste, um Ihren Anmeldestatus zu löschen; das entfernt Token-Cache und MSAL-Zustand in einem Schritt. Um auch Präferenzen zurückzusetzen, schließen Sie die Anwendung und löschen Sie `%APPDATA%\BastionRDPConnector\settings.json`. [Dateien und Einstellungen](../files-and-settings/) behandelt, was jede Datei enthält und wo sie liegt.

### Ich muss ein Protokoll an den Support senden

Öffnen Sie **Über** und wählen Sie **Diagnoseinformationen kopieren**, oder **Log-Ordner öffnen**, um die Dateien direkt zu finden. [Diagnose](../diagnostics/) behandelt, was im Paket enthalten ist und wie es redigiert wird.
