# Folium — Conceito e Visão do Produto

## O que é
Folium é uma rede social centrada em **ensaios** — textos de síntese que as pessoas escrevem após estudar um tema. Não é um blog, não é um fórum: é onde o conhecimento destilado se torna público, navegável e curado pela comunidade.

> Tagline: **"Onde o conhecimento se destila."**

## O problema que resolve
Estudar produz insights valiosos que ficam presos em cadernos e notas pessoais. Folium é onde esse conhecimento vira algo público, indexável e avaliado por quem também se interessa pelo tema. Diferente de Wikipedia (anônimo), Medium (blog pessoal) ou Reddit (fórum), Folium é focado em síntese autoral curada por pares.

---

## Fluxo Principal do Usuário

### Pré-login (Landing)
- Tela minimalista: fundo branco, texto central tricromático
- H1 grande: **"A rede social da informação"**
- Sub: frase breve explicando o conceito (1-2 linhas, sem jargão)
- Botão: "Entrar com Google"
- Footer: links de Termos de Uso e Privacidade

### Pós-login (Feed)
1. Usuário vê deck de cards — o ensaio mais recente em destaque
2. Arrasta para o lado ou clica fora do card → próximo ensaio
3. Abre um ensaio → lê o conteúdo completo em Markdown
4. Ao chegar no fim: frasco ⚗️ já marcado por padrão
5. Se não gostou: clica no "desfrasco" (não aparece publicamente)

### Tópicos (Comunidades)
- Menu lateral (trigger: ícone de pilha de páginas ou hambúrguer inovador)
- Lista de tópicos que o usuário segue
- Ao entrar em um tópico: ensaio mais bem avaliado em destaque
- Filtros: Dia / Semana / Mês / Ano / Sempre
- Busca por título dentro do tópico
- Se não encontrar nada: sugestões de ensaios relacionados

---

## Mecânica de Avaliação — Frascos ⚗️

**Símbolo escolhido**: Frasco de cientista (⚗️)
**Unidade**: "frascos destilados" — o ensaio foi refinado/aprovado

| Ação | Visibilidade |
|------|-------------|
| Frasco positivo | Exibido publicamente (contador visível) |
| Desfrasco (negativo) | Invisível publicamente — só afeta o ranking internamente |
| Padrão ao terminar leitura | Frasco já marcado (presumo boa-fé) |
| Forçar remoção | Clicar no ícone de desfrasco |

**Ranking**: ensaios com mais frascos positivos explícitos sobem. O desfrasco penaliza o score interno mas não expõe negatividade publicamente — incentiva avaliação honesta sem criar cultura tóxica.

---

## Tópicos de Lançamento (Exemplos)
- Ciência de Dados
- Programação
- Filosofia
- Matemática
- Física
- Biologia
- Arte e Design
- História
- Economia
- Idiomas

---

## Diferencial Competitivo
| Plataforma | Problema |
|------------|---------|
| Wikipedia | Sem autoria, sem síntese pessoal |
| Medium | Blog pessoal sem curadoria visual |
| Reddit | Fórum, não ensaios; algoritmo de engajamento, não qualidade |
| ResearchGate | Só para papers científicos formais |
| **Folium** | Síntese autoral + curadoria por pares + design de card navegável |

---

## Conceito do Card (Design Visual)
Inspirado em cards colecionáveis modernos (Lorcana, Flesh and Blood — não Pokémon diretamente, mas mesma linguagem):
- Proporção ~2.5:3.5
- Topo (60%): imagem de capa
  - Padrão: silhueta cinza de frascos de laboratório com bolhas (SVG)
  - Com Plus: imagem personalizada por upload
- Meio: título em serifado + preview do texto (2-3 linhas truncadas)
- Rodapé: @autor · data · ⚗️ contador de frascos
- Detalhe verde musgo (pós-login) na estrutura/borda do card em destaque
