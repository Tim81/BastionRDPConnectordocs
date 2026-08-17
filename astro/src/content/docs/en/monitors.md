---
title: Monitors
description: Choose whether an RD Gateway session opens on your primary display or spans every connected monitor.
appliesTo: '3.3.6'
lastReviewed: '2026-07-25'
---

The Azure VM tab has a Monitors setting next to Connection method. It only applies to RD Gateway. Tunnel connections don't carry a monitor preference, because your own remote desktop client handles the session once the tunnel is open.

## The two options

| Option | Behaviour |
| --- | --- |
| Single monitor | The session opens full screen on your primary display only. |
| All monitors | The session spans every connected monitor, so the remote desktop fills your whole multi-monitor setup. |

Single monitor is the default. Pick All monitors if you want the remote session to behave like a second physical desktop across your screens.

## Why Tunnel doesn't have this setting

Monitor selection is written into the `.rdp` file that RD Gateway hands to your remote desktop client. Tunnel doesn't generate a file. It opens a local port and lets you launch the client yourself, so there's nothing for the application to write the setting into. If you switch a session from RD Gateway to Tunnel, set monitor behaviour directly in your RDP client instead.

## Where the choice is saved

The monitor setting is saved [per tenant](../tenants/), alongside connection method and Entra ID authentication. Switching tenants restores whatever you last chose for that tenant, and switching back to RD Gateway on the same tenant remembers it too.
