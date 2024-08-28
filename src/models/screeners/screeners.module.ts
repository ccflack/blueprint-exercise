import { Module } from '@nestjs/common';
import { ScreenersService } from './screeners.service';
import { ScreenersController } from './screeners.controller';

@Module({
  controllers: [ScreenersController],
  providers: [ScreenersService],
})
export class ScreenersModule {}
