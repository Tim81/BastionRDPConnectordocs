---
title: Versionshinweise
description: Was sich in jeder aktuellen Version von Azure Bastion RDP Connector geändert hat.
appliesTo: '3.3.4'
lastReviewed: '2026-07-25'
---

## 3.3.4

| Änderung | Details |
| --- | --- |
| Taskleistensymbol wiederhergestellt | Das Taskleistensymbol erschien unter Windows in den Versionen 3.2 bis 3.3.3 nicht. Minimieren in den Benachrichtigungsbereich, Tunnel-Benachrichtigungen und das Kontextmenü des Taskleistensymbols funktionieren wieder so, wie diese Dokumentation es beschreibt. |
| Zehn Sitzungen Protokollverlauf | `debug.log` wurde früher bei jedem Start überschrieben. Die letzten zehn Sitzungen werden jetzt als `debug.0.log` bis `debug.9.log` aufbewahrt, sodass das Protokoll des Laufs, in dem ein Problem auftrat, einen Neustart übersteht. |
| Diagnosepaket umfasst frühere Sitzungen | Diagnoseinformationen kopieren enthält jetzt zusätzlich zur aktuellen auch die archivierten Sitzungsprotokolle, neueste zuerst, bis zu etwa 1 MB. |
| Bereinigung schließt vor dem Schließen des Fensters ab | Aktive Tunnel werden geschlossen und temporäre `.rdp`-Dateien gelöscht, bevor das Fenster schließt. Das Abmelden durchläuft dieselbe Bereinigung, statt den Prozess sofort zu beenden. |
| Speicherort des Anmeldebrowsers verschoben | Der eingebettete Anmeldebrowser bewahrte sein Profil früher neben der Anwendungsdatei auf, was die Anmeldung störte, wenn die App aus einem schreibgeschützten Ordner wie Program Files lief. Es liegt jetzt unter `%LOCALAPPDATA%\BastionRDPConnector\WebView2`. Der Speicherort des Token-Caches bleibt unverändert. |
| Aktualisierte Komponenten | Avalonia 12.1.0, MSAL 4.87.0, Azure.Core 1.60.0. |

## 3.3

| Änderung | Details |
| --- | --- |
| VM-Laden über Azure Resource Graph | VMs über rund 200 Subscriptions laden in 2 bis 4 Sekunden, gegenüber zuvor 30 bis 60 Sekunden. Abonnementübergreifende Abfragen verwenden die Azure Resource Graph API, statt jede Subscription einzeln abzufragen. |
| Abonnementübergreifende VM-Suche | Der Modus Alle Subscriptions auf der Registerkarte Azure VM durchsucht jede Subscription, die Ihr Konto sehen kann. Er benötigt mindestens drei Zeichen, bevor Ergebnisse zurückgegeben werden, und das Subscription-Dropdown listet jetzt nur Subscriptions, die tatsächlich VMs enthalten. |
| Zweispaltige Registerkarte Azure VM | Verbindungsmethode, Monitor-Modus und Entra ID-Auth sitzen in der linken Spalte; die VM-Auswahl sitzt in der rechten Spalte. |
| Preflight-Prüfungen | Vor dem Verbinden prüft die Anwendung die Bastion-SKU, ihre Feature-Flags und den Energiestatus der VM. Diese Prüfungen sind fail-open: Eine Prüfung, die nicht abgeschlossen werden kann, blockiert die Verbindung nicht. |
| Automatische Tunnel-Wiederverbindung | Bricht die WebSocket-Verbindung ab, verbindet sich der Tunnel selbstständig neu, bis zu fünf Mal mit wachsendem Abstand zwischen den Versuchen. Die meisten RDP-Sitzungen bleiben bei einer so kurzen Wiederverbindung verbunden. |
| Info-Dialog und Diagnosepaket | Die Schaltfläche i in der oberen Leiste, Protokollordner öffnen und Diagnoseinformationen kopieren erschienen alle in dieser Version. |
| Plattformabhängige Standard-Verbindungsmethode | RD Gateway wurde unter Windows zum Standard, Tunnel unter macOS, weil die Windows App unter macOS Bastion nicht als Gateway verwenden kann. Der Standard gilt nur, bis Sie selbst eine Methode wählen. |
| Unterstützung für HD-Ready-Bildschirme | Das Fenster wuchs auf 580×760, von zuvor rund 540×700, und passt jetzt ohne Bildlaufleiste auf 1280×720-Displays. |
