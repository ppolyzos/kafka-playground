import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import * as ormconfig from './config/orm.config';

const MODULES = [
  ConfigModule.forRoot({
    isGlobal: true,
    envFilePath: '.env',
  }),
  TypeOrmModule.forRoot(ormconfig),
];

@Module({
  imports: [...MODULES],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
