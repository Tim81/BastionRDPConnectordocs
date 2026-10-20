---
title: Favorites
description: Save up to ten IP addresses and Azure VMs per tenant, and connect again from the Favorites tab with the Bastion host selected at that moment.
appliesTo: '3.4.0'
lastReviewed: '2026-10-20'
---

Favorites are a shorter way back to a connection you already make. The list holds up to ten entries for the Entra ID tenant you are signed in to. A favorite is an IP address or an Azure VM. Ports, the connection method, and the Bastion host stay where you set them.

## Adding and removing

On the [IP address](../connect-ip/) tab and the [Azure VM](../connect-vm/) tab, a star sits next to **Connect**. The tooltip is **Favorite**.

- An empty star means the address or virtual machine on that tab is not a favorite. Click it to save the current target. A valid IP address is saved as you typed it. A virtual machine is saved with its name, resource id, resource group, and the subscription it belongs to, so you do not pick that subscription again.
- A filled star means it is already a favorite. Click it to remove it. The application asks you to confirm first. **OK** removes it. **Cancel**, or closing the dialog, leaves it in place.

The same confirm appears when you press **Remove** on a row in the Favorites tab.

An empty or invalid IP address, or no virtual machine selected, is not saved. The star stays empty and you see the same warning **Connect** would show. An eleventh entry is refused until you remove one.

## Description

An IP favorite can carry a short description of where that address connects, up to 40 characters. On the Favorites tab the row shows that text under the address. With no description, the row shows **IP Address**.

A pencil button opens a dialog. The tooltip is **Add description** when the row has none, and **Edit description** when one is saved. Type the text and press **Save**. **Cancel**, or closing the dialog, leaves the saved text as it was. Clearing the box and pressing **Save** removes the description.

A trash button appears only when a description is saved. The tooltip is **Delete description**. It removes the description and leaves the favorite in the list. It does not ask for confirmation.

An Azure VM favorite has no description. Removing a favorite still asks for confirmation, and that also removes its description.

## Connecting from the list

Open the **Favorites** tab. Each row is one saved target, with **Connect** and **Remove**.

**Connect** uses the Bastion host selected at the top of the window at that moment. Change the Bastion host and connect again, and the new host is the one that is used.

An IP favorite opens a tunnel the same way as the IP address tab, including that tab's target port and local port.

A VM favorite uses the connection method selected on the Azure VM tab.

- **Tunnel** uses that tab's target port and local port.
- **RD Gateway** uses port 3389, the Entra ID authentication checkbox, and the monitor choice on that tab.

The virtual machine must still be in the list loaded for this sign-in. If it is not, **Connect** stops and tells you so. When the current subscription, name, or tag filter would hide it, **Connect** switches to that VM's subscription, clears those filters, and leaves the Azure VM tab on that machine.

## VM power

A VM favorite follows the same power rules as the [Azure VM](../connect-vm/) page. **Connect** is available only while the VM is running. A stopped or deallocated VM offers **Start VM** when your account can start it. While the VM is starting, **Start VM** is hidden and **Connect** stays off. An IP favorite has no power state.
