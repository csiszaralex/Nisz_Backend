import { Controller, Get } from '@nestjs/common';
import { CategorysService } from './categorys.service';
import { Category } from './entities/category.entity';

@Controller('categorys')
export class CategorysController {
  constructor(private readonly categorysService: CategorysService) {}
  @Get()
  getAllCategories(): Promise<Category[]> {
    return this.categorysService.getAllCategories();
  }
}
