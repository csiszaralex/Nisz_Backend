import { IsNotEmpty } from 'class-validator';
import { User } from 'src/users/entities/user.entity';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Timestamp,
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

  @Column()
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

  @ManyToOne(() => User, user => user.forums)
  user: number;

  @ManyToOne(() => Forum, forum => forum.children)
  parent: number;

  @OneToMany(() => Forum, forum => forum.parent)
  children: Forum[];
}
