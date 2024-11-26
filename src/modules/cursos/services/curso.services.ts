import type { Curso, NewCurso, TCurso } from '@/@types/cursos.ts'
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
    const cursos = await this.curse.getAll()
    return cursos
  }

  async getCursosById(id: number): Promise<Curso> {
    const cursos = await this.curse.getById(id)
    return cursos
  }
  async createCursos(data: NewCurso): Promise<TCurso> {
    const professor = await this.professor.getById(data.professorId)
    const category = await this.category.getById(data.categoriaid)
    const curseExists = await this.curse.getByName(data.titulo)
    if (!professor) throw new Error('Professor not found')
    if (!category) throw new Error('Category not found')
    if (curseExists) throw new Error('Curse already exists')
    const curse = await this.curse.create(data)
    return curse
  }

  async updateCursos(id: number, data: NewCurso): Promise<TCurso> {
    const curseExists = await this.curse.getById(id)
    if (!curseExists) throw new Error('Curse not found')
    const curse = await this.curse.update(id, data)
    return curse
  }

  async deleteCursos(id: number): Promise<{ message: string }> {
    const curseExists = await this.curse.getById(id)
    if (!curseExists) throw new Error('Curse not found')
    const curse = await this.curse.delete(id)
    return { message: 'Curse deleted successfully' }
  }
}
