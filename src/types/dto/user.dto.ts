import { IsEmail, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class User {
  id!: number;
  email!: string;
  nickname?: string;
  userid!: string;
  password!: string;
}

export class GetUserParamsDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(20)
  userid!: string;
}

export class CreateUserDto {
  @IsNotEmpty()
  @IsEmail()
  email!: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(20)
  userid!: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(20)
  password!: string;

  @IsOptional()
  @IsString()
  @MinLength(5)
  @MaxLength(20)
  nickname?: string;
}