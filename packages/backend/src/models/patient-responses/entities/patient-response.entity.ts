import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Screener } from '../../screeners/entities/screener.entity';

@Entity('patient_responses')
export class PatientResponse {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'jsonb', nullable: false })
  answers: [{ question_id: string; value: number }];

  @Column({ type: 'varchar', array: true, nullable: true })
  recommendations: string[];

  @ManyToOne(() => Screener, (screener) => screener.patient_responses)
  @JoinColumn({ name: 'screener_id' })
  screener: Screener;

  constructor(patientResponse: Partial<PatientResponse>) {
    Object.assign(this, patientResponse);
  }
}
