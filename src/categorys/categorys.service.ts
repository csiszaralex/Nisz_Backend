import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryRepository } from './categorys.repository';
import { Category } from './entities/category.entity';

@Injectable()
export class CategorysService {
  constructor(
    @InjectRepository(CategoryRepository) private categoryRepository: CategoryRepository,
  ) {}
  getAllCategories(): Promise<Category[]> {
    return this.categoryRepository.getAllCategories();
  }
}
