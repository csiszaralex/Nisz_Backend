import { IsNotEmpty } from 'class-validator';
import { Answer } from 'src/answers/entities/answer.entity';
import { Category } from 'src/categorys/entities/category.entity';
import { User } from 'src/users/entities/user.entity';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('question')
export class Question extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty()
  title: string;

  @Column()
  @IsNotEmpty()
  content: string;

  @Column({ default: '' })
  @IsNotEmpty()
  status: string;

  @Column()
  @IsNotEmpty()
  created: Date;

  @Column()
  @IsNotEmpty()
  lastModified: Date;

  @Column({ default: false })
  deleted: boolean;

  @Column({ default: false })
  locked: boolean;

  @Column({ default: null })
  acceptedAnswer: number;

  @OneToMany(() => Answer, answer => answer.question, { eager: true })
  answers: Answer[];

  @ManyToOne(() => User, user => user.questions, { eager: false })
  user: number;

  @ManyToMany(() => Category, category => category.questions, { eager: false })
  categories: Category[];
}
