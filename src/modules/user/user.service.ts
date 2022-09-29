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

  async createUser(createUserDto: CreateUserDto) {
    return await this.userModel.create(createUserDto);
  }

  // async createUser(): Promise<User> {
  //   return this.userModel.create({
  //     username,
  //     password,
  //   });
  // }

  async getUser(query: object): Promise<User> {
    return this.userModel.findOne(query);
  }
}
