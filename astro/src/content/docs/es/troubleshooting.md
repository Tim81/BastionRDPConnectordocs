---
title: Solución de problemas
description: Problemas frecuentes, descritos con las palabras que usaría para describirlos, y qué comprobar en cada caso.
appliesTo: '3.3.6'
lastReviewed: '2026-07-25'
---

## Antes de conectarse

### Volví a iniciar la aplicación y no pasó nada

La aplicación permite solo una instancia en ejecución. Si ya está abierta, minimizada o en la bandeja del sistema, iniciarla de nuevo trae la ventana existente al frente en lugar de abrir una nueva. Compruebe la bandeja del sistema, en Windows, para ver el icono de la aplicación.

<!-- Mirrors src/components/ScreenTray.astro -->
<figure class="appshot">
  <div class="frame">
    <svg viewBox="0 0 300 372" role="img" aria-labelledby="s-tray-win">
      <title id="s-tray-win">El menú contextual de la bandeja del sistema de Windows, desplegado. Se listan dos túneles abiertos, cada uno con controles Conectar y Detener. Debajo, Acerca de y Salir.</title>
      <rect class="ui-win" x="1" y="1" width="298" height="370" rx="6"/>
      <path class="ui-bar" d="M2 2 H298 V22 H2 Z"/>
      <text class="ui-title" x="10" y="15">Azure Bastion RDP Connector</text>
      <path d="M266 9 h7 M280 9 l7 7 M287 9 l-7 7" stroke="#7B8794" stroke-width="1.1" fill="none"/>
      <text class="ui-l" x="10" y="40">Bandeja del sistema, menú del clic derecho</text>
      <rect class="ui-panel" x="10" y="48" width="280" height="50" rx="4"/>
      <circle class="ui-run" cx="22" cy="63" r="3.5"/>
      <text class="ui-tb" x="32" y="67">vm-dev-web-01</text>
      <text class="ui-p" x="32" y="80">localhost:55000 · abierto 4m 12s</text>
      <rect class="ui-btn-2" x="194" y="59" width="46" height="15" rx="3"/>
      <text class="ui-tb" x="200" y="70">Conectar</text>
      <rect class="ui-btn-2" x="244" y="59" width="34" height="15" rx="3"/>
      <text class="ui-tb" x="252" y="70">Detener</text>
      <rect class="ui-panel" x="10" y="106" width="280" height="50" rx="4"/>
      <circle class="ui-run" cx="22" cy="121" r="3.5"/>
      <text class="ui-tb" x="32" y="125">10.20.4.15</text>
      <text class="ui-p" x="32" y="138">localhost:55001 · abierto 41s</text>
      <rect class="ui-btn-2" x="194" y="117" width="46" height="15" rx="3"/>
      <text class="ui-tb" x="200" y="128">Conectar</text>
      <rect class="ui-btn-2" x="244" y="117" width="34" height="15" rx="3"/>
      <text class="ui-tb" x="252" y="128">Detener</text>
      <line x1="10" y1="170" x2="290" y2="170" stroke="#DCE2EA" stroke-width="1"/>
      <text class="ui-tb" x="20" y="190">Acerca de</text>
      <text class="ui-tb" x="20" y="212">Salir</text>
      <text class="ui-p" x="10" y="352">Haga doble clic en el icono de la bandeja para restaurar la ventana principal.</text>
    </svg>
  </div>
  <figcaption><b>Windows</b> El menú contextual de la bandeja del sistema en Windows, desplegado. Cada túnel abierto tiene sus propios controles Conectar y Detener, seguidos de Acerca de y Salir.</figcaption>
</figure>

Cerrar la ventana principal, o minimizarla, no cierra la aplicación. Ambas acciones ocultan la ventana y la dejan ejecutándose en la bandeja, por lo que los túneles abiertos siguen conectados. Haga clic derecho en el icono de la bandeja y seleccione **Salir** para cerrarla por completo. El icono de la bandeja es exclusivo de Windows; macOS no tiene icono de bandeja por diseño.

### No aparecen suscripciones, o la lista de Bastion está vacía

Esto normalmente significa que su cuenta no tiene ninguna asignación de rol en ninguna suscripción, o que el inquilino en el que está no contiene ningún recurso de Bastion. Intente:

