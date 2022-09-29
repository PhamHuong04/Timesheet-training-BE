import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Controller('/auth')
export class UserController {
  constructor(private userSerivce: UserService) {}

  @Post('signup')
  async createUser(@Body() createUser: CreateUserDto) {
    const saltOrRounds = 10;
    createUser.password = await bcrypt.hash(createUser.password, saltOrRounds);
    return await this.userSerivce.createUser(createUser);
  }
}
