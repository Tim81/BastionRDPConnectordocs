---
title: Release notes
description: What changed in each recent release of Azure Bastion RDP Connector.
appliesTo: '3.3.9'
lastReviewed: '2026-09-19'
---

## 3.3.9

| Change | Details |
| --- | --- |
| Expired sessions prompt you to sign in again | The pre-flight checks (Bastion SKU, feature flags, VM power state) used to fail open on every error, including an expired Azure session. An expired session now reaches the sign-in flow instead of being waved through. Other errors still fail open. |
| Main window restored before the sign-in popup | The main window is restored before the sign-in popup opens. Known-harmless "non-visible or closed owner" dialog exceptions are logged and swallowed instead of crashing the application and dropping active tunnels. |
| Stale temporary `.rdp` files swept at startup | Files left behind by a crash or force-quit are deleted at the next start, by the first running instance only. Generated `.rdp` files live in a per-user, owner-only application temp folder and are deleted with a best-effort overwrite on exit. That is not a guaranteed secure erase. |
| macOS: `.rdp` files and the log folder open through `/usr/bin/open` | Both now open through the absolute path `/usr/bin/open`. |
| macOS: reworked RD Gateway warning | Windows App for Mac currently can't keep an RD Gateway session through Azure Bastion: it disconnects within seconds, with error `0x300006c`, `0x3000064` or `0x10b`. The VM is not the problem. The dialog, now titled "Known issue on macOS" instead of "Not supported on macOS", offers **Use Tunnel instead** or **Try RD Gateway anyway**. |
| macOS: About menu item localized | The About menu item is translated and follows language changes live. |

## 3.3.8

| Change | Details |
| --- | --- |
| MSAL 4.90.0 | Updated the Microsoft Authentication Library, which handles sign-in. |
| Security-patched .NET runtime | The build SDK floor is raised to 10.0.401, so the bundled runtime is the security-patched .NET 10.0.12. Runtime security fixes reach you through application updates. |
| macOS: squircle app icon | The app icon is now a squircle, so macOS Tahoe no longer places it in a white box. |

## 3.3.7

| Change | Details |
| --- | --- |
| Updated components | Azure.Core 1.62.0, Avalonia packages 12.1.2, and updates to the identity group (MSAL and related packages). Dependency updates only. |

## 3.3.6

| Change | Details |
| --- | --- |
| Security update to the bundled .NET runtime | The application carries its own copy of .NET rather than using one installed on your machine, so runtime security fixes reach you through an application update instead of through Windows or macOS updates. This release is built on .NET 10.0.11, a security release of the runtime. |
| Updated components | Avalonia.Controls.WebView 12.1.0 and Azure.Core 1.61.0. |

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
