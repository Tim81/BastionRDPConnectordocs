---
title: Fichiers et paramètres
description: Où l'application conserve vos préférences, votre état de connexion et ses journaux, et ce que contient chaque fichier.
appliesTo: '3.3.4'
lastReviewed: '2026-07-25'
---

L'application écrit dans deux dossiers distincts sous votre profil utilisateur. Vous ne modifiez jamais ces fichiers directement ; l'application les lit et les écrit elle-même.

## Paramètres : itinérants, par locataire

`%APPDATA%\BastionRDPConnector\settings.json` contient vos préférences : le dernier abonnement, hôte Bastion, VM et adresse IP utilisés, la méthode de connexion, le mode moniteur, l'authentification Entra ID, et votre choix de langue.

Ce dossier suit votre profil Windows en itinérance, si bien que les mêmes préférences vous suivent d'une machine à l'autre sur un domaine ou un réseau joint à Entra ID qui synchronise `%APPDATA%`.

La plupart du contenu de ce fichier est [stocké séparément par locataire](../tenants/). La langue est le seul paramètre global.

Les écritures de paramètres sont atomiques : l'application écrit d'abord un fichier temporaire, puis remplace le fichier réel en une seule étape. Si une écriture est interrompue en cours de route, par exemple parce que le processus est arrêté brutalement, vous ne perdez au maximum que la préférence de cette sauvegarde, pas tout le fichier.

## Données locales : état de connexion et journaux

`%LOCALAPPDATA%\BastionRDPConnector\` n'est pas itinérant. Il contient :

| Élément | Rôle |
| --- | --- |
| `msal_token_cache.bin` | Votre jeton de connexion mis en cache. Privé à cette application, distinct du propre cache d'Azure CLI. |
| `WebView2\` | Le profil propre du navigateur de connexion intégré : cookies, cache et stockage local pour la page de connexion. |
| `debug.log` | Le journal de la session en cours. |
| `debug.0.log` à `debug.9.log` | Les dix sessions précédentes, conservées depuis la 3.3.4. Avant cela, chaque lancement écrasait l'unique fichier journal. |

[Diagnostics](../diagnostics/) explique ce que contient le journal de débogage et comment le transmettre au support sans qu'il ne porte de secrets.

<div class="callout note">
<span class="eyebrow">Remarque</span>
<p>Les fichiers <code>.rdp</code> temporaires, générés pour les connexions RD Gateway, se trouvent sous <code>%TEMP%\BastionRDPConnector\</code> et sont supprimés à la fermeture de l'application.</p>
</div>

## Réinitialisation

La suppression de `settings.json` ramène toutes les préférences à leur valeur par défaut. Vous restez connecté ; rien ne change au niveau de votre cache de jetons.

La suppression de `msal_token_cache.bin`, ou le fait de sélectionner **Se déconnecter** dans la barre supérieure, vous déconnecte et efface le jeton mis en cache. Se déconnecter est l'option la plus sûre : elle supprime le cache de jetons et efface l'état en mémoire de MSAL en une seule étape, et le prochain lancement démarre par une connexion vierge.

Pour réinitialiser les deux, fermez d'abord l'application, puis supprimez les deux fichiers. Supprimer l'un n'affecte pas l'autre.
