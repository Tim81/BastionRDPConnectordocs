---
title: Connect to an IP address
description: The IP address tab reaches anything Bastion's virtual network can route to, not only Azure VMs, over a Tunnel connection.
appliesTo: '3.3.5'
lastReviewed: '2026-07-25'
---

Use this tab when the machine you want does not have a VM record you can pick by name, or is not an Azure VM at all. It reaches on-premises machines over a VPN or ExpressRoute, Windows systems in other clouds, and any Azure VM you would rather address directly than look up.

## The IP address tab

<!-- Mirrors src/components/ScreenIpAddress.astro -->
<figure class="appshot">
  <div class="frame">
    <svg viewBox="0 0 300 372" role="img" aria-labelledby="s-ip-win">
      <title id="s-ip-win">The IP address tab on Windows. A subscription and Bastion host are chosen at the top. The tab holds an address field, target port, local port, and the Connect button.</title>
      <rect class="ui-win" x="1" y="1" width="298" height="370" rx="6"/>
      <path class="ui-bar" d="M2 2 H298 V22 H2 Z"/>
      <text class="ui-title" x="10" y="15">Azure Bastion RDP Connector</text>
      <path d="M266 9 h7 M280 9 l7 7 M287 9 l-7 7" stroke="#7B8794" stroke-width="1.1" fill="none"/>
      <text class="ui-l" x="10" y="40">Subscription</text>
      <rect class="ui-field" x="10" y="44" width="182" height="15" rx="3"/>
      <text class="ui-v" x="15" y="55">Production - West Europe</text>
      <rect class="ui-btn-2" x="197" y="44" width="42" height="15" rx="3"/>
      <text class="ui-tb" x="204" y="55">Change</text>
      <rect class="ui-btn-2" x="244" y="44" width="18" height="15" rx="3"/>
      <text class="ui-tb" x="250" y="55">i</text>
      <rect class="ui-btn-2" x="266" y="44" width="24" height="15" rx="3"/>
      <text class="ui-tb" x="270" y="55">out</text>
      <text class="ui-l" x="10" y="76">Bastion host</text>
      <rect class="ui-field" x="10" y="80" width="252" height="15" rx="3"/>
      <text class="ui-v" x="15" y="91">bastion-hub-weu</text>
      <rect class="ui-btn-2" x="266" y="80" width="24" height="15" rx="3"/>
      <text class="ui-tb" x="273" y="91">↻</text>
      <line x1="10" y1="120" x2="290" y2="120" stroke="#DCE2EA" stroke-width="1"/>
      <text class="ui-tb" x="14" y="115">IP address</text>
      <line class="ui-tabup" x1="10" y1="120" x2="70" y2="120"/>
      <text class="ui-tb off" x="76" y="115">Azure VM</text>
      <text class="ui-tb off" x="142" y="115">Active tunnels</text>
      <rect class="ui-panel" x="10" y="132" width="280" height="112" rx="4"/>
      <text class="ui-l" x="20" y="150">IP address</text>
      <rect class="ui-field" x="20" y="154" width="260" height="16" rx="3"/>
      <text class="ui-v" x="25" y="165">10.20.4.15</text>
      <text class="ui-l" x="20" y="185">Target port</text>
      <rect class="ui-field" x="20" y="189" width="120" height="15" rx="3"/>
      <text class="ui-v" x="25" y="200">3389</text>
      <text class="ui-l" x="160" y="185">Local port</text>
      <rect class="ui-field" x="160" y="189" width="120" height="15" rx="3"/>
      <text class="ui-v" x="165" y="200">55000</text>
      <text class="ui-p" x="20" y="220">Reaches any address the Bastion</text>
      <text class="ui-p" x="20" y="231">virtual network can route to.</text>
      <text class="ui-p" x="10" y="268">Opens in mstsc</text>
      <rect class="ui-btn" x="10" y="282" width="280" height="26" rx="4"/>
      <text class="ui-bt" x="150" y="299" text-anchor="middle">Connect</text>
      <text class="ui-p" x="10" y="352">EN · NL · DE · FR · ES · PT</text>
    </svg>
  </div>
  <figcaption><b>Windows</b> The IP address tab on Windows. Tunnel is the only method available here, because RD Gateway cannot resolve a typed address. On macOS the layout is identical; Connect opens the Windows App instead of mstsc.</figcaption>
</figure>

This tab always uses Tunnel. RD Gateway needs Bastion to resolve the target itself, and a typed address gives it nothing to resolve.

## Fields

| Field | Description | Default |
| --- | --- | --- |
| IP address | The private address of the target machine. It has to be reachable from the Bastion host's virtual network. | none |
| Target port | The RDP port listening on the remote machine. | 3389 |
| Local port | The port on your computer where the tunnel listens. Your remote desktop client connects to `localhost:[Local port]`. | 55000 |

Target port and local port are shared with the Azure VM tab. Change one there and it changes here too.

## Connecting

1. Type the target address.
2. Leave the target port at 3389 unless the machine listens on something else, and change the local port only if 55000 is already taken on your computer.
3. Select **Connect**. The application opens a WebSocket tunnel to Bastion and launches your remote desktop client pointed at `localhost:[Local port]`.

<div class="callout warn">
<span class="eyebrow">Reachability, not naming</span>
<p>The application has no way to confirm a target address is correct beyond format checks. If Bastion's virtual network cannot route to that address, the tunnel opens but the remote desktop client cannot complete the connection. Check with whoever manages your network if you are not sure a route exists.</p>
</div>
