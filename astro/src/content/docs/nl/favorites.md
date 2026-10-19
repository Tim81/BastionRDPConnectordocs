---
title: Favorieten
description: Sla tot tien IP-adressen en Azure-VM's per tenant op, en verbind opnieuw vanaf het tabblad Favorieten met de Bastion-host die op dat moment is gekozen.
appliesTo: '3.4.0'
lastReviewed: '2026-10-19'
---

Favorieten zijn een kortere weg terug naar een verbinding die u al maakt. De lijst bevat maximaal tien items voor de Entra ID-tenant waarbij u bent aangemeld. Een favoriet is een IP-adres of een Azure-VM. De poorten, de verbindingsmethode en de Bastion-host blijven staan waar u ze instelt.

## Toevoegen en verwijderen

Op het tabblad [IP-adres](../connect-ip/) en het tabblad [Azure VM](../connect-vm/) staat een ster naast **Verbinden**. De tooltip is **Favoriet**.

- Een lege ster betekent dat het adres of de virtuele machine op dat tabblad geen favoriet is. Klik erop om het huidige doel op te slaan. Een geldig IP-adres wordt opgeslagen zoals u het hebt getypt. Een virtuele machine wordt opgeslagen met de naam, de resource-id, de resourcegroep en de subscription waar de VM in staat, zodat u die subscription later niet opnieuw hoeft te kiezen.
- Een gevulde ster betekent dat het al een favoriet is. Klik erop om het te verwijderen. De applicatie vraagt eerst om bevestiging. **OK** verwijdert het. **Annuleren**, of het dialoogvenster sluiten, laat het staan.

Dezelfde bevestiging verschijnt als u op **Verwijderen** drukt bij een rij op het tabblad Favorieten.

Een leeg of ongeldig IP-adres, of geen geselecteerde virtuele machine, wordt niet opgeslagen. De ster blijft leeg en u ziet dezelfde waarschuwing als bij **Verbinden**. Een elfde item wordt geweigerd totdat u er een verwijdert.

## Verbinden vanuit de lijst

Open het tabblad **Favorieten**. Elke rij is één opgeslagen doel, met **Verbinden** en **Verwijderen**.

**Verbinden** gebruikt de Bastion-host die op dat moment bovenaan het venster is gekozen. Wijzigt u de Bastion-host en verbindt u opnieuw, dan wordt die nieuwe host gebruikt.

Een IP-favoriet opent een tunnel op dezelfde manier als het tabblad IP-adres, inclusief de doelpoort en de lokale poort van dat tabblad.

Een VM-favoriet gebruikt de verbindingsmethode die op het tabblad Azure VM is gekozen.

- **Tunnel** gebruikt de doelpoort en de lokale poort van dat tabblad.
- **RD Gateway** gebruikt poort 3389, het selectievakje voor Entra ID-authenticatie en de monitorkeuze op dat tabblad.

De virtuele machine moet nog in de lijst staan die voor deze aanmelding is geladen. Staat de VM er niet in, dan stopt **Verbinden** en krijgt u dat te zien. Als het huidige subscription-, naam- of tagfilter de VM zou verbergen, schakelt **Verbinden** naar de subscription van die VM, wist die filters en laat het tabblad Azure VM op die machine staan.

## Energiestatus

Een VM-favoriet volgt dezelfde regels voor de energiestatus als de pagina [Azure VM](../connect-vm/). **Verbinden** is alleen beschikbaar terwijl de VM actief is. Een gestopte of vrijgegeven VM biedt **Start VM** wanneer uw account die mag starten. Terwijl de VM start, is **Start VM** verborgen en blijft **Verbinden** uit. Een IP-favoriet heeft geen energiestatus.
