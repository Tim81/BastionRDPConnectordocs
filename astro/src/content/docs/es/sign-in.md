---
title: Primer inicio de sesión
description: Qué ocurre la primera vez que abre la aplicación, cómo funciona la caché de tokens y cómo encajan la selección de inquilino y de suscripción.
appliesTo: '3.3.5'
lastReviewed: '2026-07-25'
---

La aplicación le inicia sesión con MSAL, la misma biblioteca que usan Azure CLI y Visual Studio para el inicio de sesión interactivo. Abre la página de inicio de sesión en un navegador integrado: WebView2 en Windows, WKWebView en macOS. No hay ninguna ventana de navegador aparte ni ningún código de dispositivo que copiar y pegar.

## Iniciar sesión

Lo que ve depende de si ya hay un token en caché en su equipo.

| Situación | Qué ocurre |
| --- | --- |
| Sin token en caché | La página de inicio de sesión de Microsoft se abre de inmediato. |
| Token válido en caché | La aplicación inicia sesión de forma silenciosa. No aparece ninguna ventana de inicio de sesión, y pasa directamente a la selección de inquilino si su cuenta tiene más de uno. |
| Token caducado, o una política de Acceso Condicional que exige reautenticación | La ventana de inicio de sesión se abre de nuevo, para que pueda cumplir lo que su organización requiera, por ejemplo MFA diaria. |

Elija **Cuenta profesional o educativa**, ingrese su cuenta y complete la MFA si su organización lo exige.

<div class="callout note">
<span class="eyebrow">Nota</span>
<p>La caché de tokens se encuentra en <code>%LOCALAPPDATA%\BastionRDPConnector\msal_token_cache.bin</code>. Es específica de la máquina, no se sincroniza, y es independiente de la caché de Azure CLI. El perfil propio del navegador integrado se ubica junto a ella, en <code>%LOCALAPPDATA%\BastionRDPConnector\WebView2</code>.</p>
</div>

## Selección de inquilino

<!-- Mirrors src/components/ScreenSignIn.astro -->
<figure class="appshot">
  <div class="frame">
    <svg viewBox="0 0 300 372" role="img" aria-labelledby="s-signin-win">
      <title id="s-signin-win">El cuadro de diálogo de selección de inquilino en Windows. Se listan tres inquilinos, cada uno con un botón de opción y su ID de inquilino. Uno está seleccionado. Un botón OK confirma la elección.</title>
      <rect class="ui-win" x="1" y="1" width="298" height="370" rx="6"/>
      <path class="ui-bar" d="M2 2 H298 V22 H2 Z"/>
      <text class="ui-title" x="10" y="15">Seleccionar inquilino</text>
      <path d="M280 9 l7 7 M287 9 l-7 7" stroke="#7B8794" stroke-width="1.1" fill="none"/>
      <text class="ui-l" x="10" y="42">Su cuenta tiene acceso a más de</text>
      <text class="ui-l" x="10" y="54">un inquilino. Elija uno para continuar.</text>
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
      <text class="ui-p" x="10" y="222">La configuración se guarda por separado</text>
      <text class="ui-p" x="10" y="233">por inquilino y se restaura al volver.</text>
      <rect class="ui-btn" x="190" y="320" width="100" height="26" rx="4"/>
      <text class="ui-bt" x="240" y="337" text-anchor="middle">OK</text>
    </svg>
  </div>
  <figcaption><b>Windows</b> El cuadro de diálogo de selección de inquilino en Windows. Aparece una vez, justo después de iniciar sesión, solo cuando la cuenta puede ver más de un inquilino. El cuadro de diálogo tiene el mismo aspecto en macOS, aparte del marco de la ventana.</figcaption>
</figure>

Este cuadro de diálogo aparece cuando su cuenta tiene acceso a más de un inquilino de Entra ID, por ejemplo a través de Azure Lighthouse. Elija el inquilino cuyos recursos desea usar y seleccione **OK**. Si ese inquilino requiere MFA y su token en caché aún no la satisface, se le pedirá una autenticación adicional.

Puede cambiar de inquilino en cualquier momento mientras la aplicación se está ejecutando. La configuración, es decir, la última suscripción, el host de Bastion y la VM utilizados, se almacena por separado para cada inquilino y vuelve automáticamente cuando cambia de nuevo.

## Seleccionar una suscripción

Una vez elegido un inquilino, la ventana principal se carga con una **suscripción de Bastion** mostrada en la parte superior. Si su cuenta tiene varias suscripciones y la elegida no contiene el host de Bastion que necesita, seleccione **Cambiar** para abrir el selector.

<div class="callout note">
<span class="eyebrow">Nota</span>
<p>La suscripción de Bastion en la parte superior es la que contiene su recurso Bastion. En la pestaña Azure VM, la suscripción de VM puede ser una completamente distinta. Las conexiones entre suscripciones funcionan sin configuración adicional.</p>
</div>

Su token permanece en disco entre inicios, por lo que no se le pedirá que inicie sesión de nuevo a menos que la sesión caduque o una política de Acceso Condicional lo requiera. Para forzar un inicio de sesión nuevo, seleccione **Cerrar sesión** en la barra superior. Elimina el token en caché y borra el estado de MSAL en un solo paso, y el siguiente inicio comienza desde un inicio de sesión en blanco.
