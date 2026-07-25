---
title: Notas de versão
description: O que mudou em cada versão recente do Azure Bastion RDP Connector.
appliesTo: '3.3.4'
lastReviewed: '2026-07-25'
---

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
| Caixa de diálogo Sobre e pacote de diagnóstico | O botão i na barra superior, Abrir pasta de registos, e Copiar informações de diagnóstico foram todos lançados nesta versão. |
| Método de ligação predefinido por plataforma | O RD Gateway tornou-se a predefinição no Windows, e o Túnel a predefinição no macOS, porque a Windows App no macOS não consegue utilizar o Bastion como gateway. A predefinição só se aplica até escolher um método por si mesmo. |
| Suporte a ecrãs HD Ready | A janela cresceu para 580×760, a partir de aproximadamente 540×700, e agora cabe sem barra de deslocamento em ecrãs de 1280×720. |
