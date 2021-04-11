import { Module } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { ArticlesController } from './articles.controller';
import { UsersModule } from 'src/users/users.module';
import { ArticleRepository } from './article.repository';

@Module({
  controllers: [ArticlesController],
  providers: [ArticlesService, ArticleRepository],
  imports: [UsersModule],
})
export class ArticlesModule {}
