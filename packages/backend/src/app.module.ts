import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { DatabaseModule } from './config/database/postgres/database.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ScreenersModule } from './models/screeners/screeners.module';
import { PatientResponsesModule } from './models/patient-responses/patient-responses.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    ScreenersModule,
    PatientResponsesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
