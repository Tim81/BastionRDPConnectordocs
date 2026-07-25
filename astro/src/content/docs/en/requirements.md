---
title: Requirements
description: What has to be true on your machine and in Azure before Azure Bastion RDP Connector can open a session.
appliesTo: '3.3.4'
lastReviewed: '2026-07-25'
---

The application is self-contained. It does not need .NET installed separately, and since 3.0 it does not need Azure CLI. What it does need is a supported operating system, a remote desktop client, and a Bastion host configured to accept native client connections.

## On your machine

| Requirement | Notes |
| --- | --- |
| Windows 10 or later, x64 | Installed from the Microsoft Store |
| macOS 12 Monterey or later | Supported since 3.1.2 for Apple Silicon and Intel, but not yet publicly available |
| Remote desktop client, Windows | `mstsc.exe`, already part of Windows |
| Remote desktop client, macOS | The Windows App, from the Mac App Store. It only supports Tunnel: Azure Bastion exposes an RD Gateway endpoint that the Windows App cannot connect through |

<div class="callout note">
<span class="eyebrow">Note</span>
<p>Azure CLI is not required. Earlier versions called <code>az network bastion tunnel</code>; since 3.0 the tunnel is built natively with .NET. If you are still running a 2.x build, Azure CLI and the <code>azure-bastion</code> extension are still needed.</p>
</div>

## In Azure

| Requirement | Notes |
| --- | --- |
| Azure Bastion, Standard or Premium SKU | Basic and Developer SKUs do not support the native client |
| Native client support, enabled on the Bastion host | Turned on separately from the SKU choice |
| IP-based connection, enabled on the Bastion host | Only needed if you plan to use the IP address tab |
| Reader role on the Bastion resource and its virtual network | The minimum needed to list Bastion hosts and connect through them |
| Reader role on the target virtual machine | Needed to list and connect to that VM. Virtual Machine Contributor or higher is needed to start a stopped VM |
| An Azure subscription | The application lists every subscription your account can see |

<div class="callout note">
<span class="eyebrow">Note</span>
<p>The application checks the Bastion SKU and its feature flags before connecting, and names the missing one if a check fails. These checks fail open: if the check itself cannot complete, for example because of a transient network problem, the connection attempt still proceeds.</p>
</div>

## Network reachability

A target only needs to be reachable from Bastion's virtual network. It does not need to be an Azure VM, and it does not need to be in Azure at all.

- Bastion deployed in the same virtual network, or one peered to it, is the simple case.
- In a hub-and-spoke or landing zone setup, Bastion often sits in a centralised connectivity landing zone and reaches spoke virtual networks through Azure Virtual WAN. In that topology the Bastion resource is not visible from inside an individual spoke in the Azure Portal, even though it can still reach VMs there. This application is built for exactly that case: pick the shared Bastion once, then connect to a VM in any spoke it can reach.
- On-premises machines are reachable too, over a site-to-site VPN or ExpressRoute, and so are Windows systems in other clouds, as long as a route exists.

If you are not sure whether a Bastion host can reach a particular target, ask whoever manages your network. The application has no way to see routes that are not exposed through the APIs it calls.
