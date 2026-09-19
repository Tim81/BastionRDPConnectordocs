---
title: Nouveautés
description: Ce qui a changé dans chaque version récente d'Azure Bastion RDP Connector.
appliesTo: '3.3.9'
lastReviewed: '2026-09-19'
---

## 3.3.9

| Changement | Détails |
| --- | --- |
| macOS : les coupures RD Gateway sont un bogue de Windows App for Mac | Windows App for Mac découpe un paquet RD Gateway en deux messages WebSocket, après quoi Azure Bastion ferme le WebSocket. Les paquets de passerelle plus grands que le tampon de réception de 20 480 octets de Bastion bloquent aussi la session. Les deux se manifestent par une déconnexion en quelques secondes, avec l'erreur `0x300006c`, `0x3000064` ou `0x10b`. Ce n'est pas un problème de TLS ni de suites de chiffrement, contrairement à ce que disaient les versions précédentes. Cela a été vérifié sur Windows App 11.4.1. FreeRDP via le même Bastion et le mode Tunnel avec Windows App restent tous deux connectés, et aucune propriété du fichier `.rdp` ne permet de contourner le problème. |
| macOS : avertissement RD Gateway remanié | RD Gateway reste sélectionnable sur macOS, au cas où Microsoft corrigerait le client. L'avertissement dit maintenant ce qui se passe réellement et que votre VM n'est pas en cause. Il propose **Utiliser le mode Tunnel à la place**, **Essayer quand même RD Gateway** ou Annuler, dans les six langues. La boîte de dialogue s'intitule « Problème connu sur macOS » au lieu de « Non pris en charge sur macOS ». L'élément de menu À propos sur macOS est désormais localisé et suit immédiatement un changement de langue. |
| Tunnels : fin des boucles de reconnexion inutiles | Lorsque le client RDP fermait sa propre connexion, le tunnel y voyait une erreur réseau et réessayait jusqu'à cinq fois, en demandant à chaque fois un nouveau jeton Bastion sans client connecté. Désormais, chaque connexion acceptée reçoit un jeton Bastion et un WebSocket pour toute sa durée de vie. Si le WebSocket se termine alors que le client est encore connecté, la connexion locale est fermée et la reconnexion automatique du client RDP en ouvre une nouvelle avec un jeton neuf. L'état « Reconnexion… (tentative n/5) » a disparu. |
| Tunnels : délais, arrêt propre, réutilisation et port cible | La connexion WebSocket expire après 30 secondes, et une demande de jeton Bastion arrivée à expiration est signalée comme une erreur plutôt que comme une annulation silencieuse. La session Bastion est toujours nettoyée à la sortie, la fermeture du WebSocket est limitée dans le temps et un tunnel en cours d'arrêt ne reçoit jamais de nouveau client. Se reconnecter au même Bastion, à la même cible et au même port réutilise le tunnel en cours et relance le client RDP. Le port cible choisi est respecté : les tunnels de VM étaient figés sur 3389. La dernière cible et le dernier port local sont mémorisés, et les libellés affichent `vm:port`. |
| Une session Azure expirée vous ramène à la connexion | Les vérifications préalables s'ignoraient elles-mêmes à la moindre erreur, y compris une exigence de réauthentification de l'accès conditionnel, et laissaient la connexion échouer plus tard. Désormais l'application demande de se connecter et réessaie l'opération une fois, au démarrage, au chargement des abonnements, des Bastions et des VM, au changement d'abonnement, à la connexion et au démarrage d'une VM. Une seule fenêtre de connexion est ouverte à la fois ; un second déclenchement attend celle qui est déjà ouverte. |
| Corrections de la connexion | La fenêtre principale est restaurée avant l'ouverture de toute fenêtre de connexion, si bien que la connexion ne se bloque plus lorsque la fenêtre est masquée dans la zone de notification. Seules les exceptions de boîte de dialogue connues et sans gravité liées à un propriétaire non visible ou fermé sont ignorées ; tout le reste est toujours consigné dans le log et affiché. L'acquisition des jetons est liée au compte connecté, ce qui corrige l'utilisation du jeton d'un mauvais compte quand plusieurs comptes sont en cache. Se connecter avec un autre compte vide le cache des abonnements. Le listage des locataires, des abonnements et des Bastions signale désormais les échecs au lieu de renvoyer une liste vide. Si les abonnements ne se chargent toujours pas après la réauthentification, l'application se ferme plutôt que de vous laisser déconnecté sans rien à choisir. |
| État d'alimentation des VM | Le démarrage d'une VM est suivi par VM, si bien que changer de VM n'affiche plus « Démarrage » sur la mauvaise. Pendant le démarrage d'une VM, le bouton Démarrer est masqué et Se connecter est désactivé. Un démarrage échoué est détecté : si la VM reste arrêtée ou désallouée pendant environ 30 secondes, vous obtenez une erreur nommant la VM au lieu d'attendre toute la durée d'interrogation. Le démarrage d'une VM et l'actualisation de l'état d'alimentation se réauthentifient en cas de session expirée. |
| Autres améliorations de fiabilité | Fermer la fenêtre annule discrètement le travail en cours, sans boîte de dialogue d'erreur pendant l'arrêt. Une actualisation obsolète des Bastions ou des abonnements est ignorée si vous avez changé d'abonnement entre-temps, et la boîte de dialogue Changer d'abonnement récupère les Bastions avant de valider, si bien qu'un échec laisse l'abonnement précédent intact. Si le client RDP ne se lance pas, vous recevez une notification, ou une fenêtre restaurée avec une boîte de dialogue d'erreur s'il n'y a pas d'icône de notification. La restauration depuis la zone de notification ramène le bouton de la barre des tâches et l'état précédent de la fenêtre. Réduire la fenêtre pendant qu'une boîte de dialogue ou une fenêtre de connexion est ouverte ne la masque plus dans la zone de notification et ne la détruit plus. La boîte de dialogue À propos n'existe qu'en une seule instance. Ouvrir le dossier de log fonctionne désormais avec des chemins contenant des espaces. |
| Sécurité : nom d'hôte Bastion et pagination | L'application envoie votre jeton ARM à l'hôte indiqué dans la réponse d'Azure. Elle n'accepte désormais qu'un nom DNS se terminant par `.bastion.azure.com`, si bien qu'une adresse IP ou un hôte étranger ne le reçoit jamais, et les redirections sont désactivées pour la demande de jeton. Les `nextLink` ARM doivent être en https sur l'hôte ARM, le nombre de pages est plafonné à 500 et une réponse Resource Graph en échec déclenche une erreur au lieu d'une liste tronquée. |
| Sécurité : fichiers temporaires | Les fichiers `.rdp` générés, qui peuvent contenir un jeton de passerelle actif, sont supprimés à la fermeture avec un écrasement au mieux. Ce n'est pas un effacement sécurisé garanti. Le dossier temporaire est refusé s'il s'agit d'un lien symbolique ou d'une jonction. Sur macOS, le dossier est créé en 0700 et les fichiers en 0600, et le fichier `.rdp` du tunnel macOS suit désormais le même traitement ; il s'agissait auparavant d'un fichier lisible par tous dans `$TMPDIR`, jamais supprimé. Les restes d'un plantage ou d'une fermeture forcée sont supprimés au démarrage, uniquement par la première instance confirmée. Sur macOS, les fichiers `.rdp` et le dossier de log s'ouvrent via le chemin absolu `/usr/bin/open`. |

