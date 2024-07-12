import { IsDefined, IsEmail, IsNotEmpty, IsOptional, IsString, MaxLength, Min, MinLength } from 'class-validator';

export class RegisterDto {
    @IsNotEmpty()
    @IsEmail()
    email!: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(5)
    @MaxLength(20)
    username!: string;

    @IsDefined()
    @IsString()
    @MaxLength(20)
    nickname!: string;

    @IsNotEmpty()
    @IsString()
    password!: string;
}

export class LoginDto {
    @IsNotEmpty()
    @IsString()
    @MinLength(5)
    @MaxLength(20)
    username!: string;

    @IsNotEmpty()
    @IsString()
    password!: string;
}