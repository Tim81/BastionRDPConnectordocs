---
title: Notas de versão
description: O que mudou em cada versão recente do Azure Bastion RDP Connector.
appliesTo: '3.3.9'
lastReviewed: '2026-09-19'
---

## 3.3.9

| Alteração | Detalhes |
| --- | --- |
| macOS: as quedas do RD Gateway são um erro do Windows App for Mac | O Windows App for Mac divide um pacote do RD Gateway em duas mensagens WebSocket, e o Azure Bastion fecha então o WebSocket. Os pacotes do gateway maiores do que o buffer de receção de 20 480 bytes do Bastion também bloqueiam a sessão. Ambos surgem como uma desligação em segundos, com o erro `0x300006c`, `0x3000064` ou `0x10b`. Não é um problema de TLS nem de cifras, como diziam versões anteriores. Foi verificado no Windows App 11.4.1. O FreeRDP através do mesmo Bastion e o modo Túnel com o Windows App mantêm-se ambos ligados, e nenhuma propriedade do ficheiro `.rdp` o contorna. |
| macOS: aviso do RD Gateway reformulado | O RD Gateway continua selecionável no macOS, caso a Microsoft corrija o cliente. O aviso diz agora o que realmente se passa e que a sua VM não é o problema. Oferece **Usar Túnel em vez disso**, **Tentar mesmo assim via RD Gateway** ou Cancelar, nos seis idiomas. A caixa de diálogo passa a chamar-se "Problema conhecido no macOS" em vez de "Não suportado no macOS". O item de menu Acerca de no macOS está agora localizado e acompanha de imediato uma alteração de idioma. |
| Túneis: fim dos ciclos de reconexão inúteis | Quando o cliente RDP fechava a sua própria ligação, o túnel tratava isso como um erro de rede e tentava novamente até cinco vezes, obtendo de cada vez um novo token do Bastion sem nenhum cliente ligado. Agora cada ligação aceite recebe um token do Bastion e um WebSocket durante toda a sua vida. Se o WebSocket terminar enquanto o cliente ainda está ligado, a ligação local é fechada e a reconexão automática do próprio cliente RDP abre uma nova com um token novo. O estado "A reconectar… (tentativa n/5)" desapareceu. |
| Túneis: tempos limite, encerramento limpo, reutilização e porta de destino | A ligação do WebSocket expira ao fim de 30 segundos, e um pedido de token ao Bastion que expire é comunicado como erro em vez de um cancelamento silencioso. A sessão do Bastion é sempre limpa à saída, o fecho do WebSocket tem um limite de tempo e um túnel que está a parar nunca recebe um novo cliente. Voltar a ligar ao mesmo Bastion, destino e porta reutiliza o túnel em execução e volta a lançar o cliente RDP. A porta de destino escolhida é respeitada: os túneis de VM estavam fixos em 3389. O último destino e a última porta local são memorizados, e as etiquetas mostram `vm:porta`. |
| Uma sessão do Azure expirada leva-o de volta ao início de sessão | As verificações prévias ignoravam-se a si próprias perante qualquer erro, incluindo uma exigência de reautenticação do Acesso Condicional, e deixavam a ligação falhar mais tarde. Agora a aplicação pede o início de sessão e repete a operação uma vez, no arranque, ao carregar subscrições, Bastions e VMs, ao mudar de subscrição, ao ligar e ao iniciar uma VM. Só existe uma janela de início de sessão aberta de cada vez; um segundo acionamento espera pela que já está aberta. |
| Correções do início de sessão | A janela principal é restaurada antes de abrir qualquer janela de início de sessão, pelo que o início de sessão já não fica bloqueado quando a janela está oculta na área de notificação. Só as exceções de caixa de diálogo conhecidas e inofensivas por um proprietário não visível ou fechado são descartadas; tudo o resto continua a ser registado no log e apresentado. A obtenção de tokens está associada à conta com sessão iniciada, o que corrige o uso de tokens da conta errada quando há várias contas em cache. Iniciar sessão com outra conta limpa a cache de subscrições. A listagem de inquilinos, subscrições e Bastions comunica agora as falhas em vez de devolver uma lista vazia. Se as subscrições continuarem sem carregar após a reautenticação, a aplicação fecha em vez de o deixar sem sessão e sem nada para escolher. |
| Estado de energia da VM | O arranque de uma VM é acompanhado por VM, pelo que ao mudar de VM já não aparece "A iniciar" na errada. Enquanto uma VM arranca, o botão Iniciar fica oculto e Ligar fica desativado. Um arranque falhado é detetado: se a VM continuar a ser lida como parada ou desalocada durante cerca de 30 segundos, recebe um erro com o nome da VM em vez de esperar por todo o sondeio. Iniciar uma VM e atualizar o estado de energia reautenticam perante uma sessão expirada. |
| Outras melhorias de fiabilidade | Fechar a janela cancela o trabalho em curso sem ruído, sem caixas de erro durante o encerramento. Uma atualização obsoleta de Bastions ou subscrições é descartada se entretanto mudou de subscrição, e a caixa Alterar subscrição obtém os Bastions antes de confirmar, pelo que uma falha deixa a subscrição anterior intacta. Se o cliente RDP não arrancar, recebe uma notificação, ou uma janela restaurada com uma caixa de erro se não houver ícone na área de notificação. Restaurar a partir da área de notificação devolve o botão da barra de tarefas e o estado anterior da janela. Minimizar com uma caixa de diálogo ou uma janela de início de sessão abertas já não a oculta na área de notificação nem a encerra. A caixa Acerca de tem uma única instância. Abrir pasta de log funciona agora com caminhos que contêm espaços. |
| Segurança: nome de anfitrião do Bastion e paginação | A aplicação envia o seu token do ARM para o anfitrião indicado na resposta do Azure. Agora só aceita um nome DNS terminado em `.bastion.azure.com`, pelo que um endereço IP ou um anfitrião estranho nunca o recebe, e os redirecionamentos estão desativados no pedido do token. Os `nextLink` do ARM têm de ser https no anfitrião do ARM, o número de páginas está limitado a 500 e uma resposta falhada do Resource Graph gera um erro em vez de uma lista truncada. |
| Segurança: ficheiros temporários | Os ficheiros `.rdp` gerados, que podem conter um token de gateway ativo, são eliminados à saída com uma substituição de conteúdo na medida do possível. Não é um apagamento seguro garantido. A pasta temporária é recusada se for uma ligação simbólica ou uma junção. No macOS a pasta é criada com 0700 e os ficheiros com 0600, e o ficheiro `.rdp` do túnel do macOS passa agora pelo mesmo tratamento; antes era um ficheiro legível por todos em `$TMPDIR` que nunca era removido. Os restos de um bloqueio ou encerramento forçado são eliminados no arranque, apenas pela primeira instância confirmada. No macOS, os ficheiros `.rdp` e a pasta de log abrem através do caminho absoluto `/usr/bin/open`. |

