import { eq, sql } from 'drizzle-orm'
import type { PgTable, TableConfig } from 'drizzle-orm/pg-core'
import { db } from '@/db/index.ts'
import {
  authors,
  ebooks,
  ebooksAuthors,
  ebooksGenres,
  genres,
  users,
} from '@/db/schema/index.ts'
import type { Ebook, Ebooks } from '@/types/ebooks.types.ts'

export class EbookRepository {
  async getAll(): Promise<Ebooks[]> {
    const result: Ebooks[] = await db
      .select({
        ebookId: ebooks.ebookId,
        title: ebooks.title,
        summary: ebooks.summary,
        publicationDate: ebooks.publication_date,
        numPages: ebooks.num_pages,
        coverPhoto: ebooks.cover_photo,
        createdAt: ebooks.created_at,
        createdBy: sql<{
          userId: number
          username: string
          email: string
        }>`json_build_object(
          'userId', users.user_id,
          'username', users.username,
          'email', users.email
        )`,
        author: sql<
          {
            authorId: number
            authorName: string
          }[]
        >`json_agg(
          jsonb_build_object(
            'authorId', authors.authors_id,
            'authorName', authors.first_name
          )
        )`,
        genres: sql<
          {
            genreId: number
            genreName: string
          }[]
        >`json_agg(
          jsonb_build_object(
            'genreId', genres.genre_id,
            'genreName', genres.name
          )
        )`,
      })
      .from(ebooks)
      .innerJoin(users, eq(ebooks.created_by, users.userId))
      .innerJoin(ebooksAuthors, eq(ebooks.ebookId, ebooksAuthors.ebookId))
      .innerJoin(authors, eq(ebooksAuthors.authorId, authors.authorId))
      .innerJoin(ebooksGenres, eq(ebooks.ebookId, ebooksGenres.genreId))
      .innerJoin(genres, eq(ebooksGenres.genreId, genres.genreId))
      .groupBy(ebooks.ebookId, users.userId)
    return result
  }
  async create({ ebook, authors, genres }: Ebook) {
    const book = await db.insert(ebooks).values(ebook).returning()
    await this.insert<{ authorId: number }>(
      ebooksAuthors,
      book[0].ebookId,
      authors,
      'authorId'
    )

    await this.insert<{ genreId: number }>(
      ebooksGenres,
      book[0].ebookId,
      genres,
      'genreId'
    )

    return book
  }

  async insert<T>(
    table: PgTable<TableConfig>,
    ebookId: number,
    relation: number | number[],
    id: keyof T
  ) {
    if (Array.isArray(relation)) {
      await db
        .insert(table)
        .values(relation.map(relationId => ({ [id]: relationId, ebookId })))
    } else {
      await db.insert(table).values({ [id]: relation, ebookId })
    }
  }
}
