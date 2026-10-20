---
title: Favoritos
description: Guarde hasta diez direcciones IP y VM de Azure por inquilino, y vuelva a conectarse desde la pestaña Favoritos con el host de Bastion seleccionado en ese momento.
appliesTo: '3.4.0'
lastReviewed: '2026-10-20'
---

Los favoritos son un camino más corto de vuelta a una conexión que usted ya hace. La lista guarda hasta diez entradas para el inquilino de Entra ID en el que ha iniciado sesión. Un favorito es una dirección IP o una VM de Azure. Los puertos, el método de conexión y el host de Bastion se quedan donde usted los configura.

## Añadir y quitar

En la pestaña [Dirección IP](../connect-ip/) y en la pestaña [Azure VM](../connect-vm/), una estrella está junto a **Conectar**. La información sobre herramientas es **Favorito**.

- Una estrella vacía significa que la dirección o la máquina virtual de esa pestaña no es un favorito. Haga clic en ella para guardar el destino actual. Una dirección IP válida se guarda tal como la escribió. Una máquina virtual se guarda con su nombre, su identificador de recurso, su grupo de recursos y la suscripción a la que pertenece, para que no tenga que elegir esa suscripción otra vez.
- Una estrella rellena significa que ya es un favorito. Haga clic en ella para quitarlo. La aplicación pide confirmación antes. **OK** lo quita. **Cancelar**, o cerrar el cuadro de diálogo, lo deja en su sitio.

La misma confirmación aparece cuando pulsa **Quitar** en una fila de la pestaña Favoritos.

Una dirección IP vacía o no válida, o ninguna máquina virtual seleccionada, no se guarda. La estrella sigue vacía y ve la misma advertencia que con **Conectar**. Una undécima entrada se rechaza hasta que quite una.

## Descripción

Un favorito de IP puede llevar una descripción breve de a dónde se conecta esa dirección, de 40 caracteres como máximo. En la pestaña Favoritos, la fila muestra ese texto bajo la dirección. Si no hay descripción, la fila muestra **Dirección IP**.

Un botón de lápiz abre un cuadro de diálogo. La información sobre herramientas es **Añadir descripción** cuando no hay ninguna, y **Editar descripción** cuando hay una guardada. Escriba el texto y pulse **Guardar**. **Cancelar**, o cerrar el cuadro, deja el texto guardado como estaba. Vaciar el campo y pulsar **Guardar** quita la descripción.

Un botón de papelera solo aparece cuando hay una descripción guardada. La información sobre herramientas es **Eliminar descripción**. Quita la descripción y deja el favorito en la lista. No pide confirmación.

Un favorito de VM no tiene descripción. Quitar el favorito sigue pidiendo confirmación, y eso también quita su descripción.

## Conectarse desde la lista

Abra la pestaña **Favoritos**. Cada fila es un destino guardado, con **Conectar** y **Quitar**.

**Conectar** usa el host de Bastion seleccionado en la parte superior de la ventana en ese momento. Cambie el host de Bastion y vuelva a conectarse, y se usa el host nuevo.

Un favorito de IP abre un túnel del mismo modo que la pestaña Dirección IP, incluidos el puerto de destino y el puerto local de esa pestaña.

Un favorito de VM usa el método de conexión seleccionado en la pestaña Azure VM.

- **Túnel** usa el puerto de destino y el puerto local de esa pestaña.
- **RD Gateway** usa el puerto 3389, la casilla de autenticación Entra ID y la elección de monitor de esa pestaña.

La máquina virtual debe seguir en la lista cargada para este inicio de sesión. Si no está, **Conectar** se detiene y se lo indica. Si el filtro actual de suscripción, nombre o etiqueta la ocultaría, **Conectar** cambia a la suscripción de esa VM, borra esos filtros y deja la pestaña Azure VM en esa máquina.

## Estado de energía

Un favorito de VM sigue las mismas reglas de estado de energía que la página [Azure VM](../connect-vm/). **Conectar** solo está disponible mientras la VM está en ejecución. Una VM detenida o desasignada ofrece **Iniciar VM** cuando su cuenta puede iniciarla. Mientras la VM se inicia, **Iniciar VM** está oculto y **Conectar** permanece desactivado. Un favorito de IP no tiene estado de energía.
