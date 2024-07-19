import { Router } from 'express';

import { authMiddleware } from '../../passport/authMiddleware';

import { ArticleController } from './article.controller';
import { validateBody } from '../../validators/validateBody';
import { validateQuery } from '../../validators/validateQuery';
import { validateParams } from '../../validators/validateParams';
import {
  CreateArticleRequest,
  GetRecentArticlesRequest,
  ArticleByIdParamsRequest,
} from '../../types/dto/article.dto';

export const articleRouter = Router();

articleRouter.post(
  '/',
  authMiddleware,
  validateBody(CreateArticleRequest),
  ArticleController.createArticle,
);
articleRouter.get(
  '/recent',
  validateQuery(GetRecentArticlesRequest),
  ArticleController.getRecentArticles,
);
articleRouter.get(
  '/recent/:username',
  validateQuery(GetRecentArticlesRequest),
  ArticleController.getRecentArticlesByUsername,
);
articleRouter.get(
  '/:articleid',
  validateParams(ArticleByIdParamsRequest),
  ArticleController.getArticleById,
);
articleRouter.delete(
  '/:articleid',
  authMiddleware,
  validateParams(ArticleByIdParamsRequest),
  ArticleController.deleteArticleById,
);
