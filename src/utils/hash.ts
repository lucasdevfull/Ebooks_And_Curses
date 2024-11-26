import { hash } from 'bcrypt'
export async function passwordHash(password: string, salt: number) {
  const saltRounds = salt
  const pass = await hash(password, saltRounds)
  return pass
}