## 3.3.8

| Alteração | Detalhes |
| --- | --- |
| MSAL 4.90.0 | A Microsoft Authentication Library, que trata do início de sessão, foi atualizada. |
| Runtime .NET com correções de segurança | O SDK mínimo de compilação sobe para 10.0.401, pelo que o runtime incluído é o .NET 10.0.12, com as correções de segurança. As correções de segurança do runtime chegam-lhe através das atualizações da aplicação. |
| macOS: ícone da aplicação em squircle | O ícone da aplicação é agora um squircle, pelo que o macOS Tahoe já não o coloca numa caixa branca. |

## 3.3.7

| Alteração | Detalhes |
| --- | --- |
| Componentes atualizados | Azure.Core 1.62.0, pacotes do Avalonia 12.1.2 e atualizações do grupo de identidade (MSAL e pacotes relacionados). Apenas atualizações de dependências. |

## 3.3.6

| Alteração | Detalhes |
| --- | --- |
| Atualização de segurança do runtime .NET incluído | A aplicação inclui a sua própria cópia do .NET e não usa nenhuma instalada na sua máquina. Por isso, as correções de segurança do runtime chegam-lhe através de uma atualização da aplicação e não através das atualizações do Windows ou do macOS. Esta versão é criada sobre o .NET 10.0.11, uma versão de segurança do runtime. |
| Componentes atualizados | Avalonia.Controls.WebView 12.1.0 e Azure.Core 1.61.0. |

