---
title: Release notes
description: What changed in each recent release of Azure Bastion RDP Connector.
appliesTo: '3.3.5'
lastReviewed: '2026-07-25'
---

## 3.3.5

| Change | Details |
| --- | --- |
| "Log" kept untranslated in German, French and Spanish | The Open Log Folder button and the failed-connection message rendered "log" as *Protokoll*, *journal* and *registro*, which reads as an ordinary logbook rather than the technical term. Both keep the loanword now and inflect only the surrounding grammar: *Log-Ordner öffnen*, *Ouvrir le dossier de log*, *Abrir carpeta de log*. English, Dutch and Portuguese are unchanged. |

## 3.3.4

| Change | Details |
| --- | --- |
| System tray icon restored | The tray icon didn't appear on Windows in versions 3.2 through 3.3.3. Minimising to the tray, tunnel notifications, and the tray context menu work again as this documentation describes. |
| Ten sessions of log history | `debug.log` used to be overwritten on every start. The last ten sessions are now kept as `debug.0.log` through `debug.9.log`, so the log from the run where a problem happened survives a restart. |
| Diagnostic bundle covers past sessions | Copy Diagnostic Info now includes the archived session logs alongside the current one, newest first, up to about 1 MB. |
| Cleanup finishes before the window closes | Active tunnels close and temporary `.rdp` files delete before the window closes. Logging out runs the same cleanup instead of ending the process immediately. |
| Sign-in browser profile moved | The embedded sign-in browser used to keep its profile next to the application file, which broke sign-in when the app ran from a write-protected folder such as Program Files. It now lives at `%LOCALAPPDATA%\BastionRDPConnector\WebView2`. The token cache location is unchanged. |
| Updated components | Avalonia 12.1.0, MSAL 4.87.0, Azure.Core 1.60.0. |

## 3.3

| Change | Details |
| --- | --- |
| Azure Resource Graph VM loading | VMs across roughly 200 subscriptions load in 2 to 4 seconds, against 30 to 60 seconds before. Cross-subscription queries use the Azure Resource Graph API instead of querying each subscription in turn. |
| Cross-subscription VM search | The All subscriptions mode on the Azure VM tab searches across every subscription your account can see. It needs at least three characters before it returns results, and the subscription dropdown now only lists subscriptions that actually contain VMs. |
| Two-column Azure VM tab | Connection method, monitor mode, and Entra ID auth sit in the left column; VM selection sits in the right column. |
| Pre-flight checks | Before connecting, the application checks the Bastion SKU, its feature flags, and the VM's power state. These checks fail open: a check that can't complete doesn't block the connection. |
| Tunnel auto-reconnect | If the WebSocket connection drops, the tunnel reconnects on its own, up to five times with a widening gap between attempts. Most RDP sessions stay connected through a reconnect this short. |
| About dialog and diagnostic bundle | The i button in the top bar, Open Log Folder, and Copy Diagnostic Info all shipped in this release. |
| Platform default connection method | RD Gateway became the default on Windows, and Tunnel the default on macOS, because the Windows App on macOS can't use Bastion as a gateway. The default only applies until you pick a method yourself. |
| HD Ready screen support | The window grew to 580×760, up from roughly 540×700, and now fits without a scrollbar on 1280×720 displays. |
