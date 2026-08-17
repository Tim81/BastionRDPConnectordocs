---
title: Aktive Tunnel
description: Jede Tunnel-Verbindung, die die Anwendung offen hat, mit ihrem lokalen Port, der verstrichenen Zeit und Steuerelementen zum Neuverbinden Ihres RDP-Clients oder zum Stoppen.
appliesTo: '3.3.6'
lastReviewed: '2026-07-25'
---

Jede Tunnel-Verbindung, die Sie öffnen, ob über die Registerkarte IP-Adresse oder die Registerkarte Azure VM, erscheint hier, solange sie offen bleibt. RD Gateway-Verbindungen erscheinen nicht auf dieser Registerkarte, da sie keinen lokalen Port zum Nachverfolgen öffnen.

## Die Registerkarte Aktive Tunnel

<!-- Mirrors src/components/ScreenActiveTunnels.astro -->
<figure class="appshot">
  <div class="frame">
    <svg viewBox="0 0 300 372" role="img" aria-labelledby="s-tun-win">
      <title id="s-tun-win">Die Registerkarte Aktive Tunnel unter Windows. Oben werden eine Subscription und ein Bastion-Host ausgewählt. Die Registerkarte listet jeden offenen Tunnel mit Name, lokalem Port, verstrichener Zeit und einer Stopp-Schaltfläche.</title>
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
      <text class="ui-tb off" x="76" y="115">Azure VM</text>
      <text class="ui-tb" x="142" y="115">Aktive Tunnel</text>
      <line class="ui-tabup" x1="138" y1="120" x2="230" y2="120"/>
      <rect class="ui-btn-2" x="246" y="130" width="44" height="15" rx="3"/>
      <text class="ui-tb" x="256" y="141">Aktualisieren</text>
      <rect class="ui-panel" x="10" y="152" width="280" height="50" rx="4"/>
      <circle class="ui-run" cx="22" cy="167" r="3.5"/>
      <text class="ui-tb" x="32" y="171">vm-dev-web-01</text>
      <text class="ui-p" x="32" y="184">localhost:55000 · offen 4m 12s</text>
      <rect class="ui-btn-2" x="244" y="163" width="34" height="15" rx="3"/>
      <text class="ui-tb" x="252" y="174">Stoppen</text>
      <rect class="ui-panel" x="10" y="210" width="280" height="50" rx="4"/>
      <circle class="ui-run" cx="22" cy="225" r="3.5"/>
      <text class="ui-tb" x="32" y="229">10.20.4.15</text>
      <text class="ui-p" x="32" y="242">localhost:55001 · offen 41s</text>
      <rect class="ui-btn-2" x="244" y="221" width="34" height="15" rx="3"/>
      <text class="ui-tb" x="252" y="232">Stoppen</text>
      <text class="ui-p" x="10" y="284">Tunnel verbinden sich selbstständig neu, wenn der</text>
      <text class="ui-p" x="10" y="295">WebSocket abbricht, bis zu fünf Versuche.</text>
      <text class="ui-p" x="10" y="352">EN · NL · DE · FR · ES · PT</text>
    </svg>
  </div>
  <figcaption><b>Windows</b> Die Registerkarte Aktive Tunnel unter Windows. Jede Zeile ist ein offener Tunnel mit lokalem Port, verstrichener Zeit und einer Stopp-Schaltfläche. Die Liste funktioniert unter macOS genauso.</figcaption>
</figure>

Jede Zeile nennt das Ziel, den lokalen Port, auf dem es lauscht, und wie lange es bereits offen ist.

| Steuerelement | Aktion |
| --- | --- |
| Aktualisieren | Lädt die Liste der offenen Tunnel neu. |
| RDP verbinden | Startet Ihren Remotedesktop-Client erneut, verbunden mit dem lokalen Port dieses Tunnels. Nützlich, wenn Sie das RDP-Fenster geschlossen haben, ohne den Tunnel zu stoppen. |
| Stoppen | Schließt die WebSocket-Verbindung zu Bastion und beendet den Tunnel. |

<div class="callout warn">
<span class="eyebrow">Stoppen beendet die Sitzung</span>
<p>Das Stoppen eines Tunnels trennt sofort jede RDP-Sitzung, die ihn verwendet. Speichern Sie zuerst Ihre Arbeit in der Remote-Sitzung.</p>
</div>

## Wiederverbinden

Wenn die WebSocket-Verbindung zu Bastion abbricht, etwa durch eine kurze Netzwerkunterbrechung oder Bastion-Wartung, verbindet sich der Tunnel selbstständig neu. Er versucht es bis zu fünf Mal, mit wachsendem Abstand zwischen den Versuchen. Ihre RDP-Sitzung bleibt bei einer so kurzen Wiederverbindung meist verbunden, sodass Sie es womöglich gar nicht bemerken.

Schlagen alle fünf Versuche fehl, stoppt der Tunnel, und im Systembenachrichtigungsbereich erscheint eine Fehlermeldung. Öffnen Sie von dort aus erneut die Registerkarte Azure VM oder IP-Adresse und verbinden Sie sich manuell neu.
