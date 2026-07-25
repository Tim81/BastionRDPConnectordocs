---
title: Se connecter à une VM Azure
description: Choisissez une machine virtuelle par nom, dans un abonnement ou dans tous, vérifiez son état d'alimentation, démarrez-la si nécessaire, et connectez-vous.
appliesTo: '3.3.4'
lastReviewed: '2026-07-25'
---

L'onglet Azure VM répertorie les machines virtuelles par nom plutôt que de demander une adresse. Il se divise en deux colonnes : les paramètres de connexion à gauche, la sélection de VM à droite. La méthode de connexion sélectionnée par défaut dépend de la plateforme, les deux sont donc présentées ci-dessous.

## Onglet Azure VM

<!-- Mirrors src/components/ScreenAzureVm.astro -->
<figure class="appshot">
  <div class="frame">
    <svg viewBox="0 0 300 372" role="img" aria-labelledby="s-vm-win">
      <title id="s-vm-win">L'onglet Azure VM sous Windows. Un abonnement et un hôte Bastion sont choisis en haut. L'onglet réunit la méthode de connexion, la configuration des moniteurs, l'option Entra ID, une liste consultable de machines virtuelles, l'état d'alimentation de la machine sélectionnée et le bouton Connecter.</title>
      <rect class="ui-win" x="1" y="1" width="298" height="370" rx="6"/>
      <path class="ui-bar" d="M2 2 H298 V22 H2 Z"/>
      <text class="ui-title" x="10" y="15">Azure Bastion RDP Connector</text>
      <path d="M266 9 h7 M280 9 l7 7 M287 9 l-7 7" stroke="#7B8794" stroke-width="1.1" fill="none"/>
      <text class="ui-l" x="10" y="40">Abonnement</text>
      <rect class="ui-field" x="10" y="44" width="182" height="15" rx="3"/>
      <text class="ui-v" x="15" y="55">Production - West Europe</text>
      <rect class="ui-btn-2" x="197" y="44" width="42" height="15" rx="3"/>
      <text class="ui-tb" x="204" y="55">Modifier</text>
      <rect class="ui-btn-2" x="244" y="44" width="18" height="15" rx="3"/>
      <text class="ui-tb" x="250" y="55">i</text>
      <rect class="ui-btn-2" x="266" y="44" width="24" height="15" rx="3"/>
      <text class="ui-tb" x="270" y="55">out</text>
      <text class="ui-l" x="10" y="76">Bastion</text>
      <rect class="ui-field" x="10" y="80" width="252" height="15" rx="3"/>
      <text class="ui-v" x="15" y="91">bastion-hub-weu</text>
      <rect class="ui-btn-2" x="266" y="80" width="24" height="15" rx="3"/>
      <text class="ui-tb" x="273" y="91">↻</text>
      <line x1="10" y1="120" x2="290" y2="120" stroke="#DCE2EA" stroke-width="1"/>
      <text class="ui-tb off" x="14" y="115">Adresse IP</text>
      <text class="ui-tb" x="76" y="115">Azure VM</text>
      <line class="ui-tabup" x1="72" y1="120" x2="132" y2="120"/>
      <text class="ui-tb off" x="142" y="115">Tunnels actifs</text>
      <rect class="ui-panel" x="10" y="130" width="134" height="96" rx="4"/>
      <text class="ui-l" x="17" y="144">Méthode de connexion</text>
      <circle class="ui-ro" cx="22" cy="155" r="4"/>
      <text class="ui-tb" x="31" y="158">Tunnel</text>
      <circle class="ui-ro on" cx="22" cy="169" r="4"/>
      <circle class="ui-rd" cx="22" cy="169" r="2"/>
      <text class="ui-tb" x="31" y="172">RD Gateway</text>
      <text class="ui-l" x="17" y="190">Moniteurs</text>
      <circle class="ui-ro on" cx="22" cy="200" r="4"/><circle class="ui-rd" cx="22" cy="200" r="2"/>
      <text class="ui-tb" x="31" y="203">Unique</text>
      <circle class="ui-ro" cx="80" cy="200" r="4"/>
      <text class="ui-tb" x="89" y="203">Tous</text>
      <rect class="ui-ck" x="18" y="213" width="8" height="8" rx="2"/>
      <path d="M20 217 l2 2 l4 -4" stroke="#fff" stroke-width="1.2" fill="none"/>
      <text class="ui-tb" x="31" y="220">Authentification Entra ID</text>
      <circle class="ui-ro on" cx="158" cy="138" r="4"/><circle class="ui-rd" cx="158" cy="138" r="2"/>
      <text class="ui-tb" x="167" y="141">Abonnement VM</text>
      <circle class="ui-ro" cx="158" cy="152" r="4"/>
      <text class="ui-tb" x="167" y="155">Tous les abonnements</text>
      <rect class="ui-field" x="152" y="162" width="138" height="14" rx="3"/>
      <text class="ui-p" x="157" y="172">Filtrer par nom</text>
      <rect class="ui-field" x="152" y="180" width="138" height="14" rx="3"/>
      <text class="ui-p" x="157" y="190">Filtrer par balise</text>
      <rect class="ui-field" x="152" y="198" width="138" height="15" rx="3"/>
      <text class="ui-v" x="157" y="209">vm-app-prod-01</text>
      <rect class="ui-panel" x="152" y="218" width="138" height="30" rx="4"/>
      <circle class="ui-run" cx="161" cy="233" r="3.5"/>
      <text class="ui-tb" x="170" y="236">En cours d'exécution</text>
      <rect class="ui-btn-2" x="248" y="226" width="36" height="14" rx="3"/>
      <text class="ui-tb" x="254" y="236">Démarrer</text>
      <text class="ui-l" x="10" y="268">Port cible</text>
      <rect class="ui-field" x="10" y="272" width="60" height="15" rx="3"/>
      <text class="ui-v" x="15" y="283">3389</text>
      <text class="ui-l" x="80" y="268">Port local</text>
      <rect class="ui-field" x="80" y="272" width="60" height="15" rx="3"/>
      <text class="ui-v" x="85" y="283">55001</text>
      <text class="ui-p" x="10" y="306">Ouvre dans mstsc</text>
      <rect class="ui-btn" x="10" y="320" width="280" height="26" rx="4"/>
      <text class="ui-bt" x="150" y="337" text-anchor="middle">Connecter</text>
      <text class="ui-p" x="10" y="362">EN · NL · DE · FR · ES · PT</text>
    </svg>
  </div>
  <figcaption><b>Windows</b> L'onglet Azure VM sous Windows. RD Gateway est la méthode par défaut.</figcaption>
