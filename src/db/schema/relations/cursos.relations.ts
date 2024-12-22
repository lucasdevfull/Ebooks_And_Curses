import { relations } from 'drizzle-orm'
import { categoria } from '../tables/categoria.table.ts'
import { categoriaCursos, curso } from '../tables/cursos.table.ts'

export const cursosRelations = relations(curso, ({ many }) => ({
  categoria: many(categoriaCursos),
}))

export const categoriaCursosRelations = relations(
  categoriaCursos,
  ({ one }) => ({
    curso: one(curso, {
      fields: [categoriaCursos.cursoId],
      references: [curso.cursoId],
    }),
    categoria: one(categoria, {
      fields: [categoriaCursos.categoriaId],
      references: [categoria.categoriaId],
    }),
  })
)
