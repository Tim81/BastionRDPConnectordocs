---
title: Conectarse a una VM de Azure
description: Elija una máquina virtual por nombre, en una suscripción o en todas ellas, compruebe su estado de energía, inícela si es necesario y conéctese.
appliesTo: '3.3.4'
lastReviewed: '2026-07-25'
---

La pestaña Azure VM lista las máquinas virtuales por nombre en lugar de pedir una dirección. Se divide en dos columnas: configuración de conexión a la izquierda, selección de VM a la derecha. Qué método de conexión está seleccionado de forma predeterminada depende de la plataforma, por lo que ambas se muestran a continuación.

## La pestaña Azure VM

<!-- Mirrors src/components/ScreenAzureVm.astro -->
<figure class="appshot">
  <div class="frame">
    <svg viewBox="0 0 300 372" role="img" aria-labelledby="s-vm-win">
      <title id="s-vm-win">La pestaña Azure VM en Windows. En la parte superior se eligen una suscripción y un host de Bastion. La pestaña contiene el método de conexión, la disposición de monitores, la opción Entra ID, una lista de máquinas virtuales con búsqueda, el estado de energía de la máquina seleccionada y el botón Conectar.</title>
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
      <text class="ui-tb" x="76" y="115">Azure VM</text>
      <line class="ui-tabup" x1="72" y1="120" x2="132" y2="120"/>
      <text class="ui-tb off" x="142" y="115">Túneles activos</text>
      <rect class="ui-panel" x="10" y="130" width="134" height="96" rx="4"/>
      <text class="ui-l" x="17" y="144">Método de conexión</text>
      <circle class="ui-ro" cx="22" cy="155" r="4"/>
      <text class="ui-tb" x="31" y="158">Túnel</text>
      <circle class="ui-ro on" cx="22" cy="169" r="4"/>
      <circle class="ui-rd" cx="22" cy="169" r="2"/>
      <text class="ui-tb" x="31" y="172">RD Gateway</text>
      <text class="ui-l" x="17" y="190">Monitores</text>
      <circle class="ui-ro on" cx="22" cy="200" r="4"/><circle class="ui-rd" cx="22" cy="200" r="2"/>
      <text class="ui-tb" x="31" y="203">Único</text>
      <circle class="ui-ro" cx="80" cy="200" r="4"/>
      <text class="ui-tb" x="89" y="203">Todos</text>
      <rect class="ui-ck" x="18" y="213" width="8" height="8" rx="2"/>
      <path d="M20 217 l2 2 l4 -4" stroke="#fff" stroke-width="1.2" fill="none"/>
      <text class="ui-tb" x="31" y="220">Autenticación Entra ID</text>
      <circle class="ui-ro on" cx="158" cy="138" r="4"/><circle class="ui-rd" cx="158" cy="138" r="2"/>
      <text class="ui-tb" x="167" y="141">Esta suscripción</text>
      <circle class="ui-ro" cx="158" cy="152" r="4"/>
      <text class="ui-tb" x="167" y="155">Todas las suscripciones</text>
      <rect class="ui-field" x="152" y="162" width="138" height="14" rx="3"/>
      <text class="ui-p" x="157" y="172">Buscar por nombre</text>
      <rect class="ui-field" x="152" y="180" width="138" height="14" rx="3"/>
      <text class="ui-p" x="157" y="190">Filtrar por etiqueta</text>
      <rect class="ui-field" x="152" y="198" width="138" height="15" rx="3"/>
      <text class="ui-v" x="157" y="209">vm-app-prod-01</text>
      <rect class="ui-panel" x="152" y="218" width="138" height="30" rx="4"/>
      <circle class="ui-run" cx="161" cy="233" r="3.5"/>
      <text class="ui-tb" x="170" y="236">En ejecución</text>
      <rect class="ui-btn-2" x="248" y="226" width="36" height="14" rx="3"/>
      <text class="ui-tb" x="254" y="236">Iniciar</text>
      <text class="ui-l" x="10" y="268">Puerto de destino</text>
      <rect class="ui-field" x="10" y="272" width="60" height="15" rx="3"/>
      <text class="ui-v" x="15" y="283">3389</text>
      <text class="ui-l" x="80" y="268">Puerto local</text>
      <rect class="ui-field" x="80" y="272" width="60" height="15" rx="3"/>
      <text class="ui-v" x="85" y="283">55001</text>
      <text class="ui-p" x="10" y="306">Se abre en mstsc</text>
      <rect class="ui-btn" x="10" y="320" width="280" height="26" rx="4"/>
      <text class="ui-bt" x="150" y="337" text-anchor="middle">Conectar</text>
      <text class="ui-p" x="10" y="362">EN · NL · DE · FR · ES · PT</text>
    </svg>
  </div>
  <figcaption><b>Windows</b> La pestaña Azure VM en Windows. RD Gateway es el predeterminado.</figcaption>
</figure>

<figure class="appshot">
  <div class="frame">
    <svg viewBox="0 0 300 372" role="img" aria-labelledby="s-vm-mac">
      <title id="s-vm-mac">La pestaña Azure VM en macOS. En la parte superior se eligen una suscripción y un host de Bastion. La pestaña contiene el método de conexión, la disposición de monitores, la opción Entra ID, una lista de máquinas virtuales con búsqueda, el estado de energía de la máquina seleccionada y el botón Conectar.</title>
      <rect class="ui-win" x="1" y="1" width="298" height="370" rx="8"/>
      <path class="ui-bar" d="M2 2 H298 V24 H2 Z"/>
      <circle cx="14" cy="13" r="4" fill="#FF5F57"/>
      <circle cx="27" cy="13" r="4" fill="#FEBC2E"/>
      <circle cx="40" cy="13" r="4" fill="#28C840"/>
      <text class="ui-title" x="150" y="16" text-anchor="middle">Azure Bastion RDP Connector</text>
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
      <text class="ui-tb" x="76" y="115">Azure VM</text>
      <line class="ui-tabup" x1="72" y1="120" x2="132" y2="120"/>
      <text class="ui-tb off" x="142" y="115">Túneles activos</text>
      <rect class="ui-panel" x="10" y="130" width="134" height="96" rx="4"/>
      <text class="ui-l" x="17" y="144">Método de conexión</text>
      <circle class="ui-ro on" cx="22" cy="155" r="4"/>
      <circle class="ui-rd" cx="22" cy="155" r="2"/>
      <text class="ui-tb" x="31" y="158">Túnel</text>
      <circle class="ui-ro" cx="22" cy="169" r="4"/>
      <text class="ui-tb" x="31" y="172">RD Gateway</text>
      <text class="ui-l" x="17" y="190">Monitores</text>
      <circle class="ui-ro on" cx="22" cy="200" r="4"/><circle class="ui-rd" cx="22" cy="200" r="2"/>
      <text class="ui-tb" x="31" y="203">Único</text>
      <circle class="ui-ro" cx="80" cy="200" r="4"/>
      <text class="ui-tb" x="89" y="203">Todos</text>
      <rect class="ui-ck" x="18" y="213" width="8" height="8" rx="2"/>
      <path d="M20 217 l2 2 l4 -4" stroke="#fff" stroke-width="1.2" fill="none"/>
      <text class="ui-tb" x="31" y="220">Autenticación Entra ID</text>
      <circle class="ui-ro on" cx="158" cy="138" r="4"/><circle class="ui-rd" cx="158" cy="138" r="2"/>
      <text class="ui-tb" x="167" y="141">Esta suscripción</text>
      <circle class="ui-ro" cx="158" cy="152" r="4"/>
      <text class="ui-tb" x="167" y="155">Todas las suscripciones</text>
      <rect class="ui-field" x="152" y="162" width="138" height="14" rx="3"/>
      <text class="ui-p" x="157" y="172">Buscar por nombre</text>
      <rect class="ui-field" x="152" y="180" width="138" height="14" rx="3"/>
      <text class="ui-p" x="157" y="190">Filtrar por etiqueta</text>
      <rect class="ui-field" x="152" y="198" width="138" height="15" rx="3"/>
      <text class="ui-v" x="157" y="209">vm-app-prod-01</text>
      <rect class="ui-panel" x="152" y="218" width="138" height="30" rx="4"/>
      <circle class="ui-run" cx="161" cy="233" r="3.5"/>
      <text class="ui-tb" x="170" y="236">En ejecución</text>
      <rect class="ui-btn-2" x="248" y="226" width="36" height="14" rx="3"/>
      <text class="ui-tb" x="254" y="236">Iniciar</text>
      <text class="ui-l" x="10" y="268">Puerto de destino</text>
      <rect class="ui-field" x="10" y="272" width="60" height="15" rx="3"/>
      <text class="ui-v" x="15" y="283">3389</text>
      <text class="ui-l" x="80" y="268">Puerto local</text>
      <rect class="ui-field" x="80" y="272" width="60" height="15" rx="3"/>
      <text class="ui-v" x="85" y="283">55001</text>
      <text class="ui-p" x="10" y="306">Se abre en Windows App</text>
      <rect class="ui-btn" x="10" y="320" width="280" height="26" rx="4"/>
      <text class="ui-bt" x="150" y="337" text-anchor="middle">Conectar</text>
      <text class="ui-p" x="10" y="362">EN · NL · DE · FR · ES · PT</text>
    </svg>
  </div>
  <figcaption><b>macOS</b> La pestaña Azure VM en macOS. Túnel es el predeterminado. RD Gateway se puede seleccionar igualmente, y la aplicación avisa antes de usarlo.</figcaption>
