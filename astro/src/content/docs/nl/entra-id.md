---
title: Entra ID-authenticatie
description: Single sign-on voor RD Gateway-sessies, wanneer u het inschakelt, en wat er gebeurt als Bastion het weigert.
appliesTo: '3.3.5'
lastReviewed: '2026-07-25'
---

Het tabblad Azure VM heeft een selectievakje Entra ID-auth naast Verbindingsmethode. Dit geldt alleen voor RD Gateway, en staat **standaard uit**.

## Wat het doet

Met Entra ID-authenticatie aan meldt de RDP-sessie zich aan met uw Microsoft-identiteit in plaats van te vragen om een Windows-gebruikersnaam en -wachtwoord. Dit werkt wanneer uw account en de doel-VM zich in dezelfde Entra ID-tenant bevinden, en de machine bij die tenant is aangesloten.

Met de instelling uit gebruikt de sessie gewone RDP-authenticatie en vraagt om een gebruikersnaam en wachtwoord. Dat is de standaard omdat het overal werkt, ook tussen tenants.

## Wat er gebeurt als u het inschakelt

De applicatie vraagt Bastion om een `.rdp`-bestand met Entra ID-authenticatie ingeschakeld. Als Bastion er geen teruggeeft, vraagt deze opnieuw met de instelling uit en gebruikt dat bestand.

Het inschakelen van het selectievakje is dus een voorkeur, geen eis. Als de combinatie niet wordt ondersteund, opent de sessie alsnog, met een gebruikersnaam en wachtwoord.

Het logboek registreert welk pad is gevolgd:

```
Attempting RDP download WITH Entra ID Authentication...
Entra ID Auth failed, falling back to traditional authentication...
```

<div class="callout warn">
<span class="eyebrow">Tussen tenants</span>
<p>Entra ID-authenticatie werkt niet wanneer de virtuele machine bij een andere tenant hoort dan het account waarmee u bent aangemeld, wat het gebruikelijke geval is bij Azure Lighthouse. Azure AD geeft dan <code>AADSTS293004</code> terug. Laat het selectievakje uit voor die verbindingen. De terugval handelt het voor u af als u het vergeet, ten koste van één extra rondgang.</p>
</div>

## Waarom Tunnel deze instelling niet heeft

Tunnel draagt een ruwe verbinding naar een lokale poort. Hoe u zich binnen de externe sessie authenticeert, loopt nooit via de applicatie, dus er is geen Entra ID-instelling om te tonen. Meld u aan binnen het RDP-venster op de manier die de doelmachine verwacht.

## Waar de keuze wordt opgeslagen

Het selectievakje wordt opgeslagen [per tenant](../tenants/), samen met verbindingsmethode en monitormodus. Het wijzigen ervan voor de ene tenant heeft geen invloed op een andere.
