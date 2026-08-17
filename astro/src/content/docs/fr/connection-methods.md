---
title: Méthodes de connexion
description: 'Tunnel et RD Gateway comparés : comment chacun achemine la session, quelles cibles ils atteignent, et lequel est la méthode par défaut sous Windows et sur macOS.'
appliesTo: '3.3.6'
lastReviewed: '2026-07-25'
---

Les deux méthodes atteignent la même machine virtuelle via le même hôte Bastion. Elles diffèrent par la façon dont la session de bureau à distance est acheminée, et cette différence détermine les cibles que chacune peut atteindre.

<figure>
<div class="frame">
<svg viewBox="0 0 620 186" role="img" aria-labelledby="fig1t">
  <title id="fig1t">Votre ordinateur ne peut pas atteindre la machine virtuelle directement. Les deux méthodes de connexion passent par l'hôte Azure Bastion.</title>
  <!-- direct path, blocked -->
  <path class="w-dead" d="M104 40 H516"/>
  <line class="w-x" x1="300" y1="30" x2="320" y2="50"/>
  <line class="w-x" x1="320" y1="30" x2="300" y2="50"/>
  <text class="n-s" x="310" y="21" text-anchor="middle">aucune IP publique · 3389 fermé</text>
  <!-- routed path -->
  <path class="w-live" d="M104 120 H256"/>
  <path class="w-live" d="M364 120 H516"/>
  <text class="n-s" x="180" y="112" text-anchor="middle">443 sortant</text>
  <text class="n-s" x="440" y="112" text-anchor="middle">3389 à l'intérieur du vnet</text>
  <!-- nodes -->
  <rect class="n-box" x="8" y="18" width="96" height="124" rx="5"/>
  <text class="n-t" x="56" y="74" text-anchor="middle">Votre PC</text>
  <text class="n-s" x="56" y="92" text-anchor="middle">mstsc</text>
  <rect class="n-box n-hop" x="256" y="96" width="108" height="48" rx="5"/>
  <text class="n-t on" x="310" y="118" text-anchor="middle">Bastion</text>
  <text class="n-s" x="310" y="133" text-anchor="middle" fill="#98A2B3">SKU Standard</text>
  <rect class="n-box" x="516" y="18" width="96" height="124" rx="5"/>
  <text class="n-t" x="564" y="74" text-anchor="middle">Azure VM</text>
  <text class="n-s" x="564" y="92" text-anchor="middle">IP privée</text>
  <text class="n-s" x="310" y="172" text-anchor="middle">Tunnel et RD Gateway empruntent tous deux le chemin du bas</text>
</svg>
</div>
<figcaption><b>Figure 1</b> Le chemin direct n'existe pas. Chaque session est acheminée via l'hôte Bastion sur le port 443.</figcaption>
</figure>

## Tunnel

L'application ouvre un WebSocket vers l'hôte Bastion et écoute sur un port local de votre ordinateur. Votre client de bureau à distance se connecte à `localhost` sur ce port, et le trafic est transmis via le WebSocket.

Comme la cible n'est jamais qu'une adresse à l'autre bout du tunnel, cette méthode atteint toute adresse IP que le réseau virtuel Bastion peut router. Cela inclut des machines qui ne sont pas des VM Azure.

Si le WebSocket se coupe, le tunnel se reconnecte automatiquement, jusqu'à cinq tentatives avec un intervalle croissant entre chaque tentative. Une session de bureau à distance ouverte survit à une reconnexion brève.

### Quand l'utiliser

- Vous vous connectez à une adresse IP plutôt que de choisir une VM.
- Vous êtes sur macOS, où une session RD Gateway se coupe après quelques secondes. Voir [RD Gateway sur macOS](#rd-gateway-sur-macos).
- Vous voulez plusieurs sessions ouvertes en même temps, chacune sur son propre port local.

## RD Gateway

L'application demande à Bastion un fichier `.rdp` préconfiguré qui désigne Bastion comme passerelle de bureau à distance, puis transmet ce fichier à votre client. Il n'y a ni port local ni processus de tunnel.

C'est le chemin le plus court, et c'est la méthode par défaut sous Windows. Elle ne fonctionne que lorsque Bastion peut résoudre la cible lui-même, c'est-à-dire pour les VM Azure et non pour les adresses IP saisies.

<div class="callout warn">
<span class="eyebrow">Connexion inter-locataires</span>
<p>L'authentification Entra ID est désactivée par défaut et doit le rester lorsque la machine virtuelle appartient à un locataire différent de celui du compte avec lequel vous vous êtes connecté, ce qui est le cas habituel avec Azure Lighthouse. Azure AD renvoie <code>AADSTS293004</code> pour cette combinaison. Si vous l'activez quand même et que Bastion refuse, l'application réessaie automatiquement avec le paramètre désactivé, afin que la session puisse quand même s'ouvrir. Voir <a href="../entra-id/">Authentification Entra ID</a>.</p>
</div>

### RD Gateway sur macOS

RD Gateway est sélectionnable sur macOS et la connexion s'établit bien. Elle se coupe ensuite après environ dix à quinze secondes avec l'erreur `0x3000064`.

La cause est une incompatibilité de suites cryptographiques, pas une erreur de configuration. La pile TLS du client macOS ne propose que des suites RSA, alors que la passerelle Azure Bastion présente une suite ECDSA. Aucun des deux côtés ne peut s'accorder avec l'autre, si bien que la session est interrompue peu après son démarrage. Il s'agit d'une limitation du client côté Microsoft, sans aucun paramètre permettant de la contourner.

Microsoft prend en charge le chemin RD Gateway de Bastion avec le client Windows. Ce n'est pas une combinaison prise en charge avec Windows App sur macOS.

Comme la connexion semble d'abord réussir avant d'échouer, l'application demande confirmation avant de tenter la connexion. Choisir RD Gateway sur macOS affiche une invite qui indique le code d'erreur et propose Tunnel à la place. Répondre oui lance quand même la tentative, afin que le comportement puisse être vérifié plutôt que pris pour acquis.

Utilisez Tunnel sur macOS. Il atteint les mêmes machines et c'est la méthode par défaut sur cette plateforme pour cette raison.

## Comparaison

| &nbsp; | Tunnel | RD Gateway |
| --- | --- | --- |
| Se connecter à une VM Azure | Oui | Oui |
| Se connecter à une adresse IP | Oui | Non |
| Ouvre un port local | Oui, un par session | Non |
| Se reconnecte automatiquement | Oui, jusqu'à 5 tentatives | Non |
| Authentification Entra ID | Non applicable | Désactivée par défaut, facultative |
| Par défaut sous Windows | Non | Oui |
| Par défaut sur macOS | Oui | Non |
| Nécessite Azure CLI | Non | Non |

La valeur par défaut ne s'applique que jusqu'à ce que vous choisissiez vous-même une méthode. Ensuite, votre choix est enregistré par locataire et restauré au prochain démarrage de l'application.

## Ports

Aucune des deux méthodes n'a besoin de règle de pare-feu entrante. Les deux utilisent le port 443 sortant depuis votre ordinateur vers l'hôte Bastion.

| De | Vers | Port |
| --- | --- | --- |
| Votre ordinateur | bst-*.bastion.azure.com | 443/TCP sortant |
| Votre ordinateur | login.microsoftonline.com | 443/TCP sortant |
| Hôte Bastion | Machine cible | 3389/TCP à l'intérieur du réseau virtuel |
