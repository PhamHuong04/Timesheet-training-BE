import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectID, Repository } from 'typeorm';

import { CreateProjectDto } from './dto/create-project.dto';
import { Project } from './entities/project.entities';
import { UpdateProjectDto } from './dto/update-project.dto';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
  ) {}

  async create(body: CreateProjectDto): Promise<Project> {
    return await this.projectRepository.save(body);
  }

  async findAll() {
    const projects = await this.projectRepository.find();
    if (projects.length == 0) {
      throw new NotFoundException('not found project');
    }
    return { projects, count: projects.length };
  }

  async findByProjectId(id: ObjectID) {
    const project = await this.projectRepository.findOne({
      where: {
        id,
      },
    });
    if (!project) {
      throw new NotFoundException(`Project with ID: ${id} not found`);
    }
    return project;
  }

  async update(id: ObjectID, body: UpdateProjectDto) {
    const project = await this.projectRepository.findOne({
      where: {
        id,
      },
    });
    if (!project) {
      throw new NotFoundException(`Project with ID: ${id} not found`);
    }

    return await this.projectRepository.update(id, body);
  }

  remove(id: ObjectID) {
    return this.projectRepository.delete(id);
  }

  async filter(query) {
    const projects = await this.projectRepository.find(query);
    if (projects.length == 0) {
      throw new NotFoundException('not found project');
    }
    return { projects, count: projects.length };
  }
}
