---
title: Ligar a uma VM do Azure
description: Escolha uma máquina virtual pelo nome, numa subscrição ou em todas, verifique o seu estado de energia, inicie-a se necessário, e ligue.
appliesTo: '3.3.4'
lastReviewed: '2026-07-25'
---

O separador Azure VM lista as máquinas virtuais pelo nome em vez de pedir um endereço. Divide-se em duas colunas: definições de ligação à esquerda, seleção de VM à direita. O método de ligação selecionado por predefinição depende da plataforma, pelo que ambos são mostrados abaixo.

## O separador Azure VM

<!-- Mirrors src/components/ScreenAzureVm.astro -->
<figure class="appshot">
  <div class="frame">
    <svg viewBox="0 0 300 372" role="img" aria-labelledby="s-vm-win">
      <title id="s-vm-win">O separador Azure VM no Windows. Uma subscrição e um anfitrião Bastion são escolhidos no topo. O separador contém o método de ligação, a disposição de monitores, a opção Entra ID, uma lista pesquisável de máquinas virtuais, o estado de energia da máquina selecionada, e o botão Ligar.</title>
      <rect class="ui-win" x="1" y="1" width="298" height="370" rx="6"/>
      <path class="ui-bar" d="M2 2 H298 V22 H2 Z"/>
      <text class="ui-title" x="10" y="15">Azure Bastion RDP Connector</text>
      <path d="M266 9 h7 M280 9 l7 7 M287 9 l-7 7" stroke="#7B8794" stroke-width="1.1" fill="none"/>
      <text class="ui-l" x="10" y="40">Subscrição</text>
      <rect class="ui-field" x="10" y="44" width="182" height="15" rx="3"/>
      <text class="ui-v" x="15" y="55">Production - West Europe</text>
      <rect class="ui-btn-2" x="197" y="44" width="42" height="15" rx="3"/>
      <text class="ui-tb" x="204" y="55">Alterar</text>
      <rect class="ui-btn-2" x="244" y="44" width="18" height="15" rx="3"/>
      <text class="ui-tb" x="250" y="55">i</text>
      <rect class="ui-btn-2" x="266" y="44" width="24" height="15" rx="3"/>
      <text class="ui-tb" x="270" y="55">sair</text>
      <text class="ui-l" x="10" y="76">Anfitrião Bastion</text>
      <rect class="ui-field" x="10" y="80" width="252" height="15" rx="3"/>
      <text class="ui-v" x="15" y="91">bastion-hub-weu</text>
      <rect class="ui-btn-2" x="266" y="80" width="24" height="15" rx="3"/>
      <text class="ui-tb" x="273" y="91">↻</text>
      <line x1="10" y1="120" x2="290" y2="120" stroke="#DCE2EA" stroke-width="1"/>
      <text class="ui-tb off" x="14" y="115">Endereço IP</text>
      <text class="ui-tb" x="76" y="115">Azure VM</text>
      <line class="ui-tabup" x1="72" y1="120" x2="132" y2="120"/>
      <text class="ui-tb off" x="142" y="115">Túneis ativos</text>
      <rect class="ui-panel" x="10" y="130" width="134" height="96" rx="4"/>
      <text class="ui-l" x="17" y="144">Método de ligação</text>
      <circle class="ui-ro" cx="22" cy="155" r="4"/>
      <text class="ui-tb" x="31" y="158">Túnel</text>
      <circle class="ui-ro on" cx="22" cy="169" r="4"/>
      <circle class="ui-rd" cx="22" cy="169" r="2"/>
      <text class="ui-tb" x="31" y="172">RD Gateway</text>
      <text class="ui-l" x="17" y="190">Monitores</text>
      <circle class="ui-ro on" cx="22" cy="200" r="4"/><circle class="ui-rd" cx="22" cy="200" r="2"/>
      <text class="ui-tb" x="31" y="203">Único</text>
      <circle class="ui-ro" cx="80" cy="200" r="4"/>
      <text class="ui-tb" x="89" y="203">Todos</text>
      <rect class="ui-ck" x="18" y="213" width="8" height="8" rx="2"/>
      <path d="M20 217 l2 2 l4 -4" stroke="#fff" stroke-width="1.2" fill="none"/>
      <text class="ui-tb" x="31" y="220">Auth Entra ID</text>
      <circle class="ui-ro on" cx="158" cy="138" r="4"/><circle class="ui-rd" cx="158" cy="138" r="2"/>
      <text class="ui-tb" x="167" y="141">Esta subscrição</text>
      <circle class="ui-ro" cx="158" cy="152" r="4"/>
      <text class="ui-tb" x="167" y="155">Todas as subscrições</text>
      <rect class="ui-field" x="152" y="162" width="138" height="14" rx="3"/>
      <text class="ui-p" x="157" y="172">Pesquisar por nome</text>
      <rect class="ui-field" x="152" y="180" width="138" height="14" rx="3"/>
      <text class="ui-p" x="157" y="190">Filtrar por etiqueta</text>
      <rect class="ui-field" x="152" y="198" width="138" height="15" rx="3"/>
      <text class="ui-v" x="157" y="209">vm-app-prod-01</text>
      <rect class="ui-panel" x="152" y="218" width="138" height="30" rx="4"/>
      <circle class="ui-run" cx="161" cy="233" r="3.5"/>
      <text class="ui-tb" x="170" y="236">Em execução</text>
      <rect class="ui-btn-2" x="248" y="226" width="36" height="14" rx="3"/>
      <text class="ui-tb" x="254" y="236">Iniciar</text>
      <text class="ui-l" x="10" y="268">Porta de destino</text>
      <rect class="ui-field" x="10" y="272" width="60" height="15" rx="3"/>
      <text class="ui-v" x="15" y="283">3389</text>
      <text class="ui-l" x="80" y="268">Porta local</text>
      <rect class="ui-field" x="80" y="272" width="60" height="15" rx="3"/>
      <text class="ui-v" x="85" y="283">55001</text>
      <text class="ui-p" x="10" y="306">Abre no mstsc</text>
      <rect class="ui-btn" x="10" y="320" width="280" height="26" rx="4"/>
      <text class="ui-bt" x="150" y="337" text-anchor="middle">Ligar</text>
      <text class="ui-p" x="10" y="362">EN · NL · DE · FR · ES · PT</text>
    </svg>
  </div>
  <figcaption><b>Windows</b> O separador Azure VM no Windows. RD Gateway é a predefinição.</figcaption>
</figure>

<figure class="appshot">
  <div class="frame">
    <svg viewBox="0 0 300 372" role="img" aria-labelledby="s-vm-mac">
      <title id="s-vm-mac">O separador Azure VM no macOS. Uma subscrição e um anfitrião Bastion são escolhidos no topo. O separador contém o método de ligação, a disposição de monitores, a opção Entra ID, uma lista pesquisável de máquinas virtuais, o estado de energia da máquina selecionada, e o botão Ligar.</title>
      <rect class="ui-win" x="1" y="1" width="298" height="370" rx="8"/>
      <path class="ui-bar" d="M2 2 H298 V24 H2 Z"/>
      <circle cx="14" cy="13" r="4" fill="#FF5F57"/>
      <circle cx="27" cy="13" r="4" fill="#FEBC2E"/>
      <circle cx="40" cy="13" r="4" fill="#28C840"/>
      <text class="ui-title" x="150" y="16" text-anchor="middle">Azure Bastion RDP Connector</text>
      <text class="ui-l" x="10" y="40">Subscrição</text>
      <rect class="ui-field" x="10" y="44" width="182" height="15" rx="3"/>
      <text class="ui-v" x="15" y="55">Production - West Europe</text>
      <rect class="ui-btn-2" x="197" y="44" width="42" height="15" rx="3"/>
      <text class="ui-tb" x="204" y="55">Alterar</text>
      <rect class="ui-btn-2" x="244" y="44" width="18" height="15" rx="3"/>
      <text class="ui-tb" x="250" y="55">i</text>
      <rect class="ui-btn-2" x="266" y="44" width="24" height="15" rx="3"/>
      <text class="ui-tb" x="270" y="55">sair</text>
      <text class="ui-l" x="10" y="76">Anfitrião Bastion</text>
      <rect class="ui-field" x="10" y="80" width="252" height="15" rx="3"/>
      <text class="ui-v" x="15" y="91">bastion-hub-weu</text>
      <rect class="ui-btn-2" x="266" y="80" width="24" height="15" rx="3"/>
      <text class="ui-tb" x="273" y="91">↻</text>
      <line x1="10" y1="120" x2="290" y2="120" stroke="#DCE2EA" stroke-width="1"/>
      <text class="ui-tb off" x="14" y="115">Endereço IP</text>
      <text class="ui-tb" x="76" y="115">Azure VM</text>
      <line class="ui-tabup" x1="72" y1="120" x2="132" y2="120"/>
      <text class="ui-tb off" x="142" y="115">Túneis ativos</text>
      <rect class="ui-panel" x="10" y="130" width="134" height="96" rx="4"/>
      <text class="ui-l" x="17" y="144">Método de ligação</text>
      <circle class="ui-ro on" cx="22" cy="155" r="4"/>
      <circle class="ui-rd" cx="22" cy="155" r="2"/>
      <text class="ui-tb" x="31" y="158">Túnel</text>
      <circle class="ui-ro" cx="22" cy="169" r="4"/>
      <text class="ui-tb" x="31" y="172">RD Gateway</text>
      <text class="ui-l" x="17" y="190">Monitores</text>
      <circle class="ui-ro on" cx="22" cy="200" r="4"/><circle class="ui-rd" cx="22" cy="200" r="2"/>
      <text class="ui-tb" x="31" y="203">Único</text>
      <circle class="ui-ro" cx="80" cy="200" r="4"/>
      <text class="ui-tb" x="89" y="203">Todos</text>
      <rect class="ui-ck" x="18" y="213" width="8" height="8" rx="2"/>
      <path d="M20 217 l2 2 l4 -4" stroke="#fff" stroke-width="1.2" fill="none"/>
      <text class="ui-tb" x="31" y="220">Auth Entra ID</text>
      <circle class="ui-ro on" cx="158" cy="138" r="4"/><circle class="ui-rd" cx="158" cy="138" r="2"/>
      <text class="ui-tb" x="167" y="141">Esta subscrição</text>
      <circle class="ui-ro" cx="158" cy="152" r="4"/>
      <text class="ui-tb" x="167" y="155">Todas as subscrições</text>
      <rect class="ui-field" x="152" y="162" width="138" height="14" rx="3"/>
      <text class="ui-p" x="157" y="172">Pesquisar por nome</text>
      <rect class="ui-field" x="152" y="180" width="138" height="14" rx="3"/>
      <text class="ui-p" x="157" y="190">Filtrar por etiqueta</text>
      <rect class="ui-field" x="152" y="198" width="138" height="15" rx="3"/>
      <text class="ui-v" x="157" y="209">vm-app-prod-01</text>
      <rect class="ui-panel" x="152" y="218" width="138" height="30" rx="4"/>
      <circle class="ui-run" cx="161" cy="233" r="3.5"/>
      <text class="ui-tb" x="170" y="236">Em execução</text>
      <rect class="ui-btn-2" x="248" y="226" width="36" height="14" rx="3"/>
      <text class="ui-tb" x="254" y="236">Iniciar</text>
      <text class="ui-l" x="10" y="268">Porta de destino</text>
      <rect class="ui-field" x="10" y="272" width="60" height="15" rx="3"/>
      <text class="ui-v" x="15" y="283">3389</text>
      <text class="ui-l" x="80" y="268">Porta local</text>
      <rect class="ui-field" x="80" y="272" width="60" height="15" rx="3"/>
      <text class="ui-v" x="85" y="283">55001</text>
      <text class="ui-p" x="10" y="306">Abre na Windows App</text>
      <rect class="ui-btn" x="10" y="320" width="280" height="26" rx="4"/>
      <text class="ui-bt" x="150" y="337" text-anchor="middle">Ligar</text>
      <text class="ui-p" x="10" y="362">EN · NL · DE · FR · ES · PT</text>
    </svg>
  </div>
  <figcaption><b>macOS</b> O separador Azure VM no macOS. Túnel é a predefinição. O RD Gateway continua a poder ser selecionado, e a aplicação avisa antes de o utilizar.</figcaption>
