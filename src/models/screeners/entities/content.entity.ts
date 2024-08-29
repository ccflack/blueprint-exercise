import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Screener } from './screener.entity';
import { Section } from './section.entity';

@Entity('contents')
export class Content {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: false })
  display_name: string;

  @OneToOne(() => Screener, (screener) => screener.content)
  @JoinColumn({ name: 'screener_id' })
  screener: Screener;

  @OneToMany(() => Section, (section) => section.content, { eager: true })
  sections: Section[];
}
