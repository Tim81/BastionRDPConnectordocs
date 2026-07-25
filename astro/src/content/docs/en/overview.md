---
title: Overview
description: Open a remote desktop session through Azure Bastion to an Azure virtual machine, or to any Windows system the Bastion network can route to.
appliesTo: '3.3.4'
lastReviewed: '2026-07-25'
---

Azure Bastion RDP Connector opens a remote desktop session through Azure Bastion, using the remote desktop client already installed on your computer. Azure virtual machines are picked by name. Anything else is reached by address, which includes on-premises machines and machines in other clouds.

## What it does

Azure Bastion is a route into a network, not only into Azure. It reaches whatever its own virtual network can reach, so a machine does not have to be an Azure VM, or even in Azure, to be reachable through it.

This application asks Bastion for that route and hands the result to your remote desktop client. You do not copy connection strings, manage certificates, or open firewall ports.

Azure CLI is not required. Earlier versions called `az network bastion` to build the tunnel. Since 3.0 the application talks to the Bastion and Azure Resource Manager APIs directly, so nothing else needs to be installed.

## What you can reach

| Target | How you choose it | Requires |
| --- | --- | --- |
| Azure virtual machine | Pick it by name from the Azure VM tab, across your subscriptions | Reader access to the VM |
| Anything else | Type its address on the IP address tab | IP-based connection enabled on the Bastion host |

The address route is the broader of the two. It reaches any system the Bastion virtual network can route to:

- Azure virtual machines, in the same virtual network or peered to it
- On-premises Windows servers and desktops, over a site-to-site VPN or ExpressRoute
- Windows systems in other clouds, such as AWS, or in a private cloud

Anything with a route and a listening RDP port is reachable. Whether it runs in Azure is beside the point.

Microsoft documents the on-premises case directly: Bastion's IP-based connection "allows for connectivity to on-premises-based machines if hybrid connectivity exists between the Azure Bastion resource and the machine that you want to connect to." See [Connect to a VM via a specified private IP address](https://learn.microsoft.com/en-us/azure/bastion/connect-ip-address).

## Two ways to connect

The application offers two connection methods. They reach the same machine and differ in how the session is carried.

| Method | Carries the session over | Works with IP addresses |
| --- | --- | --- |
| Tunnel | A local port forwarded through a WebSocket to Bastion | Yes |
| RD Gateway | An .rdp file that points at Bastion as a gateway | No |

[Connection methods](../connection-methods/) explains when to use each one, and why the default differs between Windows and macOS.

## Before you start

- An Azure Bastion host with the Standard or Premium SKU. The Basic and Developer SKUs do not support the native client.
- **Native client support** enabled on that Bastion host.
- Reader access to the Bastion host and to the virtual machines you want to reach.
- Windows 10 or later. Installed from the Microsoft Store.
- A macOS build exists, supported since 3.1.2 for Apple Silicon and Intel, but it is not publicly available yet.

<div class="callout note">
<span class="eyebrow">Note</span>
<p>The application checks the Bastion SKU and its feature flags before it connects, and tells you which one is missing if a check fails. These checks fail open, so a check that cannot complete does not stop you connecting.</p>
</div>

## Where things are stored

Settings roam with your Windows profile. Sign-in data and logs stay on the machine.

| Path | Holds |
| --- | --- |
| `%APPDATA%\BastionRDPConnector` | `settings.json`: last used subscription, Bastion, VM, and language |
| `%LOCALAPPDATA%\BastionRDPConnector` | Sign-in token cache, the sign-in browser profile, and `debug.log` with the last ten sessions |
