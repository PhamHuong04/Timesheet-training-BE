import { Document, now } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ProjectType } from 'src/common/enum/project-type.enum';
import { ProjectUsersDto } from '../dto/project-users.dto';
import { ProjectTaskDto } from '../dto/project-task.dto';
import { ProjectTargetUserDto } from '../dto/project-target-user.dto';

@Schema()
export class Project extends Document {
  @Prop()
  clientId: number;

  @Prop()
  name: string;

  @Prop()
  code: string;

  @Prop()
  dateAt: string;

  @Prop()
  dateEnd: string;

  @Prop()
  note: string;

  @Prop()
  type: ProjectType;

  @Prop()
  users: ProjectUsersDto[];

  @Prop()
  tasks: ProjectTaskDto[];

  @Prop()
  status: number;

  @Prop()
  komuChannelId: string;

  @Prop()
  isNotifyToKomu: boolean;

  @Prop()
  isAllUserBelongTo: boolean;

  @Prop()
  projectTargetUsers: ProjectTargetUserDto;

  @Prop({ default: now() })
  createdAt: Date;

  @Prop({ default: now() })
  updatedAt: Date;
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
