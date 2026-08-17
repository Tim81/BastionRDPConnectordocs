---
title: Moniteurs
description: Choisissez si une session RD Gateway s'ouvre sur votre écran principal ou s'étend sur tous les moniteurs connectés.
appliesTo: '3.3.6'
lastReviewed: '2026-07-25'
---

L'onglet Azure VM comporte un paramètre Moniteurs à côté de Méthode de connexion. Il ne s'applique qu'à RD Gateway. Les connexions Tunnel ne portent pas de préférence de moniteur, car c'est votre propre client de bureau à distance qui gère la session une fois le tunnel ouvert.

## Les deux options

| Option | Comportement |
| --- | --- |
| Moniteur unique | La session s'ouvre en plein écran uniquement sur votre écran principal. |
| Tous les moniteurs | La session s'étend sur tous les moniteurs connectés, de sorte que le bureau à distance remplit toute votre configuration multi-écrans. |

Moniteur unique est l'option par défaut. Choisissez Tous les moniteurs si vous voulez que la session distante se comporte comme un second bureau physique sur l'ensemble de vos écrans.

## Pourquoi Tunnel n'a pas ce paramètre

Le choix du moniteur est écrit dans le fichier `.rdp` que RD Gateway transmet à votre client de bureau à distance. Tunnel ne génère pas de fichier. Il ouvre un port local et vous laisse lancer le client vous-même, donc il n'y a rien dans quoi l'application puisse écrire ce paramètre. Si vous basculez une session de RD Gateway vers Tunnel, définissez le comportement du moniteur directement dans votre client RDP.

## Où ce choix est enregistré

Le paramètre de moniteur est enregistré [par locataire](../tenants/), avec la méthode de connexion et l'authentification Entra ID. Changer de locataire restaure ce que vous aviez choisi en dernier pour ce locataire, et revenir à RD Gateway sur le même locataire s'en souvient également.
