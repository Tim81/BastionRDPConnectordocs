---
title: Diagnósticos
description: Qué muestra el cuadro de diálogo Acerca de, qué recopila Copiar información de diagnóstico y qué queda fuera.
appliesTo: '3.3.5'
lastReviewed: '2026-07-25'
---

Un botón **i** en la barra superior abre el cuadro de diálogo Acerca de. Muestra la versión de la aplicación, una línea sobre su plataforma y dos acciones para obtener información de la aplicación cuando algo necesita resolverse.

## El cuadro de diálogo Acerca de

<!-- Mirrors src/components/ScreenAbout.astro -->
<figure class="appshot">
  <div class="frame">
    <svg viewBox="0 0 300 372" role="img" aria-labelledby="s-about-win">
      <title id="s-about-win">El cuadro de diálogo Acerca de en Windows. Lista el nombre de la aplicación, la versión y la plataforma, y después dos botones: Abrir carpeta de log y Copiar información de diagnóstico.</title>
      <rect class="ui-win" x="1" y="1" width="298" height="370" rx="6"/>
      <path class="ui-bar" d="M2 2 H298 V22 H2 Z"/>
      <text class="ui-title" x="10" y="15">Acerca de</text>
      <path d="M280 9 l7 7 M287 9 l-7 7" stroke="#7B8794" stroke-width="1.1" fill="none"/>
      <text class="ui-tb" x="10" y="46">Azure Bastion RDP Connector</text>
      <text class="ui-p" x="10" y="60">Versión 3.3.5</text>
      <text class="ui-p" x="10" y="72">Windows 11 · x64</text>
      <line x1="10" y1="86" x2="290" y2="86" stroke="#DCE2EA" stroke-width="1"/>
      <text class="ui-l" x="10" y="104">Diagnósticos</text>
      <rect class="ui-btn-2" x="10" y="110" width="280" height="24" rx="4"/>
      <text class="ui-tb" x="150" y="126" text-anchor="middle">Abrir carpeta de log</text>
      <text class="ui-p" x="10" y="148">Abre la carpeta que contiene debug.log</text>
      <text class="ui-p" x="10" y="159">y sus diez sesiones archivadas.</text>
      <rect class="ui-btn-2" x="10" y="170" width="280" height="24" rx="4"/>
      <text class="ui-tb" x="150" y="186" text-anchor="middle">Copiar información de diagnóstico</text>
      <text class="ui-p" x="10" y="208">Copia información del sistema, el registro</text>
      <text class="ui-p" x="10" y="219">actual y las sesiones archivadas al portapapeles.</text>
      <text class="ui-p" x="10" y="230">Ya redactado, limitado a ~1 MB.</text>
      <rect class="ui-btn" x="190" y="320" width="100" height="26" rx="4"/>
      <text class="ui-bt" x="240" y="337" text-anchor="middle">Cerrar</text>
    </svg>
  </div>
  <figcaption><b>Windows</b> El cuadro de diálogo Acerca de en Windows. Muestra la versión de la aplicación y la plataforma, y ofrece Abrir carpeta de log y Copiar información de diagnóstico.</figcaption>
</figure>

| Acción | Qué hace |
| --- | --- |
| Abrir carpeta de log | Abre la carpeta que contiene `debug.log` y sus diez sesiones archivadas, en el Explorador en Windows o en Finder en macOS. |
| Copiar información de diagnóstico | Copia un paquete de diagnóstico al portapapeles. |

## Qué contiene el paquete de diagnóstico

Copiar información de diagnóstico crea un paquete de texto a partir de:

- Información del sistema: sistema operativo, versión de la aplicación, plataforma.
- El `debug.log` de la sesión actual.
- Las sesiones archivadas, de `debug.0.log` a `debug.9.log`, de la más reciente a la más antigua.

Cada entrada de registro en el paquete está limitada a 100 KB, y el paquete completo deja de crecer en torno a 1 MB. Ese límite mantiene un paquete de una larga serie de sesiones práctico para pegarlo en un ticket de soporte o un mensaje de chat.

## Qué se redacta, y qué no

Todo en el paquete se redacta antes de llegar al portapapeles, de la misma forma en que se redacta antes de escribirse en `debug.log` en primer lugar. Los tokens Bearer, JWT, contraseñas y claves de API se reemplazan antes de que nada toque el disco.

Los ID de suscripción, ID de recurso, GUID y direcciones IP se conservan. No son secretos, y eliminarlos haría el registro mucho menos útil para averiguar en qué VM, suscripción u host de Bastion ocurrió un problema.

<div class="callout note">
<span class="eyebrow">Nota</span>
<p>La redacción ocurre en el momento de escribir, no en el momento de copiar. Una entrada de registro nunca se escribe en disco con un token activo dentro, así que no queda nada sensible en <code>debug.log</code> esperando a ser redactado más tarde.</p>
</div>

## Enviar un registro a soporte

Pegue la salida de Copiar información de diagnóstico directamente en un ticket de soporte o un mensaje de chat. Si el paquete está truncado y necesita el registro completo de una sesión, use Abrir carpeta de log para encontrar el archivo exacto y adjuntarlo en su lugar.
