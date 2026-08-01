---
title: Première connexion
description: Ce qui se passe la première fois que vous ouvrez l'application, comment fonctionne le cache de jetons, et comment s'articulent la sélection du locataire et de l'abonnement.
appliesTo: '3.3.5'
lastReviewed: '2026-07-25'
---

L'application vous connecte avec MSAL, la même bibliothèque qu'Azure CLI et Visual Studio utilisent pour la connexion interactive. Elle ouvre la page de connexion dans un navigateur intégré : WebView2 sur Windows, WKWebView sur macOS. Il n'y a pas de fenêtre de navigateur séparée ni de code d'appareil à copier-coller.

## Se connecter

Ce que vous voyez dépend de la présence ou non d'un jeton déjà en cache sur votre machine.

| Situation | Ce qui se passe |
| --- | --- |
| Aucun jeton en cache | La page de connexion Microsoft s'ouvre immédiatement. |
| Un jeton en cache valide | L'application se connecte silencieusement. Aucune fenêtre de connexion n'apparaît, et vous passez directement à la sélection du locataire si votre compte en a plusieurs. |
| Un jeton expiré, ou une politique d'accès conditionnel qui exige une réauthentification | La fenêtre de connexion s'ouvre à nouveau, afin que vous puissiez satisfaire aux exigences de votre organisation, par exemple une MFA quotidienne. |

Sélectionnez **Compte professionnel ou scolaire**, saisissez votre compte, et effectuez la MFA si votre organisation l'exige.

<div class="callout note">
<span class="eyebrow">Remarque</span>
<p>Le cache de jetons se trouve dans <code>%LOCALAPPDATA%\BastionRDPConnector\msal_token_cache.bin</code>. Il est spécifique à la machine et ne suit pas votre profil en itinérance, et il est distinct du cache d'Azure CLI. Le profil propre au navigateur intégré se trouve juste à côté, dans <code>%LOCALAPPDATA%\BastionRDPConnector\WebView2</code>.</p>
</div>

## Choisir un locataire

<!-- Mirrors src/components/ScreenSignIn.astro -->
<figure class="appshot">
  <div class="frame">
    <svg viewBox="0 0 300 372" role="img" aria-labelledby="s-signin-win">
      <title id="s-signin-win">La boîte de dialogue de sélection du locataire sur Windows. Trois locataires sont listés, chacun avec un bouton radio et son identifiant de locataire. L'un d'eux est sélectionné. Un bouton OK confirme le choix.</title>
      <rect class="ui-win" x="1" y="1" width="298" height="370" rx="6"/>
      <path class="ui-bar" d="M2 2 H298 V22 H2 Z"/>
      <text class="ui-title" x="10" y="15">Sélectionner un locataire</text>
      <path d="M280 9 l7 7 M287 9 l-7 7" stroke="#7B8794" stroke-width="1.1" fill="none"/>
      <text class="ui-l" x="10" y="42">Votre compte a accès à plus d'un</text>
      <text class="ui-l" x="10" y="54">locataire. Choisissez-en un pour continuer.</text>
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
      <text class="ui-p" x="10" y="222">Les paramètres sont stockés séparément par</text>
      <text class="ui-p" x="10" y="233">locataire et restaurés lorsque vous y revenez.</text>
      <rect class="ui-btn" x="190" y="320" width="100" height="26" rx="4"/>
      <text class="ui-bt" x="240" y="337" text-anchor="middle">OK</text>
    </svg>
  </div>
  <figcaption><b>Windows</b> La boîte de dialogue de sélection du locataire sur Windows. Elle apparaît une fois, juste après la connexion, uniquement lorsque le compte peut voir plus d'un locataire. La boîte de dialogue a la même apparence sur macOS, hormis l'habillage de la fenêtre.</figcaption>
</figure>

Cette boîte de dialogue apparaît lorsque votre compte a accès à plus d'un locataire Entra ID, par exemple via Azure Lighthouse. Sélectionnez le locataire dont vous souhaitez utiliser les ressources et sélectionnez **OK**. Si ce locataire nécessite la MFA et que votre jeton en cache ne la satisfait pas déjà, vous obtenez une invite d'authentification supplémentaire.

Vous pouvez changer de locataire à tout moment pendant que l'application est en cours d'exécution. Les paramètres, c'est-à-dire le dernier abonnement, l'hôte Bastion et la VM utilisés, sont stockés séparément par locataire et reviennent automatiquement lorsque vous y revenez.

## Choisir un abonnement

Une fois le locataire choisi, la fenêtre principale se charge avec un **abonnement Bastion** affiché en haut. Si votre compte a plusieurs abonnements et que celui présélectionné ne contient pas l'hôte Bastion dont vous avez besoin, sélectionnez **Modifier** pour ouvrir le sélecteur.

<div class="callout note">
<span class="eyebrow">Remarque</span>
<p>L'abonnement Bastion affiché en haut est celui qui contient votre ressource Bastion. Sur l'onglet Azure VM, l'abonnement VM peut être totalement différent. Les connexions inter-abonnements fonctionnent sans configuration supplémentaire.</p>
</div>

Votre jeton reste sur le disque entre les lancements, si bien que vous n'êtes pas invité à vous reconnecter, sauf si la session expire ou qu'une politique d'accès conditionnel l'exige. Pour forcer une nouvelle connexion, sélectionnez **Se déconnecter** dans la barre supérieure. Cela supprime le jeton en cache et efface l'état MSAL en une seule étape, et le prochain lancement démarre avec une connexion vierge.
