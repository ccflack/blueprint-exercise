import { Controller, Get, Param } from '@nestjs/common';
import { ScreenersService } from './screeners.service';

@Controller('screeners')
export class ScreenersController {
  constructor(private readonly screenersService: ScreenersService) {}

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.screenersService.findOne(id);
  }
}
