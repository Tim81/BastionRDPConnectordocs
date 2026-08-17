---
title: Pré-requisitos
description: O que tem de estar assegurado na sua máquina e no Azure antes de o Azure Bastion RDP Connector conseguir abrir uma sessão.
appliesTo: '3.3.6'
lastReviewed: '2026-07-25'
---

A aplicação é autónoma. Não precisa do .NET instalado separadamente e, desde a 3.0, não precisa do Azure CLI. O que precisa é de um sistema operativo suportado, um cliente de ambiente de trabalho remoto e um anfitrião Bastion configurado para aceitar ligações de cliente nativo.

## Na sua máquina

| Requisito | Notas |
| --- | --- |
| Windows 10 ou posterior, x64 | Instalado a partir da Microsoft Store |
| macOS 12 Monterey ou posterior | Suportado desde a 3.1.2 para Apple Silicon e Intel, mas ainda não disponível publicamente |
| Cliente de ambiente de trabalho remoto, Windows | `mstsc.exe`, já incluído no Windows |
| Cliente de ambiente de trabalho remoto, macOS | A Windows App, da Mac App Store. Utilize o modo Túnel com este cliente. Uma sessão RD Gateway abre e depois cai ao fim de alguns segundos com o erro `0x3000064`, uma incompatibilidade de cifras que a Microsoft não suporta neste cliente |

<div class="callout note">
<span class="eyebrow">Nota</span>
<p>Não é necessário o Azure CLI. As versões anteriores chamavam <code>az network bastion tunnel</code>; desde a 3.0 o túnel é construído de forma nativa com .NET. Se ainda estiver a utilizar uma versão 2.x, o Azure CLI e a extensão <code>azure-bastion</code> continuam a ser necessários.</p>
</div>

## No Azure

| Requisito | Notas |
| --- | --- |
| Azure Bastion, SKU Standard ou Premium | Os SKUs Basic e Developer não suportam o cliente nativo |
| Suporte a cliente nativo, ativado no anfitrião Bastion | Ativado separadamente da escolha do SKU |
| Ligação baseada em IP, ativada no anfitrião Bastion | Só é necessária se pretender utilizar o separador Endereço IP |
| Função Leitor no recurso Bastion e na sua rede virtual | O mínimo necessário para listar anfitriões Bastion e ligar através deles |
| Função Leitor na máquina virtual de destino | Necessária para listar e ligar a essa VM. É necessário Virtual Machine Contributor ou superior para iniciar uma VM parada |
| Uma subscrição do Azure | A aplicação lista todas as subscrições que a sua conta consegue ver |

<div class="callout note">
<span class="eyebrow">Nota</span>
<p>A aplicação verifica o SKU do Bastion e os respetivos indicadores de funcionalidades antes de ligar, e nomeia o que está em falta se uma verificação falhar. Estas verificações são fail-open: se a própria verificação não conseguir concluir, por exemplo devido a um problema de rede transitório, a tentativa de ligação prossegue na mesma.</p>
</div>

## Acessibilidade de rede

Um destino só precisa de ser alcançável a partir da rede virtual do Bastion. Não precisa de ser uma VM do Azure, nem sequer de estar no Azure.

- O Bastion implementado na mesma rede virtual, ou numa emparelhada com ela, é o caso simples.
- Numa configuração hub-and-spoke ou de landing zone, o Bastion está muitas vezes numa landing zone de conectividade centralizada e alcança as redes virtuais spoke através do Azure Virtual WAN. Nessa topologia, o recurso Bastion não é visível a partir de dentro de um spoke individual no Portal do Azure, ainda que continue a conseguir alcançar as VMs aí presentes. Esta aplicação foi construída exatamente para esse caso: escolha o Bastion partilhado uma vez e depois ligue-se a uma VM em qualquer spoke que ele consiga alcançar.
- As máquinas no local também são alcançáveis, através de uma VPN site a site ou ExpressRoute, tal como os sistemas Windows noutras clouds, desde que exista uma rota.

Se não tiver a certeza se um anfitrião Bastion consegue alcançar um determinado destino, pergunte a quem gere a sua rede. A aplicação não tem forma de ver rotas que não sejam expostas através das APIs que utiliza.
