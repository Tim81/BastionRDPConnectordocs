---
title: Verbindingsmethoden
description: 'Tunnel en RD Gateway vergeleken: hoe elk de sessie overbrengt, welke doelen ze bereiken, en welke standaard is op Windows en macOS.'
appliesTo: '3.3.4'
lastReviewed: '2026-07-25'
---

Beide methoden bereiken dezelfde virtuele machine via dezelfde Bastion-host. Ze verschillen in hoe de remote desktop-sessie wordt overgebracht, en dat verschil bepaalt welke doelen elke methode kan bereiken.

<figure>
<div class="frame">
<svg viewBox="0 0 620 186" role="img" aria-labelledby="fig1t">
  <title id="fig1t">Uw computer kan de virtuele machine niet rechtstreeks bereiken. Beide verbindingsmethoden lopen via de Azure Bastion-host.</title>
  <!-- direct path, blocked -->
  <path class="w-dead" d="M104 40 H516"/>
  <line class="w-x" x1="300" y1="30" x2="320" y2="50"/>
  <line class="w-x" x1="320" y1="30" x2="300" y2="50"/>
  <text class="n-s" x="310" y="21" text-anchor="middle">geen publiek IP · 3389 gesloten</text>
  <!-- routed path -->
  <path class="w-live" d="M104 120 H256"/>
  <path class="w-live" d="M364 120 H516"/>
  <text class="n-s" x="180" y="112" text-anchor="middle">443 uitgaand</text>
  <text class="n-s" x="440" y="112" text-anchor="middle">3389 binnen het vnet</text>
  <!-- nodes -->
  <rect class="n-box" x="8" y="18" width="96" height="124" rx="5"/>
  <text class="n-t" x="56" y="74" text-anchor="middle">Uw pc</text>
  <text class="n-s" x="56" y="92" text-anchor="middle">mstsc</text>
  <rect class="n-box n-hop" x="256" y="96" width="108" height="48" rx="5"/>
  <text class="n-t on" x="310" y="118" text-anchor="middle">Bastion</text>
  <text class="n-s" x="310" y="133" text-anchor="middle" fill="#98A2B3">Standard SKU</text>
  <rect class="n-box" x="516" y="18" width="96" height="124" rx="5"/>
  <text class="n-t" x="564" y="74" text-anchor="middle">Azure VM</text>
  <text class="n-s" x="564" y="92" text-anchor="middle">privé-IP</text>
  <text class="n-s" x="310" y="172" text-anchor="middle">Tunnel en RD Gateway volgen beide de onderste route</text>
</svg>
</div>
<figcaption><b>Figuur 1</b> Het directe pad bestaat niet. Elke sessie loopt via de Bastion-host over poort 443.</figcaption>
</figure>

## Tunnel

De applicatie opent een WebSocket naar de Bastion-host en luistert op een lokale poort op uw computer. Uw remote desktop-client maakt verbinding met `localhost` op die poort, en verkeer wordt doorgestuurd via de WebSocket.

Omdat het doel altijd slechts een adres aan de andere kant van de tunnel is, bereikt deze methode elk IP-adres dat het virtuele netwerk van Bastion kan routeren. Dat omvat machines die geen Azure-VM's zijn.

Als de WebSocket wegvalt, verbindt de tunnel zelf opnieuw, tot vijf keer met een groeiende tussenpoos tussen pogingen. Een open remote desktop-sessie overleeft een korte herverbinding.

### Wanneer u het gebruikt

- U maakt verbinding met een IP-adres in plaats van een VM te kiezen.
- U bent op macOS, waar een RD Gateway-sessie na een paar seconden wegvalt. Zie [RD Gateway op macOS](#rd-gateway-op-macos).
- U wilt meerdere sessies tegelijk open hebben, elk op zijn eigen lokale poort.

## RD Gateway

De applicatie vraagt Bastion om een vooraf geconfigureerd `.rdp`-bestand dat Bastion als de remote desktop-gateway aanwijst, en geeft dat bestand vervolgens door aan uw client. Er is geen lokale poort en geen tunnelproces.

Dit is het kortere pad, en op Windows is het de standaard. Het werkt alleen wanneer Bastion het doel zelf kan omzetten, wat betekent dat het werkt voor Azure-VM's en niet voor getypte IP-adressen.

<div class="callout warn">
<span class="eyebrow">Cross-tenant aanmelden</span>
<p>Entra ID-authenticatie staat standaard uit en moet uit blijven wanneer de virtuele machine bij een andere tenant hoort dan het account waarmee u bent aangemeld, wat het gebruikelijke geval is bij Azure Lighthouse. Azure AD geeft dan <code>AADSTS293004</code> terug. Als u het toch inschakelt en Bastion het weigert, vraagt de applicatie opnieuw met de instelling uit, zodat de sessie alsnog opent. Zie <a href="../entra-id/">Entra ID-authenticatie</a>.</p>
</div>

### RD Gateway op macOS

RD Gateway is selecteerbaar op macOS en de verbinding opent ook echt. Deze valt vervolgens na ongeveer tien tot vijftien seconden weg met fout `0x3000064`.

De oorzaak is een cipher-mismatch, geen configuratiefout. De TLS-stack van de macOS-client biedt alleen RSA-ciphersuites aan, en de gateway van Azure Bastion presenteert ECDSA. Geen van beide kan de ander tegemoetkomen, dus de sessie wordt kort na de start afgebroken. Dit is een clientbeperking aan de kant van Microsoft waar geen instelling omheen werkt.

Microsoft ondersteunt het RD Gateway-pad van Bastion met de Windows-client. Het is geen ondersteunde combinatie met de Windows App op macOS.

Omdat de verbinding lijkt te slagen voordat deze mislukt, vraagt de applicatie het eerst na. Als u RD Gateway kiest op macOS, verschijnt een prompt die de foutcode noemt en Tunnel als alternatief aanbiedt. Als u toch ja antwoordt, wordt de poging alsnog gedaan, zodat het gedrag te controleren is in plaats van op vertrouwen aangenomen te worden.

Gebruik Tunnel op macOS. Het bereikt dezelfde machines en is daar om deze reden de standaard.

## Vergelijking

| &nbsp; | Tunnel | RD Gateway |
| --- | --- | --- |
| Verbinden met een Azure-VM | Ja | Ja |
| Verbinden met een IP-adres | Ja | Nee |
| Opent een lokale poort | Ja, één per sessie | Nee |
| Verbindt automatisch opnieuw | Ja, tot 5 pogingen | Nee |
| Entra ID-authenticatie | Niet van toepassing | Standaard uit, optioneel |
| Standaard op Windows | Nee | Ja |
| Standaard op macOS | Ja | Nee |
| Vereist Azure CLI | Nee | Nee |

De standaard geldt alleen totdat u zelf een methode kiest. Daarna wordt uw keuze per tenant opgeslagen en hersteld de volgende keer dat u de applicatie start.

## Poorten

Geen van beide methoden heeft een inkomende firewallregel nodig. Beide gebruiken uitgaande poort 443 van uw computer naar de Bastion-host.

| Van | Naar | Poort |
| --- | --- | --- |
| Uw computer | bst-*.bastion.azure.com | 443/TCP uitgaand |
| Uw computer | login.microsoftonline.com | 443/TCP uitgaand |
| Bastion-host | Doelmachine | 3389/TCP binnen het virtuele netwerk |
