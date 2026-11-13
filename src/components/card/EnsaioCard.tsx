import Image from 'next/image'
import Link from 'next/link'
import { cn, formatRelativeDate } from '@/lib/utils'
import type { Ensaio } from '@/types'

interface EnsaioCardProps {
  ensaio: Ensaio
  isHighlighted?: boolean
  style?: React.CSSProperties
  className?: string
}

export default function EnsaioCard({
  ensaio,
  isHighlighted = false,
  style,
  className,
}: EnsaioCardProps) {
  return (
    <Link href={`/ensaio/${ensaio.id}/${ensaio.slug}`} className="block" style={style}>
      <article
        className={cn(
          'bg-beige dark:bg-[#1C1917] rounded-card shadow-card',
          'hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300',
          'border overflow-hidden w-full max-w-sm mx-auto select-none',
          isHighlighted
            ? 'border-moss/60 dark:border-moss/40'
            : 'border-brown/20 dark:border-[#2C2520]',
          className
        )}
      >
        {/* Capa */}
        <div className="relative w-full aspect-[4/3] bg-beige-200 dark:bg-[#241F1A] overflow-hidden">
          {ensaio.coverUrl ? (
            <Image
              src={ensaio.coverUrl}
              alt={ensaio.title}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 90vw, 320px"
              draggable={false}
            />
          ) : (
            <DefaultCover />
          )}

          {/* Badge do tópico */}
          <div className="absolute top-3 left-3">
            <span className="bg-white/80 dark:bg-[#0F0F0F]/80 backdrop-blur-sm text-[#111111] dark:text-beige text-xs font-medium px-2.5 py-1 rounded-full">
              {ensaio.topico.name}
            </span>
          </div>
        </div>

        {/* Conteúdo */}
        <div className="p-5 pb-3">
          <h2 className="font-serif font-bold text-[#111111] dark:text-beige text-lg leading-snug mb-2 line-clamp-2">
            {ensaio.title}
          </h2>
          <p className="text-sm text-[#6B6460] dark:text-beige/60 leading-relaxed line-clamp-3">
            {ensaio.preview}
          </p>
        </div>

        {/* Rodapé */}
        <div className="px-5 pb-4 flex items-center justify-between">
          <div className="flex items-center gap-1.5 min-w-0">
            {ensaio.author.avatarUrl && (
              <Image
                src={ensaio.author.avatarUrl}
                alt={ensaio.author.name}
                width={20}
                height={20}
                className="rounded-full shrink-0"
              />
            )}
            <span className="text-xs text-[#6B6460] dark:text-beige/40 truncate">
              @{ensaio.author.username}
            </span>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <span className="text-xs text-[#6B6460] dark:text-beige/40">
              {formatRelativeDate(ensaio.createdAt)}
            </span>
            <span className="text-xs text-[#6B6460] dark:text-beige/40 flex items-center gap-1">
              ⚗️ <span>{ensaio.frascoCount}</span>
            </span>
          </div>
        </div>
      </article>
    </Link>
  )
}

function DefaultCover() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 200 160"
        fill="none"
        className="w-32 h-32 opacity-40"
      >
        {/* Frasco esquerdo */}
        <path
          d="M72 38 L72 78 L52 118 L92 118 Z"
          stroke="#7C6248"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <line x1="67" y1="38" x2="77" y2="38" stroke="#7C6248" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="60" cy="103" r="3.5" stroke="#7C6248" strokeWidth="1.5" fill="none" />
        <circle cx="68" cy="91" r="2.5" stroke="#7C6248" strokeWidth="1.5" fill="none" />
        <circle cx="78" cy="75" r="4" stroke="#7C6248" strokeWidth="1.5" fill="none" />

        {/* Frasco direito (maior) */}
        <path
          d="M120 28 L120 82 L95 125 L145 125 Z"
          stroke="#7C6248"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <line x1="114" y1="28" x2="126" y2="28" stroke="#7C6248" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="107" cy="110" r="3.5" stroke="#7C6248" strokeWidth="1.5" fill="none" />
        <circle cx="117" cy="96" r="3" stroke="#7C6248" strokeWidth="1.5" fill="none" />
        <circle cx="128" cy="80" r="5" stroke="#7C6248" strokeWidth="1.5" fill="none" />
        <circle cx="122" cy="63" r="3" stroke="#7C6248" strokeWidth="1.5" fill="none" />
        <circle cx="133" cy="52" r="2" stroke="#7C6248" strokeWidth="1.5" fill="none" />
      </svg>
    </div>
  )
}
