import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('news')
  getNews(@Query('filter') filter?: string) {
    return this.appService.getNews(filter);
  }

  @Get('popular')
  getPopulars() {
    return this.appService.getPopulars();
  }
}
