---
title: Entra ID-Authentifizierung
description: Single Sign-On für RD Gateway-Sitzungen, wann Sie es aktivieren sollten, und was passiert, wenn Bastion es ablehnt.
appliesTo: '3.3.6'
lastReviewed: '2026-07-25'
---

Die Registerkarte Azure VM hat ein Entra ID-Auth-Kontrollkästchen neben Verbindungsmethode. Es gilt nur für RD Gateway und ist **standardmäßig deaktiviert**.

## Was es bewirkt

Ist die Entra ID-Authentifizierung aktiviert, meldet sich die RDP-Sitzung mit Ihrer Microsoft-Identität an, statt nach einem Windows-Benutzernamen und -Passwort zu fragen. Das funktioniert, wenn sich Ihr Konto und die Ziel-VM im selben Entra ID-Mandanten befinden und die Maschine diesem Mandanten beigetreten ist.

Ist es deaktiviert, verwendet die Sitzung die gewöhnliche RDP-Authentifizierung und fragt nach Benutzername und Passwort. Das ist der Standard, weil es überall funktioniert, auch mandantenübergreifend.

## Was passiert, wenn Sie es aktivieren

Die Anwendung fragt Bastion nach einer `.rdp`-Datei mit aktivierter Entra ID-Authentifizierung. Liefert Bastion keine, fragt sie erneut mit deaktivierter Einstellung und verwendet stattdessen diese.

Das Aktivieren des Kontrollkästchens ist also eine Präferenz, keine Forderung. Ist die Kombination nicht unterstützt, öffnet sich die Verbindung trotzdem, mit Benutzername und Passwort.

Das Protokoll erfasst, welcher Weg genommen wurde:

```
Attempting RDP download WITH Entra ID Authentication...
Entra ID Auth failed, falling back to traditional authentication...
```

<div class="callout warn">
<span class="eyebrow">Mandantenübergreifend</span>
<p>Die Entra ID-Authentifizierung funktioniert nicht, wenn die virtuelle Maschine einem anderen Mandanten gehört als das Konto, mit dem Sie angemeldet sind, was der übliche Fall bei Azure Lighthouse ist. Azure AD gibt <code>AADSTS293004</code> zurück. Lassen Sie das Kontrollkästchen für diese Verbindungen deaktiviert. Der Fallback übernimmt es, falls Sie es vergessen, auf Kosten eines zusätzlichen Roundtrips.</p>
</div>

## Warum Tunnel diese Einstellung nicht hat

Tunnel überträgt eine reine Verbindung zu einem lokalen Port. Wie Sie sich innerhalb der Remote-Sitzung authentifizieren, läuft nie über die Anwendung, sodass es keine Entra ID-Einstellung zum Anzeigen gibt. Melden Sie sich im RDP-Fenster so an, wie es der Zielcomputer erwartet.

## Wo die Wahl gespeichert wird

Das Kontrollkästchen wird [pro Mandant](../tenants/) gespeichert, zusammen mit Verbindungsmethode und Monitor-Modus. Es für einen Mandanten zu ändern, wirkt sich auf keinen anderen aus.
