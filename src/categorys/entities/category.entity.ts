import { IsNotEmpty } from 'class-validator';
import { Article } from 'src/articles/entities/article.entity';
import { Forum } from 'src/forum/entities/forum.entity';
import { Question } from 'src/questions/entities/question.entity';
import { BaseEntity, Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

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

  @ManyToMany(() => Forum, forum => forum.categories, { eager: false })
  @JoinTable()
  forums: Forum[];

  @ManyToMany(() => Article, article => article.categories, { eager: false })
  @JoinTable()
  articles: Article[];

  @ManyToMany(() => Question, question => question.categories, { eager: false })
  @JoinTable()
  questions: Question[];
}
