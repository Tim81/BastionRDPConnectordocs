---
title: Installation
description: Azure Bastion RDP Connector est distribué via le Microsoft Store. Il n'y a pas de téléchargement direct ni d'installateur séparé.
appliesTo: '3.3.5'
lastReviewed: '2026-07-25'
---

Azure Bastion RDP Connector est distribué en tant qu'application du Microsoft Store, produit `9N9MJ1V43Z6T`. Windows gère le téléchargement, l'installation et toutes les mises à jour ultérieures. Il n'y a aucun fichier ZIP à extraire, ni aucune invite SmartScreen à valider.

## Installer sur Windows

1. Ouvrez la fiche du Store, soit avec le lien direct `ms-windows-store://pdp/?productid=9N9MJ1V43Z6T`, qui ouvre directement l'application Store, soit depuis un navigateur à [apps.microsoft.com/detail/9N9MJ1V43Z6T](https://apps.microsoft.com/detail/9N9MJ1V43Z6T).
2. Sélectionnez **Obtenir** ou **Installer**. Une installation par utilisateur ne nécessite aucun droit d'administrateur.
3. Lancez-la depuis le menu Démarrer. Recherchez « Bastion RDP Connector ».

<div class="callout note">
<span class="eyebrow">Remarque</span>
<p>Comme le Store gère l'installation, les mises à jour se font en arrière-plan. Vous n'avez pas besoin de vérifier vous-même l'existence d'une nouvelle version.</p>
</div>

## macOS

Une version macOS existe depuis la version 3.1.2, pour les Mac Apple Silicon comme Intel, mais elle n'est pas encore disponible publiquement. Il n'y a pas de téléchargement macOS à proposer ici. Lorsqu'elle sera disponible, cette page présentera la même fiche de type Store que celle déjà proposée pour Windows.

## Ce que fait le premier lancement

Rien n'est configuré pendant l'installation elle-même. L'application lit `%APPDATA%\BastionRDPConnector\settings.json` au démarrage, et si ce fichier n'existe pas encore, elle démarre avec les valeurs par défaut et le crée à la première sauvegarde. [Connexion](../sign-in/) décrit ce qui se passe la première fois que vous ouvrez l'application et qu'elle doit s'authentifier.
