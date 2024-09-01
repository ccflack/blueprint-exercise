import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  processPatientResponse(patientResponse: any): string[] {
    const scoringCategories = [
      {
        question_id: 'question_a',
        domain: 'depression',
      },
      {
        question_id: 'question_b',
        domain: 'depression',
      },
      {
        question_id: 'question_c',
        domain: 'mania',
      },
      {
        question_id: 'question_d',
        domain: 'mania',
      },
      {
        question_id: 'question_e',
        domain: 'anxiety',
      },
      {
        question_id: 'question_f',
        domain: 'anxiety',
      },
      {
        question_id: 'question_g',
        domain: 'anxiety',
      },
      {
        question_id: 'question_h',
        domain: 'substance_use',
      },
    ];

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

    const patientScores = {
      depression: 0,
      mania: 0,
      anxiety: 0,
      substance_use: 0,
    };

    // Calculate patient scores
    scoringCategories.forEach((category) => {
      const questionResponse = patientResponse.answers.find(
        (answer) => answer.question_id === category.question_id,
      );
      if (questionResponse) {
        patientScores[category.domain] += questionResponse.value;
      }
    });

    // Determine secondary assessments
    const secondaryAssessmentsArray = [];

    secondaryAssessments.forEach((assessment) => {
      if (patientScores[assessment.domain] >= assessment.threshold) {
        secondaryAssessmentsArray.push(assessment.assessment);
      }
    });

    return secondaryAssessmentsArray;
  }
}
