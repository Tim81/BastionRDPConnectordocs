---
title: Entra ID authentication
description: Single sign-on for RD Gateway sessions, when to turn it on, and what happens when Bastion refuses it.
appliesTo: '3.3.4'
lastReviewed: '2026-07-25'
---

The Azure VM tab has an Entra ID auth checkbox next to Connection method. It only applies to RD Gateway, and it is **off by default**.

## What it does

With Entra ID authentication on, the RDP session signs in with your Microsoft identity instead of asking for a Windows username and password. It works when your account and the target virtual machine sit in the same Entra ID tenant, and the machine is joined to that tenant.

With it off, the session uses ordinary RDP authentication and prompts for a username and password. That is the default because it works everywhere, including across tenants.

## What happens when you turn it on

The application asks Bastion for an `.rdp` file with Entra ID authentication enabled. If Bastion does not return one, it asks again with the setting off and uses that instead.

So turning the checkbox on is a preference rather than a demand. If the combination is not supported, the connection still opens, using a username and password.

The log records which path was taken:

```
Attempting RDP download WITH Entra ID Authentication...
Entra ID Auth failed, falling back to traditional authentication...
```

<div class="callout warn">
<span class="eyebrow">Across tenants</span>
<p>Entra ID authentication does not work when the virtual machine belongs to a different tenant from the account you signed in with, which is the usual case with Azure Lighthouse. Azure AD returns <code>AADSTS293004</code>. Leave the checkbox off for those connections. The fallback will handle it if you forget, at the cost of one extra round trip.</p>
</div>

## Why Tunnel does not have this setting

Tunnel carries a raw connection to a local port. How you authenticate inside the remote session never passes through the application, so there is no Entra ID setting to show. Sign in inside the RDP window however the target machine expects.

## Where the choice is saved

The checkbox is saved [per tenant](../tenants/), alongside connection method and monitor mode. Changing it for one tenant does not affect any other.
