import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString, MaxLength, MinLength } from 'class-validator';

export type Article = {
    id: number;
    content: string;
    createdAt: Date;
    updatedAt: Date;
    author: {
        username: string;
        nickname: string;
    };
};

export class CreateArticleRequest {
    @IsNotEmpty()
    @IsString()
    @MinLength(5)
    @MaxLength(280)
    content: string;
};

export type CreateArticleDto = {
    userid: number;
    content: string;
};

export class GetArticlesByUsernameRequest {
    @IsNotEmpty()
    @IsNumber()
    @Type(() => Number)
    page: number;
};

export class GetArticleByIdRequest {
    @IsNotEmpty()
    @IsNumber()
    @Type(() => Number)
    articleid: number;
};