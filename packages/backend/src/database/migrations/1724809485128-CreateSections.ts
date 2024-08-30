import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateSections1724809485128 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
          CREATE TABLE sections (
            id SERIAL PRIMARY KEY,
            type VARCHAR(255) NOT NULL,
            title VARCHAR(255) NOT NULL,
            answers JSONB[] ARRAY DEFAULT ARRAY[]::JSONB[],
            questions JSONB[] ARRAY DEFAULT ARRAY[]::JSONB[],
            content_id INTEGER,
            FOREIGN KEY (content_id) REFERENCES contents
          );
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
          DROP TABLE sections;
        `);
  }
}
