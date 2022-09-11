// import { HttpService } from '@nestjs/axios';
import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  
  @Get("auth")
  async create(@Query('code') code:string){
    let token = await this.appService.getToken(code);
    let res = await this.appService.create(token);
    console.log("Finished")
  }

  

  @Get("hello")
  getHello(): string {
    return this.appService.getHello();
  }
}
