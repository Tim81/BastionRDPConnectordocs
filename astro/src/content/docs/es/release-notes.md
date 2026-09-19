---
title: Notas de la versión
description: Qué cambió en cada versión reciente de Azure Bastion RDP Connector.
appliesTo: '3.3.9'
lastReviewed: '2026-09-19'
---

## 3.3.9

| Cambio | Detalles |
| --- | --- |
| Las sesiones caducadas piden iniciar sesión de nuevo | Las comprobaciones previas (SKU de Bastion, indicadores de funcionalidades, estado de energía de la VM) eran fail-open ante cualquier error, incluida una sesión de Azure caducada. Ahora una sesión caducada llega al flujo de inicio de sesión en lugar de dejarse pasar. Los demás errores siguen siendo fail-open. |
| Ventana principal restaurada antes de la ventana de inicio de sesión | La ventana principal se restaura antes de que se abra la ventana emergente de inicio de sesión. Las excepciones de cuadro de diálogo conocidas e inofensivas por un propietario no visible o cerrado se registran en el log y se descartan, en lugar de bloquear la aplicación y perder los túneles activos. |
| Archivos `.rdp` temporales obsoletos eliminados al iniciar | Los archivos que deja un bloqueo o un cierre forzado se eliminan en el siguiente inicio, solo por la primera instancia en ejecución. Los archivos `.rdp` generados se guardan en una carpeta temporal de la aplicación propia de cada usuario y accesible solo por él, y se eliminan al salir con una sobrescritura en la medida de lo posible. No es un borrado seguro garantizado. |
| macOS: los archivos `.rdp` y la carpeta de log se abren con `/usr/bin/open` | Ambos se abren ahora mediante la ruta absoluta `/usr/bin/open`. |
| macOS: aviso de RD Gateway reelaborado | Windows App for Mac actualmente no puede mantener una sesión de RD Gateway a través de Azure Bastion: la sesión se desconecta en segundos, con el error `0x300006c`, `0x3000064` o `0x10b`. La VM no es el problema. El cuadro de diálogo ahora se titula "Problema conocido en macOS" en lugar de "No compatible con macOS" y ofrece **Usar Túnel en su lugar** o **Probar RD Gateway de todos modos**. |
| macOS: elemento de menú Acerca de localizado | El elemento de menú Acerca de está traducido y sigue los cambios de idioma al instante. |

## 3.3.8

| Cambio | Detalles |
| --- | --- |
| MSAL 4.90.0 | Se actualizó la Microsoft Authentication Library, que gestiona el inicio de sesión. |
| Runtime .NET con correcciones de seguridad | El SDK mínimo de compilación sube a 10.0.401, de modo que el runtime incluido es .NET 10.0.12, con las correcciones de seguridad. Las correcciones de seguridad del runtime le llegan mediante las actualizaciones de la aplicación. |
| macOS: icono de la aplicación en forma de squircle | El icono de la aplicación es ahora un squircle, de modo que macOS Tahoe ya no lo coloca en un recuadro blanco. |

## 3.3.7

| Cambio | Detalles |
| --- | --- |
| Componentes actualizados | Azure.Core 1.62.0, paquetes de Avalonia 12.1.2 y actualizaciones del grupo de identidad (MSAL y paquetes relacionados). Solo actualizaciones de dependencias. |

## 3.3.6

| Cambio | Detalles |
| --- | --- |
| Actualización de seguridad del runtime .NET incluido | La aplicación incorpora su propia copia de .NET y no usa ninguna instalada en su equipo. Por eso las correcciones de seguridad del runtime le llegan mediante una actualización de la aplicación y no a través de las actualizaciones de Windows o macOS. Esta versión se compila sobre .NET 10.0.11, una versión de seguridad del runtime. |
| Componentes actualizados | Avalonia.Controls.WebView 12.1.0 y Azure.Core 1.61.0. |

## 3.3.5

| Cambio | Detalles |
| --- | --- |
| *Log* deja de traducirse en alemán, francés y español | El botón Abrir carpeta de log y el mensaje de conexión fallida traducían *log* como *Protokoll*, *journal* y *registro*, que se leen como un cuaderno de bitácora corriente en lugar del término técnico. Ambos mantienen ahora el préstamo: *Log-Ordner öffnen*, *Ouvrir le dossier de log*, *Abrir carpeta de log*. El inglés, el neerlandés y el portugués no cambian. |

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
| Cuadro de diálogo Acerca de y paquete de diagnóstico | El botón i en la barra superior, Abrir carpeta de log y Copiar información de diagnóstico se incorporaron todos en esta versión. |
| Método de conexión predeterminado según la plataforma | RD Gateway pasó a ser el predeterminado en Windows, y Túnel el predeterminado en macOS, porque Windows App en macOS no puede usar Bastion como puerta de enlace. El predeterminado solo se aplica hasta que usted mismo elija un método. |
| Compatibilidad con pantallas HD Ready | La ventana creció a 580×760, desde aproximadamente 540×700, y ahora cabe sin barra de desplazamiento en pantallas 1280×720. |
