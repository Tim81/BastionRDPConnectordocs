---
title: Prérequis
description: Ce qui doit être vrai sur votre machine et dans Azure avant qu'Azure Bastion RDP Connector puisse ouvrir une session.
appliesTo: '3.3.5'
lastReviewed: '2026-07-25'
---

L'application est autonome. Elle n'a pas besoin que .NET soit installé séparément, et depuis la version 3.0 elle n'a pas besoin d'Azure CLI. Ce dont elle a besoin, c'est d'un système d'exploitation pris en charge, d'un client Bureau à distance, et d'un hôte Bastion configuré pour accepter les connexions client natives.

## Sur votre machine

| Prérequis | Remarques |
| --- | --- |
| Windows 10 ou version ultérieure, x64 | Installé depuis le Microsoft Store |
| macOS 12 Monterey ou version ultérieure | Pris en charge depuis la version 3.1.2 pour Apple Silicon et Intel, mais pas encore disponible publiquement |
| Client Bureau à distance, Windows | `mstsc.exe`, déjà inclus dans Windows |
| Client Bureau à distance, macOS | The Windows App, depuis le Mac App Store. Utilisez le mode Tunnel avec ce client. Une session RD Gateway s'ouvre puis se coupe après quelques secondes avec l'erreur `0x3000064`, un conflit de chiffrement que Microsoft ne prend pas en charge sur ce client |

<div class="callout note">
<span class="eyebrow">Remarque</span>
<p>Azure CLI n'est pas nécessaire. Les versions précédentes appelaient <code>az network bastion tunnel</code> ; depuis la version 3.0, le tunnel est établi nativement avec .NET. Si vous utilisez encore une version 2.x, Azure CLI et l'extension <code>azure-bastion</code> restent nécessaires.</p>
</div>

## Dans Azure

| Prérequis | Remarques |
| --- | --- |
| Azure Bastion, SKU Standard ou Premium | Les SKU Basic et Developer ne prennent pas en charge le client natif |
| Support du client natif, activé sur l'hôte Bastion | Activé séparément du choix du SKU |
| Connexion basée sur IP, activée sur l'hôte Bastion | Nécessaire uniquement si vous prévoyez d'utiliser l'onglet Adresse IP |
| Rôle Lecteur sur la ressource Bastion et son réseau virtuel | Le minimum requis pour lister les hôtes Bastion et s'y connecter |
| Rôle Lecteur sur la machine virtuelle cible | Nécessaire pour lister la VM et s'y connecter. Le rôle Virtual Machine Contributor ou supérieur est nécessaire pour démarrer une VM arrêtée |
| Un abonnement Azure | L'application liste tous les abonnements que votre compte peut voir |

<div class="callout note">
<span class="eyebrow">Remarque</span>
<p>L'application vérifie le SKU Bastion et ses indicateurs de fonctionnalités avant de se connecter, et nomme celui qui manque si une vérification échoue. Ces vérifications sont fail-open : si la vérification elle-même ne peut pas aboutir, par exemple en raison d'un problème réseau transitoire, la tentative de connexion se poursuit malgré tout.</p>
</div>

## Accessibilité réseau

Une cible doit seulement être accessible depuis le réseau virtuel de Bastion. Elle n'a pas besoin d'être une VM Azure, et elle n'a même pas besoin de se trouver dans Azure.

- Bastion déployé dans le même réseau virtuel, ou dans un réseau en peering avec lui, est le cas simple.
- Dans une configuration hub-and-spoke ou landing zone, Bastion se trouve souvent dans une landing zone de connectivité centralisée et atteint les réseaux virtuels spoke via Azure Virtual WAN. Dans cette topologie, la ressource Bastion n'est pas visible depuis l'intérieur d'un spoke individuel dans le portail Azure, même si elle peut toujours atteindre les VM qui s'y trouvent. Cette application est conçue précisément pour ce cas : choisissez le Bastion partagé une seule fois, puis connectez-vous à une VM dans n'importe quel spoke qu'il peut atteindre.
- Les machines sur site sont également accessibles, via un VPN site à site ou ExpressRoute, tout comme les systèmes Windows dans d'autres clouds, tant qu'une route existe.

Si vous n'êtes pas certain qu'un hôte Bastion puisse atteindre une cible particulière, demandez à la personne qui gère votre réseau. L'application n'a aucun moyen de voir les routes qui ne sont pas exposées via les API qu'elle appelle.
