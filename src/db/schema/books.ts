import { relations } from 'drizzle-orm'
import { integer, pgTable, primaryKey, text, timestamp } from 'drizzle-orm/pg-core'
import { users } from './user.ts'

// Tabela de autores
export const authors = pgTable('authors', {
  authorId: integer('authors_id').primaryKey().notNull().generatedAlwaysAsIdentity(),
  first_name: text('first_name').notNull(),
  last_name: text('last_name').notNull(),
});

// Tabela de gêneros
export const genres = pgTable('genres', {
  genreId: integer('genre_id').primaryKey().notNull().generatedAlwaysAsIdentity(),
  name: text('name').notNull().unique(),
})

// Tabela de ebooks
export const ebooks = pgTable('ebooks', {
  ebookId: integer('ebook_id').primaryKey().notNull().generatedAlwaysAsIdentity(),
  title: text('title').notNull(),
  summary: text('summary'),
  publication_date: timestamp('publication_date'),
  num_pages: integer('num_pages'),
  cover_photo: text('cover_photo'),
  created_by: integer('created_by').references(() => users.userId),
  created_at: timestamp('created_at').defaultNow(),
})

export const ebooksRelations = relations(ebooks, ({ many }) => ({
  authors: many(ebooksAuthors),
  genres: many(ebooksGenres),
}))

export const authorsRelations = relations(authors, ({ many }) => ({
  ebooks: many(ebooksAuthors),
}));

export const genresRelations = relations(genres, ({ many }) => ({
  ebooks: many(ebooksGenres),
}))

// Tabela de junção para relação many-to-many entre ebooks e autores
export const ebooksAuthors = pgTable('ebooks_authors', {
  ebookId: integer('ebook_id').references(() => ebooks.ebookId),
  authorId: integer('author_id').references(() => authors.authorId),
}, table => [
  primaryKey({
    columns: [table.ebookId, table.authorId]
  })
])

export const ebooksAuthorsRelations = relations(ebooksAuthors, ({ one }) => ({
  ebooks: one(ebooks, {
    fields: [ebooksAuthors.ebookId],
    references: [ebooks.ebookId]
  }),
  author: one(authors, {
    fields: [ebooksAuthors.authorId],
    references: [authors.authorId]
  })
}))
//
//// Tabela de junção para relação many-to-many entre ebooks e gêneros
export const ebooksGenres = pgTable('ebooks_genres', {
  ebookId: integer('ebook_id').references(() => ebooks.ebookId),
  genreId: integer('genre_id').references(() => genres.genreId),
}, table => [
  primaryKey({
    columns: [table.ebookId, table.genreId]
  })
])

export const ebooksGenresRelations = relations(ebooksGenres, ({one}) => ({
  ebooks: one(ebooks, {
    fields: [ebooksGenres.ebookId],
    references: [ebooks.ebookId]
  }),
  genres: one(genres, {
    fields: [ebooksGenres.genreId],
    references: [genres.genreId]
  })
}))