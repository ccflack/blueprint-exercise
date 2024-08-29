import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { PatientResponse } from '../../patient-responses/entities/patient-response.entity';
import { Content } from './content.entity';
import { Mapping } from './mapping.entity';

@Entity('screeners')
export class Screener {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: false })
  name: string;

  @Column({ type: 'varchar', nullable: false })
  full_name: string;

  @Column({ type: 'varchar', nullable: false })
  disorder: string;

  @OneToOne(() => Mapping, (mapping) => mapping.screener)
  mapping: Mapping;

  @OneToOne(() => Content, (content) => content.screener, { eager: true })
  content: Content;

  @OneToMany(
    () => PatientResponse,
    (patient_response) => patient_response.screener,
    { nullable: true },
  )
  patient_responses: PatientResponse[];

  constructor(screener: Partial<Screener>) {
    Object.assign(this, screener);
  }
}
