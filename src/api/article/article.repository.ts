import { PrismaClient } from '@prisma/client';
import { Article } from '../../types/dto/article.dto';

const prisma = new PrismaClient();

const findRecentArticles = async (
  page: number,
  perPage: number,
  where?: object,
): Promise<Article[]> => {
  const skip = perPage * (page - 1);
  const articles: Article[] = await prisma.article.findMany({
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
};

const findArticleById = async (id: number): Promise<Article | null> => {
  const article: Article | null = await prisma.article.findUnique({
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
};

const createArticle = async (userid: number, content: string) => {
  const article = await prisma.article.create({
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
};

const deleteArticle = async (id: number) => {
  await prisma.article.delete({
    where: {
      id: id,
    },
  });
};

export const ArticleRepository = {
  findRecentArticles,
  findArticleById,
  createArticle,
  deleteArticle,
};
