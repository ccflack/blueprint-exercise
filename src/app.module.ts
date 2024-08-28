import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PostgresConfigModule } from './config/database/postgres/config.module';
import { ScreenersModule } from './models/screeners/screeners.module';
import { PatientResponsesModule } from './models/patient-responses/patient-responses.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ScreenersModule,
    PostgresConfigModule,
    PatientResponsesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
