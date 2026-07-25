---
title: Autenticación Entra ID
description: Inicio de sesión único para sesiones RD Gateway, cuándo activarlo y qué ocurre cuando Bastion lo rechaza.
appliesTo: '3.3.4'
lastReviewed: '2026-07-25'
---

La pestaña Azure VM tiene una casilla de autenticación Entra ID junto al método de conexión. Solo se aplica a RD Gateway, y está **desactivada de forma predeterminada**.

## Qué hace

Con la autenticación Entra ID activada, la sesión RDP inicia sesión con su identidad de Microsoft en lugar de pedir un nombre de usuario y contraseña de Windows. Funciona cuando su cuenta y la máquina virtual de destino están en el mismo inquilino de Entra ID, y la máquina está unida a ese inquilino.

Con la opción desactivada, la sesión usa la autenticación RDP tradicional y solicita un nombre de usuario y contraseña. Es el valor predeterminado porque funciona en cualquier caso, incluso entre inquilinos.

## Qué ocurre al activarla

La aplicación le pide a Bastion un archivo `.rdp` con la autenticación Entra ID habilitada. Si Bastion no devuelve uno, lo vuelve a pedir con la opción desactivada y usa ese en su lugar.

Así que marcar la casilla es una preferencia, no una exigencia. Si la combinación no es compatible, la conexión igualmente se abre, usando un nombre de usuario y contraseña.

El registro deja constancia de qué ruta se tomó:

```
Attempting RDP download WITH Entra ID Authentication...
Entra ID Auth failed, falling back to traditional authentication...
```

<div class="callout warn">
<span class="eyebrow">Entre inquilinos</span>
<p>La autenticación Entra ID no funciona cuando la máquina virtual pertenece a un inquilino distinto al de la cuenta con la que inició sesión, que es el caso habitual con Azure Lighthouse. Azure AD devuelve <code>AADSTS293004</code>. Deje la casilla desactivada para esas conexiones. El mecanismo de reserva se encargará de ello si se le olvida, al costo de un viaje de ida y vuelta adicional.</p>
</div>

## Por qué Túnel no tiene esta opción

Túnel transporta una conexión sin procesar hacia un puerto local. Cómo se autentica dentro de la sesión remota nunca pasa por la aplicación, así que no hay ninguna opción de Entra ID que mostrar. Inicie sesión dentro de la ventana RDP de la forma que espere la máquina de destino.

## Dónde se guarda la elección

La casilla se guarda [por inquilino](../tenants/), junto con el método de conexión y el modo de monitor. Cambiarla para un inquilino no afecta a ningún otro.
