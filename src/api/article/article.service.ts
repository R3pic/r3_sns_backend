import { ArticleRepository } from "./article.repository";
import { Article, CreateArticleDto } from "../../types/dto/article.dto";
import createHttpError from "http-errors";

export class ArticleService {
    constructor(private readonly articleRepository: ArticleRepository) {}

    async getRecentArticles(page: number): Promise<Article[]> {
        const articles: Article[] = await this.articleRepository.findRecentArticles(page, 5);
        return articles;
    }

    async getRecentArticlesByUsername(username: string, page: number): Promise<Article[]> {
        const articles: Article[] = await this.articleRepository.findRecentArticles(page, 5, { author: { username } });
        return articles;
    }

    async getArticleById(id: number): Promise<Article> {
        const article = await this.articleRepository.findArticleById(id);
        if (!article) {
            throw createHttpError(404, 'Article not found');
        }
        return article;
    }

    async createArticle(createArticleDto: CreateArticleDto): Promise<Article> {
        const { userid, content } = createArticleDto;
        const article: Article = await this.articleRepository.createArticle(userid, content);

        return article;
    }
}