# Folium — Estratégia de SEO

## Vantagem Natural
Cada ensaio publicado é conteúdo original indexável. Com SSR (Next.js App Router), o Google lê o HTML completo no primeiro request — zero dependência de JavaScript para indexação.

---

## Estrutura de URLs (Semântica e Limpa)
```
folium.app/                                    ← Landing (index)
folium.app/topico/ciencia-de-dados             ← Tópico (indexado)
folium.app/topico/filosofia                    ← Tópico (indexado)
folium.app/ensaio/[id]/titulo-do-ensaio        ← Ensaio individual (indexado)
folium.app/u/[username]                        ← Perfil público (indexado)
folium.app/feed                                ← Feed (requer login — noindex)
folium.app/novo                                ← Editor (requer login — noindex)
```

**Slug de ensaio**: gerado automaticamente do título (`title → slug`) com fallback para ID único. URL imutável após publicação (não muda se título editar — preserva backlinks).

---

## Meta Tags por Tipo de Página

### Landing
```tsx
<title>Folium — A rede social da informação</title>
<meta name="description" content="Publique seus estudos, leia ensaios curados pela comunidade. Conhecimento destilado por quem realmente estudou." />
```

### Tópico
```tsx
<title>Ensaios sobre {topico.name} — Folium</title>
<meta name="description" content={`Leia os melhores ensaios sobre ${topico.name}, escritos e curados pela comunidade Folium.`} />
```

### Ensaio Individual
```tsx
<title>{ensaio.title} — Folium</title>
<meta name="description" content={ensaio.preview} />  {/* 160 chars */}

{/* Open Graph */}
<meta property="og:title"       content={ensaio.title} />
<meta property="og:description" content={ensaio.preview} />
<meta property="og:image"       content={ensaio.coverUrl || og-default.png} />
<meta property="og:type"        content="article" />
<meta property="og:url"         content={canonicalUrl} />

{/* Twitter Card */}
<meta name="twitter:card"        content="summary_large_image" />
<meta name="twitter:title"       content={ensaio.title} />
<meta name="twitter:description" content={ensaio.preview} />
<meta name="twitter:image"       content={ensaio.coverUrl || og-default.png} />
```

---

## JSON-LD (Dados Estruturados)

### Ensaio → `Article`
```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Título do ensaio",
  "description": "Preview...",
  "author": {
    "@type": "Person",
    "name": "Nome do Autor",
    "url": "https://folium.app/u/username"
  },
  "datePublished": "2026-04-28T00:00:00Z",
  "dateModified": "2026-04-28T00:00:00Z",
  "publisher": {
    "@type": "Organization",
    "name": "Folium",
    "logo": { "@type": "ImageObject", "url": "https://folium.app/logo.png" }
  }
}
```

### Tópico → `CollectionPage`
```json
{
  "@type": "CollectionPage",
  "name": "Ensaios sobre Ciência de Dados",
  "description": "...",
  "url": "https://folium.app/topico/ciencia-de-dados"
}
```

---

## Sitemap Dinâmico

`/sitemap.xml` via `src/app/sitemap.ts` (Next.js nativo):
- Tópicos públicos (atualiza toda semana)
- Ensaios públicos (atualiza a cada novo ensaio)
- Perfis públicos (atualiza quando há nova publicação)
- **Excluído**: /feed, /novo, /api/*

---

## robots.txt
```
User-agent: *
Allow: /topico/
Allow: /ensaio/
Allow: /u/
Disallow: /feed
Disallow: /novo
Disallow: /api/
Disallow: /configuracoes/

Crawl-delay: 10

Sitemap: https://folium.app/sitemap.xml
```

---

## Estratégia de Conteúdo e Long-Tail

- **Tópicos como landing pages**: cada tópico é uma página SEO-otimizada com lista de ensaios rankeados — captura "melhores artigos sobre X"
- **Ensaios como artigos indexados**: título H1 único por ensaio, conteúdo de qualidade (curado pela comunidade)
- **Perfis públicos**: long-tail de nomes de pesquisadores/criadores
- **Links internos**: cada ensaio exibe 3 relacionados do mesmo tópico → melhora crawl depth
- **Sem conteúdo duplicado**: canonical tag em todas as páginas, slug único por ensaio
- **Compartilhamento**: OG image otimizada incentiva shares → backlinks orgânicos

---

## Core Web Vitals (Metas)
| Métrica | Meta | Estratégia |
|---------|------|-----------|
| LCP | < 2.5s | `next/image`, skeleton em cards, CDN Supabase |
| INP | < 100ms | Swipe via Framer (RAF), sem heavy re-renders |
| CLS | < 0.1 | Reservar espaço para imagens, `font-display: swap` |

---

## Monitoramento
- **Google Search Console**: indexação, erros de crawl, queries
- **Vercel Analytics**: Core Web Vitals por rota (free tier)
- **Vercel Speed Insights**: LCP/CLS em produção
