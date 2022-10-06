import {
  IsString,
  IsNotEmpty,
  IsArray,
  IsDateString,
  IsNumber,
} from 'class-validator';

import { Status } from 'src/common/emun/active-project.enum';
import { ProjectType } from 'src/common/emun/project-type.enum';
import { ProjectTargetUserDto } from './project-target-user.dto';
import { ProjectTaskDto } from './project-task.dto';
import { ProjectUsersDto } from './project-users.dto';

export class CreateProjectDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  clientId: number;

  @IsString()
  @IsNotEmpty()
  code: string;

  @IsDateString()
  @IsNotEmpty()
  dateAt: string;

  @IsDateString()
  @IsNotEmpty()
  dateEnd: string;

  note: string;

  komuChannelId: string;

  isNotifyToKomu: boolean;

  isAllUserBelongTo: boolean;

  @IsNumber()
  @IsNotEmpty()
  type: ProjectType;

  @IsArray()
  @IsNotEmpty()
  users: ProjectUsersDto[];

  @IsArray()
  @IsNotEmpty()
  tasks: ProjectTaskDto[];

  @IsNumber()
  @IsNotEmpty()
  status: Status;

  projectTargetUsers: ProjectTargetUserDto;
}
