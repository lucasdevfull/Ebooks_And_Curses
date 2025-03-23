export interface Repository<T, U> {
  create(data: U): Promise<T>
  getAll(): Promise<T[]>
  getById(id: number): Promise<T>
  update?(id: number, data: U): Promise<T>
  delete?(id: number): Promise<T>
}
