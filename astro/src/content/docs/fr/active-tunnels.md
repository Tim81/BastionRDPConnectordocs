---
title: Tunnels actifs
description: Chaque connexion Tunnel ouverte par l'application, avec son port local, sa durée écoulée et des contrôles pour reconnecter votre client RDP ou l'arrêter.
appliesTo: '3.3.5'
lastReviewed: '2026-07-25'
---

Chaque connexion Tunnel que vous ouvrez, depuis l'onglet Adresse IP ou l'onglet Azure VM, apparaît ici tant qu'elle reste ouverte. Les connexions RD Gateway n'apparaissent pas dans cet onglet, car elles n'ouvrent pas de port local à suivre.

## L'onglet Tunnels actifs

<!-- Mirrors src/components/ScreenActiveTunnels.astro -->
<figure class="appshot">
  <div class="frame">
    <svg viewBox="0 0 300 372" role="img" aria-labelledby="s-tun-win">
      <title id="s-tun-win">L'onglet Tunnels actifs sur Windows. Un abonnement et un hôte Bastion sont choisis en haut. L'onglet répertorie chaque tunnel ouvert avec son nom, son port local, sa durée écoulée et un contrôle d'arrêt.</title>
      <rect class="ui-win" x="1" y="1" width="298" height="370" rx="6"/>
      <path class="ui-bar" d="M2 2 H298 V22 H2 Z"/>
      <text class="ui-title" x="10" y="15">Azure Bastion RDP Connector</text>
      <path d="M266 9 h7 M280 9 l7 7 M287 9 l-7 7" stroke="#7B8794" stroke-width="1.1" fill="none"/>
      <text class="ui-l" x="10" y="40">Abonnement</text>
      <rect class="ui-field" x="10" y="44" width="182" height="15" rx="3"/>
      <text class="ui-v" x="15" y="55">Production - Europe de l'Ouest</text>
      <rect class="ui-btn-2" x="197" y="44" width="42" height="15" rx="3"/>
      <text class="ui-tb" x="204" y="55">Modifier</text>
      <rect class="ui-btn-2" x="244" y="44" width="18" height="15" rx="3"/>
      <text class="ui-tb" x="250" y="55">i</text>
      <rect class="ui-btn-2" x="266" y="44" width="24" height="15" rx="3"/>
      <text class="ui-tb" x="270" y="55">out</text>
      <text class="ui-l" x="10" y="76">Bastion</text>
      <rect class="ui-field" x="10" y="80" width="252" height="15" rx="3"/>
      <text class="ui-v" x="15" y="91">bastion-hub-weu</text>
      <rect class="ui-btn-2" x="266" y="80" width="24" height="15" rx="3"/>
      <text class="ui-tb" x="273" y="91">↻</text>
      <line x1="10" y1="120" x2="290" y2="120" stroke="#DCE2EA" stroke-width="1"/>
      <text class="ui-tb off" x="14" y="115">Adresse IP</text>
      <text class="ui-tb off" x="76" y="115">Azure VM</text>
      <text class="ui-tb" x="142" y="115">Tunnels actifs</text>
      <line class="ui-tabup" x1="138" y1="120" x2="230" y2="120"/>
      <rect class="ui-btn-2" x="246" y="130" width="44" height="15" rx="3"/>
      <text class="ui-tb" x="256" y="141">Actualiser</text>
      <rect class="ui-panel" x="10" y="152" width="280" height="50" rx="4"/>
      <circle class="ui-run" cx="22" cy="167" r="3.5"/>
      <text class="ui-tb" x="32" y="171">vm-dev-web-01</text>
      <text class="ui-p" x="32" y="184">localhost:55000 · ouvert depuis 4 min 12 s</text>
      <rect class="ui-btn-2" x="244" y="163" width="34" height="15" rx="3"/>
      <text class="ui-tb" x="252" y="174">Arrêter</text>
      <rect class="ui-panel" x="10" y="210" width="280" height="50" rx="4"/>
      <circle class="ui-run" cx="22" cy="225" r="3.5"/>
      <text class="ui-tb" x="32" y="229">10.20.4.15</text>
      <text class="ui-p" x="32" y="242">localhost:55001 · ouvert depuis 41 s</text>
      <rect class="ui-btn-2" x="244" y="221" width="34" height="15" rx="3"/>
      <text class="ui-tb" x="252" y="232">Arrêter</text>
      <text class="ui-p" x="10" y="284">Les tunnels se reconnectent automatiquement si la</text>
      <text class="ui-p" x="10" y="295">connexion WebSocket est interrompue, jusqu'à cinq tentatives.</text>
      <text class="ui-p" x="10" y="352">EN · NL · DE · FR · ES · PT</text>
    </svg>
  </div>
  <figcaption><b>Windows</b> L'onglet Tunnels actifs sur Windows. Chaque ligne représente un tunnel ouvert, avec son port local, sa durée écoulée et un contrôle d'arrêt. La liste fonctionne de la même façon sur macOS.</figcaption>
</figure>

Chaque ligne indique la cible, le port local sur lequel elle écoute et depuis combien de temps elle est ouverte.

| Contrôle | Action |
| --- | --- |
| Actualiser | Recharge la liste des tunnels ouverts. |
| Connecter RDP | Relance votre client de bureau à distance sur le port local de ce tunnel. Utile si vous avez fermé la fenêtre RDP sans arrêter le tunnel. |
| Arrêter | Ferme la connexion WebSocket à Bastion et met fin au tunnel. |

<div class="callout warn">
<span class="eyebrow">Arrêter met fin à la session</span>
<p>Arrêter un tunnel coupe immédiatement toute session RDP qui l'utilise. Enregistrez votre travail dans la session distante au préalable.</p>
</div>

## Reconnexion

Si la connexion WebSocket à Bastion est interrompue, par exemple à cause d'une brève coupure réseau ou d'une maintenance Bastion, le tunnel se reconnecte automatiquement. Il retente jusqu'à cinq fois, avec un délai croissant entre les tentatives. Votre session RDP reste généralement connectée pendant une reconnexion aussi courte, donc vous ne remarquerez peut-être rien.

Si les cinq tentatives échouent, le tunnel s'arrête et la zone de notification affiche une notification d'erreur. Ouvrez alors à nouveau l'onglet Azure VM ou l'onglet Adresse IP et reconnectez-vous manuellement.
