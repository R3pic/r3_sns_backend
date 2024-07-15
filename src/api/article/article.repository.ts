import { PrismaClient } from '@prisma/client';
import { Article } from '../../types/dto/article.dto';

export class ArticleRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async findRecentArticles(page: number, perPage: number, where?: object): Promise<Article[]> {
    const skip = perPage * (page - 1);
    const articles: Article[] = await this.prisma.article.findMany({
      take: perPage,
      skip: skip,
      where: where,
      orderBy: {
        createdAt: 'desc',
      },
      select: {
        id: true,
        content: true,
        createdAt: true,
        updatedAt: true,
        author: {
          select: {
            username: true,
            nickname: true,
          },
        },
      },
    });
    return articles;
  }

  async findArticleById(id: number): Promise<Article | null> {
    const article: Article | null = await this.prisma.article.findUnique({
      where: {
        id: id,
      },
      select: {
        id: true,
        content: true,
        createdAt: true,
        updatedAt: true,
        author: {
          select: {
            username: true,
            nickname: true,
          },
        },
      },
    });
    return article;
  }

  async createArticle(userid: number, content: string) {
    const article = await this.prisma.article.create({
      data: {
        authorid: userid,
        content: content,
      },
      select: {
        id: true,
        content: true,
        createdAt: true,
        updatedAt: true,
        author: {
          select: {
            username: true,
            nickname: true,
          },
        },
      },
    });

    return article;
  }

  async deleteArticle(id: number) {
    await this.prisma.article.delete({
      where: {
        id: id,
      },
    });
  }
}
