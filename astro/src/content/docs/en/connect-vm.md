---
title: Connect to an Azure VM
description: Pick a virtual machine by name, across one subscription or all of them, check its power state, start it if needed, and connect.
appliesTo: '3.3.4'
lastReviewed: '2026-07-25'
---

The Azure VM tab lists virtual machines by name instead of asking for an address. It splits into two columns: connection settings on the left, VM selection on the right. Which connection method is selected by default depends on the platform, so both are shown below.

## The Azure VM tab

<!-- Mirrors src/components/ScreenAzureVm.astro -->
<figure class="appshot">
  <div class="frame">
    <svg viewBox="0 0 300 372" role="img" aria-labelledby="s-vm-win">
      <title id="s-vm-win">The Azure VM tab on Windows. A subscription and Bastion host are chosen at the top. The tab holds the connection method, monitor layout, Entra ID option, a searchable list of virtual machines, the power state of the selected machine, and the Connect button.</title>
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
      <text class="ui-tb off" x="14" y="115">IP address</text>
      <text class="ui-tb" x="76" y="115">Azure VM</text>
      <line class="ui-tabup" x1="72" y1="120" x2="132" y2="120"/>
      <text class="ui-tb off" x="142" y="115">Active tunnels</text>
      <rect class="ui-panel" x="10" y="130" width="134" height="96" rx="4"/>
      <text class="ui-l" x="17" y="144">Connection method</text>
      <circle class="ui-ro" cx="22" cy="155" r="4"/>
      <text class="ui-tb" x="31" y="158">Tunnel</text>
      <circle class="ui-ro on" cx="22" cy="169" r="4"/>
      <circle class="ui-rd" cx="22" cy="169" r="2"/>
      <text class="ui-tb" x="31" y="172">RD Gateway</text>
      <text class="ui-l" x="17" y="190">Monitors</text>
      <circle class="ui-ro on" cx="22" cy="200" r="4"/><circle class="ui-rd" cx="22" cy="200" r="2"/>
      <text class="ui-tb" x="31" y="203">Single</text>
      <circle class="ui-ro" cx="80" cy="200" r="4"/>
      <text class="ui-tb" x="89" y="203">All</text>
      <rect class="ui-ck" x="18" y="213" width="8" height="8" rx="2"/>
      <path d="M20 217 l2 2 l4 -4" stroke="#fff" stroke-width="1.2" fill="none"/>
      <text class="ui-tb" x="31" y="220">Entra ID auth</text>
      <circle class="ui-ro on" cx="158" cy="138" r="4"/><circle class="ui-rd" cx="158" cy="138" r="2"/>
      <text class="ui-tb" x="167" y="141">VM Subscription</text>
      <circle class="ui-ro" cx="158" cy="152" r="4"/>
      <text class="ui-tb" x="167" y="155">All subscriptions</text>
      <rect class="ui-field" x="152" y="162" width="138" height="14" rx="3"/>
      <text class="ui-p" x="157" y="172">Search by name</text>
      <rect class="ui-field" x="152" y="180" width="138" height="14" rx="3"/>
      <text class="ui-p" x="157" y="190">Filter by tag</text>
      <rect class="ui-field" x="152" y="198" width="138" height="15" rx="3"/>
      <text class="ui-v" x="157" y="209">vm-app-prod-01</text>
      <rect class="ui-panel" x="152" y="218" width="138" height="30" rx="4"/>
      <circle class="ui-run" cx="161" cy="233" r="3.5"/>
      <text class="ui-tb" x="170" y="236">Running</text>
      <rect class="ui-btn-2" x="248" y="226" width="36" height="14" rx="3"/>
      <text class="ui-tb" x="254" y="236">Start</text>
      <text class="ui-l" x="10" y="268">Target port</text>
      <rect class="ui-field" x="10" y="272" width="60" height="15" rx="3"/>
      <text class="ui-v" x="15" y="283">3389</text>
      <text class="ui-l" x="80" y="268">Local port</text>
      <rect class="ui-field" x="80" y="272" width="60" height="15" rx="3"/>
      <text class="ui-v" x="85" y="283">55001</text>
      <text class="ui-p" x="10" y="306">Opens in mstsc</text>
      <rect class="ui-btn" x="10" y="320" width="280" height="26" rx="4"/>
      <text class="ui-bt" x="150" y="337" text-anchor="middle">Connect</text>
      <text class="ui-p" x="10" y="362">EN · NL · DE · FR · ES · PT</text>
    </svg>
  </div>
  <figcaption><b>Windows</b> The Azure VM tab on Windows. RD Gateway is the default.</figcaption>
