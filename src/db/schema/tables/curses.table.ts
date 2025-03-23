import {
  decimal,
  integer,
  pgTable,
  primaryKey,
  varchar,
} from 'drizzle-orm/pg-core'
import { category } from './category.table.ts'
import { professor } from './professor.table.ts'

export const curse = pgTable('curse', {
  curseId: integer('curse_id').primaryKey().generatedAlwaysAsIdentity(),
  title: varchar('title', { length: 255 }).notNull(),
  professorId: integer('professor_id')
    .notNull()
    .references(() => professor.professorId, { onDelete: 'cascade' }),
  price: decimal('price', { precision: 10, scale: 2 }).notNull(),
})

// tabela intermediaria
export const categoryCurses = pgTable(
  'category_curses',
  {
    categoryId: integer('category_id')
      .notNull()
      .references(() => category.categoryId),
    curseId: integer('curse_id')
      .notNull()
      .references(() => curse.curseId, { onDelete: 'cascade' }),
  },
  table => [
    primaryKey({
      columns: [table.categoryId, table.curseId],
    }),
  ]
)
