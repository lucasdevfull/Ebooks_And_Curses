import { relations } from 'drizzle-orm'
import { authors } from '../tables/authors.table.ts'
import { ebooks, ebooksAuthors, ebooksGenres } from '../tables/books.table.ts'
import { genres } from '../tables/genre.table.ts'

export const ebooksRelations = relations(ebooks, ({ many }) => ({
  authors: many(ebooksAuthors),
  genres: many(ebooksGenres),
}))

export const ebooksAuthorsRelations = relations(ebooksAuthors, ({ one }) => ({
  ebooks: one(ebooks, {
    fields: [ebooksAuthors.ebookId],
    references: [ebooks.ebookId],
  }),
  author: one(authors, {
    fields: [ebooksAuthors.authorId],
    references: [authors.authorId],
  }),
}))

export const ebooksGenresRelations = relations(ebooksGenres, ({ one }) => ({
  ebooks: one(ebooks, {
    fields: [ebooksGenres.ebookId],
    references: [ebooks.ebookId],
  }),
  genres: one(genres, {
    fields: [ebooksGenres.genreId],
    references: [genres.genreId],
  }),
}))
