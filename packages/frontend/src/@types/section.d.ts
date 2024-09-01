import { IAnswer } from './answeOption';
import { IQuestion } from './question';

export interface ISection {
  section_id: number;
  section_text: string;
  questions: IQuestion[];
  answer_options: IAnswerOption[];
}
