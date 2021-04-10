import { IsNotEmpty } from 'class-validator';
import { Question } from 'src/questions/entities/question.entity';
import { User } from 'src/users/entities/user.entity';
import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('answer')
export class Answer extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty()
  content: string;

  @ManyToOne(() => User, user => user.answers, { eager: false })
  user: number;

  @ManyToOne(() => Question, question => question.answers, { eager: false })
  question: number;
}
