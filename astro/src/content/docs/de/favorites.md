---
title: Favoriten
description: Speichern Sie bis zu zehn IP-Adressen und Azure-VMs pro Mandant, und verbinden Sie sich erneut über die Registerkarte Favoriten mit dem zu diesem Zeitpunkt gewählten Bastion-Host.
appliesTo: '3.4.0'
lastReviewed: '2026-10-20'
---

Favoriten sind ein kürzerer Weg zurück zu einer Verbindung, die Sie bereits herstellen. Die Liste enthält bis zu zehn Einträge für den Entra ID-Mandanten, bei dem Sie angemeldet sind. Ein Favorit ist eine IP-Adresse oder eine Azure-VM. Ports, Verbindungsmethode und Bastion-Host bleiben dort, wo Sie sie festlegen.

## Hinzufügen und Entfernen

Auf der Registerkarte [IP-Adresse](../connect-ip/) und der Registerkarte [Azure VM](../connect-vm/) steht ein Stern neben **Verbinden**. Der Tooltip ist **Favorit**.

- Ein leerer Stern bedeutet, dass die Adresse oder die virtuelle Maschine auf dieser Registerkarte kein Favorit ist. Klicken Sie darauf, um das aktuelle Ziel zu speichern. Eine gültige IP-Adresse wird so gespeichert, wie Sie sie eingegeben haben. Eine virtuelle Maschine wird mit Name, Ressourcen-ID, Ressourcengruppe und der Subscription gespeichert, zu der sie gehört, damit Sie diese Subscription später nicht erneut auswählen.
- Ein gefüllter Stern bedeutet, dass der Eintrag bereits ein Favorit ist. Klicken Sie darauf, um ihn zu entfernen. Die Anwendung fragt zuerst nach einer Bestätigung. **OK** entfernt ihn. **Abbrechen**, oder das Schließen des Dialogs, lässt ihn stehen.

Dieselbe Bestätigung erscheint, wenn Sie in einer Zeile auf der Registerkarte Favoriten auf **Entfernen** klicken.

Eine leere oder ungültige IP-Adresse, oder keine ausgewählte virtuelle Maschine, wird nicht gespeichert. Der Stern bleibt leer, und Sie sehen dieselbe Warnung wie bei **Verbinden**. Ein elfter Eintrag wird abgelehnt, bis Sie einen entfernen.

## Beschreibung

Ein IP-Favorit kann eine kurze Beschreibung tragen, wohin diese Adresse verbindet, mit höchstens 40 Zeichen. Auf der Registerkarte Favoriten zeigt die Zeile diesen Text unter der Adresse. Ohne Beschreibung zeigt die Zeile **IP-Adresse**.

Eine Stift-Schaltfläche öffnet einen Dialog. Der Tooltip ist **Beschreibung hinzufügen**, wenn die Zeile keine hat, und **Beschreibung bearbeiten**, wenn eine gespeichert ist. Geben Sie den Text ein und drücken Sie **Speichern**. **Abbrechen**, oder das Schließen des Dialogs, lässt den gespeicherten Text stehen. Wenn Sie das Feld leeren und auf **Speichern** drücken, wird die Beschreibung entfernt.

Eine Papierkorb-Schaltfläche erscheint nur, wenn eine Beschreibung gespeichert ist. Der Tooltip ist **Beschreibung löschen**. Sie entfernt die Beschreibung und lässt den Favoriten in der Liste. Es gibt keine Rückfrage.

Ein VM-Favorit hat keine Beschreibung. Das Entfernen des Favoriten fragt weiterhin nach einer Bestätigung, und damit entfällt auch seine Beschreibung.

## Verbinden aus der Liste

Öffnen Sie die Registerkarte **Favoriten**. Jede Zeile ist ein gespeichertes Ziel, mit **Verbinden** und **Entfernen**.

**Verbinden** verwendet den Bastion-Host, der in diesem Moment oben im Fenster ausgewählt ist. Wechseln Sie den Bastion-Host und verbinden Sie sich erneut, dann wird der neue Host verwendet.

Ein IP-Favorit öffnet einen Tunnel auf dieselbe Weise wie die Registerkarte IP-Adresse, einschließlich Zielport und lokalem Port dieser Registerkarte.

Ein VM-Favorit verwendet die Verbindungsmethode, die auf der Registerkarte Azure VM ausgewählt ist.

- **Tunnel** verwendet Zielport und lokalen Port dieser Registerkarte.
- **RD Gateway** verwendet Port 3389, das Kontrollkästchen für die Entra ID-Authentifizierung und die Monitorauswahl auf dieser Registerkarte.

Die virtuelle Maschine muss noch in der Liste stehen, die für diese Anmeldung geladen wurde. Fehlt sie, bricht **Verbinden** ab und zeigt das an. Würde der aktuelle Subscription-, Namens- oder Tagfilter die VM ausblenden, wechselt **Verbinden** zur Subscription dieser VM, löscht diese Filter und lässt die Registerkarte Azure VM auf dieser Maschine stehen.

## Energiestatus

Ein VM-Favorit folgt denselben Regeln für den Energiestatus wie die Seite [Azure VM](../connect-vm/). **Verbinden** ist nur verfügbar, solange die VM aktiv ist. Eine gestoppte oder freigegebene VM bietet **VM starten**, wenn Ihr Konto sie starten darf. Während die VM startet, ist **VM starten** ausgeblendet und **Verbinden** bleibt aus. Ein IP-Favorit hat keinen Energiestatus.
