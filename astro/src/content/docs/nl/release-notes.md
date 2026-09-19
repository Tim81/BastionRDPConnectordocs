---
title: Wat is nieuw
description: Wat er is veranderd in elke recente release van Azure Bastion RDP Connector.
appliesTo: '3.3.9'
lastReviewed: '2026-09-19'
---

## 3.3.9

| Wijziging | Details |
| --- | --- |
| macOS: RD Gateway-verbrekingen zijn een bug in Windows App for Mac | Windows App for Mac splitst één RD Gateway-pakket over twee WebSocket-berichten, waarna Azure Bastion de WebSocket sluit. Gatewaypakketten die groter zijn dan de ontvangstbuffer van Bastion van 20.480 bytes laten de sessie ook vastlopen. Beide zijn te zien als verbreking binnen enkele seconden, met foutcode `0x300006c`, `0x3000064` of `0x10b`. Dit is geen TLS- of cipherprobleem, zoals eerdere versies stelden. Het is geverifieerd op Windows App 11.4.1. FreeRDP via dezelfde Bastion en Tunnel-modus met Windows App blijven beide verbonden, en geen enkele eigenschap in het `.rdp`-bestand omzeilt het. |
| macOS: herziene RD Gateway-waarschuwing | RD Gateway blijft selecteerbaar op macOS, voor het geval Microsoft de client repareert. De waarschuwing zegt nu wat er echt gebeurt en dat uw VM niet het probleem is. Het biedt **Tunnel gebruiken**, **Toch RD Gateway proberen** of Annuleren, in alle zes talen. Het dialoogvenster heet "Bekend probleem op macOS" in plaats van "Niet ondersteund op macOS". Het menu-item Info op macOS is nu gelokaliseerd en volgt een taalwijziging direct. |
| Tunnels: geen zinloze herverbindingslussen meer | Wanneer de RDP-client zijn eigen verbinding sloot, beschouwde de tunnel dat als een netwerkfout en probeerde tot vijf keer opnieuw, telkens met een nieuw Bastion-token terwijl er geen client verbonden was. Nu krijgt elke geaccepteerde verbinding één Bastion-token en één WebSocket voor zijn hele levensduur. Als de WebSocket eindigt terwijl de client nog verbonden is, wordt de lokale verbinding gesloten en opent de automatische herverbinding van de RDP-client zelf een nieuwe met een vers token. De status "Opnieuw verbinden… (poging n/5)" is verdwenen. |
| Tunnels: time-outs, netjes afsluiten, hergebruik en doelpoort | De WebSocket-verbinding krijgt na 30 seconden een time-out, en een token-aanvraag bij Bastion die een time-out krijgt, wordt als fout gemeld in plaats van als stille annulering. De Bastion-sessie wordt bij afsluiten altijd opgeruimd, het sluiten van de WebSocket is tijdgebonden en een tunnel die stopt krijgt nooit een nieuwe client. Opnieuw verbinden met dezelfde Bastion, hetzelfde doel en dezelfde poort hergebruikt de draaiende tunnel en start de RDP-client opnieuw. De gekozen doelpoort wordt gerespecteerd: VM-tunnels stonden vast op 3389. Het laatste doel en de laatste lokale poort worden onthouden en labels tonen `vm:poort`. |
| Een verlopen Azure-sessie brengt u terug naar het inloggen | De pre-flightcontroles sloegen zichzelf over bij elke fout, ook bij een Conditional Access-eis voor herverificatie, en lieten de verbinding later mislukken. Nu vraagt de applicatie om in te loggen en probeert de bewerking één keer opnieuw, bij het opstarten, het laden van abonnementen, Bastions en VM's, het wisselen van abonnement, het verbinden en het starten van een VM. Er is steeds maar één inlogpopup open; een tweede trigger wacht op de popup die al open is. |
| Verbeteringen bij het inloggen | Het hoofdvenster wordt hersteld voordat een inlogpopup opent, zodat inloggen niet meer blijft hangen als het venster naar het systeemvak is verborgen. Alleen de bekende, onschadelijke dialoogfouten over een niet-zichtbare of gesloten eigenaar worden genegeerd; al het andere wordt nog steeds gelogd en getoond. Het ophalen van tokens is gekoppeld aan het aangemelde account, wat tokens van het verkeerde account oplost als er meerdere accounts in de cache staan. Inloggen met een ander account wist de abonnementscache. Bij het ophalen van tenants, abonnementen en Bastions worden fouten nu gemeld in plaats van een lege lijst te tonen. Als abonnementen na herverificatie nog steeds niet laden, sluit de applicatie af in plaats van u uitgelogd achter te laten zonder iets om te kiezen. |
| VM-energiestatus | Het starten van een VM wordt per VM bijgehouden, dus bij het wisselen van VM staat "Starten" niet meer bij de verkeerde. Terwijl een VM start, is de knop Start verborgen en is Verbinden uitgeschakeld. Een mislukte start wordt gedetecteerd: als de VM ongeveer 30 seconden lang gestopt of ongealloceerd blijft, krijgt u een foutmelding met de naam van de VM in plaats van dat de volledige polling wordt afgewacht. Het starten van een VM en het vernieuwen van de energiestatus verifiëren opnieuw bij een verlopen sessie. |
| Overige betrouwbaarheid | Het sluiten van het venster annuleert lopend werk stilletjes, zonder foutdialogen tijdens het afsluiten. Een verouderde vernieuwing van Bastions of abonnementen wordt genegeerd als u ondertussen van abonnement bent gewisseld, en het dialoogvenster Abonnement wijzigen haalt Bastions op voordat het vastlegt, zodat een fout het vorige abonnement ongemoeid laat. Als de RDP-client niet start, krijgt u een melding, of een hersteld venster met een foutdialoog als er geen systeemvakpictogram is. Herstellen vanuit het systeemvak brengt de taakbalkknop en de vorige vensterstatus terug. Minimaliseren terwijl een dialoog of inlogpopup open is, verbergt niet meer naar het systeemvak en sluit die niet meer af. Het dialoogvenster Info kan maar één keer tegelijk open zijn. Logmap openen werkt nu met paden die spaties bevatten. |
| Beveiliging: hostnaam van Bastion en paginering | De applicatie stuurt uw ARM-token naar de host die in het antwoord van Azure staat. Nu wordt alleen een DNS-naam die eindigt op `.bastion.azure.com` geaccepteerd, zodat een IP-adres of vreemde host het token nooit ontvangt, en omleidingen zijn uitgeschakeld voor de token-aanvraag. ARM-`nextLink`s moeten https op de ARM-host zijn, het aantal pagina's is begrensd op 500 en een mislukt Resource Graph-antwoord geeft een fout in plaats van een afgekapte lijst. |
| Beveiliging: tijdelijke bestanden | Gegenereerde `.rdp`-bestanden, die een actief gatewaytoken kunnen bevatten, worden bij het afsluiten verwijderd met een overschrijving naar beste vermogen. Dat is geen gegarandeerde veilige wisbewerking. De tijdelijke map wordt geweigerd als het een symlink of junction is. Op macOS wordt de map aangemaakt met 0700 en de bestanden met 0600, en het `.rdp`-bestand van de macOS-tunnel volgt nu dezelfde afhandeling; dat was een voor iedereen leesbaar bestand in `$TMPDIR` dat nooit werd verwijderd. Restanten van een crash of geforceerd afsluiten worden bij het opstarten opgeruimd, alleen door de bevestigde eerste instantie. Op macOS openen `.rdp`-bestanden en de logmap via het absolute `/usr/bin/open`. |

