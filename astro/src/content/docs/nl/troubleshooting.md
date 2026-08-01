---
title: Problemen oplossen
description: Veelvoorkomende problemen, in de woorden waarmee u ze zou omschrijven, en wat u voor elk moet controleren.
appliesTo: '3.3.5'
lastReviewed: '2026-07-25'
---

## Voordat u verbinding maakt

### Ik heb de app opnieuw gestart en er gebeurde niets

De applicatie staat maar één actieve instantie toe. Als deze al open is, geminimaliseerd, of in het systeemvak zit, brengt een tweede keer starten het bestaande venster naar voren in plaats van een nieuw venster te openen. Controleer het systeemvak, op Windows, op het applicatiepictogram.

<!-- Mirrors src/components/ScreenTray.astro -->
<figure class="appshot">
  <div class="frame">
    <svg viewBox="0 0 300 372" role="img" aria-labelledby="s-tray-win">
      <title id="s-tray-win">Het contextmenu van het Windows-systeemvak, uitgeklapt. Twee open tunnels staan vermeld, elk met bedieningselementen Verbinden en Stoppen. Daaronder Over en Afsluiten.</title>
      <rect class="ui-win" x="1" y="1" width="298" height="370" rx="6"/>
      <path class="ui-bar" d="M2 2 H298 V22 H2 Z"/>
      <text class="ui-title" x="10" y="15">Azure Bastion RDP Connector</text>
      <path d="M266 9 h7 M280 9 l7 7 M287 9 l-7 7" stroke="#7B8794" stroke-width="1.1" fill="none"/>
      <text class="ui-l" x="10" y="40">Systeemvak, rechtermuisknopmenu</text>
      <rect class="ui-panel" x="10" y="48" width="280" height="50" rx="4"/>
      <circle class="ui-run" cx="22" cy="63" r="3.5"/>
      <text class="ui-tb" x="32" y="67">vm-dev-web-01</text>
      <text class="ui-p" x="32" y="80">localhost:55000 · open 4m 12s</text>
      <rect class="ui-btn-2" x="194" y="59" width="46" height="15" rx="3"/>
      <text class="ui-tb" x="200" y="70">Verbinden</text>
      <rect class="ui-btn-2" x="244" y="59" width="34" height="15" rx="3"/>
      <text class="ui-tb" x="252" y="70">Stop</text>
      <rect class="ui-panel" x="10" y="106" width="280" height="50" rx="4"/>
      <circle class="ui-run" cx="22" cy="121" r="3.5"/>
      <text class="ui-tb" x="32" y="125">10.20.4.15</text>
      <text class="ui-p" x="32" y="138">localhost:55001 · open 41s</text>
      <rect class="ui-btn-2" x="194" y="117" width="46" height="15" rx="3"/>
      <text class="ui-tb" x="200" y="128">Verbinden</text>
      <rect class="ui-btn-2" x="244" y="117" width="34" height="15" rx="3"/>
      <text class="ui-tb" x="252" y="128">Stop</text>
      <line x1="10" y1="170" x2="290" y2="170" stroke="#DCE2EA" stroke-width="1"/>
      <text class="ui-tb" x="20" y="190">Over</text>
      <text class="ui-tb" x="20" y="212">Afsluiten</text>
      <text class="ui-p" x="10" y="352">Dubbelklik op het systeemvakpictogram om het hoofdvenster te herstellen.</text>
    </svg>
  </div>
  <figcaption><b>Windows</b> Het contextmenu van het systeemvak op Windows, uitgeklapt. Elke open tunnel krijgt zijn eigen bedieningselementen Verbinden en Stop, gevolgd door Over en Afsluiten.</figcaption>
</figure>

Het sluiten van het hoofdvenster, of het minimaliseren ervan, sluit de applicatie niet af. Beide verbergen het venster en laten het draaien in het systeemvak, zodat open tunnels verbonden blijven. Klik met de rechtermuisknop op het systeemvakpictogram en selecteer **Afsluiten** om volledig te sluiten. Het systeemvakpictogram is alleen op Windows; macOS heeft bewust geen systeemvakpictogram.

### Er verschijnen geen subscriptions, of de Bastion-lijst is leeg

Dit betekent gewoonlijk dat uw account geen roltoewijzing heeft op enige subscription, of dat de tenant waarin u zich bevindt geen Bastion-resource bevat. Probeer:

- Selecteer **Ververs** naast het Bastion-veld.
- Selecteer **Wijzig** om een andere subscription te kiezen.
- Meld u af en weer aan, voor het geval uw sessie is verlopen.
- Vraag wie uw Azure-rollen beheert om te bevestigen dat u Reader heeft op de Bastion-host en het bijbehorende virtuele netwerk.

