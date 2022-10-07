import { Entity, Column, ObjectID, ObjectIdColumn } from 'typeorm';

import { ProjectType } from 'src/common/emun/project-type.enum';
import { ProjectTargetUserDto } from '../dto/project-target-user.dto';
import { ProjectTaskDto } from '../dto/project-task.dto';
import { ProjectUsersDto } from '../dto/project-users.dto';

@Entity()
export class Project {
  @ObjectIdColumn()
  id: ObjectID;

  @Column({ nullable: false })
  clientId: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  code: string;

  @Column({ nullable: false })
  dateAt: string;

  @Column({ nullable: false })
  dateEnd: string;

  @Column()
  note: string;

  @Column({ nullable: false })
  type: ProjectType;

  @Column({ nullable: false })
  users: ProjectUsersDto[];

  @Column({ nullable: false })
  tasks: ProjectTaskDto[];

  @Column({ nullable: false })
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
