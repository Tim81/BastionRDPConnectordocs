---
title: Connection methods
description: 'Tunnel and RD Gateway compared: how each carries the session, which targets they reach, and which one is the default on Windows and macOS.'
appliesTo: '3.3.4'
lastReviewed: '2026-07-25'
---

Both methods reach the same virtual machine through the same Bastion host. They differ in how the remote desktop session is carried, and that difference decides which targets each one can reach.

<figure>
<div class="frame">
<svg viewBox="0 0 620 186" role="img" aria-labelledby="fig1t">
  <title id="fig1t">Your computer cannot reach the virtual machine directly. Both connection methods route through the Azure Bastion host.</title>

  <!-- direct path, blocked -->
  <path class="w-dead" d="M104 40 H516"/>
  <line class="w-x" x1="300" y1="30" x2="320" y2="50"/>
  <line class="w-x" x1="320" y1="30" x2="300" y2="50"/>
  <text class="n-s" x="310" y="21" text-anchor="middle">no public IP · 3389 closed</text>

  <!-- routed path -->
  <path class="w-live" d="M104 120 H256"/>
  <path class="w-live" d="M364 120 H516"/>
  <text class="n-s" x="180" y="112" text-anchor="middle">443 outbound</text>
  <text class="n-s" x="440" y="112" text-anchor="middle">3389 inside the vnet</text>

  <!-- nodes -->
  <rect class="n-box" x="8" y="18" width="96" height="124" rx="5"/>
  <text class="n-t" x="56" y="74" text-anchor="middle">Your PC</text>
  <text class="n-s" x="56" y="92" text-anchor="middle">mstsc</text>

  <rect class="n-box n-hop" x="256" y="96" width="108" height="48" rx="5"/>
  <text class="n-t on" x="310" y="118" text-anchor="middle">Bastion</text>
  <text class="n-s" x="310" y="133" text-anchor="middle" fill="#98A2B3">Standard SKU</text>

  <rect class="n-box" x="516" y="18" width="96" height="124" rx="5"/>
  <text class="n-t" x="564" y="74" text-anchor="middle">Azure VM</text>
  <text class="n-s" x="564" y="92" text-anchor="middle">private IP</text>

  <text class="n-s" x="310" y="172" text-anchor="middle">Tunnel and RD Gateway both take the lower route</text>
</svg>
</div>
<figcaption><b>Figure 1</b> The direct path does not exist. Every session is carried through the Bastion host over port 443.</figcaption>
</figure>

## Tunnel

The application opens a WebSocket to the Bastion host and listens on a local port on your computer. Your remote desktop client connects to `localhost` on that port, and traffic is forwarded over the WebSocket.

Because the target is only ever an address on the far side of the tunnel, this method reaches any IP address the Bastion virtual network can route to. That includes machines that are not Azure VMs.

If the WebSocket drops, the tunnel reconnects on its own, up to five times with a widening gap between attempts. An open remote desktop session survives a short reconnect.

### When to use it

- You are connecting to an IP address rather than picking a VM.
- You are on macOS, where the Windows App does not support Bastion as a gateway.
- You want several sessions open at once, each on its own local port.

## RD Gateway

The application asks Bastion for a pre-configured `.rdp` file that names Bastion as the remote desktop gateway, then hands that file to your client. There is no local port and no tunnel process.

This is the shorter path, and on Windows it is the default. It only works when Bastion can resolve the target itself, which means it works for Azure VMs and not for typed IP addresses.

<div class="callout warn">
<span class="eyebrow">Cross-tenant sign-in</span>
<p>When the virtual machine sits in a different tenant from the account you signed in with, the application turns off Entra ID authentication in the generated file. Leaving it on returns <code>AADSTS293004</code> and the session does not open.</p>
</div>

## Comparison

| &nbsp; | Tunnel | RD Gateway |
| --- | --- | --- |
| Connect to an Azure VM | Yes | Yes |
| Connect to an IP address | Yes | No |
| Opens a local port | Yes, one per session | No |
| Reconnects automatically | Yes, up to 5 attempts | No |
| Entra ID authentication | Not applicable | On by default, off across tenants |
| Default on Windows | No | Yes |
| Default on macOS | Yes | No |
| Requires Azure CLI | No | No |

The default applies only until you choose a method yourself. After that your choice is saved per tenant and restored the next time you start the application.

## Ports

Neither method needs an inbound firewall rule. Both use outbound 443 from your computer to the Bastion host.

| From | To | Port |
| --- | --- | --- |
| Your computer | bst-*.bastion.azure.com | 443/TCP outbound |
| Your computer | login.microsoftonline.com | 443/TCP outbound |
| Bastion host | Target machine | 3389/TCP inside the virtual network |
