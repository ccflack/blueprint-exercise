import { Test, TestingModule } from '@nestjs/testing';
import { ScreenersController } from './screeners.controller';
import { ScreenersService } from './screeners.service';

describe('ScreenersController', () => {
  let controller: ScreenersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ScreenersController],
      providers: [ScreenersService],
    }).compile();

    controller = module.get<ScreenersController>(ScreenersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
