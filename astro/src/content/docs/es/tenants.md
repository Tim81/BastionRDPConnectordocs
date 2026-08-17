---
title: Varios inquilinos
description: Cómo mantiene la aplicación un conjunto de preferencias distinto para cada inquilino de Entra ID que su cuenta puede ver, y qué permanece global.
appliesTo: '3.3.6'
lastReviewed: '2026-07-25'
---

Si su cuenta de Azure tiene acceso a más de un inquilino de Entra ID, por ejemplo a través de Azure Lighthouse, la aplicación mantiene un conjunto de preferencias distinto para cada uno en lugar de sobrescribir un único conjunto compartido cada vez que cambia.

## Cambiar de inquilino

[Inicio de sesión](../sign-in/) cubre el cuadro de diálogo de selección de inquilino que aparece justo después de autenticarse, cuando su cuenta puede ver más de un inquilino. También puede cambiar de inquilino más tarde, en cualquier momento mientras la aplicación se está ejecutando, desde el mismo control en la barra superior.

Cambiar de inquilino no cierra su sesión. Recarga la lista de suscripciones del inquilino elegido y restaura lo último que usó allí.

## Qué se almacena por inquilino

Cada inquilino tiene su propio espacio para:

- La última suscripción de Bastion y el último host de Bastion utilizados
- La última suscripción de VM y la última máquina virtual utilizadas
- La última dirección IP utilizada
- El puerto de destino y el puerto local
- El método de conexión, Túnel o RD Gateway
- El modo de monitor
- La autenticación Entra ID

Cambie del inquilino A al inquilino B y de vuelta, y el Bastion, la VM y los puertos del inquilino A vuelven exactamente como los dejó. Nada del inquilino B se traslada.

## Qué permanece global

Su elección de idioma se aplica en todos los inquilinos. Cámbiela mientras trabaja en un inquilino, y seguirá cambiada después de pasar a otro. El idioma es una preferencia sobre usted, no sobre el entorno al que está conectado.

## Dónde vive esto en el disco

Todo esto, tanto lo específico de cada inquilino como lo global, vive en un solo archivo: `%APPDATA%\BastionRDPConnector\settings.json`. [Archivos y configuración](../files-and-settings/) cubre la estructura del archivo y qué contiene cada ruta.
