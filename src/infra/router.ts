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

export const routes = [
  { router: userRoutes },
  { router: authRoutes },
  { router: genreRoutes },
  { router: authorsRoutes },
  { router: categoryRoutes },
  { router: professorRoutes },
  { router: cursoRoutes },
  { router: booksRoutes },
]
