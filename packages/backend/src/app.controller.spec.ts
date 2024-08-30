import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    describe('processPatientResponse', () => {
      it('should process the patient response', () => {
        const patientResponse = {
          answers: [
            {
              value: 1,
              question_id: 'question_a',
            },
            {
              value: 0,
              question_id: 'question_b',
            },
            {
              value: 2,
              question_id: 'question_c',
            },
            {
              value: 3,
              question_id: 'question_d',
            },
            {
              value: 1,
              question_id: 'question_e',
            },
            {
              value: 0,
              question_id: 'question_f',
            },
            {
              value: 1,
              question_id: 'question_g',
            },
            {
              value: 0,
              question_id: 'question_h',
            },
          ],
        };
        const result = appController.processPatientResponse(patientResponse);

        expect(result).toEqual(['ASRM', 'PHQ-9']);
      });
    });
  });
});
