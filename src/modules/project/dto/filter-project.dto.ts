import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Status } from 'src/common/enum/active-project.enum';
import { ProjectType } from 'src/common/enum/project-type.enum';

export class FilterProjectDTO {
  @IsNumber()
  @IsNotEmpty()
  status: Status;

  @IsString()
  @IsNotEmpty()
  clientId: number;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  type: ProjectType;
}