</figure>

<figure class="appshot">
  <div class="frame">
    <svg viewBox="0 0 300 372" role="img" aria-labelledby="s-vm-mac">
      <title id="s-vm-mac">The Azure VM tab on macOS. A subscription and Bastion host are chosen at the top. The tab holds the connection method, monitor layout, Entra ID option, a searchable list of virtual machines, the power state of the selected machine, and the Connect button.</title>
      <rect class="ui-win" x="1" y="1" width="298" height="370" rx="8"/>
      <path class="ui-bar" d="M2 2 H298 V24 H2 Z"/>
      <circle cx="14" cy="13" r="4" fill="#FF5F57"/>
      <circle cx="27" cy="13" r="4" fill="#FEBC2E"/>
      <circle cx="40" cy="13" r="4" fill="#28C840"/>
      <text class="ui-title" x="150" y="16" text-anchor="middle">Azure Bastion RDP Connector</text>
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
      <text class="ui-tb off" x="14" y="115">IP address</text>
      <text class="ui-tb" x="76" y="115">Azure VM</text>
      <line class="ui-tabup" x1="72" y1="120" x2="132" y2="120"/>
      <text class="ui-tb off" x="142" y="115">Active tunnels</text>
      <rect class="ui-panel" x="10" y="130" width="134" height="96" rx="4"/>
      <text class="ui-l" x="17" y="144">Connection method</text>
      <circle class="ui-ro on" cx="22" cy="155" r="4"/>
      <circle class="ui-rd" cx="22" cy="155" r="2"/>
      <text class="ui-tb" x="31" y="158">Tunnel</text>
      <circle class="ui-ro" cx="22" cy="169" r="4"/>
      <text class="ui-tb" x="31" y="172">RD Gateway</text>
      <text class="ui-l" x="17" y="190">Monitors</text>
      <circle class="ui-ro on" cx="22" cy="200" r="4"/><circle class="ui-rd" cx="22" cy="200" r="2"/>
      <text class="ui-tb" x="31" y="203">Single</text>
      <circle class="ui-ro" cx="80" cy="200" r="4"/>
      <text class="ui-tb" x="89" y="203">All</text>
      <rect class="ui-ck" x="18" y="213" width="8" height="8" rx="2"/>
      <path d="M20 217 l2 2 l4 -4" stroke="#fff" stroke-width="1.2" fill="none"/>
      <text class="ui-tb" x="31" y="220">Entra ID auth</text>
      <circle class="ui-ro on" cx="158" cy="138" r="4"/><circle class="ui-rd" cx="158" cy="138" r="2"/>
      <text class="ui-tb" x="167" y="141">VM Subscription</text>
      <circle class="ui-ro" cx="158" cy="152" r="4"/>
      <text class="ui-tb" x="167" y="155">All subscriptions</text>
      <rect class="ui-field" x="152" y="162" width="138" height="14" rx="3"/>
      <text class="ui-p" x="157" y="172">Search by name</text>
      <rect class="ui-field" x="152" y="180" width="138" height="14" rx="3"/>
      <text class="ui-p" x="157" y="190">Filter by tag</text>
      <rect class="ui-field" x="152" y="198" width="138" height="15" rx="3"/>
      <text class="ui-v" x="157" y="209">vm-app-prod-01</text>
      <rect class="ui-panel" x="152" y="218" width="138" height="30" rx="4"/>
      <circle class="ui-run" cx="161" cy="233" r="3.5"/>
      <text class="ui-tb" x="170" y="236">Running</text>
      <rect class="ui-btn-2" x="248" y="226" width="36" height="14" rx="3"/>
      <text class="ui-tb" x="254" y="236">Start</text>
      <text class="ui-l" x="10" y="268">Target port</text>
      <rect class="ui-field" x="10" y="272" width="60" height="15" rx="3"/>
      <text class="ui-v" x="15" y="283">3389</text>
      <text class="ui-l" x="80" y="268">Local port</text>
      <rect class="ui-field" x="80" y="272" width="60" height="15" rx="3"/>
      <text class="ui-v" x="85" y="283">55001</text>
      <text class="ui-p" x="10" y="306">Opens in Windows App</text>
      <rect class="ui-btn" x="10" y="320" width="280" height="26" rx="4"/>
      <text class="ui-bt" x="150" y="337" text-anchor="middle">Connect</text>
      <text class="ui-p" x="10" y="362">EN · NL · DE · FR · ES · PT</text>
    </svg>
  </div>
  <figcaption><b>macOS</b> The Azure VM tab on macOS. Tunnel is the default. RD Gateway can still be selected, and the application warns before using it.</figcaption>
