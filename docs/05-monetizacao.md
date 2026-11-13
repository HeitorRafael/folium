# Folium — Estratégia de Monetização

## Princípio
Crescimento orgânico primeiro. Monetizar sem prejudicar a experiência ou a confiança dos usuários. Nenhuma publicidade intrusiva, nenhuma venda de dados pessoais identificáveis.

---

## Fase 1 — Gratuito Completo (Meses 1-6)
**Objetivo**: 1.000 usuários ativos, 500 ensaios publicados

- Custo mensal: ~**R$ 0** (Vercel free + Supabase free)
- Foco: produto, comunidade, SEO
- Indicadores de saúde: ensaios por dia, frascos dados, tópicos seguidos

---

## Fase 2 — Folium Plus (Mês 7+)
**Preço**: R$ 9,90/mês | R$ 89/ano (~25% desconto)

| Feature | Free | Plus |
|---------|------|------|
| Criar ensaios | 5/mês | Ilimitado |
| Temas de card | 1 padrão | 10+ temas |
| Imagem de capa personalizada | ❌ | ✅ (upload) |
| Analytics do ensaio | ❌ | Views, frascos ao longo do tempo |
| Selo "Pesquisador" no perfil | ❌ | ✅ |
| Exportar ensaio (PDF / .md) | ❌ | ✅ |
| Chamadas de IA por dia | 5 | 50 |
| Acesso antecipado a features | ❌ | ✅ |

**Estimativa (Mês 7)**: 50 assinantes × R$9,90 = **R$ 495/mês**

---

## Fase 3 — B2B e Parcerias (Mês 12+)

### Tópicos em Destaque
Empresa/curso paga para destacar um tópico no "Explorar".
- Label "destaque" visível e transparente (sem enganar usuário)
- R$ 300–1.000/mês por tópico

### API de Tendências (Dados Anonimizados)
- Endpoint: tópicos em alta, termos mais buscados, áreas de maior crescimento
- Clientes: EdTechs, portais de educação, pesquisadores
- Planos: R$ 200/mês (1k req/dia) | R$ 800/mês (10k/dia) | R$ 2.000/mês (ilimitado)

### Comunidades Privadas (Institucional)
- Universidades, empresas, grupos de estudo criam espaços fechados
- Ensaios visíveis só para membros
- R$ 199/mês por comunidade

---

## Estimativa de Receita (Mês 12)
| Canal | Volume | Receita Mensal |
|-------|--------|----------------|
| Folium Plus | 150 assinantes | R$ 1.485 |
| Tópicos em Destaque | 4 | R$ 2.000 |
| API | 4 contratos | R$ 1.600 |
| Comunidades Privadas | 3 | R$ 597 |
| **Total** | | **R$ 5.682** |

**Meta R$ 10k/mês**: ~Mês 18 com crescimento orgânico via SEO + product-led growth.

---

## Ferramentas de Pagamento
| Ferramenta | Para quê |
|------------|---------|
| **Stripe** | Cartão internacional, checkout embedded, webhooks confiáveis |
| **Mercado Pago** | Pix + boleto para usuários BR (fallback) |

Ambos sem taxa fixa — só comissão sobre transação (custo zero antes de faturar).

---

## Premissas de Uso dos Dados (LGPD)
- Analytics de comportamento: **anonimizados e agregados** (nunca individuais)
- Ensaios publicados: conteúdo público curado — indexável e compartilhável
- Jamais vender perfis, emails ou dados individuais
- Relatórios B2B: sempre dados de tendência sem identificação de usuário
