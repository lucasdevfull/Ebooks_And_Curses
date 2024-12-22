import {
  decimal,
  integer,
  pgTable,
  primaryKey,
  varchar,
} from 'drizzle-orm/pg-core'
import { categoria } from './categoria.table.ts'
import { professor } from './professor.table.ts'

export const curso = pgTable('curso', {
  cursoId: integer('curso_id').primaryKey().generatedAlwaysAsIdentity(),
  titulo: varchar('titulo', { length: 255 }).notNull(),
  professorId: integer('professor_id')
    .notNull()
    .references(() => professor.professorId, { onDelete: 'cascade' }),
  valor: decimal('valor', { precision: 10, scale: 2 }).notNull(),
})

// tabela intermediaria
export const categoriaCursos = pgTable(
  'categoria_cursos',
  {
    categoriaId: integer('categoria_id')
      .notNull()
      .references(() => categoria.categoriaId),
    cursoId: integer('curso_id')
      .notNull()
      .references(() => curso.cursoId, { onDelete: 'cascade' }),
  },
  table => [
    primaryKey({
      columns: [table.categoriaId, table.cursoId],
    }),
  ]
)
