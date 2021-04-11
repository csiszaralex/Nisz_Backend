import { EntityRepository, Repository } from 'typeorm';
import { Logger } from '@nestjs/common';
import { Category } from './entities/category.entity';

@EntityRepository(Category)
export class CategoryRepository extends Repository<Category> {
  private logger = new Logger('UserRepository');

  async getAllCategories(): Promise<Category[]> {
    const categories = await Category.find({ relations: ['forum', 'article', 'question'] });
    categories.map(category => {
      delete category.question;
      delete category.article;
      delete category.forum;
    });
    return categories;
  }
}
