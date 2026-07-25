---
title: Aperçu
description: Ouvrez une session Bureau à distance via Azure Bastion vers une machine virtuelle Azure, ou vers tout système Windows que le réseau Bastion peut atteindre.
appliesTo: '3.3.4'
lastReviewed: '2026-07-25'
---

Azure Bastion RDP Connector ouvre une session Bureau à distance via Azure Bastion, en utilisant le client Bureau à distance déjà installé sur votre ordinateur. Les machines virtuelles Azure sont choisies par nom. Tout le reste est atteint par adresse, ce qui inclut les machines sur site et les machines dans d'autres clouds.

## Ce que fait l'application

Azure Bastion est une route vers un réseau, pas seulement vers Azure. Elle atteint tout ce que son propre réseau virtuel peut atteindre, si bien qu'une machine n'a pas besoin d'être une VM Azure, ni même de se trouver dans Azure, pour être accessible via Bastion.

Cette application demande cette route à Bastion et transmet le résultat à votre client Bureau à distance. Vous ne copiez pas de chaînes de connexion, ne gérez pas de certificats et n'ouvrez pas de ports de pare-feu.

Azure CLI n'est pas nécessaire. Les versions précédentes appelaient `az network bastion` pour établir le tunnel. Depuis la version 3.0, l'application communique directement avec les API Bastion et Azure Resource Manager, si bien qu'aucune autre installation n'est nécessaire.

## Ce que vous pouvez atteindre

| Cible | Comment vous la choisissez | Nécessite |
| --- | --- | --- |
| Machine virtuelle Azure | Choisissez-la par nom depuis l'onglet Azure VM, dans l'ensemble de vos abonnements | Accès Lecteur à la VM |
| Tout le reste | Saisissez son adresse dans l'onglet Adresse IP | Connexion basée sur IP activée sur l'hôte Bastion |

La route par adresse est la plus large des deux. Elle atteint tout système que le réseau virtuel Bastion peut router :

- Machines virtuelles Azure, dans le même réseau virtuel ou en peering avec lui
- Serveurs et postes de travail Windows sur site, via un VPN site à site ou ExpressRoute
- Systèmes Windows dans d'autres clouds, comme AWS, ou dans un cloud privé

Tout système disposant d'une route et d'un port RDP à l'écoute est accessible. Qu'il s'exécute dans Azure ou non n'a pas d'importance.

Microsoft documente directement le cas des machines sur site : la connexion basée sur IP de Bastion « permet la connectivité vers des machines sur site, si une connectivité hybride existe entre la ressource Azure Bastion et la machine à laquelle vous souhaitez vous connecter ». Voir [Se connecter à une VM via une adresse IP privée spécifiée](https://learn.microsoft.com/en-us/azure/bastion/connect-ip-address).

## Deux modes de connexion

L'application propose deux méthodes de connexion. Elles atteignent la même machine et diffèrent dans la façon dont la session est acheminée.

| Méthode | Achemine la session via | Fonctionne avec les adresses IP |
| --- | --- | --- |
| Tunnel | Un port local transféré vers Bastion via un WebSocket | Oui |
| RD Gateway | Un fichier .rdp pointant vers Bastion en tant que passerelle | Non |

[Méthodes de connexion](../connection-methods/) explique quand utiliser chacune, et pourquoi la méthode par défaut diffère entre Windows et macOS.

## Avant de commencer

- Un hôte Azure Bastion avec le SKU Standard ou Premium. Les SKU Basic et Developer ne prennent pas en charge le client natif.
- **Le support du client natif** activé sur cet hôte Bastion.
- Un accès Lecteur à l'hôte Bastion et aux machines virtuelles que vous souhaitez atteindre.
- Windows 10 ou version ultérieure. Installé depuis le Microsoft Store.
- Une version macOS existe, prise en charge depuis la version 3.1.2 pour Apple Silicon et Intel, mais elle n'est pas encore disponible publiquement.

<div class="callout note">
<span class="eyebrow">Remarque</span>
<p>L'application vérifie le SKU Bastion et ses indicateurs de fonctionnalités avant de se connecter, et vous indique lequel manque si une vérification échoue. Ces vérifications sont fail-open, si bien qu'une vérification qui ne peut pas aboutir ne vous empêche pas de vous connecter.</p>
</div>

## Où les données sont stockées

Les paramètres suivent votre profil Windows en itinérance. Les données de connexion et les journaux restent sur la machine.

| Chemin | Contient |
| --- | --- |
| `%APPDATA%\BastionRDPConnector` | `settings.json` : dernier abonnement, Bastion, VM et langue utilisés |
| `%LOCALAPPDATA%\BastionRDPConnector` | Le cache de jetons de connexion, le profil du navigateur de connexion, et `debug.log` avec les dix dernières sessions |
