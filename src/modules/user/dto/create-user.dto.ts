import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @Length(0, 64)
  username: string;

  @IsString()
  @IsNotEmpty()
  @Length(0, 32)
  password: string;
}
