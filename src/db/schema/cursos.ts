import { relations } from 'drizzle-orm'
import { decimal, integer, pgTable, primaryKey, varchar } from 'drizzle-orm/pg-core'

export const professor = pgTable('professor', {
  professorId: integer('professor_id').primaryKey().generatedAlwaysAsIdentity(),
  name: varchar('professor_name',{ length: 40 }).notNull(),
  email: varchar('professor_email', { length: 255 }).notNull().unique(),
})

export const categoria = pgTable('categoria', {
  categoriaId: integer('categoria_id').primaryKey().generatedAlwaysAsIdentity(),
  name: varchar('categoria_name',{ length: 255 }).notNull(),
})

export const curso = pgTable('curso', {
  cursoId: integer('curso_id').primaryKey().generatedAlwaysAsIdentity(),
  titulo: varchar('titulo', { length: 255 }).notNull(),
  professorId: integer('professor_id')
    .notNull()
    .references(() => professor.professorId, { onDelete: 'cascade' }),
  valor: decimal('valor', { precision: 10, scale: 2 }).notNull(),
})

// tabela intermediaria
export const categoriaCursos = pgTable('categoria_cursos', {
  categoriaId: integer('categoria_id')
    .notNull()
    .references(() => categoria.categoriaId),
  cursoId: integer('curso_id')
    .notNull()
    .references(() => curso.cursoId, { onDelete: 'cascade' }),
}, table => [
  primaryKey({
    columns: [table.categoriaId, table.cursoId],
  }),
])

//relations
export const categoriasRelations = relations(categoria, ({ many }) => ({
  curso: many(categoriaCursos),
}))

export const cursosRelations = relations(curso, ({ many }) => ({
  categoria: many(categoriaCursos),
}))

export const categoriaCursosRelations = relations(categoriaCursos, ({ one }) =>({
  curso: one(curso, {
    fields: [categoriaCursos.cursoId],
    references: [curso.cursoId]
  }),
  categoria: one(categoria, {
    fields: [categoriaCursos.categoriaId],
    references: [categoria.categoriaId]
  })
}))