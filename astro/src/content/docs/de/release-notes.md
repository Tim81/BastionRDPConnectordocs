---
title: Versionshinweise
description: Was sich in jeder aktuellen Version von Azure Bastion RDP Connector geändert hat.
appliesTo: '3.3.9'
lastReviewed: '2026-09-19'
---

## 3.3.9

| Änderung | Details |
| --- | --- |
| macOS: RD Gateway-Abbrüche sind ein Fehler in Windows App for Mac | Windows App for Mac teilt ein RD Gateway-Paket auf zwei WebSocket-Nachrichten auf, woraufhin Azure Bastion den WebSocket schließt. Gateway-Pakete, die größer sind als der 20.480 Byte große Empfangspuffer von Bastion, lassen die Sitzung außerdem hängen. Beides zeigt sich als Trennung innerhalb weniger Sekunden, mit dem Fehler `0x300006c`, `0x3000064` oder `0x10b`. Es ist kein TLS- oder Cipher-Problem, wie frühere Versionen angaben. Verifiziert wurde es mit Windows App 11.4.1. FreeRDP über dieselbe Bastion und der Tunnel-Modus mit Windows App bleiben beide verbunden, und keine Eigenschaft in der `.rdp`-Datei umgeht das Problem. |
| macOS: überarbeitete RD Gateway-Warnung | RD Gateway bleibt unter macOS auswählbar, falls Microsoft den Client repariert. Die Warnung sagt jetzt, was tatsächlich passiert und dass Ihre VM nicht das Problem ist. Sie bietet **Stattdessen Tunnel verwenden**, **Trotzdem RD Gateway versuchen** oder Abbrechen an, in allen sechs Sprachen. Der Dialog heißt „Bekanntes Problem unter macOS“ statt „Unter macOS nicht unterstützt“. Der Menüeintrag „Über“ unter macOS ist jetzt lokalisiert und folgt einem Sprachwechsel sofort. |
| Tunnel: keine sinnlosen Wiederverbindungsschleifen mehr | Wenn der RDP-Client seine eigene Verbindung schloss, behandelte der Tunnel das als Netzwerkfehler und versuchte es bis zu fünf Mal erneut, jedes Mal mit einem neuen Bastion-Token, obwohl kein Client verbunden war. Jetzt erhält jede angenommene Verbindung für ihre gesamte Lebensdauer ein Bastion-Token und einen WebSocket. Endet der WebSocket, während der Client noch verbunden ist, wird die lokale Verbindung geschlossen, und die eigene automatische Wiederverbindung des RDP-Clients öffnet eine neue mit einem frischen Token. Der Status „Verbindung wird wiederhergestellt… (Versuch n/5)“ entfällt. |
| Tunnel: Zeitlimits, sauberes Beenden, Wiederverwendung und Zielport | Der Verbindungsaufbau des WebSockets läuft nach 30 Sekunden in ein Zeitlimit, und eine Token-Anforderung an Bastion mit Zeitüberschreitung wird als Fehler gemeldet statt als stiller Abbruch. Die Bastion-Sitzung wird beim Beenden immer aufgeräumt, das Schließen des WebSockets ist zeitlich begrenzt, und ein Tunnel, der gerade stoppt, erhält nie einen neuen Client. Erneutes Verbinden mit derselben Bastion, demselben Ziel und demselben Port verwendet den laufenden Tunnel wieder und startet den RDP-Client neu. Der gewählte Zielport wird beachtet: VM-Tunnel waren fest auf 3389 eingestellt. Das zuletzt verwendete Ziel und der lokale Port werden gemerkt, und Bezeichnungen zeigen `vm:port`. |
| Eine abgelaufene Azure-Sitzung führt Sie zurück zur Anmeldung | Die Vorabprüfungen übersprangen sich bei jedem Fehler selbst, auch bei einer Conditional-Access-Anforderung zur erneuten Authentifizierung, und ließen die Verbindung später scheitern. Jetzt fordert die Anwendung zur Anmeldung auf und wiederholt den Vorgang einmal, beim Start, beim Laden von Abonnements, Bastions und VMs, beim Wechsel des Abonnements, beim Verbinden und beim Starten einer VM. Es ist immer nur ein Anmelde-Popup offen; ein zweiter Auslöser wartet auf das bereits geöffnete. |
| Korrekturen bei der Anmeldung | Das Hauptfenster wird wiederhergestellt, bevor ein Anmelde-Popup geöffnet wird, sodass die Anmeldung nicht mehr hängt, wenn das Fenster im Infobereich versteckt ist. Nur die bekannten, harmlosen Dialogausnahmen wegen eines nicht sichtbaren oder geschlossenen Besitzerfensters werden verworfen; alles andere wird weiterhin protokolliert und angezeigt. Die Token-Beschaffung ist an das angemeldete Konto gebunden, was Token des falschen Kontos behebt, wenn mehrere Konten im Cache liegen. Die Anmeldung mit einem anderen Konto leert den Abonnement-Cache. Beim Auflisten von Mandanten, Abonnements und Bastions werden Fehler jetzt gemeldet, statt eine leere Liste zu liefern. Lassen sich Abonnements auch nach erneuter Authentifizierung nicht laden, beendet sich die Anwendung, statt Sie abgemeldet und ohne Auswahl zurückzulassen. |
| VM-Energiestatus | Das Starten einer VM wird pro VM verfolgt, sodass beim Wechsel der VM nicht mehr „Wird gestartet“ bei der falschen erscheint. Während eine VM startet, ist die Schaltfläche Start ausgeblendet und Verbinden deaktiviert. Ein fehlgeschlagener Start wird erkannt: Bleibt die VM etwa 30 Sekunden lang gestoppt oder freigegeben, erhalten Sie eine Fehlermeldung mit dem Namen der VM, statt die gesamte Abfragezeit abzuwarten. Das Starten einer VM und das Aktualisieren des Energiestatus authentifizieren bei abgelaufener Sitzung erneut. |
| Weitere Zuverlässigkeit | Das Schließen des Fensters bricht laufende Arbeit still ab, ohne Fehlerdialoge beim Beenden. Eine veraltete Aktualisierung von Bastions oder Abonnements wird verworfen, wenn Sie inzwischen das Abonnement gewechselt haben, und der Dialog „Abonnement ändern“ ruft die Bastions ab, bevor er übernimmt, sodass ein Fehler das vorherige Abonnement unberührt lässt. Startet der RDP-Client nicht, erhalten Sie eine Benachrichtigung oder, ohne Infobereichssymbol, ein wiederhergestelltes Fenster mit Fehlerdialog. Das Wiederherstellen aus dem Infobereich bringt die Taskleistenschaltfläche und den vorherigen Fensterzustand zurück. Minimieren bei geöffnetem Dialog oder Anmelde-Popup versteckt nicht mehr im Infobereich und beendet ihn nicht mehr. Der Info-Dialog kann nur einmal geöffnet sein. Log-Ordner öffnen funktioniert jetzt mit Pfaden, die Leerzeichen enthalten. |
| Sicherheit: Hostname von Bastion und Seitenabruf | Die Anwendung sendet Ihr ARM-Token an den in der Azure-Antwort genannten Host. Jetzt wird nur noch ein DNS-Name akzeptiert, der auf `.bastion.azure.com` endet, sodass eine IP-Adresse oder ein fremder Host das Token nie erhält, und Weiterleitungen sind für die Token-Anforderung deaktiviert. ARM-`nextLink`s müssen https auf dem ARM-Host sein, die Seitenzahl ist auf 500 begrenzt, und eine fehlgeschlagene Resource-Graph-Antwort löst einen Fehler aus, statt eine gekürzte Liste zu liefern. |
| Sicherheit: temporäre Dateien | Erzeugte `.rdp`-Dateien, die ein aktives Gateway-Token enthalten können, werden beim Beenden nach bestem Bemühen überschrieben und gelöscht. Das ist kein garantiertes sicheres Löschen. Der temporäre Ordner wird abgelehnt, wenn er ein Symlink oder eine Junction ist. Unter macOS wird der Ordner mit 0700 und die Dateien mit 0600 angelegt, und die `.rdp`-Datei des macOS-Tunnels durchläuft jetzt dieselbe Behandlung; zuvor war sie eine für alle lesbare Datei in `$TMPDIR`, die nie entfernt wurde. Reste eines Absturzes oder erzwungenen Beendens werden beim Start entfernt, nur von der bestätigten ersten Instanz. Unter macOS werden `.rdp`-Dateien und der Log-Ordner über den absoluten Pfad `/usr/bin/open` geöffnet. |

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
