import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Screener } from './screener.entity';
import { Section } from './section.entity';

@Entity()
export class Content {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  displayName: string;

  @OneToOne(() => Screener, (screener) => screener.contents)
  screener: Screener;

  @OneToMany(() => Section, (section) => section.content)
  sections: Section[];
}
