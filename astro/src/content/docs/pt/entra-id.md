---
title: Autenticação Entra ID
description: Início de sessão único para sessões RD Gateway, quando ativá-lo, e o que acontece quando o Bastion o recusa.
appliesTo: '3.3.6'
lastReviewed: '2026-07-25'
---

O separador Azure VM tem uma caixa de verificação de auth Entra ID junto ao Método de ligação. Aplica-se apenas ao RD Gateway, e está **desativada por predefinição**.

## O que faz

Com a autenticação Entra ID ativada, a sessão RDP inicia sessão com a sua identidade Microsoft em vez de pedir um nome de utilizador e palavra-passe do Windows. Funciona quando a sua conta e a máquina virtual de destino estão no mesmo inquilino Entra ID, e a máquina está associada a esse inquilino.

Com ela desativada, a sessão utiliza a autenticação RDP habitual e pede um nome de utilizador e palavra-passe. É essa a predefinição porque funciona em qualquer lugar, incluindo entre inquilinos.

## O que acontece quando a ativa

A aplicação pede ao Bastion um ficheiro `.rdp` com a autenticação Entra ID ativada. Se o Bastion não devolver um, a aplicação pede novamente com a definição desativada e utiliza esse em vez disso.

Portanto, ativar a caixa de verificação é uma preferência e não uma exigência. Se a combinação não for suportada, a ligação abre na mesma, utilizando um nome de utilizador e palavra-passe.

O registo indica qual das vias foi seguida:

```
Attempting RDP download WITH Entra ID Authentication...
Entra ID Auth failed, falling back to traditional authentication...
```

<div class="callout warn">
<span class="eyebrow">Entre inquilinos</span>
<p>A autenticação Entra ID não funciona quando a máquina virtual pertence a um inquilino diferente do da conta com que iniciou sessão, o que é o caso habitual com o Azure Lighthouse. O Azure AD devolve <code>AADSTS293004</code>. Deixe a caixa de verificação desativada nessas ligações. O mecanismo de contingência trata disso se se esquecer, ao custo de mais uma volta de rede.</p>
</div>

## Porque é que o Túnel não tem esta definição

O Túnel transporta uma ligação em bruto até uma porta local. A forma como se autentica dentro da sessão remota nunca passa pela aplicação, pelo que não há nenhuma definição Entra ID para mostrar. Inicie sessão dentro da janela RDP da forma que a máquina de destino esperar.

## Onde a escolha é guardada

A caixa de verificação é guardada [por inquilino](../tenants/), juntamente com o método de ligação e o modo de monitor. Alterá-la para um inquilino não afeta nenhum outro.
