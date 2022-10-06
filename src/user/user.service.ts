import {
  Inject,
  Injectable,
  HttpStatus,
  HttpException,
  NotFoundException,
} from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { ObjectID, Repository } from 'typeorm';
import mongodb from 'mongodb';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthHelper } from './auth.helper';
import { Logger } from '@nestjs/common';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @Inject(AuthHelper)
    private readonly helper: AuthHelper,
  ) {}

  private logger = new Logger('UserService');

  async getUserById(id): Promise<User> {
    const user = await this.userRepository.findOne(id);
    if (!user) {
      throw new NotFoundException(`User with ID: ${id} not found`);
    }
    return user;
  }

  async getUserByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new NotFoundException(`User with ID: ${email} not found`);
    }
    return user;
  }

  async findOne(email: string): Promise<User | undefined> {
    return this.userRepository.findOne({
      where: {
        email,
      },
    });
  }

  async getUsers(): Promise<User[]> {
    return this.userRepository.find();
  }

  async createUser(
    body: CreateUserDto,
    creator_id: string,
  ): Promise<User | never> {
    const user: User = await this.userRepository.findOne({
      where: { email: body.email },
    });
    if (user) {
      throw new HttpException(
        'This user already exists in the system',
        HttpStatus.CONFLICT,
      );
    }
    this.logger.verbose(
      `New user in system with email is: ${body.email.toLowerCase()}`,
    );
    body.password = this.helper.encodePassword(body.password);
    return this.userRepository.save({
      ...body,
      creator_id,
    });
  }
  async createUserWithoutCreator(body: CreateUserDto): Promise<User | never> {
    const user: User = await this.userRepository.findOne({
      where: { email: body.email },
    });
    if (user) {
      throw new HttpException(
        'This user already exists in the system',
        HttpStatus.CONFLICT,
      );
    }
    this.logger.verbose(
      `New user in system with email is: ${body.email.toLowerCase()}`,
    );
    body.password = this.helper.encodePassword(body.password);
    return this.userRepository.save({
      ...body,
    });
  }

  async updateUser(userId, userUpdates: UpdateUserDto): Promise<User> {
    await this.userRepository.update({ id: userId }, userUpdates);
    return await this.userRepository.findOne({
      where: {
        id: userId,
      },
    });
  }

  deleteUser(userId) {
    return this.userRepository.delete(userId);
  }
}
