import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ArticleRepository } from './articles/article.repository';
import { ForumRepository } from './forum/forum.repository';
import { QuestionRepository } from './questions/questions.repository';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(QuestionRepository) private questionRepository: QuestionRepository,
    @InjectRepository(ArticleRepository) private articleRepository: ArticleRepository,
    @InjectRepository(ForumRepository) private forumRepository: ForumRepository,
  ) {}

  async getNews(filter) {
    const questions = await this.questionRepository.getAllQuestions();
    const forums = await this.forumRepository.getAllForums();
    const articles = await this.articleRepository.getAllArticles();
    const datas = [];
    questions.map(question => {
      delete question.answers;
      if (!filter || filter.split(',').includes(question?.category?.id))
        datas.push({ ...question, type: 'question' });
    });
    forums.map(forum => {
      if (!filter || filter.split(',').includes(forum?.category?.id))
        datas.push({ ...forum, type: 'forum' });
    });
    articles.map(article => {
      if (!filter || filter.split(',').includes(article?.category?.id))
        datas.push({ ...article, type: 'article' });
    });
    datas.sort(data => -data.lastModified);
    return datas;
  }

  async getPopulars() {
    const questions = await this.questionRepository.getAllQuestions();
    const forums = await this.forumRepository.getAllForums();
    const datas = [];
    questions.map(question => {
      datas.push({ ...question, type: 'question', count: question?.answers?.length });
    });
    forums.map(forum => {
      datas.push({ ...forum, type: 'forum', count: forum?.children?.length });
    });
    datas.sort((dataA, dataB) => dataB.count - dataA.count);
    return datas;
  }
}
