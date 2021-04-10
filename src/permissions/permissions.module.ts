import { Module } from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { PermissionsController } from './permissions.controller';
import { PermissionsRepository } from './permissions.repository';
import { UsersModule } from 'src/users/users.module';

@Module({
  controllers: [PermissionsController],
  providers: [PermissionsService, PermissionsRepository],
  exports: [PermissionsModule],
  imports: [UsersModule],
})
export class PermissionsModule {}
