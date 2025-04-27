import { hash } from "@node-rs/bcrypt"

export async function passwordHash(password: string, salt: number) {
  const pass = await hash(password, salt)
  return pass
}
