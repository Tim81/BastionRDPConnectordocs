---
title: Erste Anmeldung
description: Was beim ersten Öffnen der Anwendung passiert, wie der Token-Cache funktioniert und wie Mandanten- und Subscription-Auswahl zusammenspielen.
appliesTo: '3.3.4'
lastReviewed: '2026-07-25'
---

Die Anwendung meldet Sie mit MSAL an, derselben Bibliothek, die Azure CLI und Visual Studio für die interaktive Anmeldung verwenden. Sie öffnet die Anmeldeseite in einem eingebetteten Browser: WebView2 unter Windows, WKWebView unter macOS. Es gibt kein separates Browserfenster und keinen Gerätecode zum Kopieren und Einfügen.

## Anmelden

Was Sie sehen, hängt davon ab, ob bereits ein Token auf Ihrem Computer zwischengespeichert ist.

| Situation | Was passiert |
| --- | --- |
| Kein zwischengespeicherter Token | Die Microsoft-Anmeldeseite öffnet sich sofort. |
| Ein gültiger zwischengespeicherter Token | Die App meldet sich still an. Es erscheint kein Anmeldefenster, und Sie gelangen direkt zur Mandantenauswahl, falls Ihr Konto mehr als einen hat. |
| Ein abgelaufener Token, oder eine Conditional-Access-Richtlinie, die eine erneute Authentifizierung erfordert | Das Anmeldefenster öffnet sich erneut, damit Sie erfüllen können, was Ihre Organisation verlangt, zum Beispiel tägliche MFA. |

Wählen Sie **Geschäfts-, Schul- oder Unikonto**, geben Sie Ihr Konto ein und schließen Sie MFA ab, falls Ihre Organisation dies verlangt.

<div class="callout note">
<span class="eyebrow">Hinweis</span>
<p>Der Token-Cache liegt unter <code>%LOCALAPPDATA%\BastionRDPConnector\msal_token_cache.bin</code>. Er ist gerätespezifisch, wandert nicht mit und ist getrennt vom Azure CLI-Cache. Das eigene Profil des eingebetteten Browsers liegt direkt daneben, unter <code>%LOCALAPPDATA%\BastionRDPConnector\WebView2</code>.</p>
</div>

## Einen Mandanten auswählen

<!-- Mirrors src/components/ScreenSignIn.astro -->
<figure class="appshot">
  <div class="frame">
    <svg viewBox="0 0 300 372" role="img" aria-labelledby="s-signin-win">
      <title id="s-signin-win">Der Mandantenauswahldialog unter Windows. Drei Mandanten werden aufgelistet, jeweils mit Optionsfeld und Mandanten-ID. Einer ist ausgewählt. Eine OK-Schaltfläche bestätigt die Auswahl.</title>
      <rect class="ui-win" x="1" y="1" width="298" height="370" rx="6"/>
      <path class="ui-bar" d="M2 2 H298 V22 H2 Z"/>
      <text class="ui-title" x="10" y="15">Mandant auswählen</text>
      <path d="M280 9 l7 7 M287 9 l-7 7" stroke="#7B8794" stroke-width="1.1" fill="none"/>
      <text class="ui-l" x="10" y="42">Ihr Konto hat Zugriff auf mehr als</text>
      <text class="ui-l" x="10" y="54">einen Mandanten. Wählen Sie einen aus, um fortzufahren.</text>
      <rect class="ui-panel" x="10" y="68" width="280" height="42" rx="4"/>
      <circle class="ui-ro on" cx="24" cy="88" r="4"/>
      <circle class="ui-rd" cx="24" cy="88" r="2"/>
      <text class="ui-tb" x="36" y="86">Contoso Production</text>
      <text class="ui-p" x="36" y="98">5f8a2c14-…-tenant</text>
      <rect class="ui-panel" x="10" y="114" width="280" height="42" rx="4"/>
      <circle class="ui-ro" cx="24" cy="134" r="4"/>
      <text class="ui-tb" x="36" y="132">Contoso Dev</text>
      <text class="ui-p" x="36" y="144">b2c19e07-…-tenant</text>
      <rect class="ui-panel" x="10" y="160" width="280" height="42" rx="4"/>
      <circle class="ui-ro" cx="24" cy="180" r="4"/>
      <text class="ui-tb" x="36" y="178">Fabrikam (Lighthouse)</text>
      <text class="ui-p" x="36" y="190">9e4d3a51-…-tenant</text>
      <text class="ui-p" x="10" y="222">Einstellungen werden separat pro</text>
      <text class="ui-p" x="10" y="233">Mandant gespeichert und beim Zurückwechseln wiederhergestellt.</text>
      <rect class="ui-btn" x="190" y="320" width="100" height="26" rx="4"/>
      <text class="ui-bt" x="240" y="337" text-anchor="middle">OK</text>
    </svg>
  </div>
  <figcaption><b>Windows</b> Der Mandantenauswahldialog unter Windows. Er erscheint einmal, direkt nach der Anmeldung, nur wenn das Konto mehr als einen Mandanten sehen kann. Der Dialog sieht unter macOS bis auf den Fensterrahmen gleich aus.</figcaption>
</figure>

Dieser Dialog erscheint, wenn Ihr Konto Zugriff auf mehr als einen Entra ID-Mandanten hat, zum Beispiel über Azure Lighthouse. Wählen Sie den Mandanten aus, mit dessen Ressourcen Sie arbeiten möchten, und wählen Sie **OK**. Wenn dieser Mandant MFA benötigt und Ihr zwischengespeicherter Token dies noch nicht erfüllt, erhalten Sie eine weitere Authentifizierungsaufforderung.

Sie können jederzeit, während die App läuft, den Mandanten wechseln. Einstellungen – also die zuletzt verwendete Subscription, der Bastion-Host und die VM – werden separat pro Mandant gespeichert und kommen automatisch zurück, wenn Sie zurückwechseln.

## Eine Subscription auswählen

Sobald ein Mandant gewählt ist, lädt das Hauptfenster mit der **Bastion Subscription** oben angezeigt. Wenn Ihr Konto mehrere Subscriptions hat und die ausgewählte nicht den benötigten Bastion-Host enthält, wählen Sie **Ändern**, um die Auswahl zu öffnen.

<div class="callout note">
<span class="eyebrow">Hinweis</span>
<p>Die Bastion Subscription oben ist diejenige, die Ihre Bastion-Ressource enthält. Auf der Registerkarte Azure VM kann die VM Subscription eine völlig andere sein. Abonnementübergreifende Verbindungen funktionieren ohne zusätzliche Einrichtung.</p>
</div>

Ihr Token bleibt zwischen den Starts auf der Festplatte, sodass Sie nicht erneut zur Anmeldung aufgefordert werden, es sei denn, die Sitzung läuft ab oder eine Conditional-Access-Richtlinie verlangt es. Um eine neue Anmeldung zu erzwingen, wählen Sie **Abmelden** in der oberen Leiste. Das entfernt den zwischengespeicherten Token und leert den MSAL-Zustand in einem Schritt, und der nächste Start beginnt mit einer leeren Anmeldung.
