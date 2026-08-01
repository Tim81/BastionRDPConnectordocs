---
title: Mehrere Mandanten
description: Wie die Anwendung für jeden Entra ID-Mandanten, den Ihr Konto sehen kann, einen eigenen Satz an Präferenzen führt, und was global bleibt.
appliesTo: '3.3.5'
lastReviewed: '2026-07-25'
---

Wenn Ihr Konto Zugriff auf mehr als einen Entra ID-Mandanten hat, zum Beispiel über Azure Lighthouse, führt die Anwendung für jeden einen eigenen Satz an Präferenzen, statt bei jedem Wechsel einen einzigen gemeinsamen Satz zu überschreiben.

## Mandanten wechseln

[Erste Anmeldung](../sign-in/) behandelt den Mandantenauswahldialog, der direkt nach der Authentifizierung erscheint, wenn Ihr Konto mehr als einen Mandanten sehen kann. Sie können den Mandanten auch später jederzeit wechseln, während die App läuft, über dasselbe Steuerelement in der oberen Leiste.

Der Mandantenwechsel meldet Sie nicht ab. Er lädt die Subscription-Liste für den gewählten Mandanten neu und stellt wieder her, was Sie dort zuletzt verwendet haben.

## Was pro Mandant gespeichert wird

Jeder Mandant erhält einen eigenen Speicherplatz für:

- Die zuletzt verwendete Bastion Subscription und den Bastion-Host
- Die zuletzt verwendete VM Subscription und virtuelle Maschine
- Die zuletzt verwendete IP-Adresse
- Zielport und lokalen Port
- Verbindungsmethode, Tunnel oder RD Gateway
- Monitor-Modus
- Entra ID-Authentifizierung

Wechseln Sie von Mandant A zu Mandant B und wieder zurück, kommen Bastion, VM und Ports von Mandant A genau so zurück, wie Sie sie verlassen haben. Nichts von Mandant B wird übernommen.

## Was global bleibt

Ihre Sprachwahl gilt über alle Mandanten hinweg. Ändern Sie sie, während Sie mit einem Mandanten arbeiten, bleibt sie geändert, nachdem Sie zu einem anderen gewechselt haben. Sprache ist eine Präferenz über Sie, nicht über die Umgebung, mit der Sie verbunden sind.

## Wo das auf der Festplatte liegt

All das, pro Mandant wie global, liegt in einer Datei: `%APPDATA%\BastionRDPConnector\settings.json`. [Dateien und Einstellungen](../files-and-settings/) behandelt den Dateiaufbau und was jeder Pfad enthält.
