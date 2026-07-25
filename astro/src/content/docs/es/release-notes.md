---
title: Notas de la versión
description: Qué cambió en cada versión reciente de Azure Bastion RDP Connector.
appliesTo: '3.3.4'
lastReviewed: '2026-07-25'
---

## 3.3.4

| Cambio | Detalles |
| --- | --- |
| Icono de la bandeja del sistema restaurado | El icono de la bandeja no aparecía en Windows en las versiones 3.2 a 3.3.3. Minimizar a la bandeja, las notificaciones de túnel y el menú contextual de la bandeja vuelven a funcionar tal como describe esta documentación. |
| Diez sesiones de historial de registros | `debug.log` solía sobrescribirse en cada inicio. Las últimas diez sesiones ahora se conservan como `debug.0.log` a `debug.9.log`, de modo que el registro de la ejecución en la que ocurrió un problema sobrevive a un reinicio. |
| El paquete de diagnóstico cubre sesiones anteriores | Copiar información de diagnóstico ahora incluye los registros de sesiones archivadas junto con el actual, de la más reciente a la más antigua, hasta cerca de 1 MB. |
| La limpieza termina antes de cerrar la ventana | Los túneles activos se cierran y los archivos `.rdp` temporales se eliminan antes de que se cierre la ventana. Cerrar sesión ejecuta la misma limpieza en lugar de terminar el proceso de inmediato. |
| Almacenamiento del navegador de inicio de sesión reubicado | El navegador de inicio de sesión integrado solía guardar su perfil junto al archivo de la aplicación, lo que impedía iniciar sesión cuando la aplicación se ejecutaba desde una carpeta protegida contra escritura como Program Files. Ahora vive en `%LOCALAPPDATA%\BastionRDPConnector\WebView2`. La ubicación de la caché de tokens no cambia. |
| Componentes actualizados | Avalonia 12.1.0, MSAL 4.87.0, Azure.Core 1.60.0. |

## 3.3

| Cambio | Detalles |
| --- | --- |
| Carga de VM con Azure Resource Graph | Las VM de unas 200 suscripciones se cargan en 2 a 4 segundos, frente a los 30 a 60 segundos anteriores. Las consultas entre suscripciones usan la API de Azure Resource Graph en lugar de consultar cada suscripción por turno. |
| Búsqueda de VM entre suscripciones | El modo Todas las suscripciones en la pestaña Azure VM busca en todas las suscripciones que su cuenta puede ver. Requiere al menos tres caracteres antes de devolver resultados, y la lista desplegable de suscripciones ahora solo lista las que realmente contienen VM. |
| Pestaña Azure VM de dos columnas | El método de conexión, el modo de monitor y la autenticación Entra ID se ubican en la columna izquierda; la selección de VM se ubica en la columna derecha. |
| Comprobaciones preliminares | Antes de conectar, la aplicación comprueba la SKU de Bastion, sus marcadores de características y el estado de energía de la VM. Estas comprobaciones son fail-open: una comprobación que no puede completarse no bloquea la conexión. |
| Reconexión automática de Túnel | Si la conexión WebSocket se cae, el túnel se reconecta por sí solo, hasta cinco veces con un intervalo cada vez mayor entre intentos. La mayoría de las sesiones RDP permanecen conectadas durante una reconexión tan breve. |
| Cuadro de diálogo Acerca de y paquete de diagnóstico | El botón i en la barra superior, Abrir carpeta de registros y Copiar información de diagnóstico se incorporaron todos en esta versión. |
| Método de conexión predeterminado según la plataforma | RD Gateway pasó a ser el predeterminado en Windows, y Túnel el predeterminado en macOS, porque Windows App en macOS no puede usar Bastion como puerta de enlace. El predeterminado solo se aplica hasta que usted mismo elija un método. |
| Compatibilidad con pantallas HD Ready | La ventana creció a 580×760, desde aproximadamente 540×700, y ahora cabe sin barra de desplazamiento en pantallas 1280×720. |
