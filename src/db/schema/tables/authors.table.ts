import { relations } from 'drizzle-orm'
import { integer, pgTable, text } from 'drizzle-orm/pg-core'
import { ebooksAuthors } from './books.table.ts'

export const authors = pgTable('authors', {
  authorId: integer('authors_id')
    .primaryKey()
    .notNull()
    .generatedAlwaysAsIdentity(),
  first_name: text('first_name').notNull(),
  last_name: text('last_name').notNull(),
})

export const authorsRelations = relations(authors, ({ many }) => ({
  ebooks: many(ebooksAuthors),
}))
