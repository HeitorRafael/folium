import { createClient } from '@/lib/supabase/server'
import { prisma } from '@/lib/prisma'
import Header from '@/components/layout/Header'
import TopicSidebar from '@/components/sidebar/TopicSidebar'
import CardDeck from '@/components/card/CardDeck'
import type { Ensaio } from '@/types'

export const revalidate = 60

export default async function FeedPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  // Busca ensaios + perfil do usuário em paralelo
  const [ensaiosRaw, topicos, dbUser] = await Promise.all([
    prisma.ensaio.findMany({
      take: 30,
      orderBy: [{ frascoCount: 'desc' }, { createdAt: 'desc' }],
      include: {
        author: { select: { id: true, username: true, name: true, avatarUrl: true } },
        topico: { select: { id: true, name: true, slug: true, description: true } },
      },
    }),
    prisma.topico.findMany({
      orderBy: { ensaios: { _count: 'desc' } },
      take: 20,
    }),
    user
      ? prisma.user.findUnique({
          where: { supabaseId: user.id },
          include: { follows: { select: { topicoId: true } } },
        })
      : null,
  ])

  const ensaios: Ensaio[] = ensaiosRaw.map((e) => ({
    id: e.id,
    title: e.title,
    slug: e.slug,
    content: e.content,
    preview: e.preview,
    coverUrl: e.coverUrl,
    authorId: e.authorId,
    topicoId: e.topicoId,
    frascoCount: e.frascoCount,
    createdAt: e.createdAt.toISOString(),
    updatedAt: e.updatedAt.toISOString(),
    author: {
      id: e.author.id,
      username: e.author.username,
      name: e.author.name,
      avatarUrl: e.author.avatarUrl,
    },
    topico: {
      id: e.topico.id,
      name: e.topico.name,
      slug: e.topico.slug,
      description: e.topico.description,
    },
  }))

  const followedIds = dbUser?.follows.map((f) => f.topicoId) ?? []
  const topicosFormatted = topicos.map((t) => ({
    id: t.id,
    name: t.name,
    slug: t.slug,
    description: t.description,
  }))

  return (
    <div className="min-h-screen bg-white dark:bg-[#0F0F0F]">
      <Header user={user} />
      <TopicSidebar topicos={topicosFormatted} followedIds={followedIds} />

      <main className="pt-20 pb-24 px-4">
        <div className="max-w-sm mx-auto">
          <CardDeck ensaios={ensaios} isLoggedIn={!!user} />
        </div>
      </main>
    </div>
  )
}
