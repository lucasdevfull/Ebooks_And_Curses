import { ConflitError } from '@/common/errors/conflit.ts'
import { NotFoundError } from '@/common/errors/not-found.ts'
import type {
  Curse,
  NewCurse,
  TCategory,
  TCategoryCurse,
  TCurse,
  TProfessor,
} from '@/types/curse.types.ts'
import type { ICursoServices } from '@interface/curse.interface.ts'
import { CategoryRepository } from '@repositories/category.repositories.ts'
import { CursoRepository } from '@repositories/curse.repositories.ts'
import { ProfessorRepository } from '@repositories/professor.repositories.ts'

type Number = number | number[]

export class CursoServices implements ICursoServices {
  private category: CategoryRepository
  private professor: ProfessorRepository
  private curse: CursoRepository
  constructor() {
    this.category = new CategoryRepository()
    this.professor = new ProfessorRepository()
    this.curse = new CursoRepository()
  }

  async getAllCurses(): Promise<Curse[]> {
    const curses: Curse[] = await this.curse.getAll()
    return curses
  }

  async getCursesById(id: number): Promise<Curse> {
    const curse: Curse = await this.curse.getById(id)
    if (!curse) {
      throw new NotFoundError('Curso not found')
    }
    return curse
  }
  async createCurses(data: NewCurse): Promise<TCurse> {
    const professor: TProfessor = await this.professor.getById(data.professorId)
    const category = await this.getCategory(data.category)

    const curseExists: TCurse = await this.curse.getByName(data.title)

    if (!professor) throw new NotFoundError('Professor not found')
    if (!category) throw new NotFoundError('Category not found')
    if (curseExists) throw new ConflitError('Curse already exists')
    const curse: TCurse = await this.curse.create(data)
    return curse
  }

  async updateCurses(id: number, data: NewCurse): Promise<TCurse> {
    const curseExists: Curse = await this.curse.getById(id)
    if (!curseExists) throw new NotFoundError('Curse not found')

    const category = await this.getCategory(data.category)

    if (!category) throw new NotFoundError('Category not found')

    const categoryInCurse = await this.checkCategoryInCurse(data.category, id)

    if (categoryInCurse)
      throw new ConflitError('Category já existente no curso')

    const curse: TCurse = await this.curse.update(id, data)
    return curse
  }

  async deleteCurses(id: number): Promise<{ message: string }> {
    const curseExists: Curse = await this.curse.getById(id)

    if (!curseExists) throw new NotFoundError('Curse not found')

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
    if (!categoryExists)
      throw new NotFoundError('Category not found in this curse')

    await this.curse.removeCategoryInCurse(categoryId, curseId)
    return { message: 'Category removed successfully' }
  }

  async getCategory(category: Number): Promise<TCategory | TCategory[]> {
    if (Array.isArray(category)) {
      return await Promise.all(
        category.map(async id => await this.category.getById(id))
      )
    }
    return await this.category.getById(category)
  }

  async checkCategoryInCurse(
    category: Number,
    curseId: number
  ): Promise<TCategoryCurse | TCategoryCurse[]> {
    if (Array.isArray(category)) {
      return await Promise.all(
        category.map(
          async id => await this.curse.findCategoryInCurse(id, curseId)
        )
      )
    }
    return await this.curse.findCategoryInCurse(category, curseId)
  }
}
