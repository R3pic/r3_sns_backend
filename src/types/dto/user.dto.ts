import { IsDefined, IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export type UserProfileDto = {
  username: string;
  nickname: string;
  introduce: string;
}

export class GetUserbyIdParamsDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(20)
  userid!: string;
}