import { ArticleRepository } from './article.repository';
import { Article, CreateArticleDto } from '../../types/dto/article.dto';
import createHttpError from 'http-errors';

const getRecentArticles = async (page: number, perPage: number): Promise<Article[]> => {
  const articles: Article[] = await ArticleRepository.findRecentArticles(page, perPage);
  return articles;
};

const getRecentArticlesByUsername = async (
  username: string,
  page: number,
  perPage: number,
): Promise<Article[]> => {
  const articles: Article[] = await ArticleRepository.findRecentArticles(page, perPage, {
    author: { username },
  });
  return articles;
};

const getArticleById = async (id: number): Promise<Article> => {
  const article = await ArticleRepository.findArticleById(id);
  if (!article) {
    throw createHttpError(404, 'Article not found');
  }
  return article;
};

const createArticle = async (createArticleDto: CreateArticleDto): Promise<Article> => {
  const { userid, content } = createArticleDto;
  const article: Article = await ArticleRepository.createArticle(userid, content);

  return article;
};

export const ArticleService = {
  getRecentArticles,
  getRecentArticlesByUsername,
  getArticleById,
  createArticle,
};
