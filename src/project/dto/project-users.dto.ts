import { IsNotEmpty, IsNumber } from 'class-validator';
import { UserType } from 'src/common/emun/user-type.enum';

export class ProjectUsersDto {
  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @IsNumber()
  @IsNotEmpty()
  type: UserType;
}
