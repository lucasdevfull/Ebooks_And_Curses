import { hash } from 'bcrypt'
export async function passwordHash(password: string, salt: number) {
  const pass = await hash(password, salt)
  return pass
}
