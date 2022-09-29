import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';

import { Roles } from 'src/common/decorator/roles.decorator';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ProjectService } from './project.service';

@UseGuards(RolesGuard)
@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post('create')
  @Roles('admin')
  createProject(@Body() createProjectDto: CreateProjectDto) {
    return this.projectService.createProject(createProjectDto);
  }

  @Patch('edit/:id')
  updateProject(@Body() updateProjectDto: UpdateProjectDto, @Param('id') id) {
    return this.projectService.updateProject(id, updateProjectDto);
  }

  @Get(':id')
  viewProject(@Param('id') id) {
    return this.projectService.viewProject(id);
  }

  @Get()
  listProject() {
    return this.projectService.getListProject();
  }

  @Delete('remove/:id')
  deleteProject(@Param('id') id) {
    return this.projectService.deleteProject(id);
  }
}
