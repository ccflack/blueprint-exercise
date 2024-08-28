import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Content } from './content.entity';

@Entity()
export class Section {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  type: string;

  @Column({ nullable: false })
  title: string;

  @Column({ type: 'jsonb', nullable: false })
  answers: { title: string; value: number }[];

  @Column({ type: 'jsonb', nullable: false })
  questions: { question_id: string; title: string }[];

  @ManyToOne(() => Content, (content) => content.sections)
  content: Content;
}
