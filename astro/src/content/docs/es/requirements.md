---
title: Requisitos previos
description: Qué debe cumplirse en su equipo y en Azure antes de que Azure Bastion RDP Connector pueda abrir una sesión.
appliesTo: '3.3.5'
lastReviewed: '2026-07-25'
---

La aplicación es autónoma. No necesita .NET instalado por separado y, desde la 3.0, tampoco necesita Azure CLI. Lo que sí necesita es un sistema operativo compatible, un cliente de escritorio remoto y un host de Bastion configurado para aceptar conexiones de cliente nativo.

## En su equipo

| Requisito | Notas |
| --- | --- |
| Windows 10 o posterior, x64 | Instalado desde la Microsoft Store |
| macOS 12 Monterey o posterior | Compatible desde la 3.1.2 para Apple Silicon e Intel, pero aún no disponible públicamente |
| Cliente de escritorio remoto, Windows | `mstsc.exe`, ya incluido en Windows |
| Cliente de escritorio remoto, macOS | Windows App, desde la Mac App Store. Úselo con Túnel. Una sesión RD Gateway se abre y luego se interrumpe a los pocos segundos con el error `0x3000064`, una incompatibilidad de cifrado que Microsoft no admite en este cliente |

<div class="callout note">
<span class="eyebrow">Nota</span>
<p>Azure CLI no es necesario. Las versiones anteriores llamaban a <code>az network bastion tunnel</code>; desde la 3.0 el túnel se construye de forma nativa con .NET. Si aún ejecuta una versión 2.x, todavía necesita Azure CLI y la extensión <code>azure-bastion</code>.</p>
</div>

## En Azure

| Requisito | Notas |
| --- | --- |
| Azure Bastion, SKU Estándar o Premium | Las SKU Basic y Developer no admiten el cliente nativo |
| Compatibilidad con cliente nativo, habilitada en el host de Bastion | Se activa por separado de la elección de la SKU |
| Conexión basada en IP, habilitada en el host de Bastion | Solo necesaria si piensa usar la pestaña Dirección IP |
| Rol de lector en el recurso de Bastion y su red virtual | El mínimo necesario para listar hosts de Bastion y conectarse a través de ellos |
| Rol de lector en la máquina virtual de destino | Necesario para listarla y conectarse a ella. Se necesita Virtual Machine Contributor o superior para iniciar una VM detenida |
| Una suscripción de Azure | La aplicación lista todas las suscripciones que su cuenta puede ver |

<div class="callout note">
<span class="eyebrow">Nota</span>
<p>La aplicación comprueba la SKU de Bastion y sus marcadores de características antes de conectar, y nombra el que falta si una comprobación no se cumple. Estas comprobaciones son fail-open: si la comprobación en sí no puede completarse, por ejemplo por un problema de red transitorio, el intento de conexión continúa de todas formas.</p>
</div>

## Accesibilidad de red

Un destino solo necesita ser accesible desde la red virtual de Bastion. No necesita ser una VM de Azure, ni necesita estar en Azure en absoluto.

- Bastion implementado en la misma red virtual, o en una emparejada con ella, es el caso simple.
- En una configuración hub-and-spoke o de zona de aterrizaje, Bastion suele estar en una zona de aterrizaje de conectividad centralizada y alcanza las redes virtuales spoke a través de Azure Virtual WAN. En esa topología, el recurso de Bastion no es visible desde dentro de un spoke individual en el Portal de Azure, aunque puede seguir alcanzando las VM que hay allí. Esta aplicación está construida exactamente para ese caso: elija el Bastion compartido una vez y luego conéctese a una VM en cualquier spoke al que pueda llegar.
- Las máquinas locales también son accesibles, a través de una VPN de sitio a sitio o ExpressRoute, y también lo son los sistemas Windows en otras nubes, siempre que exista una ruta.

Si no está seguro de si un host de Bastion puede alcanzar un destino en particular, pregunte a quien administre su red. La aplicación no tiene forma de ver rutas que no se exponen a través de las API que utiliza.
