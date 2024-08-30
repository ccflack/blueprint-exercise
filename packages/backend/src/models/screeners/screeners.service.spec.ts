import { Test, TestingModule } from '@nestjs/testing';
import { ScreenersService } from './screeners.service';

describe('ScreenersService', () => {
  let service: ScreenersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ScreenersService,
        {
          provide: 'ScreenerRepository',
          useValue: {
            findOne: jest.fn().mockReturnValue({ id: 1, name: 'Screener 1' }),
          },
        },
        {
          provide: 'ContentRepository',
          useValue: {},
        },
        {
          provide: 'MappingRepository',
          useValue: {},
        },
        {
          provide: 'SectionRepository',
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<ScreenersService>(ScreenersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findOne', () => {
    it('should return a screener', async () => {
      const screener = await service.findOne(1);

      expect(screener).toBeDefined();
    });

    it('should call the repository finder', async () => {
      const findOneSpy = jest.spyOn(service['screenerRepository'], 'findOne');

      await service.findOne(1);

      expect(findOneSpy).toHaveBeenCalledWith({ where: { id: 1 } });
    });
  });
});
