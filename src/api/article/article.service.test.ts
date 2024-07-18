import { describe, it, expect, jest } from '@jest/globals';
import { ArticleService } from './article.service';
import { CreateArticleDto } from '../../types/dto/article.dto';
import { ArticleRepository } from './article.repository';

describe('ArticleService', () => {
  describe('createArticle', () => {
    it('createArticle 함수가 존재해야 한다', () => {
      expect(ArticleService.createArticle).toBeDefined();
    });

    it('createArticle 작성 성공', async () => {
      const createArticleDto: CreateArticleDto = {
        userid: 1,
        content: 'test content',
      };

      const expected = {
        id: 1,
        author: {
          username: 'testuser',
          nickname: 'testusernick',
        },
        content: 'test content',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      jest.spyOn(ArticleRepository, 'createArticle').mockResolvedValue(expected);

      const result = await ArticleService.createArticle(createArticleDto);

      expect(result).toEqual(expected);
    });
  });
});
