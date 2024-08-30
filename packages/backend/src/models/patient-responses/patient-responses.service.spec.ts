import { Test, TestingModule } from '@nestjs/testing';
import { PatientResponsesService } from './patient-responses.service';

describe('PatientResponsesService', () => {
  let service: PatientResponsesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PatientResponsesService,
        {
          provide: 'PatientResponseRepository',
          useValue: {},
        },
        {
          provide: 'MappingRepository',
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<PatientResponsesService>(PatientResponsesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
