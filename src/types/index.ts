export interface Author {
  id: string
  username: string
  name: string
  avatarUrl: string | null
}

export interface Topico {
  id: string
  name: string
  slug: string
  description: string | null
}

export interface Ensaio {
  id: string
  title: string
  slug: string
  content: string
  preview: string
  coverUrl: string | null
  authorId: string
  topicoId: string
  frascoCount: number
  createdAt: string
  updatedAt: string
  author: Author
  topico: Topico
}

export type TimeFilter = 'day' | 'week' | 'month' | 'year' | 'all'

export type FrascoType = 'POSITIVE' | 'NEGATIVE'
