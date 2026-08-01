---
title: Nouveautés
description: Ce qui a changé dans chaque version récente d'Azure Bastion RDP Connector.
appliesTo: '3.3.5'
lastReviewed: '2026-07-25'
---

## 3.3.5

| Changement | Détails |
| --- | --- |
| *Log* n'est plus traduit en allemand, français et espagnol | Le bouton Ouvrir le dossier de log et le message d'échec de connexion rendaient *log* par *Protokoll*, *journal* et *registro*, ce qui évoque un carnet de bord ordinaire plutôt que le terme technique. Les deux conservent désormais l'emprunt : *Log-Ordner öffnen*, *Ouvrir le dossier de log*, *Abrir carpeta de log*. L'anglais, le néerlandais et le portugais sont inchangés. |

## 3.3.4

| Modification | Détails |
| --- | --- |
| Icône de la zone de notification restaurée | L'icône de la zone de notification n'apparaissait pas sous Windows dans les versions 3.2 à 3.3.3. La réduction vers la zone de notification, les notifications de tunnel et le menu contextuel fonctionnent désormais comme le décrit cette documentation. |
| Historique de dix sessions de journaux | `debug.log` était auparavant écrasé à chaque démarrage. Les dix dernières sessions sont désormais conservées sous `debug.0.log` à `debug.9.log`, si bien que le journal de la session où un problème s'est produit survit à un redémarrage. |
| Le bundle de diagnostic couvre les sessions passées | Copier les informations de diagnostic inclut désormais les journaux de session archivés en plus du journal actuel, du plus récent au plus ancien, jusqu'à environ 1 Mo. |
| Le nettoyage se termine avant la fermeture de la fenêtre | Les tunnels actifs sont fermés et les fichiers `.rdp` temporaires sont supprimés avant la fermeture de la fenêtre. La déconnexion exécute le même nettoyage au lieu de terminer le processus immédiatement. |
| Profil du navigateur de connexion déplacé | Le navigateur de connexion intégré conservait auparavant son profil à côté du fichier de l'application, ce qui empêchait la connexion lorsque l'application s'exécutait depuis un dossier protégé en écriture tel que Program Files. Il se trouve désormais dans `%LOCALAPPDATA%\BastionRDPConnector\WebView2`. L'emplacement du cache de jetons est inchangé. |
| Composants mis à jour | Avalonia 12.1.0, MSAL 4.87.0, Azure.Core 1.60.0. |

## 3.3

| Modification | Détails |
| --- | --- |
| Chargement des VM via Azure Resource Graph | Les VM réparties sur environ 200 abonnements se chargent en 2 à 4 secondes, contre 30 à 60 secondes auparavant. Les requêtes inter-abonnements utilisent l'API Azure Resource Graph au lieu d'interroger chaque abonnement l'un après l'autre. |
| Recherche de VM inter-abonnements | Le mode Tous les abonnements de l'onglet Azure VM recherche dans tous les abonnements que votre compte peut voir. Il nécessite au moins trois caractères avant de retourner des résultats, et la liste déroulante des abonnements n'affiche désormais que ceux qui contiennent effectivement des VM. |
| Onglet Azure VM à deux colonnes | La méthode de connexion, le mode moniteur et l'authentification Entra ID se trouvent dans la colonne de gauche ; la sélection de la VM se trouve dans la colonne de droite. |
| Vérifications pré-connexion | Avant de se connecter, l'application vérifie le SKU Bastion, ses indicateurs de fonctionnalités et l'état d'alimentation de la VM. Ces vérifications sont fail-open : une vérification qui ne peut pas aboutir ne bloque pas la connexion. |
| Reconnexion automatique du tunnel | Si la connexion WebSocket est interrompue, le tunnel se reconnecte automatiquement, jusqu'à cinq fois avec un délai exponentiel entre les tentatives. La plupart des sessions RDP restent connectées pendant une reconnexion aussi courte. |
| Boîte de dialogue À propos et bundle de diagnostic | Le bouton i dans la barre supérieure, Ouvrir le dossier de log et Copier les informations de diagnostic ont tous été introduits dans cette version. |
| Méthode de connexion par défaut selon la plateforme | RD Gateway est devenu la méthode par défaut sous Windows, et Tunnel sous macOS, car Windows App sur macOS ne peut pas utiliser Bastion comme passerelle. La valeur par défaut ne s'applique que tant que vous n'avez pas choisi de méthode vous-même. |
| Support des écrans HD Ready | La fenêtre est passée à 580×760, contre environ 540×700 auparavant, et s'affiche désormais sans barre de défilement sur les écrans 1280×720. |
