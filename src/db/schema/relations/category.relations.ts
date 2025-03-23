import { relations } from 'drizzle-orm'
import { category } from '../tables/category.table.ts'
import { categoryCurses } from '../tables/curses.table.ts'

export const categoryRelations = relations(category, ({ many }) => ({
  curso: many(categoryCurses),
}))
