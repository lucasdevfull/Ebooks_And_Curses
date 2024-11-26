import type { NewProfessor, TProfessor } from '@/@types/cursos.ts'
import type { IProfessorServices } from '../interface/professor.interface.ts'
import { ProfessorRepository } from '../repositories/professor.repositories.ts'

export class ProfessorServices implements IProfessorServices {
  private repository: ProfessorRepository
  constructor() {
    this.repository = new ProfessorRepository()
  }

  async getAllProfessors(): Promise<TProfessor[]> {
    const professors = await this.repository.getAll()
    return professors
  }

  async getProfessorById(id: number): Promise<TProfessor> {
    const professor = await this.repository.getById(id)
    return professor
  }

  async createProfessor(data: NewProfessor): Promise<TProfessor> {
    const professor = await this.repository.create(data)
    return professor
  }

  async updateProfessor(id: number, data: NewProfessor): Promise<TProfessor> {
    const professorExist = await this.repository.getById(id)
    if (!professorExist) {
      throw new Error('Professor not found')
    }
    const professor = await this.repository.update(id, data)
    return professor
  }

  async deleteProfessor(id: number): Promise<{ message: string }> {
    const professorExist = await this.repository.getById(id)
    if (!professorExist) {
      throw new Error('Professor not found')
    }
    const professor = await this.repository.delete(id)
    return { message: 'Professor deleted successfully' }
  }
}
