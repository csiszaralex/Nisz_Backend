import { Module } from '@nestjs/common';
import { PlacesService } from './places.service';
import { PlacesController } from './places.controller';
import { UsersModule } from 'src/users/users.module';
import { PlaceRepository } from './places.repository';

@Module({
  imports: [UsersModule],
  controllers: [PlacesController],
  providers: [PlacesService, PlaceRepository],
})
export class PlacesModule {}
