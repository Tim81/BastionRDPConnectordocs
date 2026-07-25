---
title: Overview
description: Connect to Azure virtual machines and IP addresses through Azure Bastion using the Windows or macOS remote desktop client.
appliesTo: '3.3.4'
lastReviewed: '2026-07-25'
---

Azure Bastion RDP Connector opens a remote desktop session to an Azure virtual machine that has no public IP address, using the remote desktop client already installed on your computer.

## What it does

A virtual machine behind Azure Bastion is not reachable from your network. It has no public IP address, and port 3389 is not open to the internet. Bastion is the only route in.

This application asks Bastion for that route and hands the result to your remote desktop client. You pick a VM from a list, or type an IP address, and the session opens. You do not copy connection strings, manage certificates, or open firewall ports.

Azure CLI is not required. Earlier versions called `az network bastion` to build the tunnel. Since 3.0 the application talks to the Bastion and Azure Resource Manager APIs directly, so nothing else needs to be installed.

## What you can reach

| Target | How you choose it | Requires |
| --- | --- | --- |
| Azure VM | Pick from a list of virtual machines in your subscriptions | Reader access to the VM |
| IP address | Type any address reachable from the Bastion virtual network | IP-based connection enabled on the Bastion host |

The IP address route reaches anything in the virtual network or peered to it, including machines that are not Azure VMs at all.

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
