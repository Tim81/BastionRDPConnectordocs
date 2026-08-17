---
title: Eerste aanmelding
description: Wat er gebeurt de eerste keer dat u de applicatie opent, hoe de tokencache werkt, en hoe tenant- en subscriptionselectie samenhangen.
appliesTo: '3.3.6'
lastReviewed: '2026-07-25'
---

De applicatie meldt u aan met MSAL, dezelfde library die Azure CLI en Visual Studio gebruiken voor interactief aanmelden. Deze opent de aanmeldpagina in een ingebouwde browser: WebView2 op Windows, WKWebView op macOS. Er is geen apart browservenster en geen gekopieerde apparaatcode.

## Aanmelden

Wat u ziet, hangt af van of er al een token gecached staat op uw machine.

| Situatie | Wat er gebeurt |
| --- | --- |
| Geen gecachede token | De Microsoft-aanmeldpagina opent direct. |
| Een geldige gecachede token | De app meldt zich stil aan. Er verschijnt geen aanmeldvenster, en u gaat direct naar de tenantselectie als uw account er meer dan één heeft. |
| Een verlopen token, of een Conditional Access-beleid dat herverificatie vereist | Het aanmeldvenster opent opnieuw, zodat u kunt voldoen aan wat uw organisatie vereist, bijvoorbeeld dagelijkse MFA. |

Kies **Werk- of schoolaccount**, voer uw account in en voltooi MFA als uw organisatie daarom vraagt.

<div class="callout note">
<span class="eyebrow">Opmerking</span>
<p>De tokencache staat op <code>%LOCALAPPDATA%\BastionRDPConnector\msal_token_cache.bin</code>. Deze is per machine en roamt niet, en is los van de Azure CLI-cache. Het profiel van de ingebouwde browser staat ernaast, in <code>%LOCALAPPDATA%\BastionRDPConnector\WebView2</code>.</p>
</div>

## Een tenant kiezen

<!-- Mirrors src/components/ScreenSignIn.astro -->
<figure class="appshot">
  <div class="frame">
    <svg viewBox="0 0 300 372" role="img" aria-labelledby="s-signin-win">
      <title id="s-signin-win">Het tenantselectiedialoogvenster op Windows. Drie tenants worden getoond, elk met een keuzerondje en de tenant-ID. Eén is geselecteerd. Een OK-knop bevestigt de keuze.</title>
      <rect class="ui-win" x="1" y="1" width="298" height="370" rx="6"/>
      <path class="ui-bar" d="M2 2 H298 V22 H2 Z"/>
      <text class="ui-title" x="10" y="15">Tenant selecteren</text>
      <path d="M280 9 l7 7 M287 9 l-7 7" stroke="#7B8794" stroke-width="1.1" fill="none"/>
      <text class="ui-l" x="10" y="42">Uw account heeft toegang tot meer dan</text>
      <text class="ui-l" x="10" y="54">één tenant. Kies er één om verder te gaan.</text>
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
      <text class="ui-p" x="10" y="222">Instellingen worden apart per</text>
      <text class="ui-p" x="10" y="233">tenant opgeslagen en hersteld als u terugschakelt.</text>
      <rect class="ui-btn" x="190" y="320" width="100" height="26" rx="4"/>
      <text class="ui-bt" x="240" y="337" text-anchor="middle">OK</text>
    </svg>
  </div>
  <figcaption><b>Windows</b> Het tenantselectiedialoogvenster op Windows. Dit verschijnt eenmalig, direct na aanmelden, alleen als het account meer dan één tenant kan zien. Het dialoogvenster ziet er op macOS hetzelfde uit, afgezien van de vensterstijl.</figcaption>
</figure>

Dit dialoogvenster verschijnt wanneer uw account toegang heeft tot meer dan één Entra ID-tenant, bijvoorbeeld via Azure Lighthouse. Kies de tenant waarvan u de resources wilt gebruiken en selecteer **OK**. Als die tenant MFA vereist en uw gecachede token daar nog niet aan voldoet, krijgt u nog één keer een authenticatieprompt.

U kunt op elk moment van tenant wisselen terwijl de app actief is. Instellingen, dus de laatst gebruikte subscription, Bastion-host en VM, worden apart per tenant opgeslagen en komen automatisch terug wanneer u terugschakelt.

## Een subscription selecteren

Zodra een tenant is gekozen, laadt het hoofdvenster met bovenaan een **Bastion-subscription**. Als uw account meerdere subscriptions heeft en de gekozen subscription niet de Bastion-host bevat die u nodig heeft, selecteer dan **Wijzig** om de kiezer te openen.

<div class="callout note">
<span class="eyebrow">Opmerking</span>
<p>De Bastion-subscription bovenaan is de subscription die uw Bastion-resource bevat. Op het tabblad Azure VM kan de VM-subscription een heel andere zijn. Verbindingen tussen subscriptions werken zonder extra configuratie.</p>
</div>

Uw token blijft tussen keren opstarten op schijf staan, dus u wordt niet opnieuw om aanmelden gevraagd tenzij de sessie verloopt of een Conditional Access-beleid dit vereist. Om een nieuwe aanmelding te forceren, selecteert u **Afmelden** in de bovenste balk. Dit verwijdert de gecachede token en wist de MSAL-status in één stap, en de volgende start begint met een lege aanmelding.
