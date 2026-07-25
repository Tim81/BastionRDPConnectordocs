---
title: Resolução de problemas
description: Problemas comuns, nas palavras que utilizaria para os descrever, e o que verificar para cada um.
appliesTo: '3.3.4'
lastReviewed: '2026-07-25'
---

## Antes de ligar

### Iniciei a aplicação novamente e não aconteceu nada

A aplicação permite apenas uma instância em execução. Se já estiver aberta, minimizada, ou na área de notificação, iniciá-la uma segunda vez traz a janela existente para a frente em vez de abrir uma nova. Verifique a área de notificação, no Windows, para o ícone da aplicação.

<!-- Mirrors src/components/ScreenTray.astro -->
<figure class="appshot">
  <div class="frame">
    <svg viewBox="0 0 300 372" role="img" aria-labelledby="s-tray-win">
      <title id="s-tray-win">O menu de contexto da área de notificação do Windows, expandido. Estão listados dois túneis abertos, cada um com controlos Conectar e Parar. Por baixo deles, Sobre e Sair.</title>
      <rect class="ui-win" x="1" y="1" width="298" height="370" rx="6"/>
      <path class="ui-bar" d="M2 2 H298 V22 H2 Z"/>
      <text class="ui-title" x="10" y="15">Azure Bastion RDP Connector</text>
      <path d="M266 9 h7 M280 9 l7 7 M287 9 l-7 7" stroke="#7B8794" stroke-width="1.1" fill="none"/>
      <text class="ui-l" x="10" y="40">Área de notificação, menu do botão direito</text>
      <rect class="ui-panel" x="10" y="48" width="280" height="50" rx="4"/>
      <circle class="ui-run" cx="22" cy="63" r="3.5"/>
      <text class="ui-tb" x="32" y="67">vm-dev-web-01</text>
      <text class="ui-p" x="32" y="80">localhost:55000 · aberto há 4m 12s</text>
      <rect class="ui-btn-2" x="194" y="59" width="46" height="15" rx="3"/>
      <text class="ui-tb" x="200" y="70">Conectar</text>
      <rect class="ui-btn-2" x="244" y="59" width="34" height="15" rx="3"/>
      <text class="ui-tb" x="252" y="70">Parar</text>
      <rect class="ui-panel" x="10" y="106" width="280" height="50" rx="4"/>
      <circle class="ui-run" cx="22" cy="121" r="3.5"/>
      <text class="ui-tb" x="32" y="125">10.20.4.15</text>
      <text class="ui-p" x="32" y="138">localhost:55001 · aberto há 41s</text>
      <rect class="ui-btn-2" x="194" y="117" width="46" height="15" rx="3"/>
      <text class="ui-tb" x="200" y="128">Conectar</text>
      <rect class="ui-btn-2" x="244" y="117" width="34" height="15" rx="3"/>
      <text class="ui-tb" x="252" y="128">Parar</text>
      <line x1="10" y1="170" x2="290" y2="170" stroke="#DCE2EA" stroke-width="1"/>
      <text class="ui-tb" x="20" y="190">Sobre</text>
      <text class="ui-tb" x="20" y="212">Sair</text>
      <text class="ui-p" x="10" y="352">Faça duplo clique no ícone da área de notificação para restaurar a janela principal.</text>
    </svg>
  </div>
  <figcaption><b>Windows</b> O menu de contexto da área de notificação no Windows, expandido. Cada túnel aberto recebe os seus próprios controlos Conectar e Parar, seguidos de Sobre e Sair.</figcaption>
</figure>

Fechar a janela principal, ou minimizá-la, não fecha a aplicação. Ambas as ações escondem a janela e deixam-na a correr na área de notificação, pelo que quaisquer túneis abertos se mantêm ligados. Clique com o botão direito no ícone da área de notificação e selecione **Sair** para a fechar por completo. O ícone da área de notificação é exclusivo do Windows; o macOS não tem ícone de área de notificação por conceção.

### Não aparecem subscrições, ou a lista de Bastion está vazia

Isto normalmente significa que a sua conta não tem nenhuma atribuição de função em nenhuma subscrição, ou que o inquilino em que está não contém nenhum recurso Bastion. Experimente:

