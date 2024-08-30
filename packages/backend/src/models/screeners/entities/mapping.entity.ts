import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Screener } from './screener.entity';

@Entity('mappings')
export class Mapping {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'jsonb', nullable: false })
  question_domains: { question_id: string; domain: string }[];

  @OneToOne(() => Screener, (screener) => screener.mapping)
  @JoinColumn({ name: 'screener_id' })
  screener: Screener;
}
