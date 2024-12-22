import { relations } from 'drizzle-orm'
import { ebooksGenres } from '../tables/books.table.ts'
import { genres } from '../tables/genre.table.ts'

export const genresRelations = relations(genres, ({ many }) => ({
  ebooks: many(ebooksGenres),
}))
