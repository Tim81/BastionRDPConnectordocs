---
title: Verbindung zu einer Azure-VM herstellen
description: Wählen Sie eine virtuelle Maschine nach Namen aus, über eine Subscription oder alle hinweg, prüfen Sie ihren Energiestatus, starten Sie sie bei Bedarf, und verbinden Sie sich.
appliesTo: '3.3.4'
lastReviewed: '2026-07-25'
---

Die Registerkarte Azure VM listet virtuelle Maschinen nach Namen auf, statt nach einer Adresse zu fragen. Sie ist in zwei Spalten unterteilt: Verbindungseinstellungen links, VM-Auswahl rechts. Welche Verbindungsmethode standardmäßig ausgewählt ist, hängt von der Plattform ab, daher werden beide unten gezeigt.

## Die Registerkarte Azure VM

<!-- Mirrors src/components/ScreenAzureVm.astro -->
<figure class="appshot">
  <div class="frame">
    <svg viewBox="0 0 300 372" role="img" aria-labelledby="s-vm-win">
      <title id="s-vm-win">Die Registerkarte Azure VM unter Windows. Oben werden eine Subscription und ein Bastion-Host ausgewählt. Die Registerkarte enthält die Verbindungsmethode, das Monitor-Layout, die Entra ID-Option, eine durchsuchbare Liste virtueller Maschinen, den Energiestatus der ausgewählten Maschine und die Schaltfläche Verbinden.</title>
      <rect class="ui-win" x="1" y="1" width="298" height="370" rx="6"/>
      <path class="ui-bar" d="M2 2 H298 V22 H2 Z"/>
      <text class="ui-title" x="10" y="15">Azure Bastion RDP Connector</text>
      <path d="M266 9 h7 M280 9 l7 7 M287 9 l-7 7" stroke="#7B8794" stroke-width="1.1" fill="none"/>
      <text class="ui-l" x="10" y="40">Subscription</text>
      <rect class="ui-field" x="10" y="44" width="182" height="15" rx="3"/>
      <text class="ui-v" x="15" y="55">Produktion - Westeuropa</text>
      <rect class="ui-btn-2" x="197" y="44" width="42" height="15" rx="3"/>
      <text class="ui-tb" x="204" y="55">Ändern</text>
      <rect class="ui-btn-2" x="244" y="44" width="18" height="15" rx="3"/>
      <text class="ui-tb" x="250" y="55">i</text>
      <rect class="ui-btn-2" x="266" y="44" width="24" height="15" rx="3"/>
      <text class="ui-tb" x="270" y="55">ab</text>
      <text class="ui-l" x="10" y="76">Bastion-Host</text>
      <rect class="ui-field" x="10" y="80" width="252" height="15" rx="3"/>
      <text class="ui-v" x="15" y="91">bastion-hub-weu</text>
      <rect class="ui-btn-2" x="266" y="80" width="24" height="15" rx="3"/>
      <text class="ui-tb" x="273" y="91">↻</text>
      <line x1="10" y1="120" x2="290" y2="120" stroke="#DCE2EA" stroke-width="1"/>
      <text class="ui-tb off" x="14" y="115">IP-Adresse</text>
      <text class="ui-tb" x="76" y="115">Azure VM</text>
      <line class="ui-tabup" x1="72" y1="120" x2="132" y2="120"/>
      <text class="ui-tb off" x="142" y="115">Aktive Tunnel</text>
      <rect class="ui-panel" x="10" y="130" width="134" height="96" rx="4"/>
      <text class="ui-l" x="17" y="144">Verbindungsmethode</text>
      <circle class="ui-ro" cx="22" cy="155" r="4"/>
      <text class="ui-tb" x="31" y="158">Tunnel</text>
      <circle class="ui-ro on" cx="22" cy="169" r="4"/>
      <circle class="ui-rd" cx="22" cy="169" r="2"/>
      <text class="ui-tb" x="31" y="172">RD Gateway</text>
      <text class="ui-l" x="17" y="190">Monitore</text>
      <circle class="ui-ro on" cx="22" cy="200" r="4"/><circle class="ui-rd" cx="22" cy="200" r="2"/>
      <text class="ui-tb" x="31" y="203">Einzeln</text>
      <circle class="ui-ro" cx="80" cy="200" r="4"/>
      <text class="ui-tb" x="89" y="203">Alle</text>
      <rect class="ui-ck" x="18" y="213" width="8" height="8" rx="2"/>
      <path d="M20 217 l2 2 l4 -4" stroke="#fff" stroke-width="1.2" fill="none"/>
      <text class="ui-tb" x="31" y="220">Entra ID-Auth</text>
      <circle class="ui-ro on" cx="158" cy="138" r="4"/><circle class="ui-rd" cx="158" cy="138" r="2"/>
      <text class="ui-tb" x="167" y="141">VM Subscription</text>
      <circle class="ui-ro" cx="158" cy="152" r="4"/>
      <text class="ui-tb" x="167" y="155">Alle Subscriptions</text>
      <rect class="ui-field" x="152" y="162" width="138" height="14" rx="3"/>
      <text class="ui-p" x="157" y="172">Nach Name suchen</text>
      <rect class="ui-field" x="152" y="180" width="138" height="14" rx="3"/>
      <text class="ui-p" x="157" y="190">Nach Tag filtern</text>
      <rect class="ui-field" x="152" y="198" width="138" height="15" rx="3"/>
      <text class="ui-v" x="157" y="209">vm-app-prod-01</text>
      <rect class="ui-panel" x="152" y="218" width="138" height="30" rx="4"/>
      <circle class="ui-run" cx="161" cy="233" r="3.5"/>
      <text class="ui-tb" x="170" y="236">Aktiv</text>
      <rect class="ui-btn-2" x="248" y="226" width="36" height="14" rx="3"/>
      <text class="ui-tb" x="254" y="236">Start</text>
      <text class="ui-l" x="10" y="268">Zielport</text>
      <rect class="ui-field" x="10" y="272" width="60" height="15" rx="3"/>
      <text class="ui-v" x="15" y="283">3389</text>
      <text class="ui-l" x="80" y="268">Lokaler Port</text>
      <rect class="ui-field" x="80" y="272" width="60" height="15" rx="3"/>
      <text class="ui-v" x="85" y="283">55001</text>
      <text class="ui-p" x="10" y="306">Öffnet in mstsc</text>
      <rect class="ui-btn" x="10" y="320" width="280" height="26" rx="4"/>
      <text class="ui-bt" x="150" y="337" text-anchor="middle">Verbinden</text>
      <text class="ui-p" x="10" y="362">EN · NL · DE · FR · ES · PT</text>
    </svg>
  </div>
  <figcaption><b>Windows</b> Die Registerkarte Azure VM unter Windows. RD Gateway ist der Standard.</figcaption>
