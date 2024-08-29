import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateContents1724809472483 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
          CREATE TABLE contents (
            id SERIAL PRIMARY KEY,
            display_name VARCHAR(255) NOT NULL,
            screener_id INTEGER,
            FOREIGN KEY (screener_id) REFERENCES screeners(id)
          );
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
          DROP TABLE contents;
        `);
  }
}
