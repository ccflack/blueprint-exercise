import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Screener } from './entities/screener.entity';
import { Mapping } from './entities/mapping.entity';
import { Content } from './entities/content.entity';
import { Section } from './entities/section.entity';
import { ScreenersService } from './screeners.service';
import { ScreenersController } from './screeners.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Screener, Mapping, Content, Section])],
  providers: [ScreenersService],
  controllers: [ScreenersController],
})
export class ScreenersModule {}
