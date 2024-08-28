import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateScreeners1724786204668 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
          CREATE TABLE screeners (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL
            fullname VARCHAR(255) NOT NULL,
            disorder VARCHAR(255) NOT NULL,
            description TEXT,
          );
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
          DROP TABLE screeners;
        `);
  }
}
