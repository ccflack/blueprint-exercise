import { Module } from '@nestjs/common';
import { PostgresConfigProviders } from './config.providers';

@Module({
  providers: [...PostgresConfigProviders],
  exports: [...PostgresConfigProviders],
})
export class PostgresConfigModule {}
