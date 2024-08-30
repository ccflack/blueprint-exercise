import { Controller, Post, Body } from '@nestjs/common';
import { PatientResponsesService } from './patient-responses.service';
import { CreatePatientResponseDto } from './dto/create-patient-response.dto';

@Controller('patient-responses')
export class PatientResponsesController {
  constructor(
    private readonly patientResponsesService: PatientResponsesService,
  ) {}

  @Post()
  async create(@Body() createPatientResponseDto: CreatePatientResponseDto) {
    console.log(
      'createPatientResponseDto in controller',
      createPatientResponseDto,
    );
    const createdPatientResponse = await this.patientResponsesService.create(
      createPatientResponseDto,
    );

    return createdPatientResponse.recommendations;
  }
}
