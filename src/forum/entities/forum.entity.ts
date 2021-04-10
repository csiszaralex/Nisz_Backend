import { IsNotEmpty } from 'class-validator';
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

@Entity('forum')
export class Forum extends BaseEntity {
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

  @ManyToOne(() => User, user => user.forums, { eager: false })
  user: number;

  @ManyToOne(() => Forum, forum => forum.children, { eager: false })
  parent: number;

  @OneToMany(() => Forum, forum => forum.parent, { eager: true })
  children: Forum[];

  @ManyToMany(() => Category, category => category.forums, { eager: false })
  categories: Category[];
}
