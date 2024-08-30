import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PatientResponse } from './entities/patient-response.entity';
import { PatientResponsesService } from './patient-responses.service';
import { PatientResponsesController } from './patient-responses.controller';
import { Mapping } from '../screeners/entities/mapping.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PatientResponse, Mapping])],
  providers: [PatientResponsesService],
  controllers: [PatientResponsesController],
})
export class PatientResponsesModule {}
