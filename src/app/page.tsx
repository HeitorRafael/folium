import Link from 'next/link'
import LoginButton from '@/components/auth/LoginButton'

export default async function LandingPage() {
  // Verificação de autenticação sem crashar se Supabase não estiver configurado
  let isLoggedIn = false
  if (process.env.NEXT_PUBLIC_SUPABASE_URL) {
    try {
      const { createClient } = await import('@/lib/supabase/server')
      const supabase = await createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        const { redirect } = await import('next/navigation')
        redirect('/feed')
      }
    } catch {
      // Supabase não configurado — mostra landing normalmente
    }
  }

  return (
    <main className="min-h-screen bg-white dark:bg-[#0F0F0F] flex flex-col items-center justify-center px-6 relative">
      <div className="text-center max-w-md mx-auto">
        {/* Logo */}
        <h1 className="font-serif font-bold tracking-[0.2em] text-[#111111] dark:text-beige mb-8 text-6xl md:text-7xl">
          FOLIUM
        </h1>

        {/* Tagline principal */}
        <p className="font-serif text-2xl md:text-3xl text-[#111111] dark:text-beige leading-snug mb-4">
          A rede social da informação.
        </p>

        {/* Subtítulo */}
        <p className="text-base text-[#6B6460] dark:text-beige/60 leading-relaxed mb-12 max-w-xs mx-auto">
          Você estuda, sintetiza e publica.
          <br />
          A comunidade lê, avalia e eleva.
          <br />
          Conhecimento destilado por quem estudou de verdade.
        </p>

        {/* CTA */}
        <LoginButton />
      </div>

      {/* Footer */}
      <footer className="absolute bottom-8 text-center">
        <p className="text-xs text-[#6B6460]/60 dark:text-beige/30 space-x-3">
          <Link href="/termos" className="hover:text-[#6B6460] dark:hover:text-beige/50 transition-colors">
            Termos de Uso
          </Link>
          <span>·</span>
          <Link href="/privacidade" className="hover:text-[#6B6460] dark:hover:text-beige/50 transition-colors">
            Privacidade
          </Link>
        </p>
      </footer>
    </main>
  )
}
