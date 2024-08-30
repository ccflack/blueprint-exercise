import { DataSource } from 'typeorm';
import { runSeeder, Seeder } from 'typeorm-extension';
import ScreenerSeeder from './screener.seeder';
import MappingSeeder from './mapping.seeder';

export class MainSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<void> {
    console.log('************************');
    console.log('**   Main Seed File   **');
    console.log('************************');
    console.log('Launching entity seeds...');

    await runSeeder(dataSource, ScreenerSeeder);
    await runSeeder(dataSource, MappingSeeder);

    console.log('************************');
    console.log('*Database Seed Complete*');
    console.log('************************');
  }
}