</figure>

<figure class="appshot">
  <div class="frame">
    <svg viewBox="0 0 300 372" role="img" aria-labelledby="s-vm-mac">
      <title id="s-vm-mac">Die Registerkarte Azure VM unter macOS. Oben werden eine Subscription und ein Bastion-Host ausgewählt. Die Registerkarte enthält die Verbindungsmethode, das Monitor-Layout, die Entra ID-Option, eine durchsuchbare Liste virtueller Maschinen, den Energiestatus der ausgewählten Maschine und die Schaltfläche Verbinden.</title>
      <rect class="ui-win" x="1" y="1" width="298" height="370" rx="8"/>
      <path class="ui-bar" d="M2 2 H298 V24 H2 Z"/>
      <circle cx="14" cy="13" r="4" fill="#FF5F57"/>
      <circle cx="27" cy="13" r="4" fill="#FEBC2E"/>
      <circle cx="40" cy="13" r="4" fill="#28C840"/>
      <text class="ui-title" x="150" y="16" text-anchor="middle">Azure Bastion RDP Connector</text>
      <text class="ui-l" x="10" y="40">Subscription</text>
      <rect class="ui-field" x="10" y="44" width="182" height="15" rx="3"/>
      <text class="ui-v" x="15" y="55">Produktion - Westeuropa</text>
      <rect class="ui-btn-2" x="197" y="44" width="42" height="15" rx="3"/>
      <text class="ui-tb" x="204" y="55">Ändern</text>
      <rect class="ui-btn-2" x="244" y="44" width="18" height="15" rx="3"/>
      <text class="ui-tb" x="250" y="55">i</text>
      <rect class="ui-btn-2" x="266" y="44" width="24" height="15" rx="3"/>
      <text class="ui-tb" x="270" y="55">ab</text>
      <text class="ui-l" x="10" y="76">Bastion-Host</text>
      <rect class="ui-field" x="10" y="80" width="252" height="15" rx="3"/>
      <text class="ui-v" x="15" y="91">bastion-hub-weu</text>
      <rect class="ui-btn-2" x="266" y="80" width="24" height="15" rx="3"/>
      <text class="ui-tb" x="273" y="91">↻</text>
      <line x1="10" y1="120" x2="290" y2="120" stroke="#DCE2EA" stroke-width="1"/>
      <text class="ui-tb off" x="14" y="115">IP-Adresse</text>
      <text class="ui-tb" x="76" y="115">Azure VM</text>
      <line class="ui-tabup" x1="72" y1="120" x2="132" y2="120"/>
      <text class="ui-tb off" x="142" y="115">Aktive Tunnel</text>
      <rect class="ui-panel" x="10" y="130" width="134" height="96" rx="4"/>
      <text class="ui-l" x="17" y="144">Verbindungsmethode</text>
      <circle class="ui-ro on" cx="22" cy="155" r="4"/>
      <circle class="ui-rd" cx="22" cy="155" r="2"/>
      <text class="ui-tb" x="31" y="158">Tunnel</text>
      <circle class="ui-ro" cx="22" cy="169" r="4"/>
      <text class="ui-tb" x="31" y="172">RD Gateway</text>
      <text class="ui-l" x="17" y="190">Monitore</text>
      <circle class="ui-ro on" cx="22" cy="200" r="4"/><circle class="ui-rd" cx="22" cy="200" r="2"/>
      <text class="ui-tb" x="31" y="203">Einzeln</text>
      <circle class="ui-ro" cx="80" cy="200" r="4"/>
      <text class="ui-tb" x="89" y="203">Alle</text>
      <rect class="ui-ck" x="18" y="213" width="8" height="8" rx="2"/>
      <path d="M20 217 l2 2 l4 -4" stroke="#fff" stroke-width="1.2" fill="none"/>
      <text class="ui-tb" x="31" y="220">Entra ID-Auth</text>
      <circle class="ui-ro on" cx="158" cy="138" r="4"/><circle class="ui-rd" cx="158" cy="138" r="2"/>
      <text class="ui-tb" x="167" y="141">VM Subscription</text>
      <circle class="ui-ro" cx="158" cy="152" r="4"/>
      <text class="ui-tb" x="167" y="155">Alle Subscriptions</text>
      <rect class="ui-field" x="152" y="162" width="138" height="14" rx="3"/>
      <text class="ui-p" x="157" y="172">Nach Name suchen</text>
      <rect class="ui-field" x="152" y="180" width="138" height="14" rx="3"/>
      <text class="ui-p" x="157" y="190">Nach Tag filtern</text>
      <rect class="ui-field" x="152" y="198" width="138" height="15" rx="3"/>
      <text class="ui-v" x="157" y="209">vm-app-prod-01</text>
      <rect class="ui-panel" x="152" y="218" width="138" height="30" rx="4"/>
      <circle class="ui-run" cx="161" cy="233" r="3.5"/>
      <text class="ui-tb" x="170" y="236">Aktiv</text>
      <rect class="ui-btn-2" x="248" y="226" width="36" height="14" rx="3"/>
      <text class="ui-tb" x="254" y="236">Start</text>
      <text class="ui-l" x="10" y="268">Zielport</text>
      <rect class="ui-field" x="10" y="272" width="60" height="15" rx="3"/>
      <text class="ui-v" x="15" y="283">3389</text>
      <text class="ui-l" x="80" y="268">Lokaler Port</text>
      <rect class="ui-field" x="80" y="272" width="60" height="15" rx="3"/>
      <text class="ui-v" x="85" y="283">55001</text>
      <text class="ui-p" x="10" y="306">Öffnet in Windows App</text>
      <rect class="ui-btn" x="10" y="320" width="280" height="26" rx="4"/>
      <text class="ui-bt" x="150" y="337" text-anchor="middle">Verbinden</text>
      <text class="ui-p" x="10" y="362">EN · NL · DE · FR · ES · PT</text>
    </svg>
  </div>
  <figcaption><b>macOS</b> Die Registerkarte Azure VM unter macOS. Tunnel ist der Standard. RD Gateway kann weiterhin ausgewählt werden, und die Anwendung warnt vor der Verwendung.</figcaption>
