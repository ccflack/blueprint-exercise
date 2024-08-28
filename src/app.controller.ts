import { Controller, Body, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  processPatientResponse(@Body() patientResponse: any): any {
    return this.appService.processPatientResponse(patientResponse);
  }
}
