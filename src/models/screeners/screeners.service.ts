import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Screener } from './entities/screener.entity';
import { Content } from './entities/content.entity';
import { Mapping } from './entities/mapping.entity';
import { Section } from './entities/section.entity';

@Injectable()
export class ScreenersService {
  constructor(
    @InjectRepository(Screener)
    private screenerRepository: Repository<Screener>,
    @InjectRepository(Content)
    private contentRepository: Repository<Content>,
    @InjectRepository(Mapping)
    private mappingRepository: Repository<Mapping>,
    @InjectRepository(Section)
    private sectionRepository: Repository<Section>,
  ) {}

  async findOne(id: number) {
    const screener = await this.screenerRepository.findOne({ where: { id } });

    return { screener };
  }
}