</figure>

Der Standard gilt nur, bis Sie selbst eine Methode wählen; danach wird Ihre Wahl pro Mandant gespeichert und beim nächsten Öffnen der App wiederhergestellt.

## Eine VM auswählen

Ein Paar Optionsfelder über der VM-Liste steuert, wie die Suche funktioniert.

| Modus | Verhalten |
| --- | --- |
| VM Subscription (Standard) | Listet sofort jede VM in der ausgewählten Subscription auf. Tippen Sie in das Filterfeld, um nach Namen einzuschränken. Das Subscription-Dropdown zeigt nur Subscriptions, die tatsächlich VMs enthalten. |
| Alle Subscriptions | Durchsucht mithilfe von Azure Resource Graph jede Subscription, die Ihr Konto sehen kann. Benötigt mindestens drei Zeichen, bevor Ergebnisse zurückgegeben werden. Das Laden von VMs über rund 200 Subscriptions dauert 2 bis 4 Sekunden, gegenüber 30 bis 60 Sekunden, wenn jede Subscription einzeln abgefragt wird. |

<div class="callout note">
<span class="eyebrow">Hinweis</span>
<p>Die Filterung nach Tag funktioniert in beiden Modi zusätzlich zum Namensfilter, sodass Sie eine große Liste vor der Auswahl einer VM weiter einschränken können.</p>
</div>

