---
title: Conectarse a una dirección IP
description: La pestaña Dirección IP llega a todo lo que la red virtual de Bastion pueda enrutar, no solo a VM de Azure, mediante una conexión Túnel.
appliesTo: '3.3.5'
lastReviewed: '2026-07-25'
---

Use esta pestaña cuando la máquina que desea no tenga un registro de VM que pueda elegir por nombre, o no sea una VM de Azure en absoluto. Llega a máquinas locales a través de una VPN o ExpressRoute, a sistemas Windows en otras nubes y a cualquier VM de Azure a la que prefiera dirigirse directamente en lugar de buscarla.

## La pestaña Dirección IP

<!-- Mirrors src/components/ScreenIpAddress.astro -->
<figure class="appshot">
  <div class="frame">
    <svg viewBox="0 0 300 372" role="img" aria-labelledby="s-ip-win">
      <title id="s-ip-win">La pestaña Dirección IP en Windows. En la parte superior se eligen una suscripción y un host de Bastion. La pestaña contiene un campo de dirección, puerto de destino, puerto local y el botón Conectar.</title>
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
      <text class="ui-tb" x="14" y="115">Dirección IP</text>
      <line class="ui-tabup" x1="10" y1="120" x2="70" y2="120"/>
      <text class="ui-tb off" x="76" y="115">Azure VM</text>
      <text class="ui-tb off" x="142" y="115">Túneles activos</text>
      <rect class="ui-panel" x="10" y="132" width="280" height="112" rx="4"/>
      <text class="ui-l" x="20" y="150">Dirección IP</text>
      <rect class="ui-field" x="20" y="154" width="260" height="16" rx="3"/>
      <text class="ui-v" x="25" y="165">10.20.4.15</text>
      <text class="ui-l" x="20" y="185">Puerto de destino</text>
      <rect class="ui-field" x="20" y="189" width="120" height="15" rx="3"/>
      <text class="ui-v" x="25" y="200">3389</text>
      <text class="ui-l" x="160" y="185">Puerto local</text>
      <rect class="ui-field" x="160" y="189" width="120" height="15" rx="3"/>
      <text class="ui-v" x="165" y="200">55000</text>
      <text class="ui-p" x="20" y="220">Llega a cualquier dirección a la que la red</text>
      <text class="ui-p" x="20" y="231">virtual de Bastion pueda enrutar.</text>
      <text class="ui-p" x="10" y="268">Se abre en mstsc</text>
      <rect class="ui-btn" x="10" y="282" width="280" height="26" rx="4"/>
      <text class="ui-bt" x="150" y="299" text-anchor="middle">Conectar</text>
      <text class="ui-p" x="10" y="352">EN · NL · DE · FR · ES · PT</text>
    </svg>
  </div>
  <figcaption><b>Windows</b> La pestaña Dirección IP en Windows. Túnel es el único método disponible aquí, porque RD Gateway no puede resolver una dirección escrita manualmente. En macOS el diseño es idéntico; Conectar abre Windows App en lugar de mstsc.</figcaption>
</figure>

Esta pestaña siempre usa Túnel. RD Gateway necesita que Bastion resuelva el destino por sí mismo, y una dirección escrita manualmente no le da nada que resolver.

## Campos

| Campo | Descripción | Predeterminado |
| --- | --- | --- |
| Dirección IP | La dirección privada de la máquina de destino. Debe ser accesible desde la red virtual del host de Bastion. | ninguno |
| Puerto de destino | El puerto RDP en escucha en la máquina remota. | 3389 |
| Puerto local | El puerto en su equipo donde escucha el túnel. Su cliente de escritorio remoto se conecta a `localhost:[Puerto local]`. | 55000 |

El puerto de destino y el puerto local se comparten con la pestaña Azure VM. Cambie uno allí y también cambia aquí.

## Cómo conectarse

1. Escriba la dirección de destino.
2. Deje el puerto de destino en 3389 a menos que la máquina escuche en otro puerto, y cambie el puerto local solo si el 55000 ya está en uso en su equipo.
3. Seleccione **Conectar**. La aplicación abre un túnel WebSocket hacia Bastion y lanza su cliente de escritorio remoto apuntando a `localhost:[Puerto local]`.

<div class="callout warn">
<span class="eyebrow">Accesibilidad, no nomenclatura</span>
<p>La aplicación no tiene forma de confirmar que una dirección de destino sea correcta más allá de comprobaciones de formato. Si la red virtual de Bastion no puede enrutar a esa dirección, el túnel se abre pero el cliente de escritorio remoto no puede completar la conexión. Consulte con quien administre su red si no está seguro de que exista una ruta.</p>
</div>
