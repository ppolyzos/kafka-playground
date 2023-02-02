import { environment } from '@app/environment';
import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello() {
    return {
      ...environment,
      greetings: this.appService.getHello(),
    };
  }
}
