import type { Curse, Cursos } from '@/types/curse.types.ts'

export function curseResponse(
  curse: Cursos[],
  category: { categoriaId: number; categoriaName: string }[]
): Curse[] {
  return curse.map(curse => {
    return {
      cursoId: curse.cursoId,
      titulo: curse.titulo,
      valor: curse.valor,
      categoria: category.map(category => ({
        categoriaId: category.categoriaId,
        name: category.categoriaName,
      })),
      professor: {
        professorId: curse.professorId,
        name: curse.professorName,
      },
    }
  })
}
