---
title: Release notes
description: What changed in each recent release of Azure Bastion RDP Connector.
appliesTo: '3.3.9'
lastReviewed: '2026-09-19'
---

## 3.3.9

| Change | Details |
| --- | --- |
| macOS: RD Gateway drops are a Windows App for Mac bug | Windows App for Mac splits one RD Gateway packet across two WebSocket messages, and Azure Bastion then closes the WebSocket. Gateway packets larger than Bastion's 20,480-byte receive buffer also stall the session. Both show up as a disconnect within seconds, with error `0x300006c`, `0x3000064` or `0x10b`. This is not a TLS or cipher problem, as earlier versions said. It was verified on Windows App 11.4.1. FreeRDP over the same Bastion and Tunnel mode with Windows App both stay connected, and no property in the `.rdp` file works around it. |
| macOS: reworked RD Gateway warning | RD Gateway stays selectable on macOS in case Microsoft fixes the client. The warning now says what is really happening and that your VM is not the problem. It offers **Use Tunnel instead**, **Try RD Gateway anyway** or Cancel, in all six languages. The dialog is titled "Known issue on macOS" instead of "Not supported on macOS". The macOS About menu item is now localized and follows a live language change. |
| Tunnels: no more futile reconnect loops | When the RDP client closed its own connection, the tunnel used to treat that as a network error and retry up to five times, fetching a new Bastion token each time with no client connected. Now each accepted connection gets one Bastion token and one WebSocket for its whole life. If the WebSocket ends while the client is still connected, the local connection is closed and the RDP client's own auto-reconnect opens a new one with a fresh token. The "Reconnecting… (attempt n/5)" status is gone. |
| Tunnels: timeouts, clean shutdown, reuse and target port | The WebSocket connect times out after 30 seconds, and a timed-out Bastion token request is reported as an error instead of a quiet cancel. The Bastion session is always cleaned up on exit, the WebSocket close is time-bounded, and a stopping tunnel is never handed a new client. Connecting again to the same Bastion, target and port reuses the running tunnel and relaunches the RDP client. The chosen target port is honored: VM tunnels were hardcoded to 3389. The last target and local port are remembered, and labels show `vm:port`. |
| An expired Azure session sends you back to sign-in | The pre-flight checks used to skip themselves on any error, including a Conditional Access re-authentication requirement, and let the connection fail later. Now the application prompts for sign-in and retries the operation once, across startup, loading subscriptions, Bastions and VMs, changing subscription, connecting, and starting a VM. Only one sign-in popup is open at a time; a second trigger waits for the one that is already open. |
| Sign-in fixes | The main window is restored before any sign-in popup opens, so a sign-in no longer hangs when the window is hidden to the tray. Only the known-harmless "non-visible or closed owner" dialog exceptions are swallowed; everything else is still logged and surfaced. Token acquisition is tied to the signed-in account, which fixes wrong-account tokens when several accounts are cached. Signing in as a different account clears the subscription cache. Listing tenants, subscriptions and Bastions now reports failures instead of returning an empty list. If subscriptions still can't load after re-authentication, the application exits rather than leaving you signed out with nothing to pick. |
| VM power | Starting a VM is tracked per VM, so switching VMs no longer shows "Starting" on the wrong one. While a VM is starting, Start is hidden and Connect is disabled. A failed start is detected: if the VM keeps reading stopped or deallocated for about 30 seconds, you get an error naming the VM instead of waiting out the full poll. Starting a VM and refreshing the power state re-authenticate on an expired session. |
| Other reliability | Closing the window cancels in-flight work quietly, with no error dialogs during shutdown. A stale Bastion or subscription refresh is discarded if you switched subscription meanwhile, and the Change Subscription dialog fetches Bastions before committing, so a failure leaves the previous subscription untouched. If the RDP client fails to launch, you get a notification, or a restored window with an error dialog when there is no tray icon. Restoring from the tray brings back the taskbar button and the previous window state. Minimizing while a dialog or sign-in popup is open no longer hides to the tray and kills it. The About dialog is single-instance. Open Log Folder now works with paths that contain spaces. |
| Security: Bastion host name and pagination | The application sends your ARM token to the host named in Azure's response. It now accepts only a DNS name ending in `.bastion.azure.com`, so an IP address or foreign host never receives it, and redirects are disabled on the token request. ARM `nextLink`s must be https on the ARM host, page count is capped at 500, and a failed Resource Graph response raises an error instead of a truncated list. |
| Security: temporary files | Generated `.rdp` files, which can hold a live gateway token, are deleted with a best-effort overwrite on exit. That is not a guaranteed secure erase. The temp folder is refused if it is a symlink or junction. On macOS the folder is created 0700 and files 0600, and the macOS tunnel `.rdp` file now goes through the same handling; it used to be a world-readable file in `$TMPDIR` that was never removed. Leftovers from a crash or force-quit are swept at startup, only by the confirmed first instance. On macOS, `.rdp` files and the log folder open through the absolute `/usr/bin/open`. |

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
