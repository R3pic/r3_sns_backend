import { Router } from 'express';

import { authMiddleware } from '../../passport/authMiddleware';

import { ArticleController } from './article.controller';
import { ArticleService } from './article.service';
import { ArticleRepository } from './article.repository';
import { validateBody } from '../../validators/validateBody';
import { validateQuery } from '../../validators/validateQuery';
import { validateParams } from '../../validators/validateParams';
import {
  CreateArticleRequest,
  GetRecentArticlesRequest,
  GetArticleByIdRequest,
} from '../../types/dto/article.dto';

const articleRepository = new ArticleRepository();
const articleService = new ArticleService(articleRepository);
const articleController = new ArticleController(articleService);

export const articleRouter = Router();

articleRouter.post(
  '/',
  authMiddleware,
  validateBody(CreateArticleRequest),
  articleController.createArticle,
);
articleRouter.get(
  '/recent',
  validateQuery(GetRecentArticlesRequest),
  articleController.getRecentArticles,
);
articleRouter.get(
  '/recent/:username',
  validateQuery(GetRecentArticlesRequest),
  articleController.getRecentArticlesByUsername,
);
articleRouter.get(
  '/:articleid',
  validateParams(GetArticleByIdRequest),
  articleController.getArticleById,
);
