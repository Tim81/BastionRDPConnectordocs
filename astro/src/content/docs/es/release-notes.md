---
title: Notas de la versión
description: Qué cambió en cada versión reciente de Azure Bastion RDP Connector.
appliesTo: '3.3.9'
lastReviewed: '2026-09-19'
---

## 3.3.9

| Cambio | Detalles |
| --- | --- |
| macOS: las caídas de RD Gateway son un error de Windows App for Mac | Windows App for Mac divide un paquete de RD Gateway en dos mensajes WebSocket, y Azure Bastion cierra entonces el WebSocket. Los paquetes de puerta de enlace mayores que el búfer de recepción de 20 480 bytes de Bastion también bloquean la sesión. Ambos se manifiestan como una desconexión en segundos, con el error `0x300006c`, `0x3000064` o `0x10b`. No es un problema de TLS ni de cifrado, como decían versiones anteriores. Se verificó en Windows App 11.4.1. FreeRDP sobre el mismo Bastion y el modo Túnel con Windows App se mantienen conectados, y ninguna propiedad del archivo `.rdp` lo soluciona. |
| macOS: aviso de RD Gateway reelaborado | RD Gateway sigue pudiéndose seleccionar en macOS por si Microsoft corrige el cliente. El aviso ahora explica lo que ocurre realmente y que su VM no es el problema. Ofrece **Usar Túnel en su lugar**, **Probar RD Gateway de todos modos** o Cancelar, en los seis idiomas. El cuadro de diálogo se titula "Problema conocido en macOS" en lugar de "No compatible con macOS". El elemento de menú Acerca de en macOS está ahora localizado y sigue al instante un cambio de idioma. |
| Túneles: fin de los bucles de reconexión inútiles | Cuando el cliente RDP cerraba su propia conexión, el túnel lo trataba como un error de red y reintentaba hasta cinco veces, obteniendo cada vez un nuevo token de Bastion sin ningún cliente conectado. Ahora cada conexión aceptada recibe un token de Bastion y un WebSocket durante toda su vida. Si el WebSocket termina mientras el cliente sigue conectado, la conexión local se cierra y la reconexión automática del propio cliente RDP abre una nueva con un token nuevo. El estado "Reconectando… (intento n/5)" desaparece. |
| Túneles: tiempos de espera, cierre limpio, reutilización y puerto de destino | La conexión del WebSocket caduca a los 30 segundos, y una solicitud de token a Bastion que agota el tiempo se notifica como error en lugar de una cancelación silenciosa. La sesión de Bastion siempre se limpia al salir, el cierre del WebSocket tiene un límite de tiempo y un túnel que se está deteniendo nunca recibe un cliente nuevo. Volver a conectar al mismo Bastion, destino y puerto reutiliza el túnel en ejecución y vuelve a lanzar el cliente RDP. Se respeta el puerto de destino elegido: los túneles de VM estaban fijados en 3389. Se recuerdan el último destino y el último puerto local, y las etiquetas muestran `vm:puerto`. |
| Una sesión de Azure caducada le devuelve al inicio de sesión | Las comprobaciones previas se omitían ante cualquier error, incluido un requisito de reautenticación de Acceso Condicional, y dejaban que la conexión fallara más tarde. Ahora la aplicación solicita el inicio de sesión y reintenta la operación una vez, al iniciar, al cargar suscripciones, Bastions y VM, al cambiar de suscripción, al conectar y al iniciar una VM. Solo hay una ventana de inicio de sesión abierta a la vez; un segundo disparador espera a la que ya está abierta. |
| Correcciones del inicio de sesión | La ventana principal se restaura antes de abrir cualquier ventana de inicio de sesión, de modo que el inicio de sesión ya no se cuelga cuando la ventana está oculta en la bandeja del sistema. Solo se descartan las excepciones de cuadro de diálogo conocidas e inofensivas por un propietario no visible o cerrado; todo lo demás se sigue registrando en el log y mostrando. La obtención de tokens está vinculada a la cuenta con la sesión iniciada, lo que corrige el uso de tokens de la cuenta equivocada cuando hay varias cuentas en caché. Iniciar sesión con otra cuenta vacía la caché de suscripciones. Al listar inquilinos, suscripciones y Bastions ahora se notifican los fallos en lugar de devolver una lista vacía. Si las suscripciones siguen sin cargarse tras la reautenticación, la aplicación se cierra en lugar de dejarle sin sesión y sin nada que elegir. |
| Estado de energía de la VM | El inicio de una VM se sigue por VM, de modo que al cambiar de VM ya no aparece "Iniciando" en la equivocada. Mientras una VM se inicia, el botón Iniciar está oculto y Conectar está desactivado. Se detecta un inicio fallido: si la VM sigue leyéndose como detenida o desasignada durante unos 30 segundos, recibe un error con el nombre de la VM en lugar de esperar todo el sondeo. Iniciar una VM y actualizar el estado de energía se reautentican ante una sesión caducada. |
| Otras mejoras de fiabilidad | Cerrar la ventana cancela el trabajo en curso sin ruido, sin cuadros de error durante el cierre. Se descarta una actualización obsoleta de Bastions o suscripciones si mientras tanto cambió de suscripción, y el cuadro Cambiar suscripción obtiene los Bastions antes de confirmar, de modo que un fallo deja intacta la suscripción anterior. Si el cliente RDP no se inicia, recibe una notificación, o una ventana restaurada con un cuadro de error si no hay icono en la bandeja. Restaurar desde la bandeja recupera el botón de la barra de tareas y el estado anterior de la ventana. Minimizar con un cuadro de diálogo o una ventana de inicio de sesión abiertos ya no lo oculta en la bandeja ni lo cierra. El cuadro Acerca de es de una sola instancia. Abrir carpeta de log ahora funciona con rutas que contienen espacios. |
| Seguridad: nombre de host de Bastion y paginación | La aplicación envía su token de ARM al host indicado en la respuesta de Azure. Ahora solo acepta un nombre DNS que termine en `.bastion.azure.com`, de modo que una dirección IP o un host ajeno nunca lo recibe, y las redirecciones están desactivadas en la solicitud del token. Los `nextLink` de ARM deben ser https en el host de ARM, el número de páginas está limitado a 500 y una respuesta fallida de Resource Graph genera un error en lugar de una lista truncada. |
| Seguridad: archivos temporales | Los archivos `.rdp` generados, que pueden contener un token de puerta de enlace activo, se eliminan al salir con una sobrescritura en la medida de lo posible. No es un borrado seguro garantizado. La carpeta temporal se rechaza si es un enlace simbólico o una unión. En macOS la carpeta se crea con 0700 y los archivos con 0600, y el archivo `.rdp` del túnel de macOS ahora pasa por el mismo tratamiento; antes era un archivo legible por todos en `$TMPDIR` que nunca se eliminaba. Los restos de un bloqueo o un cierre forzado se eliminan al iniciar, solo por la primera instancia confirmada. En macOS, los archivos `.rdp` y la carpeta de log se abren mediante la ruta absoluta `/usr/bin/open`. |

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
