---
title: Dépannage
description: Les problèmes courants, dans les mots que vous utiliseriez pour les décrire, et ce qu'il faut vérifier pour chacun.
appliesTo: '3.3.4'
lastReviewed: '2026-07-25'
---

## Avant de vous connecter

### J'ai relancé l'application et il ne s'est rien passé

L'application n'autorise qu'une seule instance en cours d'exécution. Si elle est déjà ouverte, réduite, ou se trouve dans la zone de notification, la relancer une seconde fois ramène la fenêtre existante au premier plan au lieu d'en ouvrir une nouvelle. Sous Windows, vérifiez la zone de notification pour trouver l'icône de l'application.

<!-- Mirrors src/components/ScreenTray.astro -->
<figure class="appshot">
  <div class="frame">
    <svg viewBox="0 0 300 372" role="img" aria-labelledby="s-tray-win">
      <title id="s-tray-win">Le menu contextuel de la zone de notification Windows, développé. Deux tunnels ouverts sont listés, chacun avec les commandes Connecter et Arrêter. En dessous, À propos et Quitter.</title>
      <rect class="ui-win" x="1" y="1" width="298" height="370" rx="6"/>
      <path class="ui-bar" d="M2 2 H298 V22 H2 Z"/>
      <text class="ui-title" x="10" y="15">Azure Bastion RDP Connector</text>
      <path d="M266 9 h7 M280 9 l7 7 M287 9 l-7 7" stroke="#7B8794" stroke-width="1.1" fill="none"/>
      <text class="ui-l" x="10" y="40">Zone de notification, menu du clic droit</text>
      <rect class="ui-panel" x="10" y="48" width="280" height="50" rx="4"/>
      <circle class="ui-run" cx="22" cy="63" r="3.5"/>
      <text class="ui-tb" x="32" y="67">vm-dev-web-01</text>
      <text class="ui-p" x="32" y="80">localhost:55000 · ouvert depuis 4 min 12 s</text>
      <rect class="ui-btn-2" x="194" y="59" width="46" height="15" rx="3"/>
      <text class="ui-tb" x="200" y="70">Connecter</text>
      <rect class="ui-btn-2" x="244" y="59" width="34" height="15" rx="3"/>
      <text class="ui-tb" x="252" y="70">Arrêter</text>
      <rect class="ui-panel" x="10" y="106" width="280" height="50" rx="4"/>
      <circle class="ui-run" cx="22" cy="121" r="3.5"/>
      <text class="ui-tb" x="32" y="125">10.20.4.15</text>
      <text class="ui-p" x="32" y="138">localhost:55001 · ouvert depuis 41 s</text>
      <rect class="ui-btn-2" x="194" y="117" width="46" height="15" rx="3"/>
      <text class="ui-tb" x="200" y="128">Connecter</text>
      <rect class="ui-btn-2" x="244" y="117" width="34" height="15" rx="3"/>
      <text class="ui-tb" x="252" y="128">Arrêter</text>
      <line x1="10" y1="170" x2="290" y2="170" stroke="#DCE2EA" stroke-width="1"/>
      <text class="ui-tb" x="20" y="190">À propos</text>
      <text class="ui-tb" x="20" y="212">Quitter</text>
      <text class="ui-p" x="10" y="352">Double-cliquez sur l'icône de la zone de notification pour restaurer la fenêtre principale.</text>
    </svg>
  </div>
  <figcaption><b>Windows</b> Le menu contextuel de la zone de notification sous Windows, développé. Chaque tunnel ouvert dispose de ses propres commandes Connecter et Arrêter, suivies de À propos et Quitter.</figcaption>
</figure>

Fermer la fenêtre principale, ou la réduire, ne quitte pas l'application. Les deux masquent la fenêtre et la laissent s'exécuter dans la zone de notification, si bien que les tunnels ouverts restent connectés. Faites un clic droit sur l'icône de la zone de notification et sélectionnez **Quitter** pour la fermer complètement. L'icône de la zone de notification est réservée à Windows ; macOS n'en a pas, par conception.

### Aucun abonnement n'apparaît, ou la liste Bastion est vide

Cela signifie généralement soit que votre compte n'a aucune attribution de rôle sur un abonnement, soit que le locataire dans lequel vous êtes ne contient pas de ressource Bastion. Essayez :

- Sélectionnez **Actualiser** à côté du champ Bastion.
- Sélectionnez **Modifier** pour choisir un autre abonnement.
- Déconnectez-vous puis reconnectez-vous, au cas où votre session aurait expiré.
- Demandez à la personne qui gère vos rôles Azure de confirmer que vous disposez du rôle Lecteur sur l'hôte Bastion et son réseau virtuel.

