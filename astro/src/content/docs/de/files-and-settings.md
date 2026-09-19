---
title: Dateien und Einstellungen
description: Wo die Anwendung Ihre Präferenzen, Ihren Anmeldestatus und ihre Protokolle speichert, und was in jeder Datei steht.
appliesTo: '3.3.9'
lastReviewed: '2026-07-25'
---

Die Anwendung schreibt in zwei getrennte Ordner unter Ihrem Benutzerprofil. Sie bearbeiten diese Dateien nie direkt; die Anwendung liest und schreibt sie selbstständig.

## Einstellungen: roaming, pro Mandant

`%APPDATA%\BastionRDPConnector\settings.json` enthält Ihre Präferenzen: die zuletzt verwendete Subscription, den Bastion-Host, die VM und die IP-Adresse, Verbindungsmethode, Monitor-Modus, Entra ID-Authentifizierung und Ihre Sprachwahl.

Dieser Ordner wandert mit Ihrem Windows-Profil, sodass dieselben Präferenzen Sie zwischen Computern in einer Domäne oder einem Entra ID-verbundenen Netzwerk begleiten, das `%APPDATA%` synchronisiert.

Das meiste, was in dieser Datei steht, wird [separat pro Mandant gespeichert](../tenants/). Sprache ist die einzige globale Einstellung.

Einstellungen werden atomar geschrieben: Die Anwendung schreibt zuerst eine temporäre Datei und ersetzt dann in einem Schritt die eigentliche. Wird ein Schreibvorgang mittendrin unterbrochen, etwa weil der Prozess beendet wird, verlieren Sie höchstens die Präferenz aus diesem einen Speichervorgang, nicht die gesamte Datei.

## Lokale Daten: Anmeldestatus und Protokolle

`%LOCALAPPDATA%\BastionRDPConnector\` wandert nicht mit. Es enthält:

| Element | Zweck |
| --- | --- |
| `msal_token_cache.bin` | Ihr zwischengespeicherter Anmelde-Token. Privat für diese Anwendung, getrennt vom eigenen Cache der Azure CLI. |
| `WebView2\` | Das eigene Profil des eingebetteten Anmeldebrowsers: Cookies, Cache und lokaler Speicher für die Anmeldeseite. |
| `debug.log` | Das Protokoll der aktuellen Sitzung. |
| `debug.0.log` bis `debug.9.log` | Die vorherigen zehn Sitzungen, aufbewahrt seit 3.3.4. Davor überschrieb jeder Start die eine Protokolldatei. |

[Diagnose](../diagnostics/) behandelt, was das Debug-Protokoll enthält und wie Sie es an den Support weitergeben, ohne dass es Geheimnisse enthält.

<div class="callout note">
<span class="eyebrow">Hinweis</span>
<p>Temporäre <code>.rdp</code>-Dateien, die für RD Gateway-Verbindungen erzeugt werden, liegen unter Windows in einem Ordner, der pro Benutzer angelegt und nur für den Besitzer zugänglich ist, unter <code>%TEMP%\BastionRDPConnector\</code>. Sie werden beim Schließen der Anwendung nach bestem Bemühen überschrieben und gelöscht, was kein garantiertes sicheres Löschen ist. Reste eines Absturzes oder erzwungenen Beendens werden beim nächsten Start der Anwendung entfernt. Der temporäre Ordner wird abgelehnt, wenn er ein Symlink oder eine Junction ist. Unter macOS wird der Ordner mit <code>0700</code> und seine Dateien mit <code>0600</code> angelegt. Die <code>.rdp</code>-Datei des macOS-Tunnels durchläuft dieselbe Behandlung und wird beim Beenden gelöscht.</p>
</div>

## Zurücksetzen

Das Löschen von `settings.json` setzt jede Präferenz auf ihren Standardwert zurück. Sie bleiben angemeldet; an Ihrem Token-Cache ändert sich nichts.

Das Löschen von `msal_token_cache.bin`, oder die Wahl von **Abmelden** in der oberen Leiste, meldet Sie ab und leert den zwischengespeicherten Token. Abmelden ist die sicherere Option: Es entfernt den Token-Cache und leert den MSAL-Zustand im Arbeitsspeicher in einem Schritt, und der nächste Start beginnt mit einer leeren Anmeldung.

Um beides zurückzusetzen, schließen Sie zuerst die Anwendung und löschen Sie dann beide Dateien. Das Löschen der einen wirkt sich nicht auf die andere aus.
