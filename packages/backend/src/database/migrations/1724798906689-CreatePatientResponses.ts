import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreatePatientResponses1724798906689 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE patient_responses (
              id SERIAL PRIMARY KEY,
              response JSONB[] ARRAY DEFAULT ARRAY[]::JSONB[],
              recommendations TEXT[] ARRAY DEFAULT ARRAY[]::TEXT[],
              screener_id INTEGER,
              FOREIGN KEY (screener_id) REFERENCES screeners(id)
            );
          `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DROP TABLE patient_responses;
          `);
  }
}