</figure>

A predefinição só se aplica até escolher um método por si mesmo; depois disso, a sua escolha é guardada por inquilino e restaurada da próxima vez que abrir a aplicação.

## Escolher uma VM

Um par de botões de opção por cima da lista de VMs controla o funcionamento da pesquisa.

| Modo | Comportamento |
| --- | --- |
| Esta subscrição (predefinição) | Lista de imediato todas as VMs da subscrição selecionada. Escreva na caixa de filtro para restringir por nome. A lista pendente de subscrições só mostra as subscrições que efetivamente contêm VMs. |
| Todas as subscrições | Pesquisa em todas as subscrições que a sua conta consegue ver, utilizando o Azure Resource Graph. Requer pelo menos três carateres antes de devolver resultados. Carregar VMs em cerca de 200 subscrições demora 2 a 4 segundos, em vez de 30 a 60 segundos quando cada subscrição é consultada uma a uma. |

<div class="callout note">
<span class="eyebrow">Nota</span>
<p>O filtro por etiqueta funciona em conjunto com o filtro de nome em ambos os modos, para que possa restringir ainda mais uma lista extensa antes de escolher uma VM.</p>
</div>

## Campos

| Campo | Descrição |
| --- | --- |
| Método de ligação | Túnel ou RD Gateway. A predefinição é RD Gateway no Windows e Túnel no macOS. |
| Monitores | Monitor único ou todos os monitores. Aplica-se apenas ao RD Gateway. |
| Auth Entra ID | Opcional, mostrado apenas para o RD Gateway. Ativa o início de sessão único quando a sua conta e a VM partilham o mesmo inquilino. |
| Máquina virtual | A VM à qual ligar, escolhida na lista à direita. |
| Porta de destino, porta local | Utilizadas apenas no modo Túnel, e partilhadas com o separador Endereço IP. |

