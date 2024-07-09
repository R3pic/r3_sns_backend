import { IsDefined, IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class User {
  email!: string;
  nickname?: string;
  userid!: string;
  password!: string;
}

export class GetUserbyIdParamsDto {
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

  @IsDefined()
  @IsString()
  @MinLength(5)
  @MaxLength(20)
  nickname: string;
}