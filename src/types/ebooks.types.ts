import type { authors, genres } from '@/db/schema/books.ts'

export type NewAuthor = typeof authors.$inferInsert
export type TAuthor = typeof authors.$inferSelect

export type TGenre = typeof genres.$inferSelect
export type NewGenre = typeof genres.$inferInsert
