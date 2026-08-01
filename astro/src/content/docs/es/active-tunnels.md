---
title: Túneles activos
description: Cada conexión Túnel que la aplicación tiene abierta, con su puerto local, tiempo transcurrido y controles para reconectar el cliente RDP o detenerla.
appliesTo: '3.3.5'
lastReviewed: '2026-07-25'
---

Cada conexión Túnel que abre, ya sea desde la pestaña Dirección IP o desde la pestaña Azure VM, aparece aquí mientras permanezca abierta. Las conexiones RD Gateway no aparecen en esta pestaña, porque no abren un puerto local que rastrear.

## La pestaña Túneles activos

<!-- Mirrors src/components/ScreenActiveTunnels.astro -->
<figure class="appshot">
  <div class="frame">
    <svg viewBox="0 0 300 372" role="img" aria-labelledby="s-tun-win">
      <title id="s-tun-win">La pestaña Túneles activos en Windows. En la parte superior se eligen una suscripción y un host de Bastion. La pestaña lista cada túnel abierto con su nombre, puerto local, tiempo transcurrido y un control para detenerlo.</title>
      <rect class="ui-win" x="1" y="1" width="298" height="370" rx="6"/>
      <path class="ui-bar" d="M2 2 H298 V22 H2 Z"/>
      <text class="ui-title" x="10" y="15">Azure Bastion RDP Connector</text>
      <path d="M266 9 h7 M280 9 l7 7 M287 9 l-7 7" stroke="#7B8794" stroke-width="1.1" fill="none"/>
      <text class="ui-l" x="10" y="40">Suscripción</text>
      <rect class="ui-field" x="10" y="44" width="182" height="15" rx="3"/>
      <text class="ui-v" x="15" y="55">Production - West Europe</text>
      <rect class="ui-btn-2" x="197" y="44" width="42" height="15" rx="3"/>
      <text class="ui-tb" x="204" y="55">Cambiar</text>
      <rect class="ui-btn-2" x="244" y="44" width="18" height="15" rx="3"/>
      <text class="ui-tb" x="250" y="55">i</text>
      <rect class="ui-btn-2" x="266" y="44" width="24" height="15" rx="3"/>
      <text class="ui-tb" x="270" y="55">out</text>
      <text class="ui-l" x="10" y="76">Host de Bastion</text>
      <rect class="ui-field" x="10" y="80" width="252" height="15" rx="3"/>
      <text class="ui-v" x="15" y="91">bastion-hub-weu</text>
      <rect class="ui-btn-2" x="266" y="80" width="24" height="15" rx="3"/>
      <text class="ui-tb" x="273" y="91">↻</text>
      <line x1="10" y1="120" x2="290" y2="120" stroke="#DCE2EA" stroke-width="1"/>
      <text class="ui-tb off" x="14" y="115">Dirección IP</text>
      <text class="ui-tb off" x="76" y="115">Azure VM</text>
      <text class="ui-tb" x="142" y="115">Túneles activos</text>
      <line class="ui-tabup" x1="138" y1="120" x2="230" y2="120"/>
      <rect class="ui-btn-2" x="246" y="130" width="44" height="15" rx="3"/>
      <text class="ui-tb" x="256" y="141">Actualizar</text>
      <rect class="ui-panel" x="10" y="152" width="280" height="50" rx="4"/>
      <circle class="ui-run" cx="22" cy="167" r="3.5"/>
      <text class="ui-tb" x="32" y="171">vm-dev-web-01</text>
      <text class="ui-p" x="32" y="184">localhost:55000 · abierto 4m 12s</text>
      <rect class="ui-btn-2" x="244" y="163" width="34" height="15" rx="3"/>
      <text class="ui-tb" x="252" y="174">Detener</text>
      <rect class="ui-panel" x="10" y="210" width="280" height="50" rx="4"/>
      <circle class="ui-run" cx="22" cy="225" r="3.5"/>
      <text class="ui-tb" x="32" y="229">10.20.4.15</text>
      <text class="ui-p" x="32" y="242">localhost:55001 · abierto 41s</text>
      <rect class="ui-btn-2" x="244" y="221" width="34" height="15" rx="3"/>
      <text class="ui-tb" x="252" y="232">Detener</text>
      <text class="ui-p" x="10" y="284">Los túneles se reconectan por sí solos si el</text>
      <text class="ui-p" x="10" y="295">WebSocket se cae, hasta cinco intentos.</text>
      <text class="ui-p" x="10" y="352">EN · NL · DE · FR · ES · PT</text>
    </svg>
  </div>
  <figcaption><b>Windows</b> La pestaña Túneles activos en Windows. Cada fila es un túnel abierto, con su puerto local, tiempo transcurrido y un control para detenerlo. La lista funciona igual en macOS.</figcaption>
</figure>

Cada fila indica el destino, el puerto local en el que escucha y cuánto tiempo lleva abierto.

| Control | Acción |
| --- | --- |
| Actualizar | Recarga la lista de túneles abiertos. |
| Conectar RDP | Vuelve a lanzar su cliente de escritorio remoto contra el puerto local de este túnel. Útil si cerró la ventana RDP sin detener el túnel. |
| Detener | Cierra la conexión WebSocket con Bastion y termina el túnel. |

<div class="callout warn">
<span class="eyebrow">Detener finaliza la sesión</span>
<p>Detener un túnel desconecta de inmediato cualquier sesión RDP que lo esté usando. Guarde su trabajo en la sesión remota antes.</p>
</div>

## Reconexión

Si la conexión WebSocket con Bastion se cae, por ejemplo por una interrupción breve de red o por mantenimiento de Bastion, el túnel se reconecta por sí solo. Reintenta hasta cinco veces, con un intervalo cada vez mayor entre intentos. Su sesión RDP normalmente permanece conectada durante una reconexión tan breve, así que puede que ni lo note.

Si los cinco intentos fallan, el túnel se detiene y la bandeja del sistema muestra una notificación de error. Desde allí, abra de nuevo la pestaña Azure VM o la pestaña Dirección IP y reconecte manualmente.
