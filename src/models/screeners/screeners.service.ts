import { Injectable } from '@nestjs/common';
import { CreateScreenerDto } from './dto/create-screener.dto';
import { UpdateScreenerDto } from './dto/update-screener.dto';

@Injectable()
export class ScreenersService {
  create(createScreenerDto: CreateScreenerDto) {
    return 'This action adds a new screener';
  }

  findAll() {
    return `This action returns all screeners`;
  }

  findOne(id: number) {
    return `This action returns a #${id} screener`;
  }

  update(id: number, updateScreenerDto: UpdateScreenerDto) {
    return `This action updates a #${id} screener`;
  }

  remove(id: number) {
    return `This action removes a #${id} screener`;
  }
}
