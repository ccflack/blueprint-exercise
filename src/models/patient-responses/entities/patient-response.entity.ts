import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Screener } from '../../screeners/entities/screener.entity';

@Entity()
export class PatientResponse {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'jsonb', nullable: false })
  responses: { question_id: string; value: number }[];

  @Column()
  recommendations: string[];

  @ManyToOne(() => Screener, (screener) => screener.patientResponses)
  screener: Screener;
}
