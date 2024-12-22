import { relations } from 'drizzle-orm'
import { categoria } from '../tables/categoria.table.ts'
import { categoriaCursos } from '../tables/cursos.table.ts'

export const categoriasRelations = relations(categoria, ({ many }) => ({
  curso: many(categoriaCursos),
}))
