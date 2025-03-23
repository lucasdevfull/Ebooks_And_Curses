import { ConflitError } from '@/common/errors/conflit.ts'
import { NotFoundError } from '@/common/errors/not-found.ts'
import type { NewCategory, TCategory } from '@/types/curse.types.ts'
import type { ICategoriaServices } from '@interface/category.interface.ts'
import { CategoryRepository } from '@repositories/category.repositories.ts'

export class CategoryServices implements ICategoriaServices {
  private repository: CategoryRepository
  constructor() {
    this.repository = new CategoryRepository()
  }

  async getAllCategories(): Promise<TCategory[]> {
    const categories: TCategory[] = await this.repository.getAll()
    return categories
  }

  async getCategoryById(id: number): Promise<TCategory> {
    const category: TCategory = await this.repository.getById(id)

    if (!category) {
      throw new NotFoundError('Category not found')
    }

    return category
  }

  async createCategory(data: NewCategory): Promise<TCategory> {
    const categoryExist: TCategory = await this.repository.getByName(data.name)
    if (categoryExist) throw new ConflitError('Category already exists')

    const category: TCategory = await this.repository.create(data)
    return category
  }

  async updateCategory(id: number, data: NewCategory): Promise<TCategory> {
    const categoryExist: TCategory = await this.repository.getById(id)
    if (!categoryExist) throw new NotFoundError('Category not found')

    const category: TCategory = await this.repository.update(id, data)
    return category
  }

  async deleteCategory(id: number): Promise<{ message: string }> {
    const categoryExist: TCategory = await this.repository.getById(id)
    if (!categoryExist) throw new NotFoundError('Category not found')

    const category: TCategory = await this.repository.delete(id)
    return { message: 'Category deleted successfully' }
  }
}