## Felder

| Feld | Beschreibung |
| --- | --- |
| Verbindungsmethode | Tunnel oder RD Gateway. Standard ist RD Gateway unter Windows und Tunnel unter macOS. |
| Monitore | Einzelner Monitor oder alle Monitore. Gilt nur für RD Gateway. |
| Entra ID-Auth | Optional, wird nur bei RD Gateway angezeigt. Aktiviert Single Sign-On, wenn Ihr Konto und die VM denselben Mandanten teilen. |
| Virtuelle Maschine | Die VM, mit der eine Verbindung hergestellt wird, ausgewählt aus der Liste rechts. |
| Zielport, lokaler Port | Nur im Tunnel-Modus verwendet, und mit der Registerkarte IP-Adresse geteilt. |

Vor dem Verbinden prüft die Anwendung die Bastion-SKU und ihre Feature-Flags sowie den Energiestatus der VM und nennt Ihnen, was fehlt, wenn eine Prüfung fehlschlägt. Diese Prüfungen sind fail-open: Eine Prüfung, die nicht abgeschlossen werden kann, blockiert die Verbindung nicht.

## Energiestatus und eine VM starten

Der Energiestatus der ausgewählten VM wird neben ihrem Namen angezeigt.

| Status | Bedeutung |
| --- | --- |
| Aktiv (grün) | Die VM ist eingeschaltet und bereit für Verbindungen. |
| Beendet oder freigegeben (rot) | Die VM ist ausgeschaltet. Eine Schaltfläche **Start** erscheint. |
| Wird gestartet, wird beendet oder ein anderer Zwischenzustand (orange) | Die VM befindet sich zwischen zwei Zuständen. Ein Fortschrittsindikator wird angezeigt, während die App auf den endgültigen Zustand wartet. |

Um eine gestoppte VM zu starten, wählen Sie **Start**. Die Schaltfläche wird durch einen Fortschrittsindikator ersetzt, während die Anwendung Azure alle 5 Sekunden für bis zu 5 Minuten nach dem aktualisierten Zustand abfragt. Wird der Status grün, bestätigt eine Toast-Benachrichtigung, dass die VM bereit ist, und **Verbinden** wird verfügbar.

<div class="callout warn">
<span class="eyebrow">Starten erfordert mehr als Reader</span>
<p>Das Starten einer VM erfordert Virtual Machine Contributor oder eine Rolle mit gleichwertigen Rechten. Erscheint die Schaltfläche Start nicht, hat Ihr Konto auf dieser VM höchstwahrscheinlich nur Reader.</p>
</div>

<div class="callout note">
<span class="eyebrow">Aktiv bedeutet nicht sofort bereit</span>
<p>Aktiv bedeutet, dass Azure die VM eingeschaltet hat. Das Gastbetriebssystem benötigt noch ein bis zwei Minuten zum vollständigen Hochfahren, bevor es RDP-Verbindungen annimmt. Wird eine Verbindung unmittelbar nach dem Grünwerden des Status abgelehnt, warten Sie ein paar Minuten und versuchen Sie es erneut. Verbinden prüft den Energiestatus erneut in dem Moment, in dem Sie die Schaltfläche wählen, selbst wenn Sie direkt nach der Änderung des Indikators geklickt haben.</p>
</div>
