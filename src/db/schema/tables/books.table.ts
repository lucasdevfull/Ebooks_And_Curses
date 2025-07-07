import {
  integer,
  pgTable,
  primaryKey,
  text,
  timestamp,
} from 'drizzle-orm/pg-core'
import { authors } from './authors.table.ts'
import { genres } from './genre.table.ts'
import { users } from './user.table.ts'

export const ebooks = pgTable('ebooks', {
  ebookId: integer('ebook_id')
    .primaryKey()
    .notNull()
    .generatedAlwaysAsIdentity(),
  title: text('title').notNull(),
  summary: text('summary'),
  publication_date: timestamp('publication_date'),
  num_pages: integer('num_pages'),
  cover_photo: text('cover_photo'),
  created_by: integer('created_by').references(() => users.userId),
  created_at: timestamp('created_at').defaultNow(),
})

export const ebooksAuthors = pgTable(
  'ebooks_authors',
  {
    ebookId: integer('ebook_id').references(() => ebooks.ebookId),
    authorId: integer('author_id').references(() => authors.authorId),
  },
  table => [
    primaryKey({
      columns: [table.ebookId, table.authorId],
    }),
  ]
)

export const ebooksGenres = pgTable(
  'ebooks_genres',
  {
    ebookId: integer('ebook_id').references(() => ebooks.ebookId),
    genreId: integer('genre_id').references(() => genres.genreId),
  },
  table => [
    primaryKey({
      columns: [table.ebookId, table.genreId],
    }),
  ]
)
