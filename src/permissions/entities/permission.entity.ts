import { IsNotEmpty } from 'class-validator';
import { User } from '../../users/entities/user.entity';
import { BaseEntity, Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('permissions')
export class Permission extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty()
  name: string;

  @Column({ unique: true })
  @IsNotEmpty()
  description: string;

  @Column({ unique: true })
  @IsNotEmpty()
  code: string;

  @ManyToMany(() => User, user => user.permissions)
  users: User[];
}
