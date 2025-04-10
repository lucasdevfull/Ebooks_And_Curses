import { z } from 'zod'

export const bookFormDataSchema = z.object({
  title: z.string(),
  summary: z.string(),
  numPages: z.string().transform(val => Number(val)),
  file: z
    .instanceof(File)
    .refine(file => !(file.type in ['image/jpeg', 'image/png']), {
      message: 'File type must be image/jpeg or image/png',
    }),
})

export const bookSchema = z.object({
  ebookId: z.number(),
  title: z.string().nullable(),
  summary: z.string().nullable(),
  publicationDate: z.date().nullable(),
  numPages: z.number().nullable(),
  coverPhoto: z.string().nullable(),
  createdAt: z.date().nullable(),
  createdBy: z.object({
    userId: z.number(),
    username: z.string(),
    email: z.string(),
  }),
  author: z.array(
    z.object({
      authorId: z.number(),
      authorName: z.string(),
    })
  ),
  genres: z.array(
    z.object({
      genreId: z.number(),
      genreName: z.string(),
    })
  ),
})
