import { IsNotEmpty } from 'class-validator';
import { Place } from '../../places/entities/place.entity';
import { User } from '../../users/entities/user.entity';
import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('moves')
export class Move extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty()
  date: Date;

  @Column()
  @IsNotEmpty()
  morning: boolean;

  @IsNotEmpty()
  @ManyToOne(() => Place, place => place.moves, { eager: false })
  place: number;

  @IsNotEmpty()
  @ManyToOne(() => User, user => user.moves, { eager: false })
  user: number;
}
