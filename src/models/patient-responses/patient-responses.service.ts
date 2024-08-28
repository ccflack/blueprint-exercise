import { Injectable } from '@nestjs/common';
import { CreatePatientResponseDto } from './dto/create-patient-response.dto';
import { UpdatePatientResponseDto } from './dto/update-patient-response.dto';

@Injectable()
export class PatientResponsesService {
  create(createPatientResponseDto: CreatePatientResponseDto) {
    return 'This action adds a new response';
  }

  findAll() {
    return `This action returns all responses`;
  }

  findOne(id: number) {
    return `This action returns a #${id} response`;
  }

  update(id: number, updatePatientResponseDto: UpdatePatientResponseDto) {
    return `This action updates a #${id} response`;
  }

  remove(id: number) {
    return `This action removes a #${id} response`;
  }
}
