'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useTheme } from 'next-themes'
import { Moon, Sun, LogOut } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import type { User } from '@supabase/supabase-js'

interface HeaderProps {
  user: User | null
}

export default function Header({ user }: HeaderProps) {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const router = useRouter()

  useEffect(() => setMounted(true), [])

  async function handleSignOut() {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/')
    router.refresh()
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-14 bg-white/90 dark:bg-[#0F0F0F]/90 backdrop-blur-sm border-b border-[#111111]/8 dark:border-beige/8 flex items-center justify-between px-4">
      <Link
        href={user ? '/feed' : '/'}
        className="font-serif font-bold tracking-[0.18em] text-[#111111] dark:text-beige text-lg"
      >
        FOLIUM
      </Link>

      <div className="flex items-center gap-2">
        {mounted && (
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="p-2 text-[#6B6460] dark:text-beige/60 hover:text-[#111111] dark:hover:text-beige transition-colors rounded-lg"
            aria-label="Alternar tema"
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        )}

        {user && (
          <div className="relative">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="rounded-full overflow-hidden w-8 h-8 border-2 border-moss/40 hover:border-moss transition-colors"
              aria-label="Menu do usuário"
            >
              {user.user_metadata?.avatar_url ? (
                <Image
                  src={user.user_metadata.avatar_url}
                  alt="Avatar"
                  width={32}
                  height={32}
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full bg-beige dark:bg-[#1C1917] flex items-center justify-center text-xs font-medium text-[#111111] dark:text-beige">
                  {user.user_metadata?.full_name?.[0]?.toUpperCase() || '?'}
                </div>
              )}
            </button>

            {menuOpen && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setMenuOpen(false)} />
                <div className="absolute right-0 top-full mt-2 w-44 bg-white dark:bg-[#1C1917] border border-[#111111]/10 dark:border-beige/10 rounded-xl shadow-card overflow-hidden z-20">
                  <div className="px-4 py-3 border-b border-[#111111]/8 dark:border-beige/8">
                    <p className="text-xs font-medium text-[#111111] dark:text-beige truncate">
                      {user.user_metadata?.full_name || user.email}
                    </p>
                  </div>
                  <button
                    onClick={handleSignOut}
                    className="w-full flex items-center gap-2 px-4 py-3 text-sm text-[#111111] dark:text-beige hover:bg-beige dark:hover:bg-[#241F1A] transition-colors"
                  >
                    <LogOut size={14} />
                    Sair
                  </button>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </header>
  )
}
