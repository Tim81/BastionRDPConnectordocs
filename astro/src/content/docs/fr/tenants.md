---
title: Plusieurs locataires
description: Comment l'application conserve un ensemble distinct de préférences pour chaque locataire Entra ID auquel votre compte a accès, et ce qui reste global.
appliesTo: '3.3.4'
lastReviewed: '2026-07-25'
---

Si votre compte a accès à plus d'un locataire Entra ID, par exemple via Azure Lighthouse, l'application conserve un ensemble distinct de préférences pour chacun au lieu d'écraser un seul ensemble partagé à chaque changement.

## Changer de locataire

[Connexion](../sign-in/) couvre la boîte de dialogue de sélection du locataire qui apparaît juste après l'authentification, lorsque votre compte a accès à plus d'un locataire. Vous pouvez aussi changer de locataire plus tard, à tout moment pendant que l'application est en cours d'exécution, depuis le même contrôle dans la barre supérieure.

Changer de locataire ne vous déconnecte pas. Cela recharge la liste des abonnements pour le locataire choisi et restaure ce que vous y avez utilisé en dernier.

## Ce qui est stocké par locataire

Chaque locataire dispose de son propre emplacement pour :

- Le dernier abonnement Bastion et le dernier hôte Bastion utilisés
- Le dernier abonnement VM et la dernière machine virtuelle utilisés
- La dernière adresse IP utilisée
- Le port cible et le port local
- La méthode de connexion, Tunnel ou RD Gateway
- Le mode moniteur
- L'authentification Entra ID

Passez du locataire A au locataire B puis revenez, et le Bastion, la VM et les ports du locataire A reviennent exactement comme vous les aviez laissés. Rien du locataire B n'est conservé.

## Ce qui reste global

Votre choix de langue s'applique à tous les locataires. Modifiez-le pendant que vous travaillez dans un locataire, et il reste modifié après être passé à un autre. La langue est une préférence qui vous concerne, pas l'environnement auquel vous êtes connecté.

## Où cela se trouve sur le disque

Tout cela, par locataire comme global, se trouve dans un seul fichier : `%APPDATA%\BastionRDPConnector\settings.json`. [Fichiers et paramètres](../files-and-settings/) couvre la structure des fichiers et ce que contient chaque chemin.
