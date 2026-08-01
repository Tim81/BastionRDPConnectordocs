---
title: Primeiro início de sessão
description: O que acontece da primeira vez que abre a aplicação, como funciona a cache de tokens, e como se articulam a seleção de inquilino e de subscrição.
appliesTo: '3.3.5'
lastReviewed: '2026-07-25'
---

A aplicação inicia a sua sessão com o MSAL, a mesma biblioteca que o Azure CLI e o Visual Studio utilizam para o início de sessão interativo. Abre a página de início de sessão num navegador incorporado: WebView2 no Windows, WKWebView no macOS. Não há uma janela de navegador separada nem um código de dispositivo para copiar e colar.

## Iniciar sessão

O que vê depende de já existir ou não um token em cache na sua máquina.

| Situação | O que acontece |
| --- | --- |
| Sem token em cache | A página de início de sessão da Microsoft abre de imediato. |
| Um token em cache válido | A aplicação inicia sessão em silêncio. Não aparece nenhuma janela de início de sessão, e passa diretamente para a seleção de inquilino se a sua conta tiver mais do que um. |
| Um token expirado, ou uma política de Acesso Condicional que exige reautenticação | A janela de início de sessão abre novamente, para que possa satisfazer o que a sua organização exigir, por exemplo MFA diária. |

Escolha **Conta profissional ou de estudante**, introduza a sua conta e conclua o MFA se a sua organização o exigir.

<div class="callout note">
<span class="eyebrow">Nota</span>
<p>A cache de tokens fica em <code>%LOCALAPPDATA%\BastionRDPConnector\msal_token_cache.bin</code>. É específica da máquina e não é itinerante, e está separada da cache do Azure CLI. O perfil do próprio navegador incorporado fica ao lado, em <code>%LOCALAPPDATA%\BastionRDPConnector\WebView2</code>.</p>
</div>

## Escolher um inquilino

<!-- Mirrors src/components/ScreenSignIn.astro -->
<figure class="appshot">
  <div class="frame">
    <svg viewBox="0 0 300 372" role="img" aria-labelledby="s-signin-win">
      <title id="s-signin-win">A caixa de diálogo de seleção de inquilino no Windows. Estão listados três inquilinos, cada um com um botão de opção e o respetivo ID de inquilino. Um está selecionado. Um botão OK confirma a escolha.</title>
      <rect class="ui-win" x="1" y="1" width="298" height="370" rx="6"/>
      <path class="ui-bar" d="M2 2 H298 V22 H2 Z"/>
      <text class="ui-title" x="10" y="15">Selecionar inquilino</text>
      <path d="M280 9 l7 7 M287 9 l-7 7" stroke="#7B8794" stroke-width="1.1" fill="none"/>
      <text class="ui-l" x="10" y="42">A sua conta tem acesso a mais do que</text>
      <text class="ui-l" x="10" y="54">um inquilino. Escolha um para continuar.</text>
      <rect class="ui-panel" x="10" y="68" width="280" height="42" rx="4"/>
      <circle class="ui-ro on" cx="24" cy="88" r="4"/>
      <circle class="ui-rd" cx="24" cy="88" r="2"/>
      <text class="ui-tb" x="36" y="86">Contoso Production</text>
      <text class="ui-p" x="36" y="98">5f8a2c14-…-tenant</text>
      <rect class="ui-panel" x="10" y="114" width="280" height="42" rx="4"/>
      <circle class="ui-ro" cx="24" cy="134" r="4"/>
      <text class="ui-tb" x="36" y="132">Contoso Dev</text>
      <text class="ui-p" x="36" y="144">b2c19e07-…-tenant</text>
      <rect class="ui-panel" x="10" y="160" width="280" height="42" rx="4"/>
      <circle class="ui-ro" cx="24" cy="180" r="4"/>
      <text class="ui-tb" x="36" y="178">Fabrikam (Lighthouse)</text>
      <text class="ui-p" x="36" y="190">9e4d3a51-…-tenant</text>
      <text class="ui-p" x="10" y="222">As definições são guardadas separadamente por</text>
      <text class="ui-p" x="10" y="233">inquilino e restauradas quando muda de volta.</text>
      <rect class="ui-btn" x="190" y="320" width="100" height="26" rx="4"/>
      <text class="ui-bt" x="240" y="337" text-anchor="middle">OK</text>
    </svg>
  </div>
  <figcaption><b>Windows</b> A caixa de diálogo de seleção de inquilino no Windows. Aparece uma vez, logo após o início de sessão, apenas quando a conta consegue ver mais do que um inquilino. A caixa de diálogo tem o mesmo aspeto no macOS, à parte a moldura da janela.</figcaption>
</figure>

Esta caixa de diálogo aparece quando a sua conta tem acesso a mais do que um inquilino Entra ID, por exemplo através do Azure Lighthouse. Escolha o inquilino cujos recursos pretende utilizar e selecione **OK**. Se esse inquilino exigir MFA e o seu token em cache ainda não a satisfizer, recebe mais um pedido de autenticação.

Pode mudar de inquilino em qualquer momento enquanto a aplicação está a correr. As definições, ou seja, a última subscrição, anfitrião Bastion e VM que utilizou, são guardadas separadamente por inquilino e regressam automaticamente quando muda de volta.

## Selecionar uma subscrição

Depois de escolhido um inquilino, a janela principal carrega com uma **subscrição de Bastion** apresentada no topo. Se a sua conta tiver várias subscrições e a escolhida não contiver o anfitrião Bastion de que precisa, selecione **Alterar** para abrir o seletor.

<div class="callout note">
<span class="eyebrow">Nota</span>
<p>A subscrição de Bastion no topo é a que contém o seu recurso Bastion. No separador Azure VM, a subscrição da VM pode ser completamente diferente. As ligações entre subscrições funcionam sem configuração adicional.</p>
</div>

O seu token mantém-se em disco entre arranques, pelo que não lhe é pedido para iniciar sessão novamente a não ser que a sessão expire ou uma política de Acesso Condicional o exija. Para forçar um novo início de sessão, selecione **Terminar sessão** na barra superior. Remove o token em cache e limpa o estado do MSAL num único passo, e o arranque seguinte começa a partir de um início de sessão em branco.
