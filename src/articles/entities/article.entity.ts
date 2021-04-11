import { IsNotEmpty } from 'class-validator';
import { Category } from 'src/categorys/entities/category.entity';
import { User } from 'src/users/entities/user.entity';
import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('article')
export class Article extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty()
  title: string;

  @Column()
  @IsNotEmpty()
  preview: string;

  @Column({ default: '' })
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

  @ManyToOne(() => User, user => user.articles, { eager: false })
  user: User;

  @ManyToOne(() => Category, category => category.article, { eager: false })
  category: Category;
}
