import { Module } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { QuestionsController } from './questions.controller';
import { QuestionRepository } from './questions.repository';
import { UsersModule } from 'src/users/users.module';

@Module({
  controllers: [QuestionsController],
  providers: [QuestionsService, QuestionRepository],
  imports: [UsersModule],
})
export class QuestionsModule {}
