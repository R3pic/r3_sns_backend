import { Request, Response, NextFunction } from 'express';
import { ArticleService } from './article.service';
import { CreateArticleDto, CreateArticleRequest } from '../../types/dto/article.dto';
import { User } from '@prisma/client';

/**
 * @swagger
 * /articles/create:
 *   post:
 *     summary: Create an article
 *     tags: [Articles]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *              content:
 *               type: string
 *               description: The content of the article
 *     responses:
 *       201:
 *         description: Created successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 */
const createArticle = async (req: Request, res: Response, next: NextFunction) => {
  const CreateArticleRequest: CreateArticleRequest = req.body;
  const user = req.user as User;

  const createArticleDto: CreateArticleDto = {
    content: CreateArticleRequest.content,
    userid: user.id,
  };

  try {
    const article = await ArticleService.createArticle(createArticleDto);
    res.status(201).json(article);
  } catch (error) {
    next(error);
  }
};

/**
 * @swagger
 * /articles/recent:
 *   get:
 *     summary: Get recent articles
 *     tags: [Articles]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         required: false
 *         description: The page number
 *     responses:
 *       200:
 *         description: The list of articles
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 articles:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       content:
 *                         type: string
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *                       author:
 *                         type: object
 *                         properties:
 *                           username:
 *                             type: string
 *                           nickname:
 *                             type: string
 */
const getRecentArticles = async (req: Request, res: Response, next: NextFunction) => {
  const page = Number(req.query.page) || 1;
  const perPage = Number(req.query.perPage) || 5;
  try {
    const articles = await ArticleService.getRecentArticles(page, perPage);
    res.status(200).json(articles);
  } catch (error) {
    next(error);
  }
};

const getRecentArticlesByUsername = async (req: Request, res: Response, next: NextFunction) => {
  const page = Number(req.query.page) || 1;
  const perPage = Number(req.query.perPage) || 5;
  const username = req.params.username;
  try {
    const articles = await ArticleService.getRecentArticlesByUsername(username, page, perPage);
    res.status(200).json(articles);
  } catch (error) {
    next(error);
  }
};

const getArticleById = async (req: Request, res: Response, next: NextFunction) => {
  const id = Number(req.params.articleid);
  try {
    const article = await ArticleService.getArticleById(id);
    res.status(200).json(article);
  } catch (error) {
    next(error);
  }
};

const deleteArticleById = async (req: Request, res: Response, next: NextFunction) => {
  const id = Number(req.params.articleid);
  try {
    await ArticleService.deleteArticleById(id);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

export const ArticleController = {
  createArticle,
  getRecentArticles,
  getRecentArticlesByUsername,
  getArticleById,
  deleteArticleById,
};
