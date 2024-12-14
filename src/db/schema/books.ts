import { relations } from 'drizzle-orm'
import { integer, pgTable, text, timestamp } from 'drizzle-orm/pg-core'
import { users } from './user.ts'

// Tabela de autores
export const authors = pgTable('authors', {
  authorId: integer('id').primaryKey().notNull().generatedAlwaysAsIdentity(),
  first_name: text('first_name').notNull(),
  last_name: text('last_name').notNull(),
});

export const authorsRelations = relations(authors, ({ many }) => ({
  ebooks: many(ebooksAuthors),
}));


// Tabela de gêneros
export const genres = pgTable('genres', {
  genreId: integer('id').primaryKey().notNull().generatedAlwaysAsIdentity(),
  name: text('name').notNull().unique(),
})

export const genresRelations = relations(genres, ({ many }) => ({
  ebooks: many(ebooksGenres),
}))

// Tabela de ebooks
export const ebooks = pgTable('ebooks', {
  ebookId: integer('id').primaryKey().notNull().generatedAlwaysAsIdentity(),
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

// Tabela de junção para relação many-to-many entre ebooks e autores
export const ebooksAuthors = pgTable('ebooks_authors', {
  ebookId: integer('ebook_id').references(() => ebooks.ebookId),
  authorId: integer('author_id').references(() => authors.authorId),
})
//
//// Tabela de junção para relação many-to-many entre ebooks e gêneros
export const ebooksGenres = pgTable('ebooks_genres', {
  ebookId: integer('ebook_id').references(() => ebooks.ebookId),
  genreId: integer('genre_id').references(() => genres.genreId),
})
