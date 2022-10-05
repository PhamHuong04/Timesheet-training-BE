import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { User } from './model/user.model';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
  ) {}

  async validateUser(username: string) {
    const user = await this.getUser({ username });
    if (user) {
      return false;
    }

    return true;
  }

  async createUser(createUserDto: CreateUserDto) {
    const checkUser = await this.validateUser(createUserDto.username);
    if (!checkUser) {
      return {
        message: 'user is exit',
      };
    }
    return await this.userModel.create(createUserDto);
  }

  async getUser(query: object): Promise<User> {
    return this.userModel.findOne(query);
  }
}
