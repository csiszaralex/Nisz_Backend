import { IsNotEmpty } from 'class-validator';
import { Article } from 'src/articles/entities/article.entity';
import { Forum } from 'src/forum/entities/forum.entity';
import { Question } from 'src/questions/entities/question.entity';
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('category')
export class Category extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty()
  name: string;

  @Column()
  @IsNotEmpty()
  color: string;

  @OneToMany(() => Question, question => question.category, { eager: true })
  question: Question;

  @OneToMany(() => Article, article => article.category, { eager: true })
  article: Article;

  @OneToMany(() => Forum, forum => forum.category, { eager: true })
  forum: Forum;
}
