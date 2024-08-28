import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ScreenersService } from './screeners.service';
import { CreateScreenerDto } from './dto/create-screener.dto';
import { UpdateScreenerDto } from './dto/update-screener.dto';

@Controller('screeners')
export class ScreenersController {
  constructor(private readonly screenersService: ScreenersService) {}

  @Post()
  create(@Body() createScreenerDto: CreateScreenerDto) {
    return this.screenersService.create(createScreenerDto);
  }

  @Get()
  findAll() {
    return this.screenersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.screenersService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateScreenerDto: UpdateScreenerDto,
  ) {
    return this.screenersService.update(+id, updateScreenerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.screenersService.remove(+id);
  }
}
