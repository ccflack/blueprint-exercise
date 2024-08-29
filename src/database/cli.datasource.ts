import { DataSource, DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';

const options: DataSourceOptions & SeederOptions = {
  type: 'postgres',
  logging: true,
  host: process.env.POSTGRES_HOST,
  port: parseInt(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_NAME,
  synchronize: process.env.DB_SYNC === 'true',
  entities: ['src/models/**/*.entity.ts'],
  migrations: [__dirname + '/migrations/*{.ts,.js}'],
  seeds: ['src/database/seeds/**/*{.ts,.js}'],
};

export const cliDataSource = new DataSource(options);