- Seleccionar **Actualizar** junto al campo de Bastion.
- Seleccionar **Cambiar** para elegir una suscripción distinta.
- Cerrar sesión y volver a iniciarla, por si su sesión caducó.
- Pedir a quien administre sus roles de Azure que confirme que tiene el rol Lector en el host de Bastion y su red virtual.

## Conectar

### mstsc se abre, pero la conexión falla para una VM de Azure por RD Gateway

Compruebe lo siguiente:

- El estado de energía de la VM muestra **En ejecución**, y déle al sistema operativo invitado uno o dos minutos después de eso para terminar de arrancar.
- El host de Bastion es SKU Estándar o Premium. Basic no admite el cliente nativo.
- Ninguna regla de grupo de seguridad de red bloquea el tráfico entrante de Bastion hacia la VM en el puerto 3389.
- Existe una ruta de Bastion a la VM, ya sea la misma red virtual, un emparejamiento o Virtual WAN.

### mstsc se abre, pero la conexión falla para una VM de Azure por Túnel

Todo lo anterior sigue aplicando, además de:

- Compruebe la pestaña [Túneles activos](../active-tunnels/). Si el túnel no aparece listado, o figura como detenido, intente conectarse de nuevo para iniciar uno nuevo.
- Si el puerto local que configuró ya estaba en uso, la aplicación eligió automáticamente el siguiente puerto libre. Compare el puerto mostrado en la pestaña Túneles activos con el que está usando su cliente.

### La conexión falla cuando escribo una dirección IP

- Confirme que la dirección es accesible desde la red virtual de Bastion, no solo desde su propio equipo. Para destinos locales eso significa una VPN de sitio a sitio o ExpressRoute funcionando; para otra nube, una conexión VPN hacia Azure.
- Confirme el puerto de destino. El 3389 es estándar para RDP, pero un host que no sea de Azure o que sea local puede escuchar en otro puerto.
- Compruebe si hay un firewall de host en el destino que bloquee el RDP entrante desde la subred de Bastion.

### El botón Iniciar no aparece para una VM detenida

Iniciar una VM requiere el rol Virtual Machine Contributor, o un rol equivalente; el rol Lector por sí solo no basta. Pida a quien administre sus roles de Azure que se lo otorgue, o inicie la VM desde el portal de Azure en su lugar.

### Recibí un error AADSTS293004

Azure AD devuelve esto cuando se usa [autenticación Entra ID](../entra-id/) contra una máquina virtual en un inquilino distinto al de la cuenta con la que inició sesión, que es el caso habitual con Azure Lighthouse.

Desmarque la casilla de autenticación Entra ID en la pestaña Azure VM y conéctese de nuevo. La opción está desactivada de forma predeterminada, así que si ve esto, se activó en algún momento y se guardó para este inquilino.

Puede ver este error en el registro sin que la conexión llegue a fallar. Cuando Bastion rechaza una solicitud con Entra ID, la aplicación vuelve a pedirlo con la opción desactivada y usa ese archivo, de modo que la sesión igualmente se abre tras un viaje de ida y vuelta adicional.

Si el error aparece al abrir directamente un archivo `.rdp` guardado, vuelva a conectarse desde la pestaña Azure VM en su lugar. Un archivo conservado de una sesión anterior lleva consigo la opción que estaba activa cuando se escribió.

## Inicio de sesión y restablecimiento

### Me sigue pidiendo iniciar sesión otra vez

La política de Acceso Condicional de su organización puede exigir reautenticación con cierta frecuencia, o MFA en cada inicio de sesión. Eso es lo esperado. Complete el aviso cuando aparezca; la aplicación no controla con qué frecuencia su inquilino lo solicita.

### Quiero empezar de cero

Seleccione **Cerrar sesión** en la barra superior para borrar su estado de inicio de sesión; elimina la caché de tokens y el estado de MSAL en un solo paso. Para restablecer también las preferencias, cierre la aplicación y elimine `%APPDATA%\BastionRDPConnector\settings.json`. [Archivos y configuración](../files-and-settings/) cubre qué contiene cada archivo y dónde se encuentra.

### Necesito enviar un registro a soporte

Abra **Acerca de** y seleccione **Copiar información de diagnóstico**, o **Abrir carpeta de log** para encontrar los archivos directamente. [Diagnósticos](../diagnostics/) cubre qué contiene el paquete y cómo se redacta.
