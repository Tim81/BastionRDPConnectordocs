---
title: Authentification Entra ID
description: Authentification unique (SSO) pour les sessions RD Gateway, quand l'activer et ce qui se passe lorsque Bastion la refuse.
appliesTo: '3.3.5'
lastReviewed: '2026-07-25'
---

L'onglet Azure VM comporte une case à cocher d'authentification Entra ID à côté de Méthode de connexion. Elle ne s'applique qu'à RD Gateway, et elle est **désactivée par défaut**.

## Ce qu'elle fait

Avec l'authentification Entra ID activée, la session RDP se connecte avec votre identité Microsoft au lieu de demander un nom d'utilisateur et un mot de passe Windows. Cela fonctionne lorsque votre compte et la machine virtuelle cible se trouvent dans le même locataire Entra ID, et que la machine est jointe à ce locataire.

Lorsqu'elle est désactivée, la session utilise l'authentification RDP habituelle et demande un nom d'utilisateur et un mot de passe. C'est le paramètre par défaut car il fonctionne partout, y compris entre locataires.

## Ce qui se passe lorsque vous l'activez

L'application demande à Bastion un fichier `.rdp` avec l'authentification Entra ID activée. Si Bastion n'en renvoie pas, elle redemande avec le paramètre désactivé et utilise ce résultat à la place.

Activer la case à cocher est donc une préférence plutôt qu'une exigence. Si la combinaison n'est pas prise en charge, la connexion s'ouvre quand même, avec un nom d'utilisateur et un mot de passe.

Le journal enregistre le chemin emprunté :

```
Attempting RDP download WITH Entra ID Authentication...
Entra ID Auth failed, falling back to traditional authentication...
```

<div class="callout warn">
<span class="eyebrow">Entre locataires</span>
<p>L'authentification Entra ID ne fonctionne pas lorsque la machine virtuelle appartient à un locataire différent de celui du compte avec lequel vous vous êtes connecté, ce qui est le cas habituel avec Azure Lighthouse. Azure AD renvoie <code>AADSTS293004</code>. Laissez la case décochée pour ces connexions. Le mécanisme de secours s'en chargera si vous l'oubliez, au prix d'un aller-retour supplémentaire.</p>
</div>

## Pourquoi Tunnel n'a pas ce paramètre

Tunnel transporte une connexion brute vers un port local. La façon dont vous vous authentifiez à l'intérieur de la session distante ne passe jamais par l'application, il n'y a donc aucun paramètre Entra ID à afficher. Connectez-vous dans la fenêtre RDP selon ce qu'attend la machine cible.

## Où ce choix est enregistré

La case à cocher est enregistrée [par locataire](../tenants/), avec la méthode de connexion et le mode moniteur. La modifier pour un locataire n'affecte aucun autre.
