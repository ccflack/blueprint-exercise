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
    const questionBattery = screener.content.sections.map(section => {
      return {
        section_id: section.id,
        section_text: section.title,
        answer_options: section.answers,
        questions: section.questions.map(question => {
          return {
            question_id: question.question_id,
            question_text: question.title,
          }
        })
      }
    });

    const frontEndData = {
      screener_id: screener.id,
      name: screener.name,
      full_name: screener.full_name,
      sections: questionBattery
    }

    return { frontEndData };
  }
}
