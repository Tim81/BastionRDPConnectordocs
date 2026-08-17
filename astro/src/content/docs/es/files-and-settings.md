---
title: Archivos y configuración
description: Dónde guarda la aplicación sus preferencias, su estado de inicio de sesión y sus registros, y qué contiene cada archivo.
appliesTo: '3.3.6'
lastReviewed: '2026-07-25'
---

La aplicación escribe en dos carpetas separadas dentro de su perfil de usuario. Usted nunca edita estos archivos directamente; la aplicación los lee y los escribe por su cuenta.

## Configuración: itinerante, por inquilino

`%APPDATA%\BastionRDPConnector\settings.json` contiene sus preferencias: la última suscripción, host de Bastion, VM y dirección IP utilizados, el método de conexión, el modo de monitor, la autenticación Entra ID y su elección de idioma.

Esta carpeta se sincroniza con su perfil de Windows, por lo que las mismas preferencias le siguen entre equipos en un dominio o una red unida a Entra ID que sincronice `%APPDATA%`.

La mayor parte de lo que hay en este archivo se [almacena por separado por inquilino](../tenants/). El idioma es la única configuración global.

Las escrituras de configuración son atómicas: la aplicación escribe primero un archivo temporal y luego reemplaza el real en un solo paso. Si una escritura se interrumpe a mitad de camino, por ejemplo porque el proceso se cierra a la fuerza, pierde como mucho la preferencia de ese único guardado, no el archivo completo.

## Datos locales: estado de inicio de sesión y registros

`%LOCALAPPDATA%\BastionRDPConnector\` no se sincroniza. Contiene:

| Elemento | Propósito |
| --- | --- |
| `msal_token_cache.bin` | Su token de inicio de sesión en caché. Privado para esta aplicación, independiente de la propia caché de Azure CLI. |
| `WebView2\` | El perfil propio del navegador de inicio de sesión integrado: cookies, caché y almacenamiento local de la página de inicio de sesión. |
| `debug.log` | El registro de la sesión actual. |
| `debug.0.log` a `debug.9.log` | Las diez sesiones anteriores, conservadas desde la 3.3.4. Antes de eso, cada inicio sobrescribía el único archivo de registro. |

[Diagnósticos](../diagnostics/) cubre qué contiene el registro de depuración y cómo hacerlo llegar a soporte sin que lleve secretos.

<div class="callout note">
<span class="eyebrow">Nota</span>
<p>Los archivos <code>.rdp</code> temporales, generados para las conexiones RD Gateway, se guardan en <code>%TEMP%\BastionRDPConnector\</code> y se eliminan cuando la aplicación se cierra.</p>
</div>

## Restablecer

Eliminar `settings.json` devuelve cada preferencia a su valor predeterminado. Su sesión permanece iniciada; nada cambia en su caché de tokens.

Eliminar `msal_token_cache.bin`, o seleccionar **Cerrar sesión** en la barra superior, cierra su sesión y borra el token en caché. Cerrar sesión es la opción más segura: elimina la caché de tokens y borra el estado en memoria de MSAL en un solo paso, y el siguiente inicio comienza desde un inicio de sesión en blanco.

Para restablecer ambos, cierre primero la aplicación y luego elimine los dos archivos. Eliminar uno no afecta al otro.
