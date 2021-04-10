import { Place } from '../../places/entities/place.entity';
import { define } from 'typeorm-seeding';

define(Place, faker => {
  const place = new Place();
  place.latitude = faker.random.number({ min: 458207, max: 486637 }) / 10000;
  place.longitude = faker.random.number({ min: 154713, max: 231493 }) / 10000;

  return place;
});
