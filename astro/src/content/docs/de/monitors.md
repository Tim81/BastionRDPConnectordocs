---
title: Monitore
description: Wählen Sie, ob eine RD Gateway-Sitzung auf Ihrem primären Bildschirm geöffnet wird oder sich über alle verbundenen Monitore erstreckt.
appliesTo: '3.3.4'
lastReviewed: '2026-07-25'
---

Die Registerkarte Azure VM hat eine Monitore-Einstellung neben Verbindungsmethode. Sie gilt nur für RD Gateway. Tunnel-Verbindungen tragen keine Monitor-Präferenz, da Ihr eigener Remotedesktop-Client die Sitzung übernimmt, sobald der Tunnel offen ist.

## Die beiden Optionen

| Option | Verhalten |
| --- | --- |
| Einzelner Monitor | Die Sitzung öffnet sich im Vollbildmodus nur auf Ihrem primären Bildschirm. |
| Alle Monitore | Die Sitzung erstreckt sich über alle verbundenen Monitore, sodass der Remote-Desktop Ihre gesamte Multi-Monitor-Konfiguration ausfüllt. |

Einzelner Monitor ist der Standard. Wählen Sie Alle Monitore, wenn sich die Remote-Sitzung wie ein zweiter physischer Desktop über Ihre Bildschirme verhalten soll.

## Warum Tunnel diese Einstellung nicht hat

Die Monitor-Auswahl wird in die `.rdp`-Datei geschrieben, die RD Gateway an Ihren Remotedesktop-Client übergibt. Tunnel erzeugt keine Datei. Er öffnet einen lokalen Port und lässt Sie den Client selbst starten, sodass es nichts gibt, in das die Anwendung die Einstellung schreiben könnte. Wenn Sie eine Sitzung von RD Gateway zu Tunnel wechseln, stellen Sie das Monitor-Verhalten stattdessen direkt in Ihrem RDP-Client ein.

## Wo die Wahl gespeichert wird

Die Monitor-Einstellung wird [pro Mandant](../tenants/) gespeichert, zusammen mit Verbindungsmethode und Entra ID-Authentifizierung. Beim Mandantenwechsel wird wiederhergestellt, was Sie zuletzt für diesen Mandanten gewählt haben, und auch beim Zurückwechseln zu RD Gateway im selben Mandanten wird es sich gemerkt.
