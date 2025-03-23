import { relations } from 'drizzle-orm'
import { category } from '../tables/category.table.ts'
import { categoryCurses, curse } from '../tables/curses.table.ts'

export const cursesRelations = relations(curse, ({ many }) => ({
  category: many(categoryCurses),
}))

export const categoryCursesRelations = relations(categoryCurses, ({ one }) => ({
  curse: one(curse, {
    fields: [categoryCurses.curseId],
    references: [curse.curseId],
  }),
  category: one(category, {
    fields: [categoryCurses.categoryId],
    references: [category.categoryId],
  }),
}))
