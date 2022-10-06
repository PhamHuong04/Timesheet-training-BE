import { Entity, Column, ObjectID, ObjectIdColumn } from 'typeorm';

import { ProjectType } from 'src/common/emun/project-type.enum';
import { ProjectTargetUserDto } from '../dto/project-target-user.dto';
import { ProjectTaskDto } from '../dto/project-task.dto';
import { ProjectUsersDto } from '../dto/project-users.dto';

@Entity()
export class Project {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  clientId: number;

  @Column()
  name: string;

  @Column()
  code: string;

  @Column()
  dateAt: string;

  @Column()
  dateEnd: string;

  @Column()
  note: string;

  @Column()
  type: ProjectType;

  @Column()
  users: ProjectUsersDto[];

  @Column()
  tasks: ProjectTaskDto[];

  @Column()
  status: number;

  @Column()
  komuChannelId: string;

  @Column()
  isNotifyToKomu: boolean;

  @Column()
  isAllUserBelongTo: boolean;

  @Column()
  projectTargetUsers: ProjectTargetUserDto;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;
}
