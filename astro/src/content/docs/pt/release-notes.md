---
title: Notas de versão
description: O que mudou em cada versão recente do Azure Bastion RDP Connector.
appliesTo: '3.3.9'
lastReviewed: '2026-09-19'
---

## 3.3.9

| Alteração | Detalhes |
| --- | --- |
| As sessões expiradas pedem novo início de sessão | As verificações prévias (SKU do Bastion, indicadores de funcionalidades, estado de energia da VM) eram fail-open perante qualquer erro, incluindo uma sessão do Azure expirada. Agora, uma sessão expirada chega ao fluxo de início de sessão em vez de ser deixada passar. Os restantes erros continuam fail-open. |
| Janela principal restaurada antes da janela de início de sessão | A janela principal é restaurada antes de a janela de início de sessão abrir. As exceções de caixa de diálogo conhecidas e inofensivas por um proprietário não visível ou fechado são registadas no log e descartadas, em vez de bloquearem a aplicação e perderem os túneis ativos. |
| Ficheiros `.rdp` temporários antigos eliminados no arranque | Os ficheiros deixados por um bloqueio ou encerramento forçado são eliminados no arranque seguinte, apenas pela primeira instância em execução. Os ficheiros `.rdp` gerados ficam numa pasta temporária da aplicação própria de cada utilizador e acessível apenas a este, e são eliminados ao sair com uma substituição de conteúdo na medida do possível. Não é um apagamento seguro garantido. |
| macOS: os ficheiros `.rdp` e a pasta de log abrem através de `/usr/bin/open` | Ambos abrem agora através do caminho absoluto `/usr/bin/open`. |
| macOS: aviso do RD Gateway reformulado | O Windows App for Mac atualmente não consegue manter uma sessão de RD Gateway através do Azure Bastion: a sessão desliga em segundos, com o erro `0x300006c`, `0x3000064` ou `0x10b`. A VM não é o problema. A caixa de diálogo passa a chamar-se "Problema conhecido no macOS" em vez de "Não suportado no macOS" e oferece **Usar Túnel em vez disso** ou **Tentar mesmo assim via RD Gateway**. |
| macOS: item de menu Acerca de localizado | O item de menu Acerca de está traduzido e acompanha de imediato as alterações de idioma. |

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
