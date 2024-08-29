import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateScreeners1724786204668 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
          CREATE TABLE screeners (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            full_name VARCHAR(255) NOT NULL,
            disorder VARCHAR(255) NOT NULL,
            description TEXT,
            content_id INTEGER,
            mapping_id INTEGER,
            FOREIGN KEY (content_id) REFERENCES contents(id),
            FOREIGN KEY (mapping_id) REFERENCES mappings(id)
          );
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
          DROP TABLE screeners;
        `);
  }
}
