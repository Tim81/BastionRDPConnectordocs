---
title: Sign in
description: What happens the first time you open the application, how the token cache works, and how tenant and subscription selection fit together.
appliesTo: '3.3.6'
lastReviewed: '2026-07-25'
---

The application signs you in with MSAL, the same library Azure CLI and Visual Studio use for interactive sign-in. It opens the login page in an embedded browser: WebView2 on Windows, WKWebView on macOS. There is no separate browser window and no copy-pasted device code.

## Signing in

What you see depends on whether a token is already cached on your machine.

| Situation | What happens |
| --- | --- |
| No cached token | The Microsoft sign-in page opens right away. |
| A valid cached token | The app signs in silently. No login window appears, and you go straight to tenant selection if your account has more than one. |
| An expired token, or a Conditional Access policy that requires re-authentication | The login window opens again, so you can satisfy whatever your organisation requires, for example daily MFA. |

Pick **Work or school account**, enter your account, and complete MFA if your organisation asks for it.

<div class="callout note">
<span class="eyebrow">Note</span>
<p>The token cache lives at <code>%LOCALAPPDATA%\BastionRDPConnector\msal_token_cache.bin</code>. It is per-machine and does not roam, and it is separate from the Azure CLI cache. The embedded browser's own profile sits alongside it, in <code>%LOCALAPPDATA%\BastionRDPConnector\WebView2</code>.</p>
</div>

## Choosing a tenant

<!-- Mirrors src/components/ScreenSignIn.astro -->
<figure class="appshot">
  <div class="frame">
    <svg viewBox="0 0 300 372" role="img" aria-labelledby="s-signin-win">
      <title id="s-signin-win">The tenant selection dialog on Windows. Three tenants are listed, each with a radio button and its tenant ID. One is selected. An OK button confirms the choice.</title>
      <rect class="ui-win" x="1" y="1" width="298" height="370" rx="6"/>
      <path class="ui-bar" d="M2 2 H298 V22 H2 Z"/>
      <text class="ui-title" x="10" y="15">Select tenant</text>
      <path d="M280 9 l7 7 M287 9 l-7 7" stroke="#7B8794" stroke-width="1.1" fill="none"/>
      <text class="ui-l" x="10" y="42">Your account has access to more than</text>
      <text class="ui-l" x="10" y="54">one tenant. Choose one to continue.</text>
      <rect class="ui-panel" x="10" y="68" width="280" height="42" rx="4"/>
      <circle class="ui-ro on" cx="24" cy="88" r="4"/>
      <circle class="ui-rd" cx="24" cy="88" r="2"/>
      <text class="ui-tb" x="36" y="86">Contoso Production</text>
      <text class="ui-p" x="36" y="98">5f8a2c14-…-tenant</text>
      <rect class="ui-panel" x="10" y="114" width="280" height="42" rx="4"/>
      <circle class="ui-ro" cx="24" cy="134" r="4"/>
      <text class="ui-tb" x="36" y="132">Contoso Dev</text>
      <text class="ui-p" x="36" y="144">b2c19e07-…-tenant</text>
      <rect class="ui-panel" x="10" y="160" width="280" height="42" rx="4"/>
      <circle class="ui-ro" cx="24" cy="180" r="4"/>
      <text class="ui-tb" x="36" y="178">Fabrikam (Lighthouse)</text>
      <text class="ui-p" x="36" y="190">9e4d3a51-…-tenant</text>
      <text class="ui-p" x="10" y="222">Settings are stored separately per</text>
      <text class="ui-p" x="10" y="233">tenant and restored when you switch back.</text>
      <rect class="ui-btn" x="190" y="320" width="100" height="26" rx="4"/>
      <text class="ui-bt" x="240" y="337" text-anchor="middle">OK</text>
    </svg>
  </div>
  <figcaption><b>Windows</b> The tenant selection dialog on Windows. It appears once, right after sign-in, only when the account can see more than one tenant. The dialog looks the same on macOS aside from the window chrome.</figcaption>
</figure>

This dialog appears when your account has access to more than one Entra ID tenant, for example through Azure Lighthouse. Pick the tenant whose resources you want to work with and select **OK**. If that tenant needs MFA and your cached token does not already satisfy it, you get one more authentication prompt.

You can switch tenants at any time while the app is running. Settings, meaning the last subscription, Bastion host, and VM you used, are stored separately per tenant and come back automatically when you switch back.

## Selecting a subscription

Once a tenant is chosen, the main window loads with a **Bastion subscription** shown at the top. If your account has several subscriptions and the one that is picked does not contain the Bastion host you need, select **Change** to open the picker.

<div class="callout note">
<span class="eyebrow">Note</span>
<p>The Bastion subscription at the top is the one that holds your Bastion resource. On the Azure VM tab, the VM subscription can be a different one entirely. Cross-subscription connections work without extra setup.</p>
</div>

Your token stays on disk between launches, so you are not asked to sign in again unless the session expires or a Conditional Access policy requires it. To force a fresh sign-in, select **Logout** in the top bar. It removes the cached token and clears the MSAL state in one step, and the next launch starts from a blank sign-in.