</figure>

<figure class="appshot">
  <div class="frame">
    <svg viewBox="0 0 300 372" role="img" aria-labelledby="s-vm-mac">
      <title id="s-vm-mac">L'onglet Azure VM sous macOS. Un abonnement et un hôte Bastion sont choisis en haut. L'onglet réunit la méthode de connexion, la configuration des moniteurs, l'option Entra ID, une liste consultable de machines virtuelles, l'état d'alimentation de la machine sélectionnée et le bouton Connecter.</title>
      <rect class="ui-win" x="1" y="1" width="298" height="370" rx="8"/>
      <path class="ui-bar" d="M2 2 H298 V24 H2 Z"/>
      <circle cx="14" cy="13" r="4" fill="#FF5F57"/>
      <circle cx="27" cy="13" r="4" fill="#FEBC2E"/>
      <circle cx="40" cy="13" r="4" fill="#28C840"/>
      <text class="ui-title" x="150" y="16" text-anchor="middle">Azure Bastion RDP Connector</text>
      <text class="ui-l" x="10" y="40">Abonnement</text>
      <rect class="ui-field" x="10" y="44" width="182" height="15" rx="3"/>
      <text class="ui-v" x="15" y="55">Production - West Europe</text>
      <rect class="ui-btn-2" x="197" y="44" width="42" height="15" rx="3"/>
      <text class="ui-tb" x="204" y="55">Modifier</text>
      <rect class="ui-btn-2" x="244" y="44" width="18" height="15" rx="3"/>
      <text class="ui-tb" x="250" y="55">i</text>
      <rect class="ui-btn-2" x="266" y="44" width="24" height="15" rx="3"/>
      <text class="ui-tb" x="270" y="55">out</text>
      <text class="ui-l" x="10" y="76">Bastion</text>
      <rect class="ui-field" x="10" y="80" width="252" height="15" rx="3"/>
      <text class="ui-v" x="15" y="91">bastion-hub-weu</text>
      <rect class="ui-btn-2" x="266" y="80" width="24" height="15" rx="3"/>
      <text class="ui-tb" x="273" y="91">↻</text>
      <line x1="10" y1="120" x2="290" y2="120" stroke="#DCE2EA" stroke-width="1"/>
      <text class="ui-tb off" x="14" y="115">Adresse IP</text>
      <text class="ui-tb" x="76" y="115">Azure VM</text>
      <line class="ui-tabup" x1="72" y1="120" x2="132" y2="120"/>
      <text class="ui-tb off" x="142" y="115">Tunnels actifs</text>
      <rect class="ui-panel" x="10" y="130" width="134" height="96" rx="4"/>
      <text class="ui-l" x="17" y="144">Méthode de connexion</text>
      <circle class="ui-ro on" cx="22" cy="155" r="4"/>
      <circle class="ui-rd" cx="22" cy="155" r="2"/>
      <text class="ui-tb" x="31" y="158">Tunnel</text>
      <circle class="ui-ro" cx="22" cy="169" r="4"/>
      <text class="ui-tb" x="31" y="172">RD Gateway</text>
      <text class="ui-l" x="17" y="190">Moniteurs</text>
      <circle class="ui-ro on" cx="22" cy="200" r="4"/><circle class="ui-rd" cx="22" cy="200" r="2"/>
      <text class="ui-tb" x="31" y="203">Unique</text>
      <circle class="ui-ro" cx="80" cy="200" r="4"/>
      <text class="ui-tb" x="89" y="203">Tous</text>
      <rect class="ui-ck" x="18" y="213" width="8" height="8" rx="2"/>
      <path d="M20 217 l2 2 l4 -4" stroke="#fff" stroke-width="1.2" fill="none"/>
      <text class="ui-tb" x="31" y="220">Authentification Entra ID</text>
      <circle class="ui-ro on" cx="158" cy="138" r="4"/><circle class="ui-rd" cx="158" cy="138" r="2"/>
      <text class="ui-tb" x="167" y="141">Abonnement VM</text>
      <circle class="ui-ro" cx="158" cy="152" r="4"/>
      <text class="ui-tb" x="167" y="155">Tous les abonnements</text>
      <rect class="ui-field" x="152" y="162" width="138" height="14" rx="3"/>
      <text class="ui-p" x="157" y="172">Filtrer par nom</text>
      <rect class="ui-field" x="152" y="180" width="138" height="14" rx="3"/>
      <text class="ui-p" x="157" y="190">Filtrer par balise</text>
      <rect class="ui-field" x="152" y="198" width="138" height="15" rx="3"/>
      <text class="ui-v" x="157" y="209">vm-app-prod-01</text>
      <rect class="ui-panel" x="152" y="218" width="138" height="30" rx="4"/>
      <circle class="ui-run" cx="161" cy="233" r="3.5"/>
      <text class="ui-tb" x="170" y="236">En cours d'exécution</text>
      <rect class="ui-btn-2" x="248" y="226" width="36" height="14" rx="3"/>
      <text class="ui-tb" x="254" y="236">Démarrer</text>
      <text class="ui-l" x="10" y="268">Port cible</text>
      <rect class="ui-field" x="10" y="272" width="60" height="15" rx="3"/>
      <text class="ui-v" x="15" y="283">3389</text>
      <text class="ui-l" x="80" y="268">Port local</text>
      <rect class="ui-field" x="80" y="272" width="60" height="15" rx="3"/>
      <text class="ui-v" x="85" y="283">55001</text>
      <text class="ui-p" x="10" y="306">Ouvre dans Windows App</text>
      <rect class="ui-btn" x="10" y="320" width="280" height="26" rx="4"/>
      <text class="ui-bt" x="150" y="337" text-anchor="middle">Connecter</text>
      <text class="ui-p" x="10" y="362">EN · NL · DE · FR · ES · PT</text>
    </svg>
  </div>
  <figcaption><b>macOS</b> L'onglet Azure VM sous macOS. Tunnel est la méthode par défaut. RD Gateway peut toujours être sélectionné, et l'application avertit avant son utilisation.</figcaption>
</figure>

La méthode par défaut ne s'applique que jusqu'à ce que vous en choisissiez une vous-même ; ensuite, votre choix est enregistré par locataire et restauré la prochaine fois que vous ouvrez l'application.

## Choisir une VM

Une paire de boutons radio au-dessus de la liste des VM détermine le fonctionnement de la recherche.

| Mode | Comportement |
| --- | --- |
| Abonnement VM (par défaut) | Affiche immédiatement toutes les VM de l'abonnement sélectionné. Tapez dans le champ de filtre pour affiner la liste par nom. La liste déroulante des abonnements n'affiche que les abonnements contenant réellement des VM. |
| Tous les abonnements | Recherche dans tous les abonnements que votre compte peut voir, à l'aide d'Azure Resource Graph. Nécessite au moins trois caractères avant de renvoyer des résultats. Le chargement des VM sur environ 200 abonnements prend de 2 à 4 secondes, contre 30 à 60 secondes lorsque chaque abonnement est interrogé un par un. |

<div class="callout note">
<span class="eyebrow">Remarque</span>
<p>Le filtrage par balise fonctionne conjointement avec le filtre de nom dans les deux modes, ce qui vous permet d'affiner davantage une longue liste avant de choisir une VM.</p>
</div>

## Champs

| Champ | Description |
| --- | --- |
| Méthode de connexion | Tunnel ou RD Gateway. La valeur par défaut est RD Gateway sur Windows et Tunnel sur macOS. |
| Moniteurs | Moniteur unique ou tous les moniteurs. S'applique uniquement au mode RD Gateway. |
| Authentification Entra ID | Optionnelle, affichée uniquement pour RD Gateway. Active le SSO lorsque votre compte et la VM partagent un locataire. |
| Machine virtuelle | La VM à laquelle se connecter, choisie dans la liste à droite. |
| Port cible, port local | Utilisés uniquement en mode Tunnel, et partagés avec l'onglet Adresse IP. |

