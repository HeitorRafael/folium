# Folium — Design System

## Filosofia
Minimalismo radical. Três cores base. Zero distração. O conteúdo é o design.

---

## Paleta de Cores
```css
/* Base (sempre presente) */
--color-bg:        #FFFFFF   /* Fundo principal */
--color-text:      #111111   /* Texto principal */
--color-beige:     #F0EBE0   /* Superfícies secundárias, cards */
--color-brown:     #7C6248   /* Acentos quentes, bordas, detalhes */
--color-muted:     #6B6460   /* Texto secundário, metadata */

/* Exclusivo pós-login */
--color-moss:      #4A7C59   /* Verde musgo — cards em destaque, CTAs logado */
--color-moss-light:#6B9E7A   /* Hover state do moss */

/* Dark mode */
--color-bg-dark:   #0F0F0F
--color-text-dark: #F0EBE0
--color-card-dark: #1C1917
--color-border-dark: #2C2520
```

**Tokens Tailwind** (em `tailwind.config.ts`):
```js
colors: {
  bg: 'var(--color-bg)',
  text: 'var(--color-text)',
  beige: 'var(--color-beige)',
  brown: 'var(--color-brown)',
  moss: 'var(--color-moss)',
}
```

---

## Tipografia
| Uso | Fonte | Weight |
|-----|-------|--------|
| Títulos (H1-H2) | Playfair Display (serif) | 700 |
| Corpo de texto | Inter | 400 / 500 |
| Código em ensaios | JetBrains Mono | 400 |
| Labels, metadata | Inter | 400 |

Carregadas via `next/font/google` para performance zero-CLS.

---

## Landing Page (Pré-Login)
```
[FUNDO BRANCO — FULL SCREEN]

              Folium

    A rede social da informação.
  Estude. Sintetize. Compartilhe.
   Seu conhecimento, curado pela
        comunidade.

      [  Entrar com Google  ]

  Termos de Uso · Política de Privacidade
```
- Texto central: tipografia serifada (Playfair Display)
- Botão Google: borda fina, ícone do Google, fundo transparente
- ZERO imagens, ZERO animações, ZERO distrações
- Responsivo: mesma estrutura em mobile

---

## Card de Ensaio
Inspirado em cards colecionáveis modernos (Lorcana, Flesh and Blood):

```
┌──────────────────────────┐
│                          │
│    [IMAGEM DE CAPA]      │  ← 58% altura do card
│   (default: silhueta     │    border-radius top: 16px
│    cinza, frascos+bolhas)│
│                          │
├──────────────────────────┤
│ Título do Ensaio         │  ← Playfair Display 18px bold
│                          │
│ Preview do texto aqui,   │  ← Inter 14px, 3 linhas max
│ truncado com fade...     │    color: --muted
│                          │
├──────────────────────────┤
│ @autor  · 27 abr · ⚗️ 42 │  ← rodapé, Inter 12px
└──────────────────────────┘
```

**Especificações:**
- Largura: ~320px desktop, 90vw mobile
- Proporção: 3:4 (portrait card)
- `border-radius: 16px`
- `box-shadow: 0 8px 32px rgba(0,0,0,0.10)`
- Borda `1px solid var(--color-brown)` opacity 20%
- Card em destaque (logged in): borda `var(--color-moss)` opacity 60%

**Estados:**
- Hover: sobe levemente (`translateY(-4px)`, transição 200ms)
- Ativo (leitura): expande para full-screen overlay
- Loading: skeleton beige animado

---

## Navegação de Cards (Deck)
- 3 cards visíveis sobrepostos (offset de 8px e escala decrescente)
- **Swipe horizontal** via Framer Motion `drag="x"` com `dragConstraints`
- Velocidade de arraste determina snapping (threshold: 80px ou vel > 300px/s)
- Click nas laterais escurecidas → navegar (zona de 15% das bordas)
- Animação de saída: card rotaciona levemente e sai pela lateral
- Animação de entrada: próximo card escala de 0.92 para 1.0

---

## Sidebar de Tópicos
- **Trigger**: ícone de "pilha de cartas" (3 retângulos em perspectiva) — temático com o projeto
- Largura: 280px
- Slide in da esquerda com overlay escuro 40% atrás
- Lista de tópicos com ícone + nome + contador de ensaios
- Seção "Meus Tópicos" e "Explorar"
- Fechar: click no overlay ou no X

---

## Header / Navegação
```
[FOLIUM]                    [🌙] [@avatar]
```
- Logo: "FOLIUM" em Playfair Display, letra-espaçamento amplo
- Toggle dark/light: ícone sol/lua
- Avatar: dropdown com Perfil, Meus Ensaios, Configurações, Sair
- Em mobile: avatar vira menu hambúrguer

---

## Dark Mode
- Estratégia: `class` no `<html>` via `next-themes`
- Toggle persiste em `localStorage`
- Verde musgo funciona nos dois modos (testado por contraste WCAG AA)
- Cards em dark: fundo `#1C1917`, borda `#2C2520`

---

## Responsividade
| Breakpoint | Layout |
|------------|--------|
| < 640px (mobile) | 1 card por vez, full-width |
| 640-1024px (tablet) | 1 card centralizado, sidebar overlay |
| > 1024px (desktop) | Deck de cards centralizado, sidebar opcional |

---

## Imagem Default do Card (SVG)
Silhueta minimalista: dois frascos Erlenmeyer, bolhas subindo, tudo em `#C8BDB0` (cinza-bege) sobre fundo `#F0EBE0`. Sem preenchimento colorido — apenas contornos. Transmite "laboratório/ciência/descoberta" sem competir com a identidade de quem fez upload.
