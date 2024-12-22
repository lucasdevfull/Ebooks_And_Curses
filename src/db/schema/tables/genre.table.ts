import { integer, pgTable, text } from 'drizzle-orm/pg-core'

export const genres = pgTable('genres', {
  genreId: integer('genre_id')
    .primaryKey()
    .notNull()
    .generatedAlwaysAsIdentity(),
  name: text('name').notNull().unique(),
})
