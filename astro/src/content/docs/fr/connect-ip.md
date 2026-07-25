---
title: Se connecter à une adresse IP
description: "L'onglet Adresse IP atteint tout ce que le réseau virtuel de Bastion peut router, pas seulement les VM Azure, via une connexion Tunnel."
appliesTo: '3.3.4'
lastReviewed: '2026-07-25'
---

Utilisez cet onglet lorsque la machine que vous voulez n'a pas d'enregistrement de VM que vous puissiez choisir par son nom, ou n'est pas du tout une VM Azure. Il atteint les machines sur site via un VPN ou ExpressRoute, les systèmes Windows dans d'autres clouds, et toute VM Azure que vous préférez adresser directement plutôt que de rechercher.

## L'onglet Adresse IP

<!-- Mirrors src/components/ScreenIpAddress.astro -->
<figure class="appshot">
  <div class="frame">
    <svg viewBox="0 0 300 372" role="img" aria-labelledby="s-ip-win">
      <title id="s-ip-win">L'onglet Adresse IP sous Windows. Un abonnement et un hôte Bastion sont sélectionnés en haut. L'onglet contient un champ d'adresse, le port cible, le port local et le bouton Connecter.</title>
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
      <text class="ui-tb" x="14" y="115">Adresse IP</text>
      <line class="ui-tabup" x1="10" y1="120" x2="70" y2="120"/>
      <text class="ui-tb off" x="76" y="115">Azure VM</text>
      <text class="ui-tb off" x="142" y="115">Tunnels actifs</text>
      <rect class="ui-panel" x="10" y="132" width="280" height="112" rx="4"/>
      <text class="ui-l" x="20" y="150">Adresse IP</text>
      <rect class="ui-field" x="20" y="154" width="260" height="16" rx="3"/>
      <text class="ui-v" x="25" y="165">10.20.4.15</text>
      <text class="ui-l" x="20" y="185">Port cible</text>
      <rect class="ui-field" x="20" y="189" width="120" height="15" rx="3"/>
      <text class="ui-v" x="25" y="200">3389</text>
      <text class="ui-l" x="160" y="185">Port local</text>
      <rect class="ui-field" x="160" y="189" width="120" height="15" rx="3"/>
      <text class="ui-v" x="165" y="200">55000</text>
      <text class="ui-p" x="20" y="220">Atteint toute adresse que le réseau</text>
      <text class="ui-p" x="20" y="231">virtuel Bastion peut router.</text>
      <text class="ui-p" x="10" y="268">S'ouvre dans mstsc</text>
      <rect class="ui-btn" x="10" y="282" width="280" height="26" rx="4"/>
      <text class="ui-bt" x="150" y="299" text-anchor="middle">Connecter</text>
      <text class="ui-p" x="10" y="352">EN · NL · DE · FR · ES · PT</text>
    </svg>
  </div>
  <figcaption><b>Windows</b> L'onglet Adresse IP sous Windows. Tunnel est la seule méthode disponible ici, car RD Gateway ne peut pas résoudre une adresse saisie. Sur macOS, la disposition est identique ; Connecter ouvre Windows App au lieu de mstsc.</figcaption>
</figure>

Cet onglet utilise toujours Tunnel. RD Gateway a besoin que Bastion résolve lui-même la cible, et une adresse saisie ne lui donne rien à résoudre.

## Champs

| Champ | Description | Par défaut |
| --- | --- | --- |
| Adresse IP | L'adresse privée de la machine cible. Elle doit être accessible depuis le réseau virtuel de l'hôte Bastion. | aucune |
| Port cible | Le port RDP en écoute sur la machine distante. | 3389 |
| Port local | Le port de votre ordinateur sur lequel le tunnel écoute. Votre client de bureau à distance se connecte à `localhost:[Local port]`. | 55000 |

Le port cible et le port local sont partagés avec l'onglet Azure VM. La modification de l'un des deux ici met automatiquement à jour l'autre.

## Connexion

1. Saisissez l'adresse cible.
2. Laissez le port cible à 3389 sauf si la machine écoute sur un autre port, et ne changez le port local que si le 55000 est déjà utilisé sur votre ordinateur.
3. Sélectionnez **Connecter**. L'application ouvre un tunnel WebSocket vers Bastion et lance votre client de bureau à distance pointé vers `localhost:[Local port]`.

<div class="callout warn">
<span class="eyebrow">Accessibilité, pas nommage</span>
<p>L'application n'a aucun moyen de confirmer qu'une adresse cible est correcte au-delà de la vérification du format. Si le réseau virtuel de Bastion ne peut pas router vers cette adresse, le tunnel s'ouvre mais le client de bureau à distance ne peut pas terminer la connexion. Vérifiez auprès de la personne qui gère votre réseau si vous n'êtes pas sûr qu'une route existe.</p>
</div>
