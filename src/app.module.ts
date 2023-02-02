import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';

const MODULES = [
  ConfigModule.forRoot({
    isGlobal: true,
    envFilePath: '.env',
  }),
];

@Module({
  imports: [...MODULES],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
