---
title: Installation
description: Azure Bastion RDP Connector wird über den Microsoft Store vertrieben. Es gibt keinen direkten Download und keinen separaten Installer.
appliesTo: '3.3.5'
lastReviewed: '2026-07-25'
---

Azure Bastion RDP Connector wird als Microsoft Store-App vertrieben, Produkt-ID `9N9MJ1V43Z6T`. Windows übernimmt den Download, die Installation und jedes spätere Update. Es gibt keine ZIP-Datei zum Entpacken und keine SmartScreen-Meldung zum Wegklicken.

## Installation unter Windows

1. Öffnen Sie den Store-Eintrag, entweder über den Deeplink `ms-windows-store://pdp/?productid=9N9MJ1V43Z6T`, der die Store-App direkt öffnet, oder über einen Browser unter [apps.microsoft.com/detail/9N9MJ1V43Z6T](https://apps.microsoft.com/detail/9N9MJ1V43Z6T).
2. Wählen Sie **Get** oder **Installieren**. Eine Installation pro Benutzer benötigt keine Administratorrechte.
3. Starten Sie die App über das Startmenü. Suchen Sie nach „Bastion RDP Connector".

<div class="callout note">
<span class="eyebrow">Hinweis</span>
<p>Da der Store die Installation verwaltet, laufen Updates im Hintergrund ab. Sie müssen nicht selbst nach einer neuen Version suchen.</p>
</div>

## macOS

Einen macOS-Build gibt es seit Version 3.1.2, sowohl für Apple Silicon als auch für Intel-Macs, aber er ist noch nicht öffentlich verfügbar. Es gibt hier keinen macOS-Download anzubieten. Sobald er erscheint, trägt diese Seite denselben Store-Eintrag, den Windows bereits hat.

## Was der erste Start tut

Bei der Installation selbst wird nichts konfiguriert. Die Anwendung liest beim Start `%APPDATA%\BastionRDPConnector\settings.json`, und falls diese Datei noch nicht existiert, startet sie mit Standardwerten und legt die Datei bei der ersten Speicherung an. [Erste Anmeldung](../sign-in/) beschreibt, was beim ersten Öffnen der App passiert, wenn sie sich authentifizieren muss.
