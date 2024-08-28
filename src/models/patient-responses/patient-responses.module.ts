import { Module } from '@nestjs/common';
import { PatientResponsesService } from './patient-responses.service';
import { PatientResponsesController } from './patient-responses.controller';

@Module({
  controllers: [PatientResponsesController],
  providers: [PatientResponsesService],
})
export class PatientResponsesModule {}
