---
title: Troubleshooting
description: Common problems, in the words you'd use to describe them, and what to check for each one.
appliesTo: '3.3.6'
lastReviewed: '2026-07-25'
---

## Before you connect

### I launched the app again and nothing happened

The application allows only one running instance. If it's already open, minimised, or sitting in the system tray, launching it a second time brings the existing window to the front instead of opening a new one. Check the system tray, on Windows, for the application icon.

<!-- Mirrors src/components/ScreenTray.astro -->
<figure class="appshot">
  <div class="frame">
    <svg viewBox="0 0 300 372" role="img" aria-labelledby="s-tray-win">
      <title id="s-tray-win">The Windows system tray context menu, expanded. Two open tunnels are listed, each with Connect and Stop controls. Below them, About and Exit.</title>
      <rect class="ui-win" x="1" y="1" width="298" height="370" rx="6"/>
      <path class="ui-bar" d="M2 2 H298 V22 H2 Z"/>
      <text class="ui-title" x="10" y="15">Azure Bastion RDP Connector</text>
      <path d="M266 9 h7 M280 9 l7 7 M287 9 l-7 7" stroke="#7B8794" stroke-width="1.1" fill="none"/>
      <text class="ui-l" x="10" y="40">System tray, right-click menu</text>
      <rect class="ui-panel" x="10" y="48" width="280" height="50" rx="4"/>
      <circle class="ui-run" cx="22" cy="63" r="3.5"/>
      <text class="ui-tb" x="32" y="67">vm-dev-web-01</text>
      <text class="ui-p" x="32" y="80">localhost:55000 · open 4m 12s</text>
      <rect class="ui-btn-2" x="194" y="59" width="46" height="15" rx="3"/>
      <text class="ui-tb" x="200" y="70">Connect</text>
      <rect class="ui-btn-2" x="244" y="59" width="34" height="15" rx="3"/>
      <text class="ui-tb" x="252" y="70">Stop</text>
      <rect class="ui-panel" x="10" y="106" width="280" height="50" rx="4"/>
      <circle class="ui-run" cx="22" cy="121" r="3.5"/>
      <text class="ui-tb" x="32" y="125">10.20.4.15</text>
      <text class="ui-p" x="32" y="138">localhost:55001 · open 41s</text>
      <rect class="ui-btn-2" x="194" y="117" width="46" height="15" rx="3"/>
      <text class="ui-tb" x="200" y="128">Connect</text>
      <rect class="ui-btn-2" x="244" y="117" width="34" height="15" rx="3"/>
      <text class="ui-tb" x="252" y="128">Stop</text>
      <line x1="10" y1="170" x2="290" y2="170" stroke="#DCE2EA" stroke-width="1"/>
      <text class="ui-tb" x="20" y="190">About</text>
      <text class="ui-tb" x="20" y="212">Exit</text>
      <text class="ui-p" x="10" y="352">Double-click the tray icon to restore the main window.</text>
    </svg>
  </div>
  <figcaption><b>Windows</b> The system tray context menu on Windows, expanded. Each open tunnel gets its own Connect and Stop controls, followed by About and Exit.</figcaption>
</figure>

Closing the main window, or minimising it, doesn't exit the application. Both hide the window and leave it running in the tray, so any open tunnels stay connected. Right-click the tray icon and select **Exit** to close it completely. The tray icon is Windows only; macOS has no tray icon by design.

### No subscriptions appear, or the Bastion list is empty

This usually means either your account has no role assignment on any subscription, or the tenant you're in doesn't contain a Bastion resource. Try:

- Select **Refresh** next to the Bastion field.
- Select **Change** to pick a different subscription.
- Sign out and back in, in case your session expired.
- Ask whoever manages your Azure roles to confirm you have Reader on the Bastion host and its virtual network.

## Connecting

### mstsc opens, but the connection fails for an Azure VM over RD Gateway

Check that:

- The VM's power state shows **Running**, and give the guest OS a minute or two after that to finish booting.
- The Bastion host is Standard or Premium SKU. Basic doesn't support the native client.
- No network security group rule blocks inbound traffic from Bastion to the VM on port 3389.
- A route exists from Bastion to the VM, whether that's the same virtual network, a peering, or Virtual WAN.

### mstsc opens, but the connection fails for an Azure VM over Tunnel

Everything above still applies, plus:

- Check the [Active tunnels](../active-tunnels/) tab. If the tunnel isn't listed, or shows as stopped, try connecting again to start a new one.
- If the local port you configured was already in use, the application picked the next free one automatically. Check the port shown on the Active tunnels tab against the one your client is using.

### The connection fails when I type an IP address

- Confirm the address is reachable from the Bastion virtual network, not just from your own machine. For on-premises targets that means a working site-to-site VPN or ExpressRoute; for another cloud, a VPN connection into Azure.
- Confirm the target port. 3389 is standard for RDP, but a non-Azure or on-premises host may listen on something else.
- Check for a host firewall on the target blocking inbound RDP from the Bastion subnet.

### The Start button doesn't appear for a stopped VM

Starting a VM needs Virtual Machine Contributor, or an equivalent role; Reader alone isn't enough. Ask whoever manages your Azure roles to grant it, or start the VM from the Azure portal instead.

### I got an AADSTS293004 error

Azure AD returns this when [Entra ID authentication](../entra-id/) is used against a virtual machine in a different tenant from your signed-in account, which is the usual case with Azure Lighthouse.

Clear the Entra ID auth checkbox on the Azure VM tab and connect again. The setting is off by default, so if you are seeing this, it was turned on at some point and saved for this tenant.

You may see it in the log without the connection failing. When Bastion refuses an Entra ID request, the application asks again with the setting off and uses that file, so the session still opens after one extra round trip.

If the error appears when opening a saved `.rdp` file directly, reconnect from the Azure VM tab instead. A file kept from an earlier session carries whatever setting was used when it was written.

## Sign-in and reset

### I keep getting asked to sign in again

Your organisation's Conditional Access policy may require re-authentication on a schedule, or MFA on every sign-in. That's expected. Complete the prompt when it appears; the application doesn't control how often your tenant asks for this.

### I want to start over from a clean slate

Select **Logout** in the top bar to clear your sign-in state; it removes the token cache and the MSAL state in one step. To also reset preferences, close the application and delete `%APPDATA%\BastionRDPConnector\settings.json`. [Files and settings](../files-and-settings/) covers what each file holds and where they live.

### I need to send a log to support

Open **About** and select **Copy Diagnostic Info**, or **Open Log Folder** to find the files directly. [Diagnostics](../diagnostics/) covers what's in the bundle and how it's redacted.
