---
title: Entra ID authentication
description: Single sign-on for RD Gateway sessions, and why the application turns it off automatically across tenants.
appliesTo: '3.3.4'
lastReviewed: '2026-07-25'
---

The Azure VM tab has an Entra ID auth checkbox next to Connection method. It only applies to RD Gateway, and it's on by default.

## What it does

With Entra ID authentication on, the RDP session signs in using your Microsoft identity instead of asking for a Windows username and password. It works when your account and the target VM sit in the same Entra ID tenant.

## The automatic tenant check

Before the application writes the `.rdp` file, it compares the tenant of your signed-in account with the tenant that owns the target VM. If they differ, for example when you reach a customer's VM through Azure Lighthouse, the application turns Entra ID authentication off in that file automatically. You don't need to notice the mismatch or uncheck anything yourself.

<div class="callout warn">
<span class="eyebrow">Why it matters</span>
<p>Leaving Entra ID authentication on across tenants returns <code>AADSTS293004</code> from Azure AD, and the session doesn't open. The automatic check exists so a cross-tenant connection works on the first try.</p>
</div>

When the setting is turned off automatically, the RDP session falls back to a Windows username and password prompt, the same as if you'd unchecked the box yourself.

## Why Tunnel doesn't have this setting

Tunnel carries a raw connection to a local port. How you authenticate inside the remote session never passes through the application, so there's no Entra ID auth setting to show for it. Sign in inside the RDP window however the target machine expects.

## Where the choice is saved

Entra ID auth is saved [per tenant](../tenants/), alongside connection method and monitor mode. Turning it off automatically for one cross-tenant VM doesn't change what's saved for any other tenant.
