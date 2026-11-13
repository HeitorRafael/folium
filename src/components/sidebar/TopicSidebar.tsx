'use client'

import { useState } from 'react'
import Link from 'next/link'
import { X } from 'lucide-react'
import type { Topico } from '@/types'

interface TopicSidebarProps {
  topicos?: Topico[]
  followedIds?: string[]
}

const TOPICO_ICONS: Record<string, string> = {
  'ciencia-de-dados': '📊',
  'programacao': '💻',
  'filosofia': '🏛️',
  'matematica': '∑',
  'fisica': '⚛️',
  'biologia': '🧬',
  'arte-e-design': '🎨',
  'historia': '📜',
  'economia': '📈',
  'idiomas': '🗣️',
}

export default function TopicSidebar({ topicos = [], followedIds = [] }: TopicSidebarProps) {
  const [open, setOpen] = useState(false)

  const followed = topicos.filter((t) => followedIds.includes(t.id))
  const others = topicos.filter((t) => !followedIds.includes(t.id))

  return (
    <>
      {/* Trigger — ícone de pilha de páginas */}
      <button
        onClick={() => setOpen(true)}
        className="fixed top-3.5 left-4 z-40 p-2 text-[#6B6460] dark:text-beige/60 hover:text-[#111111] dark:hover:text-beige transition-colors"
        aria-label="Abrir tópicos"
      >
        <StackIcon />
      </button>

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-50 backdrop-blur-[2px]"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-full w-72 z-50
          bg-white dark:bg-[#0F0F0F]
          border-r border-[#111111]/8 dark:border-beige/8
          transition-transform duration-300 ease-out
          ${open ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <div className="flex items-center justify-between p-4 border-b border-[#111111]/8 dark:border-beige/8">
          <span className="font-serif font-bold text-[#111111] dark:text-beige tracking-wide">
            Tópicos
          </span>
          <button
            onClick={() => setOpen(false)}
            className="p-1.5 text-[#6B6460] dark:text-beige/60 hover:text-[#111111] dark:hover:text-beige transition-colors rounded-lg"
          >
            <X size={16} />
          </button>
        </div>

        <div className="overflow-y-auto h-[calc(100%-57px)]">
          {followed.length > 0 && (
            <section className="p-4">
              <p className="text-xs font-medium text-[#6B6460] dark:text-beige/40 uppercase tracking-wider mb-3">
                Seguindo
              </p>
              <ul className="space-y-1">
                {followed.map((t) => (
                  <TopicoItem key={t.id} topico={t} onClick={() => setOpen(false)} />
                ))}
              </ul>
            </section>
          )}

          <section className="p-4">
            <p className="text-xs font-medium text-[#6B6460] dark:text-beige/40 uppercase tracking-wider mb-3">
              Explorar
            </p>
            {others.length === 0 && topicos.length === 0 ? (
              <p className="text-sm text-[#6B6460] dark:text-beige/40 text-center py-8">
                Nenhum tópico ainda
              </p>
            ) : (
              <ul className="space-y-1">
                {others.map((t) => (
                  <TopicoItem key={t.id} topico={t} onClick={() => setOpen(false)} />
                ))}
              </ul>
            )}
          </section>
        </div>
      </aside>
    </>
  )
}

function TopicoItem({ topico, onClick }: { topico: Topico; onClick: () => void }) {
  const icon = TOPICO_ICONS[topico.slug] || '📋'
  return (
    <li>
      <Link
        href={`/topico/${topico.slug}`}
        onClick={onClick}
        className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-[#111111] dark:text-beige hover:bg-beige dark:hover:bg-[#1C1917] transition-colors"
      >
        <span className="text-base w-6 text-center">{icon}</span>
        <span>{topico.name}</span>
      </Link>
    </li>
  )
}

function StackIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="14" width="16" height="2.5" rx="1.25" fill="currentColor" opacity="0.4" />
      <rect x="2" y="9" width="16" height="2.5" rx="1.25" fill="currentColor" opacity="0.7" />
      <rect x="2" y="4" width="16" height="2.5" rx="1.25" fill="currentColor" />
    </svg>
  )
}
