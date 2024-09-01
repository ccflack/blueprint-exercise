import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Screener } from './entities/screener.entity';

@Injectable()
export class ScreenersService {
  constructor(
    @InjectRepository(Screener)
    private screenerRepository: Repository<Screener>,
  ) {}

  async findOne(id: number) {
    const screener = await this.screenerRepository.findOne({ where: { id } });
    console.log(screener);
    const questionBattery = screener.content.sections.map((section) => {
      return {
        section_id: section.id,
        section_text: section.title,
        answer_options: section.answers,
        questions: section.questions.map((question) => {
          return {
            question_id: question.question_id,
            question_text: question.title,
          };
        }),
      };
    });

    const frontEndData = {
      screener_id: screener.id,
      name: screener.name,
      full_name: screener.full_name,
      sections: questionBattery,
    };

    return { frontEndData };
  }
}
