import { IsNotEmpty } from 'class-validator';
import { Answer } from 'src/answers/entities/answer.entity';
import { Article } from 'src/articles/entities/article.entity';
import { Company } from 'src/companys/entities/company.entity';
import { Forum } from 'src/forum/entities/forum.entity';
import { Question } from 'src/questions/entities/question.entity';
import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty()
  name: string;

  @Column({ unique: true })
  @IsNotEmpty()
  email: string;

  @Column()
  @IsNotEmpty()
  password: string;

  @Column()
  @IsNotEmpty()
  salt: string;

  @Column({ default: 0 })
  publicRole: number;

  @Column({ default: 0 })
  companyRole: number;

  @ManyToOne(() => Company, company => company.user, { eager: false })
  company: number;

  @OneToMany(() => Question, question => question.user, { eager: true })
  questions: Question[];

  @OneToMany(() => Answer, answer => answer.user, { eager: true })
  answers: Answer[];

  @OneToMany(() => Article, article => article.user, { eager: true })
  articles: Article[];

  @OneToMany(() => Forum, forum => forum.user, { eager: true })
  forums: Forum[];
}
