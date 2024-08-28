import { Test, TestingModule } from '@nestjs/testing';
import { PatientResponsesController } from './patient-responses.controller';
import { PatientResponsesService } from './patient-responses.service';

describe('PatientResponsesController', () => {
  let controller: PatientResponsesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PatientResponsesController],
      providers: [PatientResponsesService],
    }).compile();

    controller = module.get<PatientResponsesController>(
      PatientResponsesController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});