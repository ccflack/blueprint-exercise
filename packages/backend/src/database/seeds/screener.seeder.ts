import { Seeder } from 'typeorm-extension';
import { Screener } from '../../models/screeners/entities/screener.entity';
import { DataSource } from 'typeorm';

export default class ScreenerSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<void> {
    console.log('************************');
    console.log('**  Screener  Seeder  **');
    console.log('************************');

    const repository = dataSource.getRepository(Screener);

    console.log('Truncating screeners table...');
    await repository.query('TRUNCATE TABLE screeners RESTART IDENTITY CASCADE');

    console.log('Create screener...');
    const BPDS = await repository.create({
      name: 'BPDS',
      full_name: 'Blueprint Diagnostic Screener',
      disorder: 'Cross-Cutting',
      content: {
        display_name: 'BDS',
        sections: [
          {
            type: 'standard',
            title:
              'During the past TWO (2) WEEKS, how much (or how often) have you been bothered by the following problems?',
            answers: [
              {
                title: 'Not at all',
                value: 0,
              },
              {
                title: 'Rare, less than a day or two',
                value: 1,
              },
              {
                title: 'Several days',
                value: 2,
              },
              {
                title: 'More than half the days',
                value: 3,
              },
              {
                title: 'Nearly every day',
                value: 4,
              },
            ],
            questions: [
              {
                question_id: 'question_a',
                title: 'Little interest or pleasure in doing things?',
              },
              {
                question_id: 'question_b',
                title: 'Feeling down, depressed, or hopeless?',
              },
              {
                question_id: 'question_c',
                title:
                  'Sleeping less than usual, but still have a lot of energy?',
              },
              {
                question_id: 'question_d',
                title:
                  'Starting lots more projects than usual or doing more risky things than usual?',
              },
              {
                question_id: 'question_e',
                title:
                  'Feeling nervous, anxious, frightened, worried, or on edge?',
              },
              {
                question_id: 'question_f',
                title: 'Feeling panic or being frightened?',
              },
              {
                question_id: 'question_g',
                title: 'Avoiding situations that make you feel anxious?',
              },
              {
                question_id: 'question_h',
                title:
                  'Drinking at least 4 drinks of any kind of alcohol in a single day?',
              },
            ],
          },
        ],
      },
    });

    console.log('Saving screener...');
    const screener = await repository.save(BPDS);
    console.log('Screener saved as:', screener);
  }
}
