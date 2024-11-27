import type { Curso, Cursos } from '@/@types/cursos.ts'

export function curseResponse(curse: Cursos[]): Curso[] {
    return curse.map(curse => {
        return {
            cursoId: curse.cursoId,
            titulo: curse.titulo,
            valor: curse.valor,
            categoria: {
              categoriaId: curse.categoriaId,
              name: curse.categoriaName,
            },
            professor: {
              professorId: curse.professorId,
              name: curse.professorName,
            },
          }
    })
}
