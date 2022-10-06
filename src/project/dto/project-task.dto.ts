import { IsBoolean, IsNotEmpty, IsNumber } from 'class-validator';

export class ProjectTaskDto {
  @IsBoolean()
  @IsNotEmpty()
  billable: boolean;

  @IsNumber()
  @IsNotEmpty()
  taskId: number;
}
