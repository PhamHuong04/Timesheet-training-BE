import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProjectDto } from './dto/create-project.dto';
import { Project } from './entities/project.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
  ) {}

  async create(body: CreateProjectDto, creator_id: string): Promise<Project> {
    const project = new Project();
    project.name = body.name;
    project.creator_id = creator_id;
    return await this.projectRepository.save(project);
  }

  findAll() {
    return this.projectRepository.find({
      relations: ['customer', 'tasks'],
    });
  }

  async findByProjectId(id: string) {
    const project = await this.projectRepository.findOne({
      where: {
        id,
      },
      relations: ['customer', 'tasks'],
    });
    if (!project) {
      throw new NotFoundException(`Project with ID: ${id} not found`);
    }
    return project;
  }

  async update(id: string, body: any) {
    await this.projectRepository.update(id, body);
    return this.projectRepository.findOne({
      where: {
        id,
      },
    });
  }

  remove(id: string) {
    return this.projectRepository.delete(id);
  }
}
