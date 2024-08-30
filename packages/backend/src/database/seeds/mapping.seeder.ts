import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';
import { Mapping } from '../../models/screeners/entities/mapping.entity';
import { Screener } from '../../models/screeners/entities/screener.entity';

export default class MappingSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<void> {
    console.log('************************');
    console.log('**   Mapping Seeder   **');
    console.log('************************');

    const repository = dataSource.getRepository(Mapping);

    console.log('Truncating mappings table...');
    await repository.query('TRUNCATE TABLE mappings RESTART IDENTITY CASCADE');

    console.log('Finding BPDS screener...');
    const ScreenerRepository = dataSource.getRepository(Screener);
    const BPDS = await ScreenerRepository.findOne({
      where: { name: 'BPDS' },
    });

    console.log('BPDS screener:', BPDS.id);

    console.log('Inserting mappings...');

    const BPDSMapping = await repository.insert({
      screener: BPDS,
      question_domains: [
        {
          question_id: 'question_a',
          domain: 'depression',
        },
        {
          question_id: 'question_b',
          domain: 'depression',
        },
        {
          question_id: 'question_c',
          domain: 'mania',
        },
        {
          question_id: 'question_d',
          domain: 'mania',
        },
        {
          question_id: 'question_e',
          domain: 'anxiety',
        },
        {
          question_id: 'question_f',
          domain: 'anxiety',
        },
        {
          question_id: 'question_g',
          domain: 'anxiety',
        },
        {
          question_id: 'question_h',
          domain: 'substance_use',
        },
      ],
    });

    console.log('BPDS mapping saved with id:', BPDSMapping.identifiers[0].id);
  }
}
