import { User } from '../../users/entities/user.entity';
import { define } from 'typeorm-seeding';
import { genSaltSync, hashSync } from 'bcrypt';

define(User, faker => {
  const salt = genSaltSync();
  const isInfected = faker.random.boolean();

  const user = new User();
  user.name = faker.name.firstName(0) + ' ' + faker.name.lastName(0);
  user.password = hashSync('Alma', salt);
  user.salt = salt;
  user.email = faker.internet.email();
  user.morning = isInfected ? faker.random.boolean() : null;
  user.infectedDate = isInfected ? faker.date.between('2019.03.25', '2021.05.03') : new Date(0);

  return user;
});
