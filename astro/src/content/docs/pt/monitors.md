---
title: Monitores
description: Escolha se uma sessão RD Gateway abre no seu monitor principal ou se se estende por todos os monitores ligados.
appliesTo: '3.3.6'
lastReviewed: '2026-07-25'
---

O separador Azure VM tem uma definição de Monitores junto ao Método de ligação. Aplica-se apenas ao RD Gateway. As ligações Túnel não transportam uma preferência de monitor, porque é o seu próprio cliente de ambiente de trabalho remoto que trata da sessão assim que o túnel está aberto.

## As duas opções

| Opção | Comportamento |
| --- | --- |
| Monitor único | A sessão abre em ecrã completo apenas no seu monitor principal. |
| Todos os monitores | A sessão estende-se por todos os monitores ligados, para que o ambiente de trabalho remoto preencha toda a sua configuração multi-monitor. |

Monitor único é a predefinição. Escolha Todos os monitores se quiser que a sessão remota se comporte como um segundo ambiente de trabalho físico nos seus ecrãs.

## Porque é que o Túnel não tem esta definição

A seleção de monitor é escrita no ficheiro `.rdp` que o RD Gateway entrega ao seu cliente de ambiente de trabalho remoto. O Túnel não gera nenhum ficheiro. Abre uma porta local e deixa que seja você a iniciar o cliente, pelo que não há nada onde a aplicação possa escrever essa definição. Se mudar uma sessão de RD Gateway para Túnel, defina o comportamento de monitores diretamente no seu cliente RDP.

## Onde a escolha é guardada

A definição de monitor é guardada [por inquilino](../tenants/), juntamente com o método de ligação e a autenticação Entra ID. Mudar de inquilino restaura o que escolheu da última vez para esse inquilino, e voltar ao RD Gateway no mesmo inquilino também se lembra dela.
