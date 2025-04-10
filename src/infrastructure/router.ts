import type { Routes } from '@/types/index.types.ts'
import {
  authRoutes,
  authorsRoutes,
  booksRoutes,
  categoryRoutes,
  cursoRoutes,
  genreRoutes,
  professorRoutes,
  userRoutes,
} from '@/infrastructure/routes/index.routes.ts'

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
