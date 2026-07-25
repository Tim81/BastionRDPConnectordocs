---
title: Diagnósticos
description: O que a caixa de diálogo Sobre mostra, o que Copiar informações de diagnóstico recolhe, e o que fica de fora.
appliesTo: '3.3.4'
lastReviewed: '2026-07-25'
---

Um botão **i** na barra superior abre a caixa de diálogo Sobre. Mostra a versão da aplicação, uma linha sobre a sua plataforma, e duas ações para obter informação da aplicação quando algo precisa de resolução de problemas.

## A caixa de diálogo Sobre

<!-- Mirrors src/components/ScreenAbout.astro -->
<figure class="appshot">
  <div class="frame">
    <svg viewBox="0 0 300 372" role="img" aria-labelledby="s-about-win">
      <title id="s-about-win">A caixa de diálogo Sobre no Windows. Lista o nome da aplicação, a versão e a plataforma, e depois dois botões: Abrir pasta de registos e Copiar informações de diagnóstico.</title>
      <rect class="ui-win" x="1" y="1" width="298" height="370" rx="6"/>
      <path class="ui-bar" d="M2 2 H298 V22 H2 Z"/>
      <text class="ui-title" x="10" y="15">Sobre</text>
      <path d="M280 9 l7 7 M287 9 l-7 7" stroke="#7B8794" stroke-width="1.1" fill="none"/>
      <text class="ui-tb" x="10" y="46">Azure Bastion RDP Connector</text>
      <text class="ui-p" x="10" y="60">Versão 3.3.4</text>
      <text class="ui-p" x="10" y="72">Windows 11 · x64</text>
      <line x1="10" y1="86" x2="290" y2="86" stroke="#DCE2EA" stroke-width="1"/>
      <text class="ui-l" x="10" y="104">Diagnósticos</text>
      <rect class="ui-btn-2" x="10" y="110" width="280" height="24" rx="4"/>
      <text class="ui-tb" x="150" y="126" text-anchor="middle">Abrir pasta de registos</text>
      <text class="ui-p" x="10" y="148">Abre a pasta que contém o debug.log</text>
      <text class="ui-p" x="10" y="159">e as suas dez sessões arquivadas.</text>
      <rect class="ui-btn-2" x="10" y="170" width="280" height="24" rx="4"/>
      <text class="ui-tb" x="150" y="186" text-anchor="middle">Copiar informações de diagnóstico</text>
      <text class="ui-p" x="10" y="208">Copia informação do sistema, o registo atual,</text>
      <text class="ui-p" x="10" y="219">e as sessões arquivadas para a área de transferência.</text>
      <text class="ui-p" x="10" y="230">Já redigido, limitado a ~1 MB.</text>
      <rect class="ui-btn" x="190" y="320" width="100" height="26" rx="4"/>
      <text class="ui-bt" x="240" y="337" text-anchor="middle">Fechar</text>
    </svg>
  </div>
  <figcaption><b>Windows</b> A caixa de diálogo Sobre no Windows. Mostra a versão da aplicação e a plataforma, e oferece Abrir pasta de registos e Copiar informações de diagnóstico.</figcaption>
</figure>

| Ação | O que faz |
| --- | --- |
| Abrir pasta de registos | Abre a pasta que contém `debug.log` e as suas dez sessões arquivadas, no Explorador no Windows ou no Finder no macOS. |
| Copiar informações de diagnóstico | Copia um pacote de diagnóstico para a área de transferência. |

## O que está no pacote de diagnóstico

Copiar informações de diagnóstico constrói um pacote de texto a partir de:

- Informação do sistema: sistema operativo, versão da aplicação, plataforma.
- O `debug.log` da sessão atual.
- As sessões arquivadas, de `debug.0.log` a `debug.9.log`, das mais recentes para as mais antigas.

Cada entrada de registo no pacote está limitada a 100 KB, e o pacote inteiro deixa de crescer por volta de 1 MB. Esse limite mantém um pacote de uma longa sequência de sessões prático de colar num pedido de suporte ou numa mensagem de chat.

## O que é redigido, e o que não é

Tudo no pacote é redigido antes de chegar à área de transferência, da mesma forma que é redigido antes de ser escrito no `debug.log` em primeiro lugar. Tokens Bearer, JWTs, palavras-passe e chaves de API são substituídos antes de tocarem no disco.

IDs de subscrição, IDs de recurso, GUIDs e endereços IP mantêm-se. Não são segredos, e removê-los tornaria o registo muito menos útil para localizar em que VM, subscrição ou anfitrião Bastion ocorreu um problema.

<div class="callout note">
<span class="eyebrow">Nota</span>
<p>A redação acontece no momento da escrita, não no momento da cópia. Uma entrada de registo nunca é escrita em disco com um token ativo dentro, pelo que não há nada sensível à espera no <code>debug.log</code> para ser redigido mais tarde.</p>
</div>

## Enviar um registo para o suporte

Cole a saída de Copiar informações de diagnóstico diretamente num pedido de suporte ou numa mensagem de chat. Se o pacote estiver truncado e precisar do registo completo de uma sessão, utilize Abrir pasta de registos para encontrar o ficheiro exato e anexá-lo em vez disso.
