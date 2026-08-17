---
title: Verbindung zu einer IP-Adresse herstellen
description: Die Registerkarte IP-Adresse erreicht alles, wozu das virtuelle Netzwerk von Bastion eine Route hat, nicht nur Azure-VMs, über eine Tunnel-Verbindung.
appliesTo: '3.3.6'
lastReviewed: '2026-07-25'
---

Verwenden Sie diese Registerkarte, wenn der gewünschte Computer keinen VM-Eintrag hat, den Sie nach Namen auswählen können, oder überhaupt keine Azure-VM ist. Sie erreicht lokale Computer über eine VPN- oder ExpressRoute-Verbindung, Windows-Systeme in anderen Clouds und jede Azure-VM, die Sie lieber direkt adressieren als nachschlagen möchten.

## Die Registerkarte IP-Adresse

<!-- Mirrors src/components/ScreenIpAddress.astro -->
<figure class="appshot">
  <div class="frame">
    <svg viewBox="0 0 300 372" role="img" aria-labelledby="s-ip-win">
      <title id="s-ip-win">Die Registerkarte IP-Adresse unter Windows. Oben werden eine Subscription und ein Bastion-Host ausgewählt. Die Registerkarte enthält ein Adressfeld, den Zielport, den lokalen Port und die Schaltfläche Verbinden.</title>
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
      <text class="ui-tb" x="14" y="115">IP-Adresse</text>
      <line class="ui-tabup" x1="10" y1="120" x2="70" y2="120"/>
      <text class="ui-tb off" x="76" y="115">Azure VM</text>
      <text class="ui-tb off" x="142" y="115">Aktive Tunnel</text>
      <rect class="ui-panel" x="10" y="132" width="280" height="112" rx="4"/>
      <text class="ui-l" x="20" y="150">IP-Adresse</text>
      <rect class="ui-field" x="20" y="154" width="260" height="16" rx="3"/>
      <text class="ui-v" x="25" y="165">10.20.4.15</text>
      <text class="ui-l" x="20" y="185">Zielport</text>
      <rect class="ui-field" x="20" y="189" width="120" height="15" rx="3"/>
      <text class="ui-v" x="25" y="200">3389</text>
      <text class="ui-l" x="160" y="185">Lokaler Port</text>
      <rect class="ui-field" x="160" y="189" width="120" height="15" rx="3"/>
      <text class="ui-v" x="165" y="200">55000</text>
      <text class="ui-p" x="20" y="220">Erreicht jede Adresse, zu der das virtuelle</text>
      <text class="ui-p" x="20" y="231">Netzwerk von Bastion eine Route hat.</text>
      <text class="ui-p" x="10" y="268">Öffnet in mstsc</text>
      <rect class="ui-btn" x="10" y="282" width="280" height="26" rx="4"/>
      <text class="ui-bt" x="150" y="299" text-anchor="middle">Verbinden</text>
      <text class="ui-p" x="10" y="352">EN · NL · DE · FR · ES · PT</text>
    </svg>
  </div>
  <figcaption><b>Windows</b> Die Registerkarte IP-Adresse unter Windows. Tunnel ist hier die einzige verfügbare Methode, da RD Gateway eine eingegebene Adresse nicht auflösen kann. Unter macOS ist das Layout identisch; Verbinden öffnet die Windows App statt mstsc.</figcaption>
</figure>

Diese Registerkarte verwendet immer Tunnel. RD Gateway benötigt, dass Bastion das Ziel selbst auflöst, und eine eingegebene Adresse gibt ihm nichts zum Auflösen.

## Felder

| Feld | Beschreibung | Standard |
| --- | --- | --- |
| IP-Adresse | Die private Adresse des Zielcomputers. Sie muss vom virtuellen Netzwerk des Bastion-Hosts aus erreichbar sein. | — |
| Zielport | Der RDP-Port, auf dem der Remote-Computer lauscht. | 3389 |
| Lokaler Port | Der Port auf Ihrem Computer, an dem der Tunnel lauscht. Ihr Remotedesktop-Client verbindet sich mit `localhost:[Lokaler Port]`. | 55000 |

Zielport und lokaler Port werden mit der Registerkarte Azure VM geteilt. Ändern Sie einen dort, ändert er sich auch hier.

## Verbinden

1. Geben Sie die Zieladresse ein.
2. Lassen Sie den Zielport auf 3389, es sei denn, der Computer lauscht auf etwas anderem, und ändern Sie den lokalen Port nur, wenn 55000 auf Ihrem Computer bereits belegt ist.
3. Wählen Sie **Verbinden**. Die Anwendung öffnet einen WebSocket-Tunnel zu Bastion und startet Ihren Remotedesktop-Client, der auf `localhost:[Lokaler Port]` zeigt.

<div class="callout warn">
<span class="eyebrow">Erreichbarkeit, nicht Benennung</span>
<p>Die Anwendung kann über Formatprüfungen hinaus nicht bestätigen, dass eine Zieladresse korrekt ist. Kann das virtuelle Netzwerk von Bastion diese Adresse nicht erreichen, öffnet sich der Tunnel zwar, aber der Remotedesktop-Client kann die Verbindung nicht abschließen. Fragen Sie, wer Ihr Netzwerk verwaltet, wenn Sie nicht sicher sind, ob eine Route existiert.</p>
</div>
