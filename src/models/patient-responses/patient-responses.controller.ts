import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PatientResponsesService } from './patient-responses.service';
import { CreatePatientResponseDto } from './dto/create-patient-response.dto';
import { UpdatePatientResponseDto } from './dto/update-patient-response.dto';

@Controller('patient-responses')
export class PatientResponsesController {
  constructor(
    private readonly patientResponsesService: PatientResponsesService,
  ) {}

  @Post()
  create(@Body() createResponseDto: CreatePatientResponseDto) {
    return this.patientResponsesService.create(createResponseDto);
  }

  @Get()
  findAll() {
    return this.patientResponsesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.patientResponsesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateResponseDto: UpdatePatientResponseDto,
  ) {
    return this.patientResponsesService.update(+id, updateResponseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.patientResponsesService.remove(+id);
  }
}
