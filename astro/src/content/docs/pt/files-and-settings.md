---
title: Ficheiros e definições
description: Onde a aplicação guarda as suas preferências, o seu estado de início de sessão, e os seus registos, e o que está em cada ficheiro.
appliesTo: '3.3.4'
lastReviewed: '2026-07-25'
---

A aplicação escreve em duas pastas separadas dentro do seu perfil de utilizador. Nunca precisa de editar estes ficheiros diretamente; a aplicação lê-os e escreve-os sozinha.

## Definições: itinerantes, por inquilino

`%APPDATA%\BastionRDPConnector\settings.json` contém as suas preferências: a última subscrição, anfitrião Bastion, VM e endereço IP utilizados, método de ligação, modo de monitor, autenticação Entra ID, e a sua escolha de idioma.

Esta pasta acompanha o seu perfil do Windows, pelo que as mesmas preferências o seguem entre máquinas num domínio ou numa rede associada ao Entra ID que sincronize o `%APPDATA%`.

A maior parte do que está neste ficheiro é [guardada separadamente por inquilino](../tenants/). O idioma é a única definição global.

As escritas de definições são atómicas: a aplicação escreve primeiro um ficheiro temporário e depois substitui o real num único passo. Se uma escrita for interrompida a meio, por exemplo por o processo ser terminado, perde no máximo a preferência dessa gravação, não o ficheiro inteiro.

## Dados locais: estado de início de sessão e registos

`%LOCALAPPDATA%\BastionRDPConnector\` não é itinerante. Contém:

| Item | Finalidade |
| --- | --- |
| `msal_token_cache.bin` | O seu token de início de sessão em cache. Privado a esta aplicação, separado da cache do próprio Azure CLI. |
| `WebView2\` | O perfil do próprio navegador de início de sessão incorporado: cookies, cache e armazenamento local para a página de início de sessão. |
| `debug.log` | O registo da sessão atual. |
| `debug.0.log` a `debug.9.log` | As dez sessões anteriores, mantidas desde a 3.3.4. Antes disso, cada arranque substituía o único ficheiro de registo. |

[Diagnósticos](../diagnostics/) explica o que o registo de depuração contém e como o obter para o suporte sem que carregue segredos.

<div class="callout note">
<span class="eyebrow">Nota</span>
<p>Os ficheiros <code>.rdp</code> temporários, gerados para ligações RD Gateway, ficam em <code>%TEMP%\BastionRDPConnector\</code> e são eliminados quando a aplicação fecha.</p>
</div>

## Repor

Eliminar `settings.json` repõe todas as preferências para as predefinições. Continua com sessão iniciada; nada muda na sua cache de tokens.

Eliminar `msal_token_cache.bin`, ou selecionar **Terminar sessão** na barra superior, termina a sua sessão e limpa o token em cache. Terminar sessão é a opção mais segura: remove a cache de tokens e limpa o estado em memória do MSAL num único passo, e o arranque seguinte começa a partir de um início de sessão em branco.

Para repor ambos, feche primeiro a aplicação e depois elimine os dois ficheiros. Eliminar um não afeta o outro.
