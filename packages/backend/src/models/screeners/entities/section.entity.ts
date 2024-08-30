import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Content } from './content.entity';

@Entity('sections')
export class Section {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: false })
  type: string;

  @Column({ type: 'varchar', nullable: false })
  title: string;

  @Column({ type: 'jsonb', nullable: false })
  answers: { title: string; value: number }[];

  @Column({ type: 'jsonb', nullable: false })
  questions: { question_id: string; title: string }[];

  @ManyToOne(() => Content, (content) => content.sections)
  @JoinColumn({ name: 'content_id' })
  content: Content;
}
