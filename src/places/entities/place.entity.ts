import { IsNotEmpty } from 'class-validator';
import { Move } from '../../moves/entities/move.entity';
import { BaseEntity, Column, Entity, Index, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('places')
@Index('coordinates', ['longitude', 'latitude'], { unique: true })
export class Place extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('decimal', { precision: 8, scale: 4 })
  @IsNotEmpty()
  longitude: number;

  @Column('decimal', { precision: 8, scale: 4 })
  @IsNotEmpty()
  latitude: number;

  @OneToMany(() => Move, move => move.place, { eager: true })
  moves: Move[];
}
