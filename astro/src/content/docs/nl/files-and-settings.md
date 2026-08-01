---
title: Bestanden en instellingen
description: Waar de applicatie uw voorkeuren, uw aanmeldstatus en de logboeken bewaart, en wat er in elk bestand staat.
appliesTo: '3.3.5'
lastReviewed: '2026-07-25'
---

De applicatie schrijft naar twee aparte mappen onder uw gebruikersprofiel. U bewerkt deze bestanden nooit rechtstreeks; de applicatie leest en schrijft ze zelf.

## Instellingen: roaming, per tenant

`%APPDATA%\BastionRDPConnector\settings.json` bevat uw voorkeuren: de laatst gebruikte subscription, Bastion-host, VM en IP-adres, verbindingsmethode, monitormodus, Entra ID-authenticatie, en uw taalkeuze.

Deze map roamt mee met uw Windows-profiel, dus dezelfde voorkeuren volgen u tussen machines op een domein of Entra ID-gekoppeld netwerk dat `%APPDATA%` synchroniseert.

Het meeste in dit bestand wordt [apart per tenant opgeslagen](../tenants/). Taal is de enige instelling die globaal is.

Instellingen worden atomair weggeschreven: de applicatie schrijft eerst een tijdelijk bestand en vervangt dan in één stap het echte bestand. Als een schrijfactie halverwege wordt onderbroken, bijvoorbeeld doordat het proces wordt gedood, verliest u hoogstens de voorkeur van die ene opslagactie, niet het hele bestand.

## Lokale data: aanmeldstatus en logboeken

`%LOCALAPPDATA%\BastionRDPConnector\` roamt niet. Deze bevat:

| Item | Doel |
| --- | --- |
| `msal_token_cache.bin` | Uw gecachede aanmeldtoken. Privé voor deze applicatie, los van de eigen cache van de Azure CLI. |
| `WebView2\` | Het eigen profiel van de ingebouwde aanmeldbrowser: cookies, cache en lokale opslag voor de aanmeldpagina. |
| `debug.log` | Het logboek van de huidige sessie. |
| `debug.0.log` tot en met `debug.9.log` | De vorige tien sessies, bewaard sinds 3.3.4. Daarvoor overschreef elke start het ene logboekbestand. |

[Diagnostiek](../diagnostics/) behandelt wat het debug logboek bevat en hoe u het naar support krijgt zonder dat het geheimen bevat.

<div class="callout note">
<span class="eyebrow">Opmerking</span>
<p>Tijdelijke <code>.rdp</code>-bestanden, gegenereerd voor RD Gateway-verbindingen, staan onder <code>%TEMP%\BastionRDPConnector\</code> en worden verwijderd wanneer de applicatie sluit.</p>
</div>

## Opnieuw instellen

Het verwijderen van `settings.json` zet elke voorkeur terug naar de standaardwaarde. U blijft aangemeld; er verandert niets aan uw tokencache.

Het verwijderen van `msal_token_cache.bin`, of het selecteren van **Afmelden** in de bovenste balk, meldt u af en wist de gecachede token. Afmelden is de veiligere optie: het verwijdert de tokencache en wist de in-memory status van MSAL in één stap, en de volgende start begint met een lege aanmelding.

Om beide opnieuw in te stellen, sluit u eerst de applicatie en verwijdert u dan beide bestanden. Het verwijderen van het ene heeft geen invloed op het andere.