## 3.3.8

| Changement | Détails |
| --- | --- |
| MSAL 4.90.0 | Mise à jour de la Microsoft Authentication Library, qui gère la connexion. |
| Runtime .NET avec correctifs de sécurité | Le SDK minimal de génération passe à 10.0.401, si bien que le runtime intégré est .NET 10.0.12, avec les correctifs de sécurité. Les correctifs de sécurité du runtime vous parviennent par les mises à jour de l'application. |
| macOS : icône d'application en squircle | L'icône de l'application est désormais un squircle, si bien que macOS Tahoe ne la place plus dans un cadre blanc. |

## 3.3.7

| Changement | Détails |
| --- | --- |
| Composants mis à jour | Azure.Core 1.62.0, packages Avalonia 12.1.2 et mises à jour du groupe d'identité (MSAL et packages associés). Mises à jour de dépendances uniquement. |

## 3.3.6

| Changement | Détails |
| --- | --- |
| Mise à jour de sécurité du runtime .NET intégré | L'application embarque sa propre copie de .NET et n'utilise pas une version installée sur votre machine. Les correctifs de sécurité du runtime vous parviennent donc par une mise à jour de l'application, et non par les mises à jour de Windows ou de macOS. Cette version est construite sur .NET 10.0.11, une version de sécurité du runtime. |
| Composants mis à jour | Avalonia.Controls.WebView 12.1.0 et Azure.Core 1.61.0. |

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
