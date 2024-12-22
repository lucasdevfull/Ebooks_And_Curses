import { integer, pgTable, varchar } from 'drizzle-orm/pg-core'

export const categoria = pgTable('categoria', {
  categoriaId: integer('categoria_id').primaryKey().generatedAlwaysAsIdentity(),
  name: varchar('categoria_name', { length: 255 }).notNull(),
})
