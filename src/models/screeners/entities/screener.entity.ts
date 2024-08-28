import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { PatientResponse } from '../../patient-responses/entities/patient-response.entity';
import { Content } from './content.entity';

@Entity()
export class Screener {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  fullName: string;

  @Column({ nullable: false })
  disorder: string;

  @Column('text')
  description: string;

  @OneToOne(() => Content, (content) => content.screener)
  contents: Content;

  @OneToMany(
    () => PatientResponse,
    (patientResponse) => patientResponse.screener,
  )
  patientResponses: PatientResponse[];
}
