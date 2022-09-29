import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Project } from './model/project.model';

@Injectable()
export class ProjectService {
  constructor(
    @InjectModel(Project.name) private readonly projectModel: Model<Project>,
  ) {}

  async createProject(createProjectDto: CreateProjectDto) {
    return await this.projectModel.create(createProjectDto);
  }

  async updateProject(id: string, updateProjectDto: UpdateProjectDto) {
    const project = await this.projectModel.findByIdAndUpdate(
      id,
      updateProjectDto,
      {
        new: true,
      },
    );

    if (!project) {
      throw new NotFoundException('not found project');
    }
    return project;
  }

  async viewProject(id: string) {
    const project = await this.projectModel.findById(id);
    if (!project) {
      throw new NotFoundException('not found project');
    }
    return project;
  }

  async getListProject() {
    const projects = await this.projectModel.find();
    if (!projects) {
      throw new NotFoundException('projects is null');
    }
    return { projects, count: projects.length };
  }

  async deleteProject(id: string) {
    const project = await this.projectModel.findByIdAndDelete(id);
    if (!project) {
      throw new NotFoundException('not found project');
    }
    return project;
  }

  // async filter() {}
}
