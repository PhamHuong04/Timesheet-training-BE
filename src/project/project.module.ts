import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { AbilityModule } from '../ability/ability.module';
import { Project } from './entities/project.entities';

@Module({
  imports: [TypeOrmModule.forFeature([Project]), AbilityModule],
  controllers: [ProjectController],
  providers: [ProjectService],
  exports: [ProjectService],
})
export class ProjectModule {}
