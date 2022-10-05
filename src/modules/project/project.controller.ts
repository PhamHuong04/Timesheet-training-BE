import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';

import { Roles } from 'src/common/decorator/roles.decorator';
import { Role } from 'src/common/enum/role.enum';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ProjectService } from './project.service';

@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Roles(Role.Admin)
  @Post('create-new-project')
  createProject(@Body() createProjectDto: CreateProjectDto) {
    return this.projectService.createProject(createProjectDto);
  }

  @Patch('edit-project/:id')
  updateProject(@Body() updateProjectDto: UpdateProjectDto, @Param('id') id) {
    return this.projectService.updateProject(id, updateProjectDto);
  }

  @Get('view-project/:id')
  viewProject(@Param('id') id) {
    return this.projectService.viewProject(id);
  }

  @Get('list-project')
  listProject() {
    return this.projectService.getListProject();
  }

  @Delete('remove-project/:id')
  deleteProject(@Param('id') id) {
    return this.projectService.deleteProject(id);
  }

  @Get('filter')
  async filter(@Query() query) {
    return this.projectService.filter(query);
  }
}
