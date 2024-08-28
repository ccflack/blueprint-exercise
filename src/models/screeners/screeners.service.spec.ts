import { Test, TestingModule } from '@nestjs/testing';
import { ScreenersService } from './screeners.service';

describe('ScreenersService', () => {
  let service: ScreenersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ScreenersService],
    }).compile();

    service = module.get<ScreenersService>(ScreenersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
