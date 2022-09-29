import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';

import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { ProjectModule } from './modules/project/project.module';
import { HttpExceptionFilter } from './common/filter/http-exception.filter';
import { RolesGuard } from './common/guards/roles.guard';

@Module({
  imports: [
    AuthModule,
    UserModule,
    MongooseModule.forRoot('mongodb://localhost:27017/timesheet-training'),
    ProjectModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
