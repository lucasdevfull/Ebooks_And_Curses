import {
  authorsRoutes,
  authRoutes,
  booksRoutes,
  categoryRoutes,
  cursoRoutes,
  genreRoutes,
  professorRoutes,
  userRoutes,
} from '@router/index.routes.ts'
import type { Routes } from '@/types/index.types.ts'

export const routes: Routes[] = [
  { router: userRoutes },
  { router: authRoutes },
  { router: genreRoutes },
  { router: authorsRoutes },
  { router: categoryRoutes },
  { router: professorRoutes },
  { router: cursoRoutes },
  { router: booksRoutes },
]
