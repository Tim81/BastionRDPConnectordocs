---
title: Favoris
description: Enregistrez jusqu'à dix adresses IP et VM Azure par locataire, puis reconnectez-vous depuis l'onglet Favoris avec l'hôte Bastion sélectionné à ce moment-là.
appliesTo: '3.4.0'
lastReviewed: '2026-10-19'
---

Les favoris sont un raccourci vers une connexion que vous faites déjà. La liste contient jusqu'à dix entrées pour le locataire Entra ID auquel vous êtes connecté. Un favori est une adresse IP ou une VM Azure. Les ports, la méthode de connexion et l'hôte Bastion restent là où vous les réglez.

## Ajouter et retirer

Sur l'onglet [Adresse IP](../connect-ip/) et l'onglet [Azure VM](../connect-vm/), une étoile se trouve à côté de **Connecter**. L'infobulle est **Favori**.

- Une étoile vide signifie que l'adresse ou la machine virtuelle de cet onglet n'est pas un favori. Cliquez dessus pour enregistrer la cible actuelle. Une adresse IP valide est enregistrée telle que vous l'avez saisie. Une machine virtuelle est enregistrée avec son nom, son ID de ressource, son groupe de ressources et l'abonnement auquel elle appartient, afin que vous n'ayez pas à choisir cet abonnement de nouveau.
- Une étoile pleine signifie qu'elle est déjà un favori. Cliquez dessus pour la retirer. L'application demande d'abord une confirmation. **OK** la retire. **Annuler**, ou la fermeture de la boîte de dialogue, la laisse en place.

La même confirmation apparaît lorsque vous appuyez sur **Retirer** dans une ligne de l'onglet Favoris.

Une adresse IP vide ou non valide, ou aucune machine virtuelle sélectionnée, n'est pas enregistrée. L'étoile reste vide et vous voyez le même avertissement que pour **Connecter**. Une onzième entrée est refusée tant que vous n'en retirez pas une.

## Se connecter depuis la liste

Ouvrez l'onglet **Favoris**. Chaque ligne est une cible enregistrée, avec **Connecter** et **Retirer**.

**Connecter** utilise l'hôte Bastion sélectionné en haut de la fenêtre à ce moment-là. Changez l'hôte Bastion et connectez-vous de nouveau : le nouvel hôte est celui qui est utilisé.

Un favori IP ouvre un tunnel de la même façon que l'onglet Adresse IP, y compris le port cible et le port local de cet onglet.

Un favori VM utilise la méthode de connexion sélectionnée dans l'onglet Azure VM.

- **Tunnel** utilise le port cible et le port local de cet onglet.
- **RD Gateway** utilise le port 3389, la case d'authentification Entra ID et le choix de moniteur de cet onglet.

La machine virtuelle doit encore figurer dans la liste chargée pour cette connexion. Si elle n'y figure pas, **Connecter** s'arrête et vous l'indique. Si le filtre d'abonnement, de nom ou d'étiquette actuel la masquerait, **Connecter** passe à l'abonnement de cette VM, efface ces filtres et laisse l'onglet Azure VM sur cette machine.

## État d'alimentation

Un favori VM suit les mêmes règles d'état d'alimentation que la page [Azure VM](../connect-vm/). **Connecter** n'est disponible que pendant que la VM est en cours d'exécution. Une VM arrêtée ou désallouée propose **Démarrer la VM** lorsque votre compte peut la démarrer. Pendant le démarrage, **Démarrer la VM** est masqué et **Connecter** reste désactivé. Un favori IP n'a pas d'état d'alimentation.
