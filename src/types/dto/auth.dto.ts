import { IsEmail, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class RegisterDto {
    @IsNotEmpty()
    @IsEmail()
    email!: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(5)
    @MaxLength(20)
    userid!: string;

    @IsOptional()
    @IsString()
    @MaxLength(20)
    nickname!: string;

    @IsNotEmpty()
    @IsString()
    password!: string;
}