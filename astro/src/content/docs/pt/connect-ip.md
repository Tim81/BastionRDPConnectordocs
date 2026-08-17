---
title: Ligar a um endereço IP
description: O separador Endereço IP alcança tudo o que a rede virtual do Bastion consiga alcançar, não apenas VMs do Azure, através de uma ligação Túnel.
appliesTo: '3.3.6'
lastReviewed: '2026-07-25'
---

Utilize este separador quando a máquina que pretende não tiver um registo de VM que possa escolher pelo nome, ou não for de todo uma VM do Azure. Alcança máquinas no local através de VPN ou ExpressRoute, sistemas Windows noutras clouds, e qualquer VM do Azure que prefira endereçar diretamente em vez de procurar.

## O separador Endereço IP

<!-- Mirrors src/components/ScreenIpAddress.astro -->
<figure class="appshot">
  <div class="frame">
    <svg viewBox="0 0 300 372" role="img" aria-labelledby="s-ip-win">
      <title id="s-ip-win">O separador Endereço IP no Windows. Uma subscrição e um anfitrião Bastion são escolhidos no topo. O separador contém um campo de endereço, porta de destino, porta local, e o botão Ligar.</title>
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
      <text class="ui-tb" x="14" y="115">Endereço IP</text>
      <line class="ui-tabup" x1="10" y1="120" x2="70" y2="120"/>
      <text class="ui-tb off" x="76" y="115">Azure VM</text>
      <text class="ui-tb off" x="142" y="115">Túneis ativos</text>
      <rect class="ui-panel" x="10" y="132" width="280" height="112" rx="4"/>
      <text class="ui-l" x="20" y="150">Endereço IP</text>
      <rect class="ui-field" x="20" y="154" width="260" height="16" rx="3"/>
      <text class="ui-v" x="25" y="165">10.20.4.15</text>
      <text class="ui-l" x="20" y="185">Porta de destino</text>
      <rect class="ui-field" x="20" y="189" width="120" height="15" rx="3"/>
      <text class="ui-v" x="25" y="200">3389</text>
      <text class="ui-l" x="160" y="185">Porta local</text>
      <rect class="ui-field" x="160" y="189" width="120" height="15" rx="3"/>
      <text class="ui-v" x="165" y="200">55000</text>
      <text class="ui-p" x="20" y="220">Alcança qualquer endereço para o qual a rede</text>
      <text class="ui-p" x="20" y="231">virtual do Bastion tenha uma rota.</text>
      <text class="ui-p" x="10" y="268">Abre no mstsc</text>
      <rect class="ui-btn" x="10" y="282" width="280" height="26" rx="4"/>
      <text class="ui-bt" x="150" y="299" text-anchor="middle">Ligar</text>
      <text class="ui-p" x="10" y="352">EN · NL · DE · FR · ES · PT</text>
    </svg>
  </div>
  <figcaption><b>Windows</b> O separador Endereço IP no Windows. O Túnel é o único método disponível aqui, porque o RD Gateway não consegue resolver um endereço escrito manualmente. No macOS a disposição é idêntica; Ligar abre a Windows App em vez do mstsc.</figcaption>
</figure>

Este separador utiliza sempre o Túnel. O RD Gateway precisa que o Bastion resolva o próprio destino, e um endereço escrito manualmente não lhe dá nada para resolver.

## Campos

| Campo | Descrição | Predefinição |
| --- | --- | --- |
| Endereço IP | O endereço privado da máquina de destino. Tem de ser alcançável a partir da rede virtual do anfitrião Bastion. | nenhuma |
| Porta de destino | A porta RDP à escuta na máquina remota. | 3389 |
| Porta local | A porta no seu computador onde o túnel escuta. O seu cliente de ambiente de trabalho remoto liga-se a `localhost:[Porta local]`. | 55000 |

A porta de destino e a porta local são partilhadas com o separador Azure VM. Altere uma ali e altera-se aqui também.

## Ligar

1. Escreva o endereço de destino.
2. Deixe a porta de destino em 3389, a não ser que a máquina esteja à escuta noutra, e altere a porta local apenas se a 55000 já estiver ocupada no seu computador.
3. Selecione **Ligar**. A aplicação abre um túnel WebSocket para o Bastion e inicia o seu cliente de ambiente de trabalho remoto apontado a `localhost:[Porta local]`.

<div class="callout warn">
<span class="eyebrow">Acessibilidade, não nomeação</span>
<p>A aplicação não tem forma de confirmar que um endereço de destino está correto, para além de verificações de formato. Se a rede virtual do Bastion não conseguir alcançar esse endereço, o túnel abre mas o cliente de ambiente de trabalho remoto não consegue concluir a ligação. Verifique com quem gere a sua rede se não tiver a certeza de que existe uma rota.</p>
</div>