</figure>

The default applies only until you pick a method yourself; after that, your choice is saved per tenant and restored the next time you open the app.

## Choosing a VM

A pair of radio buttons above the VM list controls how the search works.

| Mode | Behaviour |
| --- | --- |
| VM Subscription (default) | Lists every VM in the selected subscription right away. Type in the filter box to narrow it by name. The subscription dropdown only shows subscriptions that actually contain VMs. |
| All subscriptions | Searches across every subscription your account can see, using Azure Resource Graph. Needs at least three characters before it returns results. Loading VMs across roughly 200 subscriptions takes 2 to 4 seconds, against 30 to 60 seconds when each subscription is queried one at a time. |

<div class="callout note">
<span class="eyebrow">Note</span>
<p>Filtering by tag works alongside the name filter in both modes, so you can narrow a large list further before picking a VM.</p>
</div>

## Fields

| Field | Description |
| --- | --- |
| Connection method | Tunnel or RD Gateway. Default is RD Gateway on Windows and Tunnel on macOS. |
| Monitors | Single monitor or all monitors. Applies to RD Gateway only. |
| Entra ID auth | Optional, shown for RD Gateway only. Enables single sign-on when your account and the VM share a tenant. |
| Virtual machine | The VM to connect to, picked from the list on the right. |
| Target port, local port | Used only in Tunnel mode, and shared with the IP address tab. |

Before connecting, the application checks the Bastion SKU and its feature flags, and the VM's power state, and tells you what is missing if a check fails. These checks fail open: a check that cannot complete does not block the connection.

## Power state and starting a VM

The selected VM's power state shows next to its name.

| State | Meaning |
| --- | --- |
| Running (green) | The VM is on and ready for connections. |
| Stopped or deallocated (red) | The VM is off. A **Start** button appears. |
| Starting, stopping, or other (amber) | The VM is between states. A progress indicator shows while the app waits for it to settle. |

To start a stopped VM, select **Start**. The button is replaced by a progress indicator while the application polls Azure for the updated state, once every 5 seconds for up to 5 minutes. When the state turns green, a toast notification confirms the VM is ready and **Connect** becomes available.

<div class="callout warn">
<span class="eyebrow">Starting needs more than Reader</span>
<p>Starting a VM needs Virtual Machine Contributor or a role with equivalent rights. If the Start button does not appear, your account most likely only has Reader on that VM.</p>
</div>

<div class="callout note">
<span class="eyebrow">Running is not the same as ready</span>
<p>Running means Azure has powered the VM on. The guest operating system still needs a minute or two to finish booting before it accepts RDP connections. If a connection is refused right after the state turns green, wait a couple of minutes and try again. Connect re-checks the power state at the moment you select it, even if you clicked it right after the indicator changed.</p>
</div>
