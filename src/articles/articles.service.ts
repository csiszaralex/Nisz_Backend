import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from 'src/users/enums/Roles.enum';
import { ArticleRepository } from './article.repository';
import { CreateArticleDto } from './dto/create-article.dto';
import { Article } from './entities/article.entity';

@Injectable()
export class ArticlesService {
  constructor(@InjectRepository(ArticleRepository) private articleRepository: ArticleRepository) {}

  createArticle(createArticleDto: CreateArticleDto, id: number) {
    const { title, content, status, category, preview } = createArticleDto;
    return this.articleRepository.createArticle(title, content, status, category, preview, id);
  }

  getAllArticles(discover: boolean): Promise<Article[]> {
    return this.articleRepository.getAllArticles(discover);
  }

  getArticleById(id: number) {
    return this.articleRepository.getArticleById(id);
  }

  updateArticleById(
    role: Role,
    uid: number,
    id: number,
    createArticleDto: CreateArticleDto,
  ): Promise<Article> {
    const { title, content, status, category, preview } = createArticleDto;
    return this.articleRepository.updateArticleById(
      role,
      uid,
      id,
      title,
      content,
      status,
      category,
      preview,
    );
  }

  deleteArticleById(role: Role, uid: number, id: number) {
    return this.articleRepository.deleteArticleById(role, uid, id);
  }

  changeLock(id: number): Promise<string> {
    return this.articleRepository.changeLock(id);
  }
}
