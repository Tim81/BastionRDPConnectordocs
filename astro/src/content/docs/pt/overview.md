---
title: Visão geral
description: Abra uma sessão de ambiente de trabalho remoto através do Azure Bastion para uma máquina virtual do Azure, ou para qualquer sistema Windows que a rede do Bastion consiga alcançar.
appliesTo: '3.3.5'
lastReviewed: '2026-07-25'
---

O Azure Bastion RDP Connector abre uma sessão de ambiente de trabalho remoto através do Azure Bastion, utilizando o cliente de ambiente de trabalho remoto já instalado no seu computador. As máquinas virtuais do Azure são escolhidas pelo nome. Tudo o resto é alcançado por endereço, o que inclui máquinas no local e máquinas noutras clouds.

## O que faz

O Azure Bastion é uma via de acesso a uma rede, não apenas ao Azure. Alcança tudo o que a sua própria rede virtual consiga alcançar, pelo que uma máquina não precisa de ser uma VM do Azure, nem sequer estar no Azure, para ser alcançável através dele.

Esta aplicação pede ao Bastion essa via de acesso e entrega o resultado ao seu cliente de ambiente de trabalho remoto. Não precisa de copiar cadeias de ligação, gerir certificados nem abrir portas na firewall.

Não é necessário o Azure CLI. As versões anteriores chamavam `az network bastion` para construir o túnel. Desde a 3.0, a aplicação comunica diretamente com as APIs do Bastion e do Azure Resource Manager, pelo que não é necessário instalar mais nada.

## O que pode alcançar

| Destino | Como o escolhe | Requer |
| --- | --- | --- |
| Máquina virtual do Azure | Escolha-a pelo nome no separador Azure VM, em todas as suas subscrições | Acesso de Leitor à VM |
| Qualquer outra coisa | Escreva o endereço no separador Endereço IP | Ligação baseada em IP ativada no anfitrião Bastion |

A via por endereço é a mais abrangente das duas. Alcança qualquer sistema para o qual a rede virtual do Bastion tenha uma rota:

- Máquinas virtuais do Azure, na mesma rede virtual ou emparelhadas com ela
- Servidores e postos de trabalho Windows no local, através de uma VPN site a site ou ExpressRoute
- Sistemas Windows noutras clouds, como a AWS, ou numa cloud privada

Tudo o que tenha uma rota e uma porta RDP à escuta é alcançável. Se corre ou não no Azure é irrelevante.

A Microsoft documenta diretamente o cenário no local: a ligação baseada em IP do Bastion "permite a conectividade a máquinas alojadas no local, desde que exista conectividade híbrida entre o recurso Azure Bastion e a máquina à qual pretende ligar-se." Consulte [Connect to a VM via a specified private IP address](https://learn.microsoft.com/en-us/azure/bastion/connect-ip-address).

## Duas formas de ligar

A aplicação oferece dois métodos de ligação. Alcançam a mesma máquina e diferem na forma como a sessão é transportada.

| Método | Transporta a sessão através de | Funciona com endereços IP |
| --- | --- | --- |
| Túnel | Uma porta local encaminhada através de um WebSocket para o Bastion | Sim |
| RD Gateway | Um ficheiro .rdp que aponta para o Bastion como gateway | Não |

[Métodos de ligação](../connection-methods/) explica quando utilizar cada um, e porque é que a predefinição difere entre Windows e macOS.

## Antes de começar

- Um anfitrião Azure Bastion com o SKU Standard ou Premium. Os SKUs Basic e Developer não suportam o cliente nativo.
- **Suporte a cliente nativo** ativado nesse anfitrião Bastion.
- Acesso de Leitor ao anfitrião Bastion e às máquinas virtuais que pretende alcançar.
- Windows 10 ou posterior. Instalado a partir da Microsoft Store.
- Existe uma versão para macOS, suportada desde a 3.1.2 para Apple Silicon e Intel, mas ainda não está disponível publicamente.

<div class="callout note">
<span class="eyebrow">Nota</span>
<p>A aplicação verifica o SKU do Bastion e os respetivos indicadores de funcionalidades antes de ligar, e indica qual está em falta se uma verificação falhar. Estas verificações são fail-open, pelo que uma verificação que não consiga concluir não o impede de ligar.</p>
</div>

## Onde as coisas são guardadas

As definições acompanham o seu perfil do Windows. Os dados de início de sessão e os registos ficam na máquina.

| Caminho | Contém |
| --- | --- |
| `%APPDATA%\BastionRDPConnector` | `settings.json`: última subscrição, Bastion, VM e idioma utilizados |
| `%LOCALAPPDATA%\BastionRDPConnector` | Cache de tokens de início de sessão, o perfil do navegador de início de sessão, e `debug.log` com as últimas dez sessões |
