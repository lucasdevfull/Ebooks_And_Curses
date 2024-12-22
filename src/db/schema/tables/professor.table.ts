import { integer, pgTable, varchar } from 'drizzle-orm/pg-core'

export const professor = pgTable('professor', {
  professorId: integer('professor_id').primaryKey().generatedAlwaysAsIdentity(),
  name: varchar('professor_name', { length: 40 }).notNull(),
  email: varchar('professor_email', { length: 255 }).notNull().unique(),
})
