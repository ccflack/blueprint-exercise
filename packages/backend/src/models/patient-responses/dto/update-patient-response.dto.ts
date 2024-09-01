import { PartialType } from '@nestjs/mapped-types';
import { CreatePatientResponseDto } from './create-patient-response.dto';

export class UpdatePatientResponseDto extends PartialType(
  CreatePatientResponseDto,
) {}