## Verbinden

### mstsc opent, maar de verbinding mislukt voor een Azure-VM via RD Gateway

Controleer of:

- De energiestatus van de VM **Actief** toont, en geef het gastbesturingssysteem daarna een minuut of twee om het opstarten te voltooien.
- De Bastion-host de Standard- of Premium-SKU heeft. Basic ondersteunt de native client niet.
- Geen enkele regel van een network security group inkomend verkeer van Bastion naar de VM op poort 3389 blokkeert.
- Er een route bestaat van Bastion naar de VM, of dat nu hetzelfde virtuele netwerk is, een peering, of Virtual WAN.

### mstsc opent, maar de verbinding mislukt voor een Azure-VM via Tunnel

Alles hierboven geldt nog steeds, plus:

- Controleer het tabblad [Actieve tunnels](../active-tunnels/). Als de tunnel niet in de lijst staat, of als gestopt wordt getoond, probeer dan opnieuw verbinding te maken om een nieuwe te starten.
- Als de door u ingestelde lokale poort al in gebruik was, koos de applicatie automatisch de eerstvolgende vrije poort. Controleer de poort op het tabblad Actieve tunnels tegen de poort die uw client gebruikt.

### De verbinding mislukt wanneer ik een IP-adres typ

- Bevestig dat het adres bereikbaar is vanuit het virtuele netwerk van Bastion, niet alleen vanaf uw eigen machine. Voor on-premises doelen betekent dit een werkende site-to-site VPN of ExpressRoute; voor een andere cloud, een VPN-verbinding naar Azure.
- Bevestig de doelpoort. 3389 is standaard voor RDP, maar een niet-Azure- of on-premises host kan op iets anders luisteren.
- Controleer of er een hostfirewall op het doel inkomende RDP vanuit het Bastion-subnet blokkeert.

### De knop Start verschijnt niet voor een gestopte VM

Het starten van een VM vereist Virtual Machine Contributor, of een gelijkwaardige rol; Reader alleen is niet genoeg. Vraag wie uw Azure-rollen beheert om deze toe te kennen, of start de VM in plaats daarvan vanuit de Azure Portal.

### Ik kreeg een AADSTS293004-fout

Azure AD geeft dit terug wanneer [Entra ID-authenticatie](../entra-id/) wordt gebruikt tegen een virtuele machine in een andere tenant dan uw aangemelde account, wat het gebruikelijke geval is bij Azure Lighthouse.

Schakel het selectievakje Entra ID-auth op het tabblad Azure VM uit en maak opnieuw verbinding. De instelling staat standaard uit, dus als u dit ziet, is deze op enig moment ingeschakeld en voor deze tenant opgeslagen.

U kunt dit in het logboek zien zonder dat de verbinding mislukt. Wanneer Bastion een Entra ID-verzoek weigert, vraagt de applicatie opnieuw met de instelling uit en gebruikt dat bestand, zodat de sessie na één extra rondgang alsnog opent.

Als de fout verschijnt bij het rechtstreeks openen van een opgeslagen `.rdp`-bestand, maak dan in plaats daarvan opnieuw verbinding vanuit het tabblad Azure VM. Een bestand dat bewaard is van een eerdere sessie draagt de instelling waarmee het is geschreven.

## Aanmelden en resetten

### Ik word steeds opnieuw gevraagd om aan te melden

Het Conditional Access-beleid van uw organisatie vereist mogelijk periodieke herverificatie, of MFA bij elke aanmelding. Dat is verwacht gedrag. Voltooi de prompt wanneer deze verschijnt; de applicatie bepaalt niet hoe vaak uw tenant hierom vraagt.

### Ik wil helemaal opnieuw beginnen

Selecteer **Afmelden** in de bovenste balk om uw aanmeldstatus te wissen; dit verwijdert de tokencache en de MSAL-status in één stap. Om ook voorkeuren te resetten, sluit u de applicatie en verwijdert u `%APPDATA%\BastionRDPConnector\settings.json`. [Bestanden en instellingen](../files-and-settings/) behandelt wat elk bestand bevat en waar ze staan.

### Ik moet een logboek naar support sturen

Open **Over** en selecteer **Diagnostische info kopiëren**, of **Open logmap** om de bestanden rechtstreeks te vinden. [Diagnostiek](../diagnostics/) behandelt wat er in het pakket zit en hoe het is geredigeerd.
