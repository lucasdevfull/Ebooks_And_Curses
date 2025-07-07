import type { z } from 'zod'
import type { authors, ebooks, genres } from '@/db/schema/index.ts'
import type { bookSchema } from '@/schema/books.schema.ts'

export type NewAuthor = typeof authors.$inferInsert
export type TAuthor = typeof authors.$inferSelect

export type TGenre = typeof genres.$inferSelect
export type NewGenre = typeof genres.$inferInsert

export type NewEbook = typeof ebooks.$inferInsert

export type Ebook = {
  ebook: NewEbook
  authors: number | number[]
  genres: number | number[]
}

export type Ebooks = z.infer<typeof bookSchema>
