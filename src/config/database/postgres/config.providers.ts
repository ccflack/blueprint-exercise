import { DataSource } from 'typeorm';

export const PostgresConfigProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'postgres',
        host: process.env.PG_HOST,
        port: parseInt(process.env.PG_PORT),
        username: process.env.PG_USER,
        password: process.env.PG_PASSWORD,
        database: process.env.PG_DB,
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        migrations: [__dirname + '/migrations/*{.ts,.js}'],
        synchronize: true, // do not set it true in production application
      });

      return dataSource
        .initialize()
        .then(() => {
          console.log('Data Source has been initialized!');
        })
        .catch((err) => {
          console.error('Error during Data Source initialization', err);
        });
    },
  },
];
export default PostgresConfigProviders;
