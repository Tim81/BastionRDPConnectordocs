---
title: Multiple tenants
description: How the application keeps a separate set of preferences for every Entra ID tenant your account can see, and what stays global.
appliesTo: '3.3.5'
lastReviewed: '2026-07-25'
---

If your account has access to more than one Entra ID tenant, for example through Azure Lighthouse, the application keeps a separate set of preferences for each one instead of overwriting a single shared set every time you switch.

## Switching tenants

[Sign in](../sign-in/) covers the tenant selection dialog that appears right after you authenticate, when your account can see more than one tenant. You can also switch tenants later, at any point while the app is running, from the same control in the top bar.

Switching tenants doesn't sign you out. It reloads the subscription list for the tenant you picked and restores whatever you last used there.

## What's stored per tenant

Each tenant gets its own slot for:

- The last used Bastion subscription and Bastion host
- The last used VM subscription and virtual machine
- The last used IP address
- Target port and local port
- Connection method, Tunnel or RD Gateway
- Monitor mode
- Entra ID authentication

Switch from tenant A to tenant B and back, and tenant A's Bastion, VM, and ports come back exactly as you left them. Nothing from tenant B carries over.

## What stays global

Your language choice applies across every tenant. Change it while working in one tenant, and it stays changed after you switch to another. Language is a preference about you, not about the environment you're connected to.

## Where this lives on disk

All of it, per-tenant and global alike, lives in one file: `%APPDATA%\BastionRDPConnector\settings.json`. [Files and settings](../files-and-settings/) covers the file layout and what each path holds.
