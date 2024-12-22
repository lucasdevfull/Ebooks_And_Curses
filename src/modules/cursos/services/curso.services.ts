import { ConflitError } from '@/errors/conflit.ts'
import { NotFoundError } from '@/errors/not-found.ts'
import type {
  Curso,
  NewCurso,
  TCategoria,
  TCategoriaCurso,
  TCurso,
  TProfessor,
} from '@/types/cursos.types.ts'
import type { ICursoServices } from '@interface/curso.interface.ts'
import { CategoryRepository } from '@repositories/categoria.repositories.ts'
import { CursoRepository } from '@repositories/curso.repositories.ts'
import { ProfessorRepository } from '@repositories/professor.repositories.ts'

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
    const curses: Curso[] = await this.curse.getAll()
    return curses
  }

  async getCursosById(id: number): Promise<Curso> {
    const curse: Curso = await this.curse.getById(id)
    return curse
  }
  async createCursos(data: NewCurso): Promise<TCurso> {
    const professor: TProfessor = await this.professor.getById(data.professorId)
    let category: Promise<TCategoria>[] | TCategoria

    if (Array.isArray(data.categoria)) {
      category = data.categoria.map(async (id: number) => {
        return await this.category.getById(id)
      })
    } else {
      category = await this.category.getById(data.categoria)
    }

    const curseExists: TCurso = await this.curse.getByName(data.titulo)
    if (!professor) throw new NotFoundError('Professor not found')
    if (!category) throw new NotFoundError('Category not found')
    if (curseExists) throw new ConflitError('Curse already exists')
    const curse: TCurso = await this.curse.create(data)
    return curse
  }

  async updateCursos(id: number, data: NewCurso): Promise<TCurso> {
    const curseExists: Curso = await this.curse.getById(id)
    if (!curseExists) throw new Error('Curse not found')
    let category: TCategoria | TCategoria[]

    if (Array.isArray(data.categoria)) {
      category = await Promise.all(
        data.categoria.map(async (id: number) => {
          return await this.category.getById(id)
        })
      )
    } else {
      category = await this.category.getById(data.categoria)
    }

    if (!category) {
      throw new Error('Category not found')
    }

    let categoryInCurse: TCategoriaCurso | TCategoriaCurso[]

    if (Array.isArray(data.categoria)) {
      categoryInCurse = await Promise.all(
        data.categoria.map(async (id: number) => {
          return await this.curse.findCategoryInCurse(id, curseExists.cursoId)
        })
      )
    } else {
      categoryInCurse = await this.curse.findCategoryInCurse(
        data.categoria,
        curseExists.cursoId
      )
    }

    if (categoryInCurse) {
      throw new ConflitError('Category já existente no curso')
    }
    const curse: TCurso = await this.curse.update(id, data)
    return curse
  }

  async deleteCursos(id: number): Promise<{ message: string }> {
    const curseExists: Curso = await this.curse.getById(id)
    if (!curseExists) {
      throw new NotFoundError('Curse not found')
    }

    const curse = await this.curse.delete(id)
    return { message: 'Curse deleted successfully' }
  }

  async deleteCategoryInCurse(
    curseId: number,
    categoryId: number
  ): Promise<{ message: string }> {
    const categoryExists = await this.curse.findCategoryInCurse(
      categoryId,
      curseId
    )
    if (!categoryExists) {
      throw new Error('Category not found in this curse')
    }

    const category = await this.curse.removeCategoryInCurse(categoryId, curseId)
    return { message: 'Category removed successfully' }
  }
}
