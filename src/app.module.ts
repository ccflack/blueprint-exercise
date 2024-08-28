import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DbModule } from './db/db.module';
import { ScreenersModule } from './screeners/screeners.module';
import { PatientResponsesModule } from './patient-responses/patient-responses.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ScreenersModule,
    DbModule,
    PatientResponsesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
