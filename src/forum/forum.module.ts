import { Module } from '@nestjs/common';
import { ForumService } from './forum.service';
import { ForumController } from './forum.controller';
import { ForumRepository } from './forum.repository';
import { UsersModule } from 'src/users/users.module';

@Module({
  controllers: [ForumController],
  providers: [ForumService, ForumRepository],
  imports: [UsersModule],
})
export class ForumModule {}
