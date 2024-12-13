import { relations } from 'drizzle-orm'
import { decimal, integer, pgTable, varchar } from 'drizzle-orm/pg-core'

export const professor = pgTable('professor', {
  professorId: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 40 }).notNull(),
  email: varchar('email', { length: 255 }).notNull().unique(),
})

export const categoria = pgTable('categoria', {
  categoriaId: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
})

export const categoriasRelations = relations(categoria, ({ many }) => ({
  curso: many(categoriaCursos),
}))

export const curso = pgTable('curso', {
  cursoId: integer().primaryKey().generatedAlwaysAsIdentity(),
  titulo: varchar('titulo', { length: 255 }).notNull(),
  professorId: integer('professor_id')
    .notNull()
    .references(() => professor.professorId, { onDelete: 'cascade' }),
  valor: decimal('valor', { precision: 10, scale: 2 }).notNull(),
})

export const cursosRelations = relations(curso, ({ many }) => ({
  categoria: many(categoriaCursos),
}))

export const categoriaCursos = pgTable('categoria_cursos', {
  categoriaId: integer('categoria_id')
    .notNull()
    .unique()
    .references(() => categoria.categoriaId),
  cursoId: integer('curso_id')
    .notNull()
    .references(() => curso.cursoId, { onDelete: 'cascade' }),
})
