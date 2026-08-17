---
title: Descripción general
description: Abra una sesión de escritorio remoto a través de Azure Bastion hacia una máquina virtual de Azure, o hacia cualquier sistema Windows al que la red de Bastion pueda enrutar.
appliesTo: '3.3.6'
lastReviewed: '2026-07-25'
---

Azure Bastion RDP Connector abre una sesión de escritorio remoto a través de Azure Bastion, usando el cliente de escritorio remoto ya instalado en su equipo. Las máquinas virtuales de Azure se eligen por nombre. Cualquier otro destino se alcanza por dirección, lo que incluye máquinas locales y máquinas en otras nubes.

## Qué hace

Azure Bastion es una ruta hacia una red, no solo hacia Azure. Llega a todo lo que su propia red virtual pueda alcanzar, así que una máquina no tiene que ser una VM de Azure, ni siquiera estar en Azure, para ser alcanzable a través de él.

Esta aplicación le pide a Bastion esa ruta y entrega el resultado a su cliente de escritorio remoto. Usted no copia cadenas de conexión, no gestiona certificados ni abre puertos de firewall.

Azure CLI no es necesario. Las versiones anteriores llamaban a `az network bastion` para construir el túnel. Desde la 3.0 la aplicación habla directamente con las API de Bastion y Azure Resource Manager, por lo que no es necesario instalar nada más.

## A qué puede llegar

| Destino | Cómo se elige | Requiere |
| --- | --- | --- |
| Máquina virtual de Azure | Elegirla por nombre desde la pestaña Azure VM, en todas sus suscripciones | Acceso de lector a la VM |
| Cualquier otro destino | Escribir su dirección en la pestaña Dirección IP | Conexión basada en IP habilitada en el host de Bastion |

La ruta por dirección es la más amplia de las dos. Llega a cualquier sistema al que la red virtual de Bastion pueda enrutar:

- Máquinas virtuales de Azure, en la misma red virtual o emparejadas con ella
- Servidores y equipos de escritorio Windows locales, a través de una VPN de sitio a sitio o ExpressRoute
- Sistemas Windows en otras nubes, como AWS, o en una nube privada

Todo lo que tenga una ruta y un puerto RDP en escucha es alcanzable. Que se ejecute en Azure o no es irrelevante.

Microsoft documenta directamente el caso local: la conexión basada en IP de Bastion "permite la conectividad a máquinas locales si existe conectividad híbrida entre el recurso de Azure Bastion y la máquina a la que desea conectarse". Consulte [Conectarse a una VM mediante una dirección IP privada especificada](https://learn.microsoft.com/en-us/azure/bastion/connect-ip-address).

## Dos formas de conectarse

La aplicación ofrece dos métodos de conexión. Llegan a la misma máquina y se diferencian en cómo se transporta la sesión.

| Método | Transporta la sesión mediante | Funciona con direcciones IP |
| --- | --- | --- |
| Túnel | Un puerto local reenviado a través de un WebSocket hacia Bastion | Sí |
| RD Gateway | Un archivo .rdp que apunta a Bastion como puerta de enlace | No |

[Métodos de conexión](../connection-methods/) explica cuándo usar cada uno, y por qué el predeterminado difiere entre Windows y macOS.

## Antes de empezar

- Un host de Azure Bastion con SKU Estándar o Premium. Las SKU Basic y Developer no admiten el cliente nativo.
- **Compatibilidad con cliente nativo** habilitada en ese host de Bastion.
- Acceso de lector al host de Bastion y a las máquinas virtuales a las que desea llegar.
- Windows 10 o posterior. Instalado desde la Microsoft Store.
- Existe una versión para macOS, compatible desde la 3.1.2 para Apple Silicon e Intel, pero aún no está disponible públicamente.

<div class="callout note">
<span class="eyebrow">Nota</span>
<p>La aplicación comprueba la SKU de Bastion y sus marcadores de características antes de conectar, e indica cuál falta si una comprobación no se cumple. Estas comprobaciones son fail-open, por lo que una comprobación que no puede completarse no le impide conectarse.</p>
</div>

## Dónde se almacenan las cosas

La configuración se sincroniza con su perfil de Windows. Los datos de inicio de sesión y los registros permanecen en el equipo.

| Ruta | Contiene |
| --- | --- |
| `%APPDATA%\BastionRDPConnector` | `settings.json`: última suscripción, Bastion, VM e idioma utilizados |
| `%LOCALAPPDATA%\BastionRDPConnector` | Caché de tokens de inicio de sesión, el perfil del navegador de inicio de sesión y `debug.log` con las últimas diez sesiones |