## 3.3.5

| Alteração | Detalhes |
| --- | --- |
| *Log* deixa de ser traduzido em alemão, francês e espanhol | O botão Abrir pasta de log e a mensagem de falha de ligação traduziam *log* como *Protokoll*, *journal* e *registro*, que se leem como um diário de bordo comum em vez do termo técnico. Ambos passam a manter o estrangeirismo: *Log-Ordner öffnen*, *Ouvrir le dossier de log*, *Abrir carpeta de log*. O português já usava *log*; o inglês e o neerlandês não mudam. |

## 3.3.4

| Alteração | Detalhes |
| --- | --- |
| Ícone da área de notificação restaurado | O ícone da área de notificação não aparecia no Windows nas versões 3.2 a 3.3.3. Minimizar para a área de notificação, as notificações de túnel e o menu de contexto da área de notificação voltam a funcionar como esta documentação descreve. |
| Dez sessões de histórico de registos | O `debug.log` costumava ser substituído em cada arranque. As últimas dez sessões são agora mantidas como `debug.0.log` a `debug.9.log`, para que o registo da execução em que ocorreu um problema sobreviva a um reinício. |
| Pacote de diagnóstico abrange sessões anteriores | Copiar informações de diagnóstico agora inclui os registos de sessões arquivadas ao lado do atual, das mais recentes para as mais antigas, até cerca de 1 MB. |
| A limpeza conclui antes de a janela fechar | Os túneis ativos fecham e os ficheiros `.rdp` temporários são eliminados antes de a janela fechar. Terminar sessão executa a mesma limpeza em vez de encerrar o processo de imediato. |
| Perfil do navegador de início de sessão movido | O navegador de início de sessão incorporado costumava manter o seu perfil junto ao ficheiro da aplicação, o que impedia o início de sessão quando a aplicação corria a partir de uma pasta protegida contra escrita, como a Program Files. Agora vive em `%LOCALAPPDATA%\BastionRDPConnector\WebView2`. A localização da cache de tokens não muda. |
| Componentes atualizados | Avalonia 12.1.0, MSAL 4.87.0, Azure.Core 1.60.0. |

## 3.3

| Alteração | Detalhes |
| --- | --- |
| Carregamento de VMs com Azure Resource Graph | As VMs de cerca de 200 subscrições carregam em 2 a 4 segundos, em vez de 30 a 60 segundos antes. As consultas entre subscrições utilizam a API Azure Resource Graph em vez de consultar cada subscrição uma a uma. |
| Pesquisa de VMs entre subscrições | O modo Todas as subscrições no separador Azure VM pesquisa em todas as subscrições que a sua conta consegue ver. Requer pelo menos três carateres antes de devolver resultados, e a lista pendente de subscrições agora só mostra as que efetivamente contêm VMs. |
| Separador Azure VM em duas colunas | Método de ligação, modo de monitor e auth Entra ID ficam na coluna esquerda; a seleção de VM fica na coluna direita. |
| Verificações preliminares | Antes de ligar, a aplicação verifica o SKU do Bastion, os seus indicadores de funcionalidades, e o estado de energia da VM. Estas verificações são fail-open: uma verificação que não consiga concluir não bloqueia a ligação. |
| Reconexão automática do túnel | Se a ligação WebSocket cair, o túnel reconecta-se sozinho, até cinco vezes com um intervalo crescente entre tentativas. A maioria das sessões RDP mantém-se ligada ao longo de uma reconexão tão curta. |
| Caixa de diálogo Sobre e pacote de diagnóstico | O botão i na barra superior, Abrir pasta de log, e Copiar informações de diagnóstico foram todos lançados nesta versão. |
| Método de ligação predefinido por plataforma | O RD Gateway tornou-se a predefinição no Windows, e o Túnel a predefinição no macOS, porque a Windows App no macOS não consegue utilizar o Bastion como gateway. A predefinição só se aplica até escolher um método por si mesmo. |
| Suporte a ecrãs HD Ready | A janela cresceu para 580×760, a partir de aproximadamente 540×700, e agora cabe sem barra de deslocamento em ecrãs de 1280×720. |
