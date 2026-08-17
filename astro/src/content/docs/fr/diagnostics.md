---
title: Diagnostics
description: Ce que montre la boîte de dialogue À propos, ce que collecte Copier les informations de diagnostic, et ce qui en est exclu.
appliesTo: '3.3.6'
lastReviewed: '2026-07-25'
---

Un bouton **i** dans la barre supérieure ouvre la boîte de dialogue À propos. Elle affiche la version de l'application, une ligne sur votre plateforme, et deux actions permettant d'extraire des informations de l'application lorsqu'un dépannage est nécessaire.

## La boîte de dialogue À propos

<!-- Mirrors src/components/ScreenAbout.astro -->
<figure class="appshot">
  <div class="frame">
    <svg viewBox="0 0 300 372" role="img" aria-labelledby="s-about-win">
      <title id="s-about-win">La boîte de dialogue À propos sous Windows. Elle affiche le nom de l'application, la version et la plateforme, puis deux boutons : Ouvrir le dossier de log et Copier les informations de diagnostic.</title>
      <rect class="ui-win" x="1" y="1" width="298" height="370" rx="6"/>
      <path class="ui-bar" d="M2 2 H298 V22 H2 Z"/>
      <text class="ui-title" x="10" y="15">À propos</text>
      <path d="M280 9 l7 7 M287 9 l-7 7" stroke="#7B8794" stroke-width="1.1" fill="none"/>
      <text class="ui-tb" x="10" y="46">Azure Bastion RDP Connector</text>
      <text class="ui-p" x="10" y="60">Version 3.3.6</text>
      <text class="ui-p" x="10" y="72">Windows 11 · x64</text>
      <line x1="10" y1="86" x2="290" y2="86" stroke="#DCE2EA" stroke-width="1"/>
      <text class="ui-l" x="10" y="104">Diagnostics</text>
      <rect class="ui-btn-2" x="10" y="110" width="280" height="24" rx="4"/>
      <text class="ui-tb" x="150" y="126" text-anchor="middle">Ouvrir le dossier de log</text>
      <text class="ui-p" x="10" y="148">Ouvre le dossier contenant debug.log</text>
      <text class="ui-p" x="10" y="159">et ses dix sessions archivées.</text>
      <rect class="ui-btn-2" x="10" y="170" width="280" height="24" rx="4"/>
      <text class="ui-tb" x="150" y="186" text-anchor="middle">Copier les informations de diagnostic</text>
      <text class="ui-p" x="10" y="208">Copie les informations système, le journal actuel,</text>
      <text class="ui-p" x="10" y="219">et les sessions archivées, dans le presse-papiers.</text>
      <text class="ui-p" x="10" y="230">Déjà épuré, plafonné à ~1 Mo.</text>
      <rect class="ui-btn" x="190" y="320" width="100" height="26" rx="4"/>
      <text class="ui-bt" x="240" y="337" text-anchor="middle">Fermer</text>
    </svg>
  </div>
  <figcaption><b>Windows</b> La boîte de dialogue À propos sous Windows. Elle affiche la version de l'application et la plateforme, et propose Ouvrir le dossier de log et Copier les informations de diagnostic.</figcaption>
</figure>

| Action | Ce qu'elle fait |
| --- | --- |
| Ouvrir le dossier de log | Ouvre le dossier contenant `debug.log` et ses dix sessions archivées, dans l'Explorateur sous Windows ou le Finder sous macOS. |
| Copier les informations de diagnostic | Copie un bundle de diagnostic dans le presse-papiers. |

## Ce que contient le bundle de diagnostic

Copier les informations de diagnostic construit un bundle texte à partir de :

- Informations système : système d'exploitation, version de l'application, plateforme.
- Le `debug.log` de la session en cours.
- Les sessions archivées, de `debug.0.log` à `debug.9.log`, de la plus récente à la plus ancienne.

Chaque entrée de journal dans le bundle est plafonnée à 100 Ko, et l'ensemble du bundle cesse de grossir aux alentours de 1 Mo. Cette limite permet à un bundle issu d'un long historique de sessions de rester pratique à coller dans un ticket de support ou un message de discussion.

## Ce qui est épuré, et ce qui ne l'est pas

Tout, dans le bundle, est épuré avant d'atteindre le presse-papiers, de la même manière que c'est épuré avant d'être écrit dans `debug.log` en premier lieu. Les jetons Bearer, les JWT, les mots de passe et les clés API sont remplacés avant que quoi que ce soit ne touche le disque.

Les ID d'abonnement, les ID de ressource, les GUID et les adresses IP sont conservés. Ce ne sont pas des secrets, et les retirer rendrait le journal bien moins utile pour déterminer sur quelle VM, quel abonnement ou quel hôte Bastion un problème s'est produit.

<div class="callout note">
<span class="eyebrow">Remarque</span>
<p>L'épuration a lieu au moment de l'écriture, pas au moment de la copie. Une entrée de journal n'est jamais écrite sur le disque avec un jeton actif à l'intérieur, si bien qu'il n'y a rien de sensible qui attend dans <code>debug.log</code> d'être épuré plus tard.</p>
</div>

## Envoyer un journal au support

Collez directement le résultat de Copier les informations de diagnostic dans un ticket de support ou un message de discussion. Si le bundle est tronqué et que vous avez besoin du journal complet d'une session, utilisez Ouvrir le dossier de log pour retrouver le fichier exact et le joindre à la place.
