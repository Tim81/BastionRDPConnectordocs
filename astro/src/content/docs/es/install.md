---
title: Instalación
description: Azure Bastion RDP Connector se distribuye a través de la Microsoft Store. No hay descarga directa ni instalador independiente.
appliesTo: '3.3.4'
lastReviewed: '2026-07-25'
---

Azure Bastion RDP Connector se distribuye como una aplicación de la Microsoft Store, con el ID de producto `9N9MJ1V43Z6T`. Windows se encarga de la descarga, la instalación y cada actualización posterior. No hay ningún archivo ZIP que extraer ni ninguna advertencia de SmartScreen que aceptar.

## Instalar en Windows

1. Abra la página de la Store, ya sea con el enlace directo `ms-windows-store://pdp/?productid=9N9MJ1V43Z6T`, que abre la aplicación Store directamente, o desde un navegador en [apps.microsoft.com/detail/9N9MJ1V43Z6T](https://apps.microsoft.com/detail/9N9MJ1V43Z6T).
2. Seleccione **Obtener** o **Instalar**. Una instalación por usuario no requiere derechos de administrador.
3. Inícielo desde el menú Inicio. Busque "Bastion RDP Connector".

<div class="callout note">
<span class="eyebrow">Nota</span>
<p>Dado que la Store gestiona la instalación, las actualizaciones ocurren en segundo plano. No necesita comprobar usted mismo si hay una nueva versión.</p>
</div>

## macOS

Existe una versión para macOS desde la versión 3.1.2, tanto para Mac con Apple Silicon como con Intel, pero aún no está disponible públicamente. No hay ninguna descarga de macOS que ofrecer aquí. Cuando se publique, esta página tendrá el mismo listado estilo Store que ya tiene Windows.

## Qué hace el primer inicio

Nada se configura durante la propia instalación. La aplicación lee `%APPDATA%\BastionRDPConnector\settings.json` al iniciarse, y si ese archivo aún no existe, arranca con los valores predeterminados y lo crea en el primer guardado. [Inicio de sesión](../sign-in/) cubre lo que ocurre la primera vez que abre la aplicación y necesita autenticarse.