Antes de ligar, a aplicação verifica o SKU do Bastion e os respetivos indicadores de funcionalidades, e o estado de energia da VM, e indica o que está em falta se uma verificação falhar. Estas verificações são fail-open: uma verificação que não consiga concluir não bloqueia a ligação.

## Estado de energia e iniciar uma VM

O estado de energia da VM selecionada aparece junto ao seu nome.

| Estado | Significado |
| --- | --- |
| Em execução (verde) | A VM está ligada e pronta para ligações. |
| Parada ou desalocada (vermelho) | A VM está desligada. Aparece um botão **Iniciar**. |
| A iniciar, a parar, ou outro (âmbar) | A VM está entre estados. É mostrado um indicador de progresso enquanto a aplicação espera que estabilize. |

Para iniciar uma VM parada, selecione **Iniciar**. O botão é substituído por um indicador de progresso enquanto a aplicação consulta o Azure para obter o estado atualizado, uma vez a cada 5 segundos durante até 5 minutos. Quando o estado fica verde, uma notificação confirma que a VM está pronta e o botão **Ligar** fica disponível.

<div class="callout warn">
<span class="eyebrow">Iniciar precisa de mais do que Leitor</span>
<p>Iniciar uma VM requer a função Virtual Machine Contributor ou uma função com direitos equivalentes. Se o botão Iniciar não aparecer, a sua conta provavelmente só tem Leitor nessa VM.</p>
</div>

<div class="callout note">
<span class="eyebrow">Em execução não é o mesmo que pronta</span>
<p>Em execução significa que o Azure ligou a VM. O sistema operativo convidado ainda precisa de um ou dois minutos para terminar o arranque antes de aceitar ligações RDP. Se uma ligação for recusada logo depois de o estado ficar verde, aguarde alguns minutos e tente novamente. O botão Ligar volta a verificar o estado de energia no momento em que o seleciona, mesmo que tenha clicado logo a seguir à mudança do indicador.</p>
</div>
