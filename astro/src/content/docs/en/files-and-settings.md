---
title: Files and settings
description: Where the application keeps your preferences, your sign-in state, and its logs, and what's in each file.
appliesTo: '3.3.6'
lastReviewed: '2026-07-25'
---

The application writes to two separate folders under your user profile. You never edit these files directly; the application reads and writes them on its own.

## Settings: roaming, per tenant

`%APPDATA%\BastionRDPConnector\settings.json` holds your preferences: the last subscription, Bastion host, VM, and IP address you used, connection method, monitor mode, Entra ID authentication, and your language choice.

This folder roams with your Windows profile, so the same preferences follow you between machines on a domain or Entra ID-joined network that syncs `%APPDATA%`.

Most of what's in this file is [stored separately per tenant](../tenants/). Language is the one setting that's global.

Settings writes are atomic: the application writes a temporary file first, then replaces the real one in a single step. If a write is interrupted partway, for example by the process being killed, you lose at most the preference from that one save, not the whole file.

## Local data: sign-in state and logs

`%LOCALAPPDATA%\BastionRDPConnector\` does not roam. It holds:

| Item | Purpose |
| --- | --- |
| `msal_token_cache.bin` | Your cached sign-in token. Private to this application, separate from the Azure CLI's own cache. |
| `WebView2\` | The embedded sign-in browser's own profile: cookies, cache, and local storage for the login page. |
| `debug.log` | The current session's log. |
| `debug.0.log` through `debug.9.log` | The previous ten sessions, kept since 3.3.4. Before that, each launch overwrote the one log file. |

[Diagnostics](../diagnostics/) covers what the debug log contains and how to get it to support without it carrying secrets.

<div class="callout note">
<span class="eyebrow">Note</span>
<p>Temporary <code>.rdp</code> files, generated for RD Gateway connections, live under <code>%TEMP%\BastionRDPConnector\</code> and are deleted when the application closes.</p>
</div>

## Resetting

Deleting `settings.json` returns every preference to its default. You stay signed in; nothing about your token cache changes.

Deleting `msal_token_cache.bin`, or selecting **Logout** in the top bar, signs you out and clears the cached token. Logout is the safer option: it removes the token cache and clears MSAL's in-memory state in one step, and the next launch starts from a blank sign-in.

To reset both, close the application first, then delete both files. Deleting one doesn't affect the other.
