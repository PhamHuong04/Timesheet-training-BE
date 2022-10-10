import { CheckAbilities } from './../ability/abilities.decorator';
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
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { Action } from '../ability/ability.factory';
import { AuthGuard } from '@nestjs/passport';
import { AbilitiesGuard } from '../ability/abilities.guard';
import { User as UserEntity } from './entities/user.entity';
import { ObjectID } from 'typeorm';

@Controller('user')
@UseGuards(AuthGuard('jwt'), AbilitiesGuard)
@CheckAbilities({ action: Action.MANAGE_USER, subject: UserEntity })
export class UserController {
  constructor(private readonly usersService: UserService) {}

  @Get('get-all-users')
  async getAllUsers() {
    return this.usersService.getUsers();
  }

  @Get(':id')
  async getUser(@Param('id') id: ObjectID): Promise<UserEntity> {
    return this.usersService.getUserById(id);
  }

  @Post('create-new-user')
  async createUser(@Body() body: CreateUserDto): Promise<UserEntity> {
    return this.usersService.createUserWithoutCreator(body);
  }

  @Patch(':userId')
  async updateUser(
    @Param('userId') userId: ObjectID,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.updateUser(userId, updateUserDto);
  }

  @Delete(':userId')
  async deleteUser(@Param('userId') userId: string) {
    return this.usersService.deleteUser(userId);
  }
}
