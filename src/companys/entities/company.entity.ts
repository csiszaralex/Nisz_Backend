import { IsNotEmpty } from 'class-validator';
import { User } from 'src/users/entities/user.entity';
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('companys')
export class Company extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty()
  name: string;

  @OneToMany(() => User, user => user.company, { eager: true })
  user: User[];
}
