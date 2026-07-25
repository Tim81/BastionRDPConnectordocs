---
title: Métodos de conexión
description: 'Comparativa entre Túnel y RD Gateway: cómo transporta cada uno la sesión, a qué destinos llegan y cuál es el predeterminado en Windows y en macOS.'
appliesTo: '3.3.4'
lastReviewed: '2026-07-25'
---

Ambos métodos llegan a la misma máquina virtual a través del mismo host de Bastion. Se diferencian en cómo se transporta la sesión de escritorio remoto, y esa diferencia determina a qué destinos puede llegar cada uno.

<figure>
<div class="frame">
<svg viewBox="0 0 620 186" role="img" aria-labelledby="fig1t">
  <title id="fig1t">Su equipo no puede llegar directamente a la máquina virtual. Ambos métodos de conexión pasan por el host de Azure Bastion.</title>
  <!-- direct path, blocked -->
  <path class="w-dead" d="M104 40 H516"/>
  <line class="w-x" x1="300" y1="30" x2="320" y2="50"/>
  <line class="w-x" x1="320" y1="30" x2="300" y2="50"/>
  <text class="n-s" x="310" y="21" text-anchor="middle">sin IP pública · 3389 cerrado</text>
  <!-- routed path -->
  <path class="w-live" d="M104 120 H256"/>
  <path class="w-live" d="M364 120 H516"/>
  <text class="n-s" x="180" y="112" text-anchor="middle">443 saliente</text>
  <text class="n-s" x="440" y="112" text-anchor="middle">3389 dentro de la vnet</text>
  <!-- nodes -->
  <rect class="n-box" x="8" y="18" width="96" height="124" rx="5"/>
  <text class="n-t" x="56" y="74" text-anchor="middle">Su PC</text>
  <text class="n-s" x="56" y="92" text-anchor="middle">mstsc</text>
  <rect class="n-box n-hop" x="256" y="96" width="108" height="48" rx="5"/>
  <text class="n-t on" x="310" y="118" text-anchor="middle">Bastion</text>
  <text class="n-s" x="310" y="133" text-anchor="middle" fill="#98A2B3">SKU Estándar</text>
  <rect class="n-box" x="516" y="18" width="96" height="124" rx="5"/>
  <text class="n-t" x="564" y="74" text-anchor="middle">Azure VM</text>
  <text class="n-s" x="564" y="92" text-anchor="middle">IP privada</text>
  <text class="n-s" x="310" y="172" text-anchor="middle">Túnel y RD Gateway toman ambos la ruta inferior</text>
</svg>
</div>
<figcaption><b>Figura 1</b> La ruta directa no existe. Toda sesión se transporta a través del host de Bastion por el puerto 443.</figcaption>
</figure>

## Túnel

La aplicación abre un WebSocket hacia el host de Bastion y escucha en un puerto local de su equipo. Su cliente de escritorio remoto se conecta a `localhost` en ese puerto, y el tráfico se reenvía a través del WebSocket.

Dado que el destino no es más que una dirección al otro lado del túnel, este método llega a cualquier dirección IP a la que la red virtual de Bastion pueda enrutar. Eso incluye máquinas que no son VM de Azure.

Si el WebSocket se cae, el túnel se reconecta por sí solo, hasta cinco veces con un intervalo cada vez mayor entre intentos. Una sesión de escritorio remoto abierta sobrevive a una reconexión breve.

### Cuándo usarlo

- Se está conectando a una dirección IP en lugar de elegir una VM.
- Está en macOS, donde una sesión RD Gateway se interrumpe a los pocos segundos. Consulte [RD Gateway en macOS](#rd-gateway-en-macos).
- Quiere tener varias sesiones abiertas a la vez, cada una en su propio puerto local.

## RD Gateway

La aplicación le pide a Bastion un archivo `.rdp` preconfigurado que designa a Bastion como puerta de enlace de escritorio remoto, y luego entrega ese archivo a su cliente. No hay puerto local ni proceso de túnel.

Es el camino más corto, y en Windows es el predeterminado. Solo funciona cuando Bastion puede resolver el destino por sí mismo, lo que significa que funciona para VM de Azure y no para direcciones IP escritas manualmente.

<div class="callout warn">
<span class="eyebrow">Inicio de sesión entre inquilinos</span>
<p>La autenticación Entra ID está desactivada de forma predeterminada y debe permanecer así cuando la máquina virtual pertenece a un inquilino distinto al de la cuenta con la que inició sesión, que es el caso habitual con Azure Lighthouse. Azure AD devuelve <code>AADSTS293004</code> para esa combinación. Si la activa de todos modos y Bastion la rechaza, la aplicación vuelve a intentarlo con la opción desactivada, de modo que la sesión igualmente se abre. Consulte <a href="../entra-id/">Autenticación Entra ID</a>.</p>
</div>

### RD Gateway en macOS

RD Gateway se puede seleccionar en macOS y la conexión sí se abre. Después se interrumpe al cabo de aproximadamente diez a quince segundos con el error `0x3000064`.

La causa es una incompatibilidad de cifrado, no un error de configuración. La pila TLS del cliente de macOS solo ofrece conjuntos de cifrado RSA, y la puerta de enlace de Azure Bastion presenta ECDSA. Ninguno de los dos lados puede satisfacer al otro, así que la sesión se cierra poco después de iniciarse. Es una limitación del cliente por parte de Microsoft para la que no existe ninguna configuración que la solucione.

Microsoft admite la ruta RD Gateway de Bastion con el cliente de Windows. No es una combinación admitida con la aplicación Windows App en macOS.

Como la conexión parece tener éxito antes de fallar, la aplicación pregunta antes de intentarlo. Elegir RD Gateway en macOS muestra un aviso que nombra el código de error y ofrece Túnel en su lugar. Responder que sí igualmente realiza el intento, de modo que el comportamiento se puede comprobar en lugar de darlo por sentado.

Use Túnel en macOS. Llega a las mismas máquinas y es el predeterminado allí por esta razón.

## Comparación

| &nbsp; | Túnel | RD Gateway |
| --- | --- | --- |
| Conectarse a una VM de Azure | Sí | Sí |
| Conectarse a una dirección IP | Sí | No |
| Abre un puerto local | Sí, uno por sesión | No |
| Se reconecta automáticamente | Sí, hasta 5 intentos | No |
| Autenticación Entra ID | No aplica | Desactivada de forma predeterminada, opcional |
| Predeterminado en Windows | No | Sí |
| Predeterminado en macOS | Sí | No |
| Requiere Azure CLI | No | No |

El predeterminado solo se aplica hasta que usted mismo elija un método. Después, su elección se guarda por inquilino y se restaura la próxima vez que inicie la aplicación.

## Puertos

Ninguno de los dos métodos necesita una regla de firewall de entrada. Ambos usan el puerto 443 saliente desde su equipo hacia el host de Bastion.

| Desde | Hacia | Puerto |
| --- | --- | --- |
| Su equipo | bst-*.bastion.azure.com | 443/TCP saliente |
| Su equipo | login.microsoftonline.com | 443/TCP saliente |
| Host de Bastion | Máquina de destino | 3389/TCP dentro de la red virtual |