## 3.3.8

| Wijziging | Details |
| --- | --- |
| MSAL 4.90.0 | De Microsoft Authentication Library, die het inloggen afhandelt, is bijgewerkt. |
| Runtime .NET met beveiligingsfixes | De ondergrens van de build-SDK is verhoogd naar 10.0.401, zodat de meegeleverde runtime .NET 10.0.12 is, met de beveiligingsfixes. Beveiligingsfixes voor de runtime bereiken u via updates van de applicatie. |
| macOS: squircle-appicoon | Het appicoon is nu een squircle, zodat macOS Tahoe het niet meer in een wit vlak plaatst. |

## 3.3.7

| Wijziging | Details |
| --- | --- |
| Bijgewerkte componenten | Azure.Core 1.62.0, Avalonia-pakketten 12.1.2 en updates van de identiteitsgroep (MSAL en gerelateerde pakketten). Uitsluitend afhankelijkheidsupdates. |

## 3.3.6

| Wijziging | Details |
| --- | --- |
| Beveiligingsupdate van de meegeleverde .NET-runtime | De applicatie bevat zijn eigen versie van .NET en gebruikt niet een versie die op uw machine is geïnstalleerd. Beveiligingsfixes voor de runtime bereiken u daarom via een update van de applicatie en niet via Windows- of macOS-updates. Deze versie is gebouwd op .NET 10.0.11, een beveiligingsrelease van de runtime. |
| Bijgewerkte componenten | Avalonia.Controls.WebView 12.1.0 en Azure.Core 1.61.0. |

