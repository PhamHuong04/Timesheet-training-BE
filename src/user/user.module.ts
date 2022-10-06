import { Module, forwardRef } from '@nestjs/common';
import { User } from './entities/user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AbilityModule } from '../ability/ability.module';
import { ProjectModule } from '../project/project.module';
import { AuthHelper } from './auth.helper';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    AbilityModule,
    forwardRef(() => ProjectModule),
  ],
  controllers: [UserController],
  providers: [UserService, AuthHelper, JwtService],
  exports: [UserService],
})
export class UserModule {}