- Selecionar **Atualizar** junto ao campo Bastion.
- Selecionar **Alterar** para escolher uma subscrição diferente.
- Terminar sessão e voltar a iniciá-la, caso a sua sessão tenha expirado.
- Pedir a quem gere as suas funções do Azure para confirmar que tem Leitor no anfitrião Bastion e na sua rede virtual.

## Ligar

### O mstsc abre, mas a ligação falha para uma VM do Azure via RD Gateway

Verifique se:

- O estado de energia da VM mostra **Em execução**, e dê ao sistema operativo convidado um ou dois minutos depois disso para terminar o arranque.
- O anfitrião Bastion é do SKU Standard ou Premium. O Basic não suporta o cliente nativo.
- Nenhuma regra de grupo de segurança de rede bloqueia o tráfego de entrada do Bastion para a VM na porta 3389.
- Existe uma rota do Bastion para a VM, seja na mesma rede virtual, num emparelhamento, ou via Virtual WAN.

### O mstsc abre, mas a ligação falha para uma VM do Azure via Túnel

Tudo o que foi indicado acima continua a aplicar-se, mais:

- Verifique o separador [Túneis ativos](../active-tunnels/). Se o túnel não estiver listado, ou aparecer como parado, tente ligar novamente para iniciar um novo.
- Se a porta local que configurou já estava em utilização, a aplicação escolheu automaticamente a porta livre seguinte. Verifique a porta mostrada no separador Túneis ativos face à que o seu cliente está a utilizar.

### A ligação falha quando escrevo um endereço IP

- Confirme que o endereço é alcançável a partir da rede virtual do Bastion, não apenas a partir da sua própria máquina. Para destinos no local, isso significa uma VPN site a site ou ExpressRoute a funcionar; para outra cloud, uma ligação VPN ao Azure.
- Confirme a porta de destino. A 3389 é a normal para RDP, mas um anfitrião não Azure ou no local pode estar à escuta noutra.
- Verifique se existe uma firewall no destino a bloquear o RDP de entrada a partir da sub-rede do Bastion.

### O botão Iniciar não aparece para uma VM parada

Iniciar uma VM requer a função Virtual Machine Contributor, ou uma função equivalente; Leitor por si só não chega. Peça a quem gere as suas funções do Azure para a conceder, ou inicie a VM a partir do portal do Azure em alternativa.

### Recebi um erro AADSTS293004

O Azure AD devolve isto quando a [autenticação Entra ID](../entra-id/) é utilizada contra uma máquina virtual num inquilino diferente do da sua conta com sessão iniciada, o que é o caso habitual com o Azure Lighthouse.

Desmarque a caixa de verificação de auth Entra ID no separador Azure VM e ligue novamente. A definição está desativada por predefinição, pelo que, se estiver a ver isto, foi ativada nalgum momento e guardada para este inquilino.

Pode vê-lo no registo sem que a ligação falhe. Quando o Bastion recusa um pedido Entra ID, a aplicação pede novamente com a definição desativada e utiliza esse ficheiro, pelo que a sessão continua a abrir após mais uma volta de rede.

Se o erro aparecer ao abrir diretamente um ficheiro `.rdp` guardado, reconecte a partir do separador Azure VM em vez disso. Um ficheiro guardado de uma sessão anterior transporta a definição que estava em uso quando foi escrito.

## Início de sessão e reposição

### Continuo a ser pedido para iniciar sessão

A política de Acesso Condicional da sua organização pode exigir reautenticação numa agenda, ou MFA em cada início de sessão. Isso é esperado. Conclua o pedido quando aparecer; a aplicação não controla com que frequência o seu inquilino pede isto.

### Quero começar do zero, a partir de um estado limpo

Selecione **Terminar sessão** na barra superior para limpar o seu estado de início de sessão; remove a cache de tokens e o estado do MSAL num único passo. Para também repor as preferências, feche a aplicação e elimine `%APPDATA%\BastionRDPConnector\settings.json`. [Ficheiros e definições](../files-and-settings/) explica o que cada ficheiro contém e onde vivem.

### Preciso de enviar um registo para o suporte

Abra **Sobre** e selecione **Copiar informações de diagnóstico**, ou **Abrir pasta de registos** para encontrar os ficheiros diretamente. [Diagnósticos](../diagnostics/) explica o que está no pacote e como é redigido.