## 3.3.5

| Wijziging | Details |
| --- | --- |
| *Log* blijft onvertaald in het Duits, Frans en Spaans | De knop Open logmap en de melding bij een mislukte verbinding gaven *log* weer als *Protokoll*, *journal* en *registro*, wat eerder als een gewoon logboek leest dan als de technische term. Beide houden nu het leenwoord aan: *Log-Ordner öffnen*, *Ouvrir le dossier de log*, *Abrir carpeta de log*. Nederlands, Engels en Portugees zijn ongewijzigd — die gebruikten het woord al. |

## 3.3.4

| Wijziging | Details |
| --- | --- |
| Systeemvakpictogram hersteld | Het systeemvakpictogram verscheen niet op Windows in de versies 3.2 tot en met 3.3.3. Minimaliseren naar het systeemvak, tunnelmeldingen en het contextmenu van het systeemvak werken weer zoals deze documentatie beschrijft. |
| Tien sessies logboekgeschiedenis | `debug.log` werd voorheen bij elke start overschreven. De laatste tien sessies worden nu bewaard als `debug.0.log` tot en met `debug.9.log`, zodat het logboek van de run waarin een probleem optrad een herstart overleeft. |
| Diagnostisch pakket omvat eerdere sessies | Diagnostische info kopiëren bevat nu ook de gearchiveerde sessielogboeken naast het huidige, nieuwste eerst, tot ongeveer 1 MB. |
| Opruimen voltooit voordat het venster sluit | Actieve tunnels sluiten en tijdelijke `.rdp`-bestanden worden verwijderd voordat het venster sluit. Afmelden doorloopt dezelfde opruiming in plaats van het proces direct te beëindigen. |
| Profiel van aanmeldbrowser verplaatst | De ingebouwde aanmeldbrowser bewaarde zijn profiel voorheen naast het applicatiebestand, waardoor aanmelden mislukte als de app draaide vanuit een schrijfbeveiligde map zoals Program Files. Deze staat nu op `%LOCALAPPDATA%\BastionRDPConnector\WebView2`. De locatie van de tokencache is ongewijzigd. |
| Bijgewerkte componenten | Avalonia 12.1.0, MSAL 4.87.0, Azure.Core 1.60.0. |

## 3.3

| Wijziging | Details |
| --- | --- |
| VM's laden via Azure Resource Graph | VM's over ongeveer 200 subscriptions laden in 2 tot 4 seconden, tegenover 30 tot 60 seconden voorheen. Zoekopdrachten over meerdere subscriptions gebruiken de Azure Resource Graph API in plaats van elke subscription na elkaar te bevragen. |
| VM-zoekopdracht over meerdere subscriptions | De modus Alle abonnementen op het tabblad Azure VM doorzoekt elke subscription die uw account kan zien. Vereist minimaal drie tekens voordat resultaten worden getoond, en het subscription-dropdown toont nu alleen subscriptions die daadwerkelijk VM's bevatten. |
| Twee-kolommen tabblad Azure VM | Verbindingsmethode, monitormodus en Entra ID-auth staan in de linkerkolom; VM-selectie staat in de rechterkolom. |
| Preflight-controles | Voordat er verbinding wordt gemaakt, controleert de applicatie de Bastion-SKU, de bijbehorende functievlaggen, en de energiestatus van de VM. Deze controles zijn fail-open: een controle die niet kan worden voltooid, blokkeert de verbinding niet. |
| Automatisch opnieuw verbinden van tunnel | Als de WebSocket-verbinding wegvalt, verbindt de tunnel zelf opnieuw, tot vijf keer met een groeiende tussenpoos tussen pogingen. De meeste RDP-sessies blijven verbonden tijdens zo'n korte herverbinding. |
| Dialoogvenster Over en diagnostisch pakket | De i-knop in de bovenste balk, Open logmap en Diagnostische info kopiëren zijn allemaal met deze release uitgebracht. |
| Standaard verbindingsmethode per platform | RD Gateway werd de standaard op Windows, en Tunnel de standaard op macOS, omdat de Windows App op macOS Bastion niet als gateway kan gebruiken. De standaard geldt alleen totdat u zelf een methode kiest. |
| Ondersteuning voor HD Ready-schermen | Het venster groeide naar 580×760, van ongeveer 540×700, en past nu zonder schuifbalk op 1280×720-schermen. |
