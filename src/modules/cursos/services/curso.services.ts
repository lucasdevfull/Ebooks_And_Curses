import type { Curso, NewCurso, TCategoria, TCurso, TProfessor } from '@/@types/cursos.ts'
import type { ICursoServices } from '../interface/curso.interface.ts'
import { CategoryRepository } from '../repositories/categoria.repositories.ts'
import { CursoRepository } from '../repositories/curso.repositories.ts'
import { ProfessorRepository } from '../repositories/professor.repositories.ts'

export class CursoServices implements ICursoServices {
  private category: CategoryRepository
  private professor: ProfessorRepository
  private curse: CursoRepository
  constructor() {
    this.category = new CategoryRepository()
    this.professor = new ProfessorRepository()
    this.curse = new CursoRepository()
  }

  async getAllCursos(): Promise<Curso[]> {
    const cursos: Curso[] = await this.curse.getAll()
    return cursos
  }

  async getCursosById(id: number): Promise<Curso> {
    const cursos: Curso = await this.curse.getById(id)
    return cursos
  }
  async createCursos(data: NewCurso): Promise<TCurso> {
    const professor: TProfessor = await this.professor.getById(data.professorId)
    const category: TCategoria = await this.category.getById(data.categoriaid)
    const curseExists: TCurso = await this.curse.getByName(data.titulo)
    if (!professor) throw new Error('Professor not found')
    if (!category) throw new Error('Category not found')
    if (curseExists) throw new Error('Curse already exists')
    const curse: TCurso = await this.curse.create(data)
    return curse
  }

  async updateCursos(id: number, data: NewCurso): Promise<TCurso> {
    const curseExists: Curso = await this.curse.getById(id)
    if (!curseExists) throw new Error('Curse not found')
    const curse: TCurso = await this.curse.update(id, data)
    return curse
  }

  async deleteCursos(id: number): Promise<{ message: string }> {
    const curseExists: Curso  = await this.curse.getById(id)
    if (!curseExists) throw new Error('Curse not found')
    const curse: TCurso = await this.curse.delete(id)
    return { message: 'Curse deleted successfully' }
  }
}
