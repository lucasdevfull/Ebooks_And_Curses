import type { NewCategoria, TCategoria } from '@/@types/cursos.ts'
import type { ICategoriaServices } from '../interface/categoria.interface.ts'
import { CategoryRepository } from '../repositories/categoria.repositories.ts'

export class CategoryServices implements ICategoriaServices {
  private repository: CategoryRepository
  constructor() {
    this.repository = new CategoryRepository()
  }

  async getAllCategories(): Promise<TCategoria[]> {
    const categories: TCategoria[] = await this.repository.getAll()
    return categories
  }

  async getCategoryById(id: number): Promise<TCategoria> {
    const category: TCategoria = await this.repository.getById(id)
    return category
  }

  async createCategory(data: NewCategoria): Promise<TCategoria> {
    const categoryExist: TCategoria = await this.repository.getByName(data.name)
    if (categoryExist) throw new Error('Category already exists')

    const category: TCategoria = await this.repository.create(data)
    return category
  }

  async updateCategory(id: number, data: NewCategoria): Promise<TCategoria> {
    const categoryExist: TCategoria = await this.repository.getById(id)
    if (!categoryExist) throw new Error('Category not found')

    const category: TCategoria = await this.repository.update(id, data)
    return category
  }

  async deleteCategory(id: number): Promise<{ message: string }> {
    const categoryExist: TCategoria = await this.repository.getById(id)
    if (!categoryExist) throw new Error('Category not found')

    const category: TCategoria = await this.repository.delete(id)
    return { message: 'Category deleted successfully' }
  }
}
