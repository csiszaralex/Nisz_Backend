import { Move } from '../../moves/entities/move.entity';
import { define } from 'typeorm-seeding';

define(Move, faker => {
  const move = new Move();
  move.date = faker.date.between('2019.10.23 01:00', '2021.05.13 23:59');
  move.morning = faker.random.boolean();

  return move;
});