## Connexion

### mstsc s'ouvre, mais la connexion échoue pour une VM Azure via RD Gateway

Vérifiez que :

- L'état d'alimentation de la VM affiche **En cours d'exécution**, et laissez ensuite au système d'exploitation invité une minute ou deux pour terminer son démarrage.
- L'hôte Bastion est de SKU Standard ou Premium. Basic ne prend pas en charge le client natif.
- Aucune règle de groupe de sécurité réseau ne bloque le trafic entrant de Bastion vers la VM sur le port 3389.
- Une route existe entre Bastion et la VM, qu'il s'agisse du même réseau virtuel, d'un peering, ou de Virtual WAN.

### mstsc s'ouvre, mais la connexion échoue pour une VM Azure via Tunnel

Tout ce qui précède s'applique toujours, ainsi que :

- Vérifiez l'onglet [Tunnels actifs](../active-tunnels/). Si le tunnel n'y figure pas, ou apparaît comme arrêté, essayez de vous reconnecter pour en démarrer un nouveau.
- Si le port local que vous aviez configuré était déjà utilisé, l'application en a choisi automatiquement le prochain disponible. Comparez le port affiché dans l'onglet Tunnels actifs avec celui utilisé par votre client.

### La connexion échoue quand je saisis une adresse IP

- Vérifiez que l'adresse est accessible depuis le réseau virtuel de Bastion, pas seulement depuis votre propre machine. Pour des cibles sur site, cela suppose un VPN site à site ou un circuit ExpressRoute opérationnel ; pour un autre cloud, une connexion VPN vers Azure.
- Vérifiez le port cible. 3389 est le port standard pour RDP, mais un hôte non-Azure ou sur site peut écouter sur un autre port.
- Vérifiez qu'un pare-feu hôte sur la cible ne bloque pas le RDP entrant depuis le sous-réseau Bastion.

### Le bouton Démarrer la VM n'apparaît pas pour une VM arrêtée

Démarrer une VM nécessite le rôle **Virtual Machine Contributor**, ou un rôle équivalent ; le rôle Lecteur seul ne suffit pas. Demandez à la personne qui gère vos rôles Azure de vous l'accorder, ou démarrez la VM depuis le portail Azure à la place.

### J'ai reçu une erreur AADSTS293004

Azure AD renvoie cette erreur lorsque l'[authentification Entra ID](../entra-id/) est utilisée pour une machine virtuelle se trouvant dans un locataire différent de celui de votre compte connecté, ce qui est le cas habituel avec Azure Lighthouse.

Décochez la case **Utiliser l'authentification EntraID** dans l'onglet Azure VM et reconnectez-vous. Le paramètre est désactivé par défaut ; si vous rencontrez cette erreur, c'est qu'il a été activé à un moment donné et enregistré pour ce locataire.

Il est possible de la voir dans le journal sans que la connexion échoue. Lorsque Bastion refuse une demande avec authentification Entra ID, l'application redemande avec le paramètre désactivé et utilise ce fichier, si bien que la session s'ouvre quand même après un aller-retour supplémentaire.

Si l'erreur apparaît lors de l'ouverture directe d'un fichier `.rdp` enregistré, reconnectez-vous plutôt depuis l'onglet Azure VM. Un fichier conservé d'une session antérieure porte le paramètre qui était utilisé au moment où il a été écrit.

## Connexion et réinitialisation

### On me redemande sans cesse de me connecter

La politique d'accès conditionnel de votre organisation peut exiger une réauthentification selon un calendrier, ou la MFA à chaque connexion. C'est un comportement attendu. Complétez l'invite lorsqu'elle apparaît ; l'application ne contrôle pas la fréquence à laquelle votre locataire la demande.

### Je veux repartir de zéro

Sélectionnez **Se déconnecter** dans la barre supérieure pour effacer votre état de connexion ; cela supprime le cache de jetons et l'état de MSAL en une seule étape. Pour réinitialiser aussi les préférences, fermez l'application et supprimez `%APPDATA%\BastionRDPConnector\settings.json`. [Fichiers et paramètres](../files-and-settings/) explique ce que contient chaque fichier et où ils se trouvent.

### Je dois envoyer un journal au support

Ouvrez **À propos** et sélectionnez **Copier les informations de diagnostic**, ou **Ouvrir le dossier de journal** pour retrouver les fichiers directement. [Diagnostics](../diagnostics/) explique ce que contient le bundle et comment il est épuré.
