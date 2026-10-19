---
title: Favoritos
description: Guarde até dez endereços IP e VMs do Azure por inquilino, e volte a ligar a partir do separador Favoritos com o anfitrião Bastion selecionado nesse momento.
appliesTo: '3.4.0'
lastReviewed: '2026-10-19'
---

Os favoritos são um caminho mais curto de volta a uma ligação que já faz. A lista guarda até dez entradas para o inquilino do Entra ID em que iniciou sessão. Um favorito é um endereço IP ou uma VM do Azure. As portas, o método de ligação e o anfitrião Bastion ficam onde os define.

## Adicionar e remover

No separador [Endereço IP](../connect-ip/) e no separador [Azure VM](../connect-vm/), uma estrela fica junto a **Ligar**. A dica é **Favorito**.

- Uma estrela vazia significa que o endereço ou a máquina virtual desse separador não é um favorito. Clique nela para guardar o destino atual. Um endereço IP válido é guardado tal como o escreveu. Uma máquina virtual é guardada com o nome, o id do recurso, o grupo de recursos e a subscrição a que pertence, para não ter de escolher essa subscrição outra vez.
- Uma estrela preenchida significa que já é um favorito. Clique nela para o remover. A aplicação pede confirmação primeiro. **OK** remove-o. **Cancelar**, ou fechar a caixa de diálogo, deixa-o no lugar.

A mesma confirmação aparece quando prime **Remover** numa linha do separador Favoritos.

Um endereço IP vazio ou inválido, ou nenhuma máquina virtual selecionada, não é guardado. A estrela fica vazia e vê o mesmo aviso que com **Ligar**. Uma décima primeira entrada é recusada até remover uma.

## Ligar a partir da lista

Abra o separador **Favoritos**. Cada linha é um destino guardado, com **Ligar** e **Remover**.

**Ligar** usa o anfitrião Bastion selecionado no topo da janela nesse momento. Mude o anfitrião Bastion e ligue outra vez, e é esse novo anfitrião que é usado.

Um favorito de IP abre um túnel da mesma forma que o separador Endereço IP, incluindo a porta de destino e a porta local desse separador.

Um favorito de VM usa o método de ligação selecionado no separador Azure VM.

- **Túnel** usa a porta de destino e a porta local desse separador.
- **RD Gateway** usa a porta 3389, a caixa de autenticação Entra ID e a escolha de monitor desse separador.

A máquina virtual tem de continuar na lista carregada para este início de sessão. Se não estiver, **Ligar** pára e indica-o. Se o filtro atual de subscrição, nome ou etiqueta a ocultasse, **Ligar** muda para a subscrição dessa VM, limpa esses filtros e deixa o separador Azure VM nessa máquina.

## Estado de energia

Um favorito de VM segue as mesmas regras de estado de energia que a página [Azure VM](../connect-vm/). **Ligar** só está disponível enquanto a VM está em execução. Uma VM parada ou desalocada oferece **Iniciar VM** quando a sua conta a pode iniciar. Enquanto a VM arranca, **Iniciar VM** fica oculto e **Ligar** permanece desativado. Um favorito de IP não tem estado de energia.
