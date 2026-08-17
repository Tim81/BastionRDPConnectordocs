---
title: Túneis ativos
description: Todas as ligações Túnel que a aplicação tem abertas, com a respetiva porta local, tempo decorrido, e controlos para reconectar o seu cliente RDP ou pará-lo.
appliesTo: '3.3.6'
lastReviewed: '2026-07-25'
---

Cada ligação Túnel que abre, quer no separador Endereço IP quer no separador Azure VM, aparece aqui enquanto se mantiver aberta. As ligações RD Gateway não aparecem neste separador, porque não abrem uma porta local para acompanhar.

## O separador Túneis ativos

<!-- Mirrors src/components/ScreenActiveTunnels.astro -->
<figure class="appshot">
  <div class="frame">
    <svg viewBox="0 0 300 372" role="img" aria-labelledby="s-tun-win">
      <title id="s-tun-win">O separador Túneis ativos no Windows. Uma subscrição e um anfitrião Bastion são escolhidos no topo. O separador lista todos os túneis abertos com o respetivo nome, porta local, tempo decorrido, e um controlo para parar.</title>
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
      <text class="ui-tb off" x="76" y="115">Azure VM</text>
      <text class="ui-tb" x="142" y="115">Túneis ativos</text>
      <line class="ui-tabup" x1="138" y1="120" x2="230" y2="120"/>
      <rect class="ui-btn-2" x="246" y="130" width="44" height="15" rx="3"/>
      <text class="ui-tb" x="256" y="141">Atualizar</text>
      <rect class="ui-panel" x="10" y="152" width="280" height="50" rx="4"/>
      <circle class="ui-run" cx="22" cy="167" r="3.5"/>
      <text class="ui-tb" x="32" y="171">vm-dev-web-01</text>
      <text class="ui-p" x="32" y="184">localhost:55000 · aberto há 4m 12s</text>
      <rect class="ui-btn-2" x="244" y="163" width="34" height="15" rx="3"/>
      <text class="ui-tb" x="252" y="174">Parar</text>
      <rect class="ui-panel" x="10" y="210" width="280" height="50" rx="4"/>
      <circle class="ui-run" cx="22" cy="225" r="3.5"/>
      <text class="ui-tb" x="32" y="229">10.20.4.15</text>
      <text class="ui-p" x="32" y="242">localhost:55001 · aberto há 41s</text>
      <rect class="ui-btn-2" x="244" y="221" width="34" height="15" rx="3"/>
      <text class="ui-tb" x="252" y="232">Parar</text>
      <text class="ui-p" x="10" y="284">Os túneis reconectam-se sozinhos se o</text>
      <text class="ui-p" x="10" y="295">WebSocket cair, até cinco tentativas.</text>
      <text class="ui-p" x="10" y="352">EN · NL · DE · FR · ES · PT</text>
    </svg>
  </div>
  <figcaption><b>Windows</b> O separador Túneis ativos no Windows. Cada linha é um túnel aberto, com a respetiva porta local, tempo decorrido, e um controlo para parar. A lista funciona da mesma forma no macOS.</figcaption>
</figure>

Cada linha indica o destino, a porta local em que está à escuta, e há quanto tempo está aberto.

| Controlo | Ação |
| --- | --- |
| Atualizar | Recarrega a lista de túneis abertos. |
| Conectar RDP | Relança o seu cliente de ambiente de trabalho remoto contra a porta local deste túnel. Útil se fechou a janela RDP sem parar o túnel. |
| Parar | Fecha a ligação WebSocket ao Bastion e termina o túnel. |

<div class="callout warn">
<span class="eyebrow">Parar termina a sessão</span>
<p>Parar um túnel derruba imediatamente qualquer sessão RDP que o esteja a utilizar. Guarde o seu trabalho na sessão remota primeiro.</p>
</div>

## Reconectar

Se a ligação WebSocket ao Bastion cair, por exemplo devido a uma breve interrupção de rede ou a manutenção do Bastion, o túnel reconecta-se sozinho. Tenta até cinco vezes, com um intervalo crescente entre tentativas. A sua sessão RDP normalmente mantém-se ligada ao longo de uma reconexão tão curta, pelo que pode nem notar que aconteceu.

Se as cinco tentativas falharem todas, o túnel para e a área de notificação mostra uma notificação de erro. A partir daí, abra novamente o separador Azure VM ou o separador Endereço IP e reconecte manualmente.
