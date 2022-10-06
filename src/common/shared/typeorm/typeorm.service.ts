import { Injectable, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm';

@Injectable()
export class TypeOrmConfigSerivce implements TypeOrmOptionsFactory {
  @Inject(ConfigService)
  private readonly config: ConfigService;
  public createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'mongodb',
      host: this.config.get<string>('MONGODB_HOST', 'localhost'),
      port: this.config.get<number>('MONGODB_PORT'),
      database: this.config.get<string>('MONGODB_DATABASE'),
      autoLoadEntities: true,
      synchronize: true,
    };
  }
}