Avant la connexion, l'application vérifie la SKU Bastion et ses indicateurs de fonctionnalités, ainsi que l'état d'alimentation de la VM, et indique ce qui manque si une vérification échoue. Ces vérifications sont fail-open : une vérification qui ne peut pas aboutir ne bloque pas la connexion.

## État d'alimentation et démarrage d'une VM

L'état d'alimentation de la VM sélectionnée s'affiche à côté de son nom.

| État | Signification |
| --- | --- |
| En cours d'exécution (vert) | La VM est allumée et prête pour les connexions. |
| Arrêtée ou désallouée (rouge) | La VM est éteinte. Un bouton **Démarrer** apparaît. |
| Démarrage, arrêt ou autre (ambre) | La VM est entre deux états. Un indicateur de progression s'affiche pendant que l'application attend qu'elle se stabilise. |

Pour démarrer une VM arrêtée, sélectionnez **Démarrer**. Le bouton est remplacé par un indicateur de progression pendant que l'application interroge Azure pour obtenir l'état actualisé, une fois toutes les 5 secondes pendant jusqu'à 5 minutes. Lorsque l'état passe au vert, une notification confirme que la VM est prête et **Connecter** devient disponible.

<div class="callout warn">
<span class="eyebrow">Le démarrage nécessite plus que le rôle Lecteur</span>
<p>Démarrer une VM nécessite le rôle Contributeur de la machine virtuelle ou un rôle disposant de droits équivalents. Si le bouton Démarrer n'apparaît pas, votre compte dispose probablement uniquement du rôle Lecteur sur cette VM.</p>
</div>

<div class="callout note">
<span class="eyebrow">En cours d'exécution ne veut pas dire prête</span>
<p>En cours d'exécution signifie qu'Azure a mis la VM sous tension. Le système d'exploitation invité a encore besoin d'une minute ou deux pour terminer son démarrage avant d'accepter les connexions RDP. Si une connexion est refusée juste après que l'état passe au vert, attendez quelques minutes puis réessayez. Connecter revérifie l'état d'alimentation au moment où vous le sélectionnez, même si vous avez cliqué juste après le changement de l'indicateur.</p>
</div>
