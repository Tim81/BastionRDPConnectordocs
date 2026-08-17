---
title: Wat is nieuw
description: Wat er is veranderd in elke recente release van Azure Bastion RDP Connector.
appliesTo: '3.3.6'
lastReviewed: '2026-08-17'
---

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
