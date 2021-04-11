import { Module } from '@nestjs/common';
import { CategorysService } from './categorys.service';
import { CategorysController } from './categorys.controller';
import { CategoryRepository } from './categorys.repository';

@Module({
  controllers: [CategorysController],
  providers: [CategorysService, CategoryRepository],
})
export class CategorysModule {}
