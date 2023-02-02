import { environment } from '@app/environment';
import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getHello() {
    return {
      ...environment,
      greetings: await this.appService.getHello(),
    };
  }
}
