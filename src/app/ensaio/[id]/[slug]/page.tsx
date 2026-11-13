import { prisma } from '@/lib/prisma'
import { createClient } from '@/lib/supabase/server'
import Header from '@/components/layout/Header'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeSanitize from 'rehype-sanitize'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import type { Metadata } from 'next'
import { formatRelativeDate } from '@/lib/utils'

interface PageProps {
  params: Promise<{ id: string; slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params
  const ensaio = await prisma.ensaio.findUnique({
    where: { id },
    include: { author: { select: { name: true } } },
  })

  if (!ensaio) return { title: 'Ensaio não encontrado — Folium' }

  return {
    title: `${ensaio.title} — Folium`,
    description: ensaio.preview,
    openGraph: {
      title: ensaio.title,
      description: ensaio.preview,
      images: ensaio.coverUrl ? [ensaio.coverUrl] : [],
      type: 'article',
    },
  }
}

export default async function EnsaioPage({ params }: PageProps) {
  const { id } = await params
  const [supabase, ensaio] = await Promise.all([
    createClient(),
    prisma.ensaio.findUnique({
      where: { id },
      include: {
        author: { select: { id: true, username: true, name: true, avatarUrl: true } },
        topico: { select: { id: true, name: true, slug: true } },
      },
    }),
  ])

  if (!ensaio) notFound()

  const { data: { user } } = await supabase.auth.getUser()

  return (
    <div className="min-h-screen bg-white dark:bg-[#0F0F0F]">
      <Header user={user} />

      <main className="max-w-2xl mx-auto px-4 pt-20 pb-20">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-[#6B6460] dark:text-beige/40 mb-8">
          <Link href="/feed" className="hover:text-[#111111] dark:hover:text-beige transition-colors">
            Feed
          </Link>
          <span>/</span>
          <Link
            href={`/topico/${ensaio.topico.slug}`}
            className="hover:text-[#111111] dark:hover:text-beige transition-colors"
          >
            {ensaio.topico.name}
          </Link>
        </div>

        {/* Cabeçalho do ensaio */}
        <header className="mb-10">
          {ensaio.coverUrl && (
            <div className="relative w-full aspect-video rounded-card overflow-hidden mb-8">
              <Image
                src={ensaio.coverUrl}
                alt={ensaio.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

          <h1 className="font-serif font-bold text-3xl md:text-4xl text-[#111111] dark:text-beige leading-tight mb-6">
            {ensaio.title}
          </h1>

          <div className="flex items-center gap-4 pb-6 border-b border-[#111111]/8 dark:border-beige/8">
            {ensaio.author.avatarUrl && (
              <Image
                src={ensaio.author.avatarUrl}
                alt={ensaio.author.name}
                width={36}
                height={36}
                className="rounded-full"
              />
            )}
            <div>
              <p className="text-sm font-medium text-[#111111] dark:text-beige">
                {ensaio.author.name}
              </p>
              <p className="text-xs text-[#6B6460] dark:text-beige/40">
                @{ensaio.author.username} · {formatRelativeDate(ensaio.createdAt.toISOString())}
              </p>
            </div>
            <div className="ml-auto flex items-center gap-1.5 text-sm text-[#6B6460] dark:text-beige/40">
              <span>⚗️</span>
              <span>{ensaio.frascoCount} frascos</span>
            </div>
          </div>
        </header>

        {/* Conteúdo do ensaio */}
        <div className="prose prose-stone dark:prose-invert prose-headings:font-serif prose-a:text-brown dark:prose-a:text-moss prose-code:font-mono max-w-none">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeSanitize]}
          >
            {ensaio.content}
          </ReactMarkdown>
        </div>

        {/* Avaliação (frasco) */}
        <div className="mt-16 pt-8 border-t border-[#111111]/8 dark:border-beige/8 text-center">
          {user ? (
            <>
              <p className="text-sm text-[#6B6460] dark:text-beige/50 mb-4">
                Este ensaio foi útil?
              </p>
              <div className="flex items-center justify-center gap-4">
                <span className="text-4xl" title="Dar frasco">⚗️</span>
                <p className="text-xs text-[#6B6460] dark:text-beige/40">
                  Sistema de avaliação em breve
                </p>
              </div>
            </>
          ) : (
            <Link
              href="/"
              className="text-sm text-brown dark:text-moss hover:underline"
            >
              Entre para avaliar este ensaio
            </Link>
          )}
        </div>
      </main>
    </div>
  )
}
