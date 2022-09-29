import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ProjectTargetUserDto {
  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @IsString()
  @IsNotEmpty()
  roleName: string;
}
