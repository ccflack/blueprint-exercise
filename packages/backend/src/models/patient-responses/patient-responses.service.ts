import { Injectable } from '@nestjs/common';
import { CreatePatientResponseDto } from './dto/create-patient-response.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PatientResponse } from './entities/patient-response.entity';
import { Mapping } from '../screeners/entities/mapping.entity';

@Injectable()
export class PatientResponsesService {
  constructor(
    @InjectRepository(PatientResponse)
    private patientResponseRepository: Repository<PatientResponse>,
    @InjectRepository(Mapping)
    private mappingRepository: Repository<Mapping>,
  ) {}

  async create(createPatientResponseDto: CreatePatientResponseDto) {
    const patientResponseData = await this.patientResponseRepository.create(
      createPatientResponseDto,
    );

    patientResponseData.answers = createPatientResponseDto.answers;
    patientResponseData.recommendations = await this.getRecommendations(
      createPatientResponseDto,
    );

    return await this.patientResponseRepository.save(patientResponseData);
  }

  async getRecommendations(response: CreatePatientResponseDto) {
    const patientScores = {
      depression: 0,
      mania: 0,
      anxiety: 0,
      substance_use: 0,
    };

    const secondaryAssessments = [
      {
        domain: 'depression',
        threshold: 2,
        assessment: 'PHQ-9',
      },
      {
        domain: 'mania',
        threshold: 2,
        assessment: 'ASRM',
      },
      {
        domain: 'anxiety',
        threshold: 2,
        assessment: 'PHQ-9',
      },
      {
        domain: 'substance_use',
        threshold: 1,
        assessment: 'ASSIST',
      },
    ];

    const mapping = await this.mappingRepository.findOne({
      where: { id: +response.screener_id },
    });

    const scoringCategories = mapping.question_domains;

    scoringCategories.forEach((category) => {
      const questionResponse = response.answers.find(
        (answer) => answer.question_id === category.question_id,
      );
      if (questionResponse) {
        patientScores[category.domain] += questionResponse.value;
      }
    });

    const recommendations = [];

    secondaryAssessments.forEach((assessment) => {
      if (patientScores[assessment.domain] >= assessment.threshold) {
        recommendations.push({ assessment: assessment.assessment });
      }
    });

    return recommendations;
  }
}