</figure>

El predeterminado solo se aplica hasta que usted mismo elija un método; después, su elección se guarda por inquilino y se restaura la próxima vez que abra la aplicación.

## Elegir una VM

Un par de botones de opción encima de la lista de VM controla cómo funciona la búsqueda.

| Modo | Comportamiento |
| --- | --- |
| Esta suscripción (predeterminado) | Lista de inmediato todas las VM de la suscripción seleccionada. Escriba en el cuadro de filtro para acotarla por nombre. La lista desplegable de suscripciones solo muestra las que realmente contienen VM. |
| Todas las suscripciones | Busca en todas las suscripciones que su cuenta puede ver, mediante Azure Resource Graph. Requiere al menos tres caracteres antes de devolver resultados. Cargar VM en unas 200 suscripciones tarda de 2 a 4 segundos, frente a los 30 a 60 segundos de consultar cada suscripción por separado. |

<div class="callout note">
<span class="eyebrow">Nota</span>
<p>El filtrado por etiqueta funciona junto con el filtro de nombre en ambos modos, de modo que puede acotar aún más una lista larga antes de elegir una VM.</p>
</div>

## Campos

| Campo | Descripción |
| --- | --- |
| Método de conexión | Túnel o RD Gateway. El predeterminado es RD Gateway en Windows y Túnel en macOS. |
| Monitores | Monitor único o todos los monitores. Solo aplica a RD Gateway. |
| Autenticación Entra ID | Opcional, se muestra solo para RD Gateway. Habilita el inicio de sesión único cuando su cuenta y la VM comparten inquilino. |
| Máquina virtual | La VM a la que conectarse, elegida de la lista de la derecha. |
| Puerto de destino, puerto local | Se usan solo en modo Túnel, y se comparten con la pestaña Dirección IP. |

Antes de conectar, la aplicación comprueba la SKU de Bastion y sus marcadores de características, y el estado de energía de la VM, e indica qué falta si una comprobación no se cumple. Estas comprobaciones son fail-open: una comprobación que no puede completarse no bloquea la conexión.

## Estado de energía e inicio de una VM

El estado de energía de la VM seleccionada se muestra junto a su nombre.

| Estado | Significado |
| --- | --- |
| En ejecución (verde) | La VM está encendida y lista para aceptar conexiones. |
| Detenida o desasignada (rojo) | La VM está apagada. Aparece un botón **Iniciar**. |
| Iniciando, deteniendo u otro (ámbar) | La VM está en un estado intermedio. Se muestra un indicador de progreso mientras la aplicación espera a que se estabilice. |

Para iniciar una VM detenida, seleccione **Iniciar**. El botón se reemplaza por un indicador de progreso mientras la aplicación consulta a Azure el estado actualizado, una vez cada 5 segundos durante un máximo de 5 minutos. Cuando el estado se pone en verde, una notificación confirma que la VM está lista y **Conectar** queda disponible.

<div class="callout warn">
<span class="eyebrow">Iniciar requiere más que Lector</span>
<p>Iniciar una VM requiere el rol Virtual Machine Contributor o un rol con derechos equivalentes. Si el botón Iniciar no aparece, lo más probable es que su cuenta solo tenga el rol Lector en esa VM.</p>
</div>

<div class="callout note">
<span class="eyebrow">En ejecución no es lo mismo que lista</span>
<p>En ejecución significa que Azure ha encendido la VM. El sistema operativo invitado todavía necesita uno o dos minutos para terminar de arrancar antes de aceptar conexiones RDP. Si una conexión se rechaza justo después de que el estado se ponga en verde, espere un par de minutos e inténtelo de nuevo. Conectar vuelve a comprobar el estado de energía en el momento en que lo selecciona, incluso si hizo clic justo después de que cambiara el indicador.</p>
</div>
