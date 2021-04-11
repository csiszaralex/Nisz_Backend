import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from 'dotenv';
import { UsersModule } from './users/users.module';
import { ForumModule } from './forum/forum.module';
import { ArticlesModule } from './articles/articles.module';
import { QuestionsModule } from './questions/questions.module';
import { CompanysModule } from './companys/companys.module';
config();
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOSTNAME || 'localhost',
      port: 3306,
      username: process.env.DB_USERNAME || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_DATABASE || 'test',
      entities: [__dirname + '/../**/*.entity.js'],
      synchronize: true,
    }),
    UsersModule,
    CompanysModule,
    QuestionsModule,
    ArticlesModule,
    ForumModule,
  ],
})
export class AppModule {}
