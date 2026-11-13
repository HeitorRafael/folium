'use client'

import { useState, useCallback } from 'react'
import { motion, useMotionValue, useTransform, AnimatePresence } from 'framer-motion'
import EnsaioCard from './EnsaioCard'
import type { Ensaio } from '@/types'

interface CardDeckProps {
  ensaios: Ensaio[]
  isLoggedIn?: boolean
}

export default function CardDeck({ ensaios, isLoggedIn = false }: CardDeckProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)

  const x = useMotionValue(0)
  const rotate = useTransform(x, [-250, 0, 250], [-10, 0, 10])
  const cardOpacity = useTransform(x, [-250, -80, 0, 80, 250], [0.4, 0.9, 1, 0.9, 0.4])

  const advance = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % ensaios.length)
    x.set(0)
  }, [ensaios.length, x])

  if (!ensaios.length) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[480px] text-[#6B6460]">
        <span className="text-5xl mb-4">⚗️</span>
        <p className="font-serif text-xl text-[#111111] dark:text-beige mb-2">
          Nenhum ensaio ainda
        </p>
        <p className="text-sm">Seja o primeiro a publicar neste tópico</p>
      </div>
    )
  }

  const visibleEnsaios = [0, 1, 2].map((offset) =>
    ensaios[(currentIndex + offset) % ensaios.length]
  )

  return (
    <div className="relative w-full max-w-sm mx-auto" style={{ minHeight: 520 }}>
      {/* Cards de fundo (2 e 3) */}
      {visibleEnsaios.slice(1).map((ensaio, i) => (
        <div
          key={`bg-${ensaio.id}-${currentIndex}-${i}`}
          className="absolute inset-0 pointer-events-none"
          style={{
            transform: `scale(${1 - (i + 1) * 0.04}) translateY(${(i + 1) * 10}px)`,
            zIndex: 8 - i,
          }}
        >
          <EnsaioCard
            ensaio={ensaio}
            isHighlighted={isLoggedIn && i === 0}
          />
        </div>
      ))}

      {/* Card ativo (arrastável) */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          className="absolute inset-0 cursor-grab active:cursor-grabbing"
          style={{ x, rotate, opacity: cardOpacity, zIndex: 10 }}
          drag="x"
          dragConstraints={{ left: -60, right: 60 }}
          dragElastic={0.4}
          onDragEnd={(_, info) => {
            const shouldAdvance =
              Math.abs(info.offset.x) > 100 || Math.abs(info.velocity.x) > 400
            if (shouldAdvance) {
              setDirection(info.offset.x < 0 ? -1 : 1)
              advance()
            }
          }}
          exit={{
            x: direction * 400,
            opacity: 0,
            transition: { duration: 0.25, ease: 'easeIn' },
          }}
          whileTap={{ scale: 0.98 }}
        >
          <EnsaioCard
            ensaio={visibleEnsaios[0]}
            isHighlighted={isLoggedIn}
          />
        </motion.div>
      </AnimatePresence>

      {/* Indicador de progresso */}
      <div className="absolute -bottom-8 left-0 right-0 flex justify-center gap-1.5">
        {ensaios.slice(0, Math.min(ensaios.length, 8)).map((_, i) => (
          <div
            key={i}
            className={`h-1 rounded-full transition-all duration-300 ${
              i === currentIndex % Math.min(ensaios.length, 8)
                ? 'w-4 bg-brown dark:bg-beige'
                : 'w-1 bg-brown/30 dark:bg-beige/30'
            }`}
          />
        ))}
      </div>

      {/* Instrução de swipe (aparece só na primeira visita) */}
      <p className="absolute -bottom-16 left-0 right-0 text-center text-xs text-[#6B6460] dark:text-beige/40">
        Arraste para ver o próximo ensaio
      </p>
    </div>
  )
}
