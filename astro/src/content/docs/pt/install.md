---
title: Instalação
description: O Azure Bastion RDP Connector é distribuído através da Microsoft Store. Não existe descarregamento direto nem instalador separado.
appliesTo: '3.3.4'
lastReviewed: '2026-07-25'
---

O Azure Bastion RDP Connector é distribuído como uma aplicação da Microsoft Store, produto `9N9MJ1V43Z6T`. O Windows trata do descarregamento, da instalação e de todas as atualizações posteriores. Não há nenhum ficheiro ZIP para extrair nem nenhum aviso do SmartScreen para aceitar.

## Instalar no Windows

1. Abra a página da Store, quer com a ligação direta `ms-windows-store://pdp/?productid=9N9MJ1V43Z6T`, que abre diretamente a aplicação Store, quer a partir de um navegador em [apps.microsoft.com/detail/9N9MJ1V43Z6T](https://apps.microsoft.com/detail/9N9MJ1V43Z6T).
2. Selecione **Obter** ou **Instalar**. Uma instalação por utilizador não precisa de direitos de administrador.
3. Inicie-a a partir do menu Iniciar. Procure "Bastion RDP Connector".

<div class="callout note">
<span class="eyebrow">Nota</span>
<p>Como a Store é responsável pela instalação, as atualizações acontecem em segundo plano. Não precisa de verificar se existe uma nova versão.</p>
</div>

## macOS

Existe uma versão para macOS desde a versão 3.1.2, tanto para Macs com Apple Silicon como com Intel, mas ainda não está disponível publicamente. Não há aqui nenhum descarregamento para macOS a oferecer. Quando for lançada, esta página terá a mesma apresentação ao estilo da Store que o Windows já tem.

## O que acontece no primeiro arranque

Nada é configurado durante a própria instalação. A aplicação lê `%APPDATA%\BastionRDPConnector\settings.json` ao iniciar e, se esse ficheiro ainda não existir, arranca com as predefinições e cria-o na primeira gravação. [Início de sessão](../sign-in/) explica o que acontece da primeira vez que abre a aplicação e ela precisa de autenticar.
