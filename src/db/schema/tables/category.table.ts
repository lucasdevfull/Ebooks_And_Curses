import { integer, pgTable, varchar } from 'drizzle-orm/pg-core'

export const category = pgTable('category', {
  categoryId: integer('category_id').primaryKey().generatedAlwaysAsIdentity(),
  name: varchar('category_name', { length: 255 }).notNull(),
})
