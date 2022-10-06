import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProjectModule } from './project/project.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { configEnvPath } from './common/helper/env.helper';
import { TypeOrmConfigSerivce } from './common/shared/typeorm/typeorm.service';

@Module({
  imports: [
    ConfigModule.forRoot(configEnvPath),
    TypeOrmModule.forRootAsync({ useClass: TypeOrmConfigSerivce }),
    ProjectModule,
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
