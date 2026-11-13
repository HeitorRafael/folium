# Folium — Fases de Desenvolvimento

## Princípio
Cada fase entrega um **produto funcional** — pode ser pausado sem deixar o projeto quebrado. Nenhuma fase deixa brechas de segurança abertas para a próxima corrigir.

---

## Fase 1 — Foundation (Semana 1-2)
**Entrega**: Usuário consegue criar conta, ver e ler ensaios

**Critério de conclusão**: Entro com Google → vejo feed de cards → abro um ensaio → leio o conteúdo completo.

| Task | Detalhe |
|------|---------|
| Setup projeto | Next.js 14 + TypeScript + Tailwind + Supabase + Prisma |
| Schema do banco | User, Ensaio, Topico, Frasco (+ migrations) |
| RLS policies | Todas as tabelas desde o dia 1 |
| Middleware Auth | Session refresh via Supabase SSR |
| Landing page | Pré-login, minimalista, botão Google OAuth |
| Componente EnsaioCard | Design completo com skeleton loading |
| Feed básico | Lista de ensaios, sem ranking ainda |
| Página de leitura | Markdown renderizado via react-markdown + sanitize |
| SVG default | Frasco silhueta cinza para cards sem imagem |
| Deploy | Vercel + variáveis de ambiente configuradas |
| Headers de segurança | CSP, HSTS, X-Frame-Options via next.config.ts |

---

## Fase 2 — Social Core (Semana 3-4)
**Entrega**: Sistema de frascos, tópicos e swipe de cards funcionando

**Critério de conclusão**: Escrevo um ensaio em um tópico → alguém lê e dá frasco → ensaio sobe no ranking → posso arrastar cards no feed.

| Task | Detalhe |
|------|---------|
| Editor de ensaios | Tiptap com export Markdown, preview ao vivo |
| CRUD de ensaios | Criar, editar, deletar (somente autor via RLS) |
| Sistema de tópicos | Criar, listar, entrar em tópico |
| Follow de tópicos | Feed personalizado = union dos tópicos seguidos |
| Sistema de frascos | Votar, contagem, RLS anti-duplo-voto, default marcado |
| Ranking do feed | Ordenação por frascos, com filtros de tempo |
| Swipe de cards | Framer Motion drag com animação de deck |
| Sidebar de tópicos | Overlay slide-in, lista de tópicos |
| Rate limiting | Upstash Redis em todas as rotas de escrita |
| Dark mode | next-themes, sem flash no load |

---

## Fase 3 — Discovery (Semana 5)
**Entrega**: Busca, filtros e SEO funcionando

**Critério de conclusão**: Busco "redes neurais" dentro de Ciência de Dados → encontro ensaio → vejo sugestões relacionadas → Google consegue indexar a página do ensaio.

| Task | Detalhe |
|------|---------|
| Busca por título | Full-text search no PostgreSQL (`tsvector` + `tsquery`) |
| Sugestões relacionadas | Same tópico, ordenado por frascos, excluindo o atual |
| Filtros de tempo | Dia / Semana / Mês / Ano / Sempre |
| Perfil público | Página `/u/[username]` com ensaios publicados |
| Explorar tópicos | Página pública para descobrir tópicos sem estar logado |
| SEO completo | Meta tags, JSON-LD, sitemap dinâmico, robots.txt |
| Open Graph | Imagens OG geradas por ensaio (og-default + cover) |
| Canonical URLs | Evitar conteúdo duplicado |

---

## Fase 4 — AI Writing Assistant (Semana 6-7)
**Entrega**: IA ajuda a estruturar ensaios a partir de notas soltas

**Critério de conclusão**: Digito minhas notas → IA organiza em ensaio Markdown estruturado → posso editar e publicar.

| Task | Detalhe |
|------|---------|
| Integração Claude API | `claude-haiku-4-5` (custo baixo para free tier) |
| Assistente de escrita | Input: notas brutas → Output: ensaio estruturado |
| Sugestão de título | Claude gera 3 opções de título a partir do conteúdo |
| Sugestão de tópico | Auto-detecta tópico mais adequado |
| Rate limit IA | Free: 5 chamadas/dia | Plus: 50 chamadas/dia |
| Prompt caching | Supabase Cache para prompts de sistema (reduz custo) |
| UI do assistente | Panel lateral no editor, não intrusivo |

---

## Fase 5 — Monetização e Polish (Semana 8-10)
**Entrega**: Produto pronto para crescimento público com monetização funcionando

**Critério de conclusão**: Consigo assinar o Folium Plus via Stripe/Pix, usar features premium e a performance está verde no Lighthouse.

| Task | Detalhe |
|------|---------|
| Stripe checkout | Plano Plus mensal e anual |
| Mercado Pago | Pix e boleto como fallback BR |
| Webhooks de pagamento | Ativar/desativar premium via evento |
| Temas de card premium | 10+ variantes visuais (dark, vintage, minimal, etc.) |
| Analytics do ensaio | Dashboard do autor: views e frascos ao longo do tempo |
| Exportar ensaio | PDF e .md para usuários Plus |
| Performance audit | Core Web Vitals verdes (LCP < 2.5s, CLS < 0.1) |
| Testes E2E | Playwright: login → criar ensaio → votar → assinar Plus |
| ToS e Privacidade | Páginas legais linkadas na landing |
| Página de exclusão de conta | LGPD: rota DELETE + feedback visual |
| Preparação de launch | Product Hunt draft, redes sociais, email de early adopters |

---

## Stack de Testes
| Nível | Ferramenta | Para quê |
|-------|-----------|---------|
| Unit | Vitest | Funções puras, utils, validações Zod |
| Integration | Supabase local (`supabase start`) | Queries, RLS policies |
| E2E | Playwright | Fluxos críticos: login, criar ensaio, votar, pagar |

---

## Branches e Git
```
main          ← produção (Vercel deploy automático)
dev           ← integração de features
feat/[nome]   ← feature individual
fix/[nome]    ← correção
```

**PR policy**: toda feat passa por `dev` antes de `main`. Sem push direto em `main`.

---

## Estimativa de Tempo Total
| Fase | Semanas | Resultado |
|------|---------|-----------|
| 1 — Foundation | 1-2 | Produto funcional básico |
| 2 — Social Core | 3-4 | Comunidade funcionando |
| 3 — Discovery | 5 | SEO e busca ativos |
| 4 — AI Assistant | 6-7 | Diferencial competitivo |
| 5 — Monetização | 8-10 | Pronto para crescimento |

**Total estimado**: 10 semanas trabalhando em microsteps sem abandonar o projeto.
