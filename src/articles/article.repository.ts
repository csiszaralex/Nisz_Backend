import { EntityRepository, Repository } from 'typeorm';
import {
  ConflictException,
  ForbiddenException,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { Article } from './entities/article.entity';
import { Category } from 'src/categorys/entities/category.entity';
import { Role } from 'src/users/enums/Roles.enum';
import { User } from 'src/users/entities/user.entity';

@EntityRepository(Article)
export class ArticleRepository extends Repository<Article> {
  private logger = new Logger('QuestionRepository');

  async createArticle(
    title: string,
    content: string,
    status: string,
    category: string,
    id: number,
  ) {
    const article = new Article();
    article.title = title;
    article.content = content;
    article.status = status;
    article.category = await this.createCategory(category);
    article.created = new Date();
    article.lastModified = new Date();
    article.user = await User.findOne(id);

    try {
      await article.save();
      this.logger.verbose(`Article created with name ${title}, by ${id}`);
      return;
    } catch (error) {
      this.logger.warn(error);
      throw new InternalServerErrorException();
    }
  }

  async createCategory(name: string): Promise<Category> {
    let category = await Category.findOne({ where: { name } });
    if (!category) {
      category = new Category();
      category.name = name;
      category.color = '#' + Math.floor(Math.random() * 16777215).toString(16);
      try {
        await category.save();
        this.logger.verbose(`Category created with name: ${name}`);
      } catch (error) {
        this.logger.warn(error);
        throw new InternalServerErrorException();
      }
    }
    return category;
  }

  async getAllArticles(): Promise<Article[]> {
    const articles = await Article.find({ where: { deleted: false }, relations: ['category'] });
    articles.map(article => {
      delete article.category.forum;
      delete article.category.article;
      delete article.category.question;
      return article;
    });
    return articles;
  }

  async getArticleById(id: number): Promise<Article> {
    const article = await Article.findOne({
      where: { deleted: false, id: id },
      relations: ['category'],
    });
    delete article.category.forum;
    delete article.category.article;
    delete article.category.question;
    return article;
  }

  async updateArticleById(
    role: Role,
    uid: number,
    id: number,
    title: string,
    content: string,
    status: string,
    category: string,
  ): Promise<Article> {
    const article = await Article.findOne({ where: { id: id }, relations: ['user'] });
    if (article.locked) throw new ConflictException();
    if (!(article.user.id === uid) && !(role >= Role.MODERATOR)) throw new ForbiddenException();
    article.title = title;
    article.content = content;
    article.status = status;
    article.lastModified = new Date();
    article.category = await this.createCategory(category);
    try {
      article.save();
      this.logger.verbose(`Article with the id of ${id} successfully updated by user ${uid}`);
    } catch (error) {
      this.logger.warn(error);
      throw new InternalServerErrorException();
    }
    delete article.user;
    delete article.category.article;
    delete article.category.forum;
    delete article.category.question;
    return article;
  }

  async deleteArticleById(role: Role, uid: number, id: number) {
    const article = await Article.findOne({ where: { id: id }, relations: ['user'] });
    if (article.locked) throw new ConflictException();
    if (article.user.id === uid) {
      article.remove();
      try {
        article.save();
        this.logger.verbose(
          `Question with the id of ${id} successfully deleted from database by user ${uid}`,
        );
        return '';
      } catch (error) {
        this.logger.warn(error);
        throw new InternalServerErrorException();
      }
    } else if (role >= Role.MODERATOR) {
      article.deleted = true;
      article.lastModified = new Date();

      try {
        article.save();
        this.logger.verbose(`Question with the id of ${id} successfully 'deleted' by user ${uid}`);
        return '';
      } catch (error) {
        this.logger.warn(error);
        throw new InternalServerErrorException();
      }
    } else throw new ForbiddenException();
  }

  async changeLock(id: number): Promise<string> {
    const article = await Article.findOne({ where: { id: id, deleted: false } });
    article.locked = !article.locked;
    article.lastModified = new Date();
    try {
      article.save();
      this.logger.verbose(`Question ${id} locked state set to ${article.locked}`);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
    return '';
  }
}
