---
title: Versionshinweise
description: Was sich in jeder aktuellen Version von Azure Bastion RDP Connector geändert hat.
appliesTo: '3.3.9'
lastReviewed: '2026-09-19'
---

## 3.3.9

| Änderung | Details |
| --- | --- |
| Abgelaufene Sitzungen fordern zur erneuten Anmeldung auf | Die Vorabprüfungen (Bastion-SKU, Feature-Flags, Energiestatus der VM) waren bei jedem Fehler fail-open, auch bei einer abgelaufenen Azure-Sitzung. Eine abgelaufene Sitzung führt jetzt in den Anmeldevorgang, statt durchgewunken zu werden. Andere Fehler bleiben fail-open. |
| Hauptfenster wird vor dem Anmelde-Popup wiederhergestellt | Das Hauptfenster wird wiederhergestellt, bevor das Anmelde-Popup geöffnet wird. Bekannte, harmlose Dialogausnahmen wegen eines nicht sichtbaren oder geschlossenen Besitzerfensters werden protokolliert und verworfen, statt die Anwendung abstürzen zu lassen und aktive Tunnel zu trennen. |
| Veraltete temporäre `.rdp`-Dateien werden beim Start entfernt | Nach einem Absturz oder erzwungenen Beenden zurückgebliebene Dateien werden beim nächsten Start gelöscht, und zwar nur von der ersten laufenden Instanz. Erzeugte `.rdp`-Dateien liegen in einem temporären Anwendungsordner, der pro Benutzer angelegt und nur für den Besitzer zugänglich ist, und werden beim Beenden nach bestem Bemühen überschrieben und gelöscht. Das ist kein garantiertes sicheres Löschen. |
| macOS: `.rdp`-Dateien und der Log-Ordner werden über `/usr/bin/open` geöffnet | Beides wird jetzt über den absoluten Pfad `/usr/bin/open` geöffnet. |
| macOS: überarbeitete RD Gateway-Warnung | Windows App for Mac kann derzeit keine RD Gateway-Sitzung über Azure Bastion aufrechterhalten: Die Sitzung wird innerhalb weniger Sekunden getrennt, mit dem Fehler `0x300006c`, `0x3000064` oder `0x10b`. Die VM ist nicht das Problem. Der Dialog heißt jetzt „Bekanntes Problem unter macOS“ statt „Unter macOS nicht unterstützt“ und bietet **Stattdessen Tunnel verwenden** oder **Trotzdem RD Gateway versuchen** an. |
| macOS: Menüeintrag „Über“ lokalisiert | Der Menüeintrag „Über“ ist übersetzt und folgt Sprachwechseln sofort. |

## 3.3.8

| Änderung | Details |
| --- | --- |
| MSAL 4.90.0 | Die Microsoft Authentication Library, die die Anmeldung übernimmt, wurde aktualisiert. |
| Sicherheitsgepatchte .NET-Runtime | Die Untergrenze des Build-SDK wurde auf 10.0.401 angehoben, sodass die mitgelieferte Runtime das sicherheitsgepatchte .NET 10.0.12 ist. Sicherheitskorrekturen der Runtime erreichen Sie über Updates der Anwendung. |
| macOS: App-Symbol als Squircle | Das App-Symbol ist jetzt ein Squircle, sodass macOS Tahoe es nicht mehr in ein weißes Feld setzt. |

## 3.3.7

| Änderung | Details |
| --- | --- |
| Aktualisierte Komponenten | Azure.Core 1.62.0, Avalonia-Pakete 12.1.2 und Updates der Identitätsgruppe (MSAL und verwandte Pakete). Ausschließlich Abhängigkeitsupdates. |

## 3.3.6

| Änderung | Details |
| --- | --- |
| Sicherheitsupdate der mitgelieferten .NET-Runtime | Die Anwendung bringt ihre eigene .NET-Kopie mit und nutzt keine auf Ihrem Rechner installierte Version. Sicherheitskorrekturen der Runtime erreichen Sie daher über ein Update der Anwendung und nicht über Windows- oder macOS-Updates. Diese Version basiert auf .NET 10.0.11, einem Sicherheitsrelease der Runtime. |
| Aktualisierte Komponenten | Avalonia.Controls.WebView 12.1.0 und Azure.Core 1.61.0. |

## 3.3.5

| Änderung | Details |
| --- | --- |
| *Log* bleibt in Deutsch, Französisch und Spanisch unübersetzt | Die Schaltfläche Log-Ordner öffnen und die Meldung bei fehlgeschlagener Verbindung gaben *log* als *Protokoll*, *journal* bzw. *registro* wieder — das klingt nach einem gewöhnlichen Logbuch statt nach dem Fachbegriff. Beide behalten jetzt das Lehnwort und beugen nur die Umgebung: *Log-Ordner öffnen*, *Ouvrir le dossier de log*, *Abrir carpeta de log*. Englisch, Niederländisch und Portugiesisch bleiben unverändert. |

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
| Info-Dialog und Diagnosepaket | Die Schaltfläche i in der oberen Leiste, Log-Ordner öffnen und Diagnoseinformationen kopieren erschienen alle in dieser Version. |
| Plattformabhängige Standard-Verbindungsmethode | RD Gateway wurde unter Windows zum Standard, Tunnel unter macOS, weil die Windows App unter macOS Bastion nicht als Gateway verwenden kann. Der Standard gilt nur, bis Sie selbst eine Methode wählen. |
| Unterstützung für HD-Ready-Bildschirme | Das Fenster wuchs auf 580×760, von zuvor rund 540×700, und passt jetzt ohne Bildlaufleiste auf 1280×720-Displays. |
