# Folium — Segurança

## Modelo de Ameaça

| Ator | Ataque | Mitigação |
|------|--------|-----------|
| Bot de spam | Criar centenas de ensaios/votos | Rate limiting + OAuth only |
| Scraper | Dump de todo o conteúdo | Paginação obrigatória + rate limit por IP |
| Usuário malicioso | XSS via conteúdo | Markdown + rehype-sanitize + DOMPurify |
| Atacante externo | DDoS | Vercel Edge + Cloudflare |
| Atacante interno | Acesso a dados de outro user | RLS no Supabase |
| Injeção SQL | Query manipulation | Prisma ORM parameterizado |
| Upload malicioso | Executável disfarçado de imagem | Validação de magic bytes + tipo |

---

## Autenticação e Sessão

- **OAuth apenas** (Google) — zero senha armazenada = zero breach de senha
- Supabase Auth: PKCE flow (mais seguro que implicit grant)
- JWT com expiração de 1h + refresh token rotation automático
- Cookies: `HttpOnly`, `Secure`, `SameSite=Strict`
- **Sem backdoor de admin no código** — acesso administrativo exclusivamente via Supabase Dashboard (MFA obrigatório ativado)
- Logout: invalida refresh token no servidor (não só limpa cookie local)

---

## Autorização — Row Level Security (RLS)

**Todas as tabelas têm RLS ativo.** Exemplo de políticas:

```sql
-- Usuário lê qualquer ensaio público
CREATE POLICY "ensaios_select_public" ON ensaios
  FOR SELECT USING (true);

-- Usuário só edita/deleta os PRÓPRIOS ensaios
CREATE POLICY "ensaios_owner_modify" ON ensaios
  FOR ALL USING (auth.uid()::text = author_supabase_id);

-- Frasco: um por usuário por ensaio (unique index + policy)
CREATE UNIQUE INDEX frascos_unique_vote ON frascos(ensaio_id, user_id);
CREATE POLICY "frascos_own_vote" ON frascos
  FOR ALL USING (auth.uid()::text = user_supabase_id);

-- User só vê/edita o próprio perfil (dados sensíveis)
CREATE POLICY "users_own_profile" ON users
  FOR UPDATE USING (auth.uid()::text = supabase_id);
```

---

## Proteção de Conteúdo (XSS)

Ensaios são escritos e armazenados em **Markdown puro** — nunca HTML cru.

Camadas de proteção na renderização:
1. `rehype-sanitize` com schema restrito (whitelist: `p`, `h1-h3`, `strong`, `em`, `code`, `pre`, `blockquote`, `ul`, `ol`, `li`, `a`)
2. `DOMPurify` no client como segunda barreira
3. Sem `dangerouslySetInnerHTML` em qualquer componente
4. Links externos: `rel="noopener noreferrer nofollow"` + abertura em nova aba

**Content Security Policy** via `next.config.ts`:
```
Content-Security-Policy:
  default-src 'self';
  script-src 'self' 'nonce-{nonce}';
  style-src 'self' 'unsafe-inline' fonts.googleapis.com;
  img-src 'self' data: https://*.supabase.co;
  font-src 'self' fonts.gstatic.com;
  connect-src 'self' https://*.supabase.co wss://*.supabase.co;
  frame-ancestors 'none';
```

---

## Rate Limiting (Upstash Redis)

```ts
// lib/rate-limit.ts
const limits = {
  'POST /api/ensaio':    { requests: 5,   window: '1h',  by: 'userId' },
  'PUT /api/ensaio':     { requests: 20,  window: '1h',  by: 'userId' },
  'POST /api/frasco':    { requests: 100, window: '1h',  by: 'userId' },
  'POST /api/ai-assist': { requests: 10,  window: '24h', by: 'userId' }, // free tier
  'GET  /api/*':         { requests: 300, window: '1m',  by: 'ip' },
}
```

Free users têm limites mais baixos; Premium (Folium Plus) limites maiores.

---

## Upload de Imagens (Capa do Card)

1. Tipos aceitos: `image/jpeg`, `image/png`, `image/webp` **apenas**
2. Tamanho máximo: **5MB**
3. Validação de **magic bytes** no servidor (não confiar no Content-Type do client)
4. Renomear com UUID + timestamp (sem preservar nome original)
5. Supabase Storage: bucket `covers` com acesso público via CDN
6. Resize automático para 800x600px via Sharp antes de salvar (reduz espaço)
7. Imagens antigas deletadas ao substituir (evitar acúmulo)

---

## Proteção contra DDoS e Scraping

- **Vercel Edge Network**: mitiga DDoS L3/L4 automaticamente
- **Cloudflare** (Fase 5): DDoS L7, cache edge, challenge page
- **Rate limiting por IP**: 300 req/min (Upstash)
- **`robots.txt`**: bloqueia crawlers que não respeitam `Crawl-delay`
- **API sempre paginada**: máximo 20 ensaios por request (sem dump completo)
- **Sem endpoint de export em bulk** para usuários free

---

## Dados do Usuário e LGPD

- Mínimo coletado: email, nome, avatar (Google OAuth)
- **Sem acesso a Agenda, Drive, Gmail ou qualquer outro serviço Google**
- Direito à exclusão: rota `DELETE /api/user/me` remove dados pessoais (ensaios são anonimizados, não deletados — preserva integridade do conhecimento publicado)
- Logs de acesso: retidos 30 dias, auto-deletados
- Sem cookies de tracking ou publicidade de terceiros

---

## Headers de Segurança (next.config.ts)
```ts
const securityHeaders = [
  { key: 'X-DNS-Prefetch-Control',       value: 'on' },
  { key: 'Strict-Transport-Security',    value: 'max-age=63072000; includeSubDomains; preload' },
  { key: 'X-Frame-Options',              value: 'DENY' },
  { key: 'X-Content-Type-Options',       value: 'nosniff' },
  { key: 'Referrer-Policy',              value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy',           value: 'camera=(), microphone=(), geolocation=()' },
]
```

---

## Checklist Pré-Deploy
- [ ] `pnpm audit` — nenhuma vulnerabilidade HIGH/CRITICAL
- [ ] RLS ativo e testado em todas as tabelas
- [ ] Variáveis de ambiente: ZERO secrets no código ou git history
- [ ] MFA ativo em Supabase, Vercel e GitHub
- [ ] CSP headers funcionando (verificar com browser DevTools)
- [ ] Rate limiting testado (simular 6+ posts em 1h)
- [ ] Rota de exclusão de conta testada e funcionando
