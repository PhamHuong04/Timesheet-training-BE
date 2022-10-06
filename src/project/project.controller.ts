import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { AuthGuard } from '@nestjs/passport';
import { AbilitiesGuard } from '../ability/abilities.guard';
import { CheckAbilities } from '../ability/abilities.decorator';
import { Action } from '../ability/ability.factory';
import { Project } from './entities/project.entities';
import { ObjectID } from 'typeorm';

@Controller('project')
@UseGuards(AuthGuard('jwt'), AbilitiesGuard)
@CheckAbilities({ action: Action.MANAGE_PROJECT, subject: Project })
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post('create-new-project')
  async create(@Body() body: CreateProjectDto) {
    return await this.projectService.create(body);
  }

  @Get('filter')
  async filter(@Query() query) {
    return this.projectService.filter(query);
  }

  @Get('all-projects')
  findAll() {
    return this.projectService.findAll();
  }

  @Get(':id')
  findByProjectId(@Param('id') id: ObjectID) {
    const result = this.projectService.findByProjectId(id);
    return result;
  }

  @Patch(':id')
  update(
    @Param('id') id: ObjectID,
    @Body() updateProjectDto: UpdateProjectDto,
  ) {
    return this.projectService.update(id, updateProjectDto);
  }

  @Delete(':id')
  remove(@Param('id') id: ObjectID) {
    return this.projectService.remove(id);
  }
}
