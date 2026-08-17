---
title: Monitores
description: Elija si una sesión RD Gateway se abre en su monitor principal o se extiende por todos los monitores conectados.
appliesTo: '3.3.6'
lastReviewed: '2026-07-25'
---

La pestaña Azure VM tiene una opción de Monitores junto al método de conexión. Solo se aplica a RD Gateway. Las conexiones Túnel no llevan una preferencia de monitor, porque su propio cliente de escritorio remoto gestiona la sesión una vez que el túnel está abierto.

## Las dos opciones

| Opción | Comportamiento |
| --- | --- |
| Monitor único | La sesión se abre a pantalla completa solo en su monitor principal. |
| Todos los monitores | La sesión se extiende por todos los monitores conectados, de modo que el escritorio remoto llena toda su configuración de varios monitores. |

Monitor único es el predeterminado. Elija Todos los monitores si quiere que la sesión remota se comporte como un segundo escritorio físico en todas sus pantallas.

## Por qué Túnel no tiene esta opción

La selección de monitor se escribe en el archivo `.rdp` que RD Gateway entrega a su cliente de escritorio remoto. Túnel no genera ningún archivo. Abre un puerto local y le deja lanzar el cliente usted mismo, así que no hay nada donde la aplicación pueda escribir la opción. Si cambia una sesión de RD Gateway a Túnel, configure el comportamiento de monitores directamente en su cliente RDP.

## Dónde se guarda la elección

La opción de monitor se guarda [por inquilino](../tenants/), junto con el método de conexión y la autenticación Entra ID. Cambiar de inquilino restaura lo que eligió por última vez para ese inquilino, y volver a RD Gateway en el mismo inquilino también lo recuerda.
