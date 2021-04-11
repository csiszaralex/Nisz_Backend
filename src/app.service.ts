import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ArticleRepository } from './articles/article.repository';
import { Article } from './articles/entities/article.entity';
import { Forum } from './forum/entities/forum.entity';
import { ForumRepository } from './forum/forum.repository';
import { Question } from './questions/entities/question.entity';
import { QuestionRepository } from './questions/questions.repository';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(QuestionRepository) private questionRepository: QuestionRepository,
    @InjectRepository(ArticleRepository) private articleRepository: ArticleRepository,
    @InjectRepository(ForumRepository) private forumRepository: ForumRepository,
  ) {}

  async getNews() {
    const questions = await this.questionRepository.getAllQuestions();
    const forums = await this.forumRepository.getAllForums();
    const articles = await this.articleRepository.getAllArticles();
    const datas = [];
    questions.map(question => {
      delete question.answers;
      datas.push({ ...question, type: 'question' });
    });
    forums.map(forum => {
      datas.push({ ...forum, type: 'forum' });
    });
    articles.map(article => {
      datas.push({ ...article, type: 'article' });
    });
    datas.sort(data => -data.lastModified);
    return datas;
  }
}
