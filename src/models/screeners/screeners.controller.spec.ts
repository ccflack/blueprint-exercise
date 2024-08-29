import { Test, TestingModule } from '@nestjs/testing';
import { ScreenersController } from './screeners.controller';
import { ScreenersService } from './screeners.service';
import { Screener } from './entities/screener.entity';

describe('ScreenersController', () => {
  let controller: ScreenersController;
  let service: ScreenersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ScreenersController],
      providers: [
        ScreenersService,
        {
          provide: 'ScreenerRepository',
          useValue: {
            findOne: jest
              .fn()
              .mockReturnValue(<Screener>{ id: 1, name: 'Screener 1' }),
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

    controller = module.get<ScreenersController>(ScreenersController);
    service = module.get<ScreenersService>(ScreenersService);
  });

  describe('findOne', () => {
    it('should call the appropriate service function', async () => {
      const findOneSpy = jest.spyOn(service, 'findOne');

      await controller.findOne(1);

      expect(findOneSpy).toHaveBeenCalledWith(1);
    });
  });
});
