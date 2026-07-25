---
title: Múltiplos inquilinos
description: Como a aplicação mantém um conjunto separado de preferências para cada inquilino Entra ID que a sua conta consegue ver, e o que se mantém global.
appliesTo: '3.3.4'
lastReviewed: '2026-07-25'
---

Se a sua conta tiver acesso a mais do que um inquilino Entra ID, por exemplo através do Azure Lighthouse, a aplicação mantém um conjunto separado de preferências para cada um, em vez de substituir um único conjunto partilhado sempre que muda.

## Mudar de inquilino

[Início de sessão](../sign-in/) explica a caixa de diálogo de seleção de inquilino que aparece logo depois de autenticar, quando a sua conta consegue ver mais do que um inquilino. Também pode mudar de inquilino mais tarde, a qualquer momento enquanto a aplicação está a correr, a partir do mesmo controlo na barra superior.

Mudar de inquilino não termina a sua sessão. Volta a carregar a lista de subscrições do inquilino escolhido e restaura o que utilizou aí pela última vez.

## O que é guardado por inquilino

Cada inquilino tem o seu próprio espaço para:

- A última subscrição de Bastion e o último anfitrião Bastion utilizados
- A última subscrição de VM e a última máquina virtual utilizadas
- O último endereço IP utilizado
- Porta de destino e porta local
- Método de ligação, Túnel ou RD Gateway
- Modo de monitor
- Autenticação Entra ID

Mude do inquilino A para o inquilino B e volte, e o Bastion, a VM e as portas do inquilino A regressam exatamente como os deixou. Nada do inquilino B transita.

## O que se mantém global

A sua escolha de idioma aplica-se a todos os inquilinos. Altere-a enquanto trabalha num inquilino, e mantém-se alterada depois de mudar para outro. O idioma é uma preferência sobre si, não sobre o ambiente a que está ligado.

## Onde isto vive em disco

Tudo isto, tanto o que é por inquilino como o que é global, vive num único ficheiro: `%APPDATA%\BastionRDPConnector\settings.json`. [Ficheiros e definições](../files-and-settings/) explica a estrutura do ficheiro e o que cada caminho contém.
