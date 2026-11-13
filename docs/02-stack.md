# Folium — Stack Técnica

## Decisões e Justificativas

### Frontend
| Tech | Versão | Por quê |
|------|--------|---------|
| Next.js | 14 (App Router) | SSR para SEO, rotas de API nativas, deploy na Vercel sem config |
| TypeScript | 5.x | Segurança de tipos, refactor seguro em escala |
| Tailwind CSS | 3.x | Theming rápido, dark mode nativo (`class` strategy), sem CSS extra |
| Framer Motion | 11.x | Animação de swipe dos cards com física real, drag gesture |
| Radix UI | latest | Primitivos acessíveis (Dialog, DropdownMenu, Tooltip) sem estilo imposto |
| React Hook Form + Zod | latest | Validação de formulários type-safe com schema compartilhado |
| @supabase/ssr | latest | Client Auth SSR-safe para App Router |
| next-themes | latest | Dark/light mode com persistência sem flash |
| react-markdown + rehype-sanitize | latest | Renderização segura de Markdown (whitelist de tags) |
| @tiptap/react | latest | Editor rich text para escrita de ensaios (extensível, Markdown export) |

### Backend / BaaS
| Tech | Por quê |
|------|---------|
| Supabase | PostgreSQL + Auth Google OAuth (gratuito) + Storage + RLS + Realtime — free tier generoso (500MB DB, 1GB Storage, 50k MAU) |
| Prisma ORM | Migrations versionadas, tipagem automática gerada, queries parameterizadas (zero SQL injection) |
| Upstash Redis | Rate limiting serverless por IP/usuário — free tier 10k req/dia |

### Infraestrutura
| Serviço | Custo | Por quê |
|---------|-------|---------|
| Vercel | Free (hobby) | Deploy automático do Next.js, edge network global, preview deploys |
| Supabase | Free | Tudo incluso no free tier para o MVP |
| Cloudflare | Free | DNS + DDoS protection L3/L4 + cache edge (adicionar na Fase 5) |
| Stripe | 0 fixo + 2.9%/transação | Pagamentos plano Plus (só paga quando recebe) |

**Custo mensal do MVP: $0**

---

## Ambiente de Desenvolvimento
```bash
Node.js 20 LTS
pnpm 9.x          # mais rápido que npm, workspace-ready
ESLint + Prettier  # lint + formatação
Husky + lint-staged # pre-commit: lint + type-check
```

---

## Estrutura de Pastas
```
folium/
├── src/
│   ├── app/
│   │   ├── (public)/
│   │   │   ├── page.tsx              ← landing (pré-login)
│   │   │   ├── topico/[slug]/page.tsx ← página do tópico (indexada)
│   │   │   └── ensaio/[id]/[slug]/page.tsx ← ensaio individual (indexado)
│   │   ├── (app)/                    ← rotas pós-login
│   │   │   ├── feed/page.tsx         ← feed principal
│   │   │   ├── novo/page.tsx         ← criar/editar ensaio
│   │   │   └── u/[username]/page.tsx ← perfil público
│   │   ├── api/
│   │   │   ├── ensaio/route.ts       ← CRUD ensaios
│   │   │   ├── frasco/route.ts       ← votar
│   │   │   └── topico/route.ts       ← gerenciar tópicos
│   │   ├── layout.tsx
│   │   └── sitemap.ts                ← sitemap dinâmico
│   ├── components/
│   │   ├── card/
│   │   │   ├── EnsaioCard.tsx        ← card individual
│   │   │   └── CardDeck.tsx          ← deck com swipe
│   │   ├── sidebar/
│   │   │   └── TopicSidebar.tsx
│   │   ├── editor/
│   │   │   └── EnsaioEditor.tsx      ← Tiptap editor
│   │   └── ui/                       ← Button, Badge, Toast, etc.
│   ├── lib/
│   │   ├── supabase/
│   │   │   ├── client.ts             ← browser client
│   │   │   ├── server.ts             ← server client (RSC)
│   │   │   └── middleware.ts         ← session refresh
│   │   ├── rate-limit.ts             ← Upstash Redis
│   │   ├── validations/              ← schemas Zod
│   │   └── utils.ts
│   └── types/
│       └── index.ts
├── prisma/
│   └── schema.prisma
├── supabase/
│   └── migrations/
├── public/
│   ├── default-card.svg              ← frasco silhueta cinza
│   └── og-default.png                ← Open Graph padrão
├── .env.example
└── next.config.ts
```

---

## Schema do Banco (Prisma)
```prisma
model User {
  id            String    @id @default(cuid())
  supabaseId    String    @unique
  email         String    @unique
  name          String
  username      String    @unique
  avatarUrl     String?
  bio           String?
  isPremium     Boolean   @default(false)
  createdAt     DateTime  @default(now())
  ensaios       Ensaio[]
  frascos       Frasco[]
  topicosFollow TopicoFollow[]
}

model Topico {
  id          String    @id @default(cuid())
  name        String
  slug        String    @unique
  description String?
  createdAt   DateTime  @default(now())
  ensaios     Ensaio[]
  followers   TopicoFollow[]
}

model Ensaio {
  id          String    @id @default(cuid())
  title       String
  slug        String
  content     String    @db.Text   // Markdown
  coverUrl    String?
  preview     String                // primeiras 280 chars geradas automaticamente
  authorId    String
  topicoId    String
  frascoCount Int       @default(0)
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt
  author      User      @relation(fields: [authorId], references: [id])
  topico      Topico    @relation(fields: [topicoId], references: [id])
  frascos     Frasco[]
  @@unique([slug, topicoId])
}

model Frasco {
  id        String      @id @default(cuid())
  ensaioId  String
  userId    String
  type      FrascoType
  createdAt DateTime    @default(now())
  ensaio    Ensaio      @relation(fields: [ensaioId], references: [id])
  user      User        @relation(fields: [userId], references: [id])
  @@unique([ensaioId, userId])  // um voto por usuário por ensaio
}

model TopicoFollow {
  userId    String
  topicoId  String
  createdAt DateTime @default(now())
  user      User     @relation(fields: [userId], references: [id])
  topico    Topico   @relation(fields: [topicoId], references: [id])
  @@id([userId, topicoId])
}

enum FrascoType { POSITIVE NEGATIVE }
```
