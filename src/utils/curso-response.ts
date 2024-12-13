import type { Curso, Cursos } from '@/types/cursos.types.ts'

export function curseResponse(curse: Cursos[], category: {categoriaId: number; categoriaName: string;}[]): Curso[] {
  return curse.map(curse => {
    return {
      cursoId: curse.cursoId,
      titulo: curse.titulo,
      valor: Number(curse.valor),
      categoria: category.map(category => ({ 
        categoriaId: category.categoriaId, 
        name: category.categoriaName 
      })),
      professor: {
        professorId: curse.professorId,
        name: curse.professorName,
      },
    }
  })
}
