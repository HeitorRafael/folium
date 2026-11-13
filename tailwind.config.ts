import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        beige: {
          50: '#FAF8F5',
          100: '#F5F0E8',
          200: '#EDE4D5',
          DEFAULT: '#F0EBE0',
        },
        brown: {
          DEFAULT: '#7C6248',
          dark: '#5C4A35',
          light: '#A08060',
        },
        moss: {
          DEFAULT: '#4A7C59',
          light: '#6B9E7A',
          dark: '#355A40',
        },
      },
      fontFamily: {
        serif: ['var(--font-playfair)', 'Georgia', 'serif'],
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-jetbrains)', 'monospace'],
      },
      borderRadius: { card: '16px' },
      boxShadow: {
        card: '0 8px 32px rgba(0,0,0,0.10)',
        'card-hover': '0 12px 40px rgba(0,0,0,0.16)',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}

export default config
