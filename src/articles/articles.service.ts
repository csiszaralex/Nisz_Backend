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
    const { title, content, status, category } = createArticleDto;
    return this.articleRepository.createArticle(title, content, status, category, id);
  }

  getAllArticles(): Promise<Article[]> {
    return this.articleRepository.getAllArticles();
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
    const { title, content, status, category } = createArticleDto;
    return this.articleRepository.updateArticleById(
      role,
      uid,
      id,
      title,
      content,
      status,
      category,
    );
  }

  deleteArticleById(role: Role, uid: number, id: number) {
    return this.articleRepository.deleteArticleById(role, uid, id);
  }
}
