---
title: Métodos de ligação
description: 'Túnel e RD Gateway comparados: como cada um transporta a sessão, que destinos alcançam, e qual é a predefinição no Windows e no macOS.'
appliesTo: '3.3.9'
lastReviewed: '2026-07-25'
---

Ambos os métodos alcançam a mesma máquina virtual através do mesmo anfitrião Bastion. Diferem na forma como a sessão de ambiente de trabalho remoto é transportada, e é essa diferença que decide que destinos cada um consegue alcançar.

<figure>
<div class="frame">
<svg viewBox="0 0 620 186" role="img" aria-labelledby="fig1t">
  <title id="fig1t">O seu computador não consegue alcançar a máquina virtual diretamente. Ambos os métodos de ligação passam pelo anfitrião Azure Bastion.</title>
  <!-- direct path, blocked -->
  <path class="w-dead" d="M104 40 H516"/>
  <line class="w-x" x1="300" y1="30" x2="320" y2="50"/>
  <line class="w-x" x1="320" y1="30" x2="300" y2="50"/>
  <text class="n-s" x="310" y="21" text-anchor="middle">sem IP público · 3389 fechada</text>
  <!-- routed path -->
  <path class="w-live" d="M104 120 H256"/>
  <path class="w-live" d="M364 120 H516"/>
  <text class="n-s" x="180" y="112" text-anchor="middle">443 de saída</text>
  <text class="n-s" x="440" y="112" text-anchor="middle">3389 dentro da vnet</text>
  <!-- nodes -->
  <rect class="n-box" x="8" y="18" width="96" height="124" rx="5"/>
  <text class="n-t" x="56" y="74" text-anchor="middle">O seu PC</text>
  <text class="n-s" x="56" y="92" text-anchor="middle">mstsc</text>
  <rect class="n-box n-hop" x="256" y="96" width="108" height="48" rx="5"/>
  <text class="n-t on" x="310" y="118" text-anchor="middle">Bastion</text>
  <text class="n-s" x="310" y="133" text-anchor="middle" fill="#98A2B3">SKU Standard</text>
  <rect class="n-box" x="516" y="18" width="96" height="124" rx="5"/>
  <text class="n-t" x="564" y="74" text-anchor="middle">VM do Azure</text>
  <text class="n-s" x="564" y="92" text-anchor="middle">IP privado</text>
  <text class="n-s" x="310" y="172" text-anchor="middle">Túnel e RD Gateway seguem ambos a via de baixo</text>
</svg>
</div>
<figcaption><b>Figura 1</b> A via direta não existe. Todas as sessões são transportadas através do anfitrião Bastion pela porta 443.</figcaption>
</figure>

## Túnel

A aplicação abre um WebSocket para o anfitrião Bastion e escuta numa porta local do seu computador. O seu cliente de ambiente de trabalho remoto liga-se a `localhost` nessa porta, e o tráfego é encaminhado através do WebSocket.

Como o destino é sempre apenas um endereço do outro lado do túnel, este método alcança qualquer endereço IP para o qual a rede virtual do Bastion tenha uma rota. Isso inclui máquinas que não são VMs do Azure.

Se o WebSocket terminar a meio de uma sessão, a ligação local fecha e a reconexão automática do próprio cliente RDP abre uma nova através do túnel com um token do Bastion novo. Cada ligação aceite recebe o seu próprio token e o seu próprio WebSocket.

### Quando utilizar

- Está a ligar-se a um endereço IP em vez de escolher uma VM.
- Está no macOS, onde uma sessão RD Gateway cai ao fim de alguns segundos. Consulte [RD Gateway no macOS](#rd-gateway-on-macos).
- Quer ter várias sessões abertas ao mesmo tempo, cada uma na sua própria porta local.

## RD Gateway

A aplicação pede ao Bastion um ficheiro `.rdp` pré-configurado que designa o Bastion como o gateway de ambiente de trabalho remoto, e depois entrega esse ficheiro ao seu cliente. Não há porta local nem processo de túnel.

Este é o caminho mais curto, e no Windows é a predefinição. Só funciona quando o Bastion consegue resolver o próprio destino, o que significa que funciona para VMs do Azure e não para endereços IP escritos manualmente.

<div class="callout warn">
<span class="eyebrow">Início de sessão entre inquilinos</span>
<p>A autenticação Entra ID está desativada por predefinição e deve manter-se desativada quando a máquina virtual pertence a um inquilino diferente do da conta com que iniciou sessão, o que é o caso habitual com o Azure Lighthouse. O Azure AD devolve <code>AADSTS293004</code> para essa combinação. Se a ativar mesmo assim e o Bastion recusar, a aplicação pede novamente com a definição desativada, pelo que a sessão continua a abrir. Consulte <a href="../entra-id/">Autenticação Entra ID</a>.</p>
</div>

### RD Gateway no macOS

O RD Gateway pode ser selecionado no macOS e a ligação chega a abrir, mas não se mantém. O Windows App for Mac divide um pacote do RD Gateway em duas mensagens WebSocket, e o Azure Bastion fecha então o WebSocket. Os pacotes do gateway maiores do que o buffer de receção de 20 480 bytes do Bastion também bloqueiam a sessão. O resultado é uma desligação em segundos, com o erro `0x300006c`, `0x3000064` ou `0x10b`. Foi verificado no Windows App 11.4.1.

Não é um problema de TLS nem de cifras, e a máquina virtual também não é o problema. O FreeRDP através do mesmo Bastion e o modo Túnel com o Windows App mantêm-se ambos ligados, e nenhuma propriedade do ficheiro `.rdp` o contorna.

A Microsoft suporta a via RD Gateway do Bastion com o cliente Windows. Não é uma combinação suportada com a Windows App no macOS.

Como a ligação parece ter sucesso antes de falhar, a aplicação pergunta antes de tentar. Escolher RD Gateway no macOS mostra a caixa de diálogo "Problema conhecido no macOS", que descreve o problema e oferece **Usar Túnel em vez disso**, **Tentar mesmo assim via RD Gateway** ou Cancelar. Tentar mesmo assim faz a tentativa na mesma, para que o comportamento possa ser verificado em vez de ser dado como garantido.

Utilize o Túnel no macOS. Alcança as mesmas máquinas e é a predefinição aí por esse motivo.

## Comparação

| &nbsp; | Túnel | RD Gateway |
| --- | --- | --- |
| Ligar a uma VM do Azure | Sim | Sim |
| Ligar a um endereço IP | Sim | Não |
| Abre uma porta local | Sim, uma por sessão | Não |
| Reconecta automaticamente | Sim, através da reconexão automática do cliente RDP | Não |
| Autenticação Entra ID | Não aplicável | Desativada por predefinição, opcional |
| Predefinição no Windows | Não | Sim |
| Predefinição no macOS | Sim | Não |
| Requer Azure CLI | Não | Não |

A predefinição só se aplica até escolher um método por si mesmo. Depois disso, a sua escolha é guardada por inquilino e restaurada da próxima vez que iniciar a aplicação.

## Portas

Nenhum dos métodos precisa de uma regra de firewall de entrada. Ambos utilizam a porta 443 de saída do seu computador para o anfitrião Bastion.

| De | Para | Porta |
| --- | --- | --- |
| O seu computador | bst-*.bastion.azure.com | 443/TCP de saída |
| O seu computador | login.microsoftonline.com | 443/TCP de saída |
| Anfitrião Bastion | Máquina de destino | 3389/TCP dentro da rede virtual |
