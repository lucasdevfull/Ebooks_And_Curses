import { relations } from 'drizzle-orm'
import { authors } from '../tables/authors.table.ts'
import { ebooksAuthors } from '../tables/books.table.ts'

export const authorsRelations = relations(authors, ({ many }) => ({
  ebooks: many(ebooksAuthors),
}))
