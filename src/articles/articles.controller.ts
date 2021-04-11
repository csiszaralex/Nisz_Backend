import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ValidationPipe,
  ParseIntPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { GetRole } from 'src/users/decorators/get-role.decorator';
import { GetUserid } from 'src/users/decorators/get-userid.decorator';
import { Role } from 'src/users/enums/Roles.enum';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { Article } from './entities/article.entity';

@Controller('articles')
@ApiTags('Articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Post()
  @UseGuards(AuthGuard())
  createArticle(@Body(ValidationPipe) createArticleDto: CreateArticleDto, @GetUserid() id: number) {
    return this.articlesService.createArticle(createArticleDto, id);
  }

  @Get()
  getAllArticles(): Promise<Article[]> {
    return this.articlesService.getAllArticles();
  }

  @Get(':id')
  getArticleById(@Param('id', ParseIntPipe) id: number): Promise<Article> {
    return this.articlesService.getArticleById(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard())
  updateArticleById(
    @GetRole() role: Role,
    @GetUserid() uid: number,
    @Param('id', ParseIntPipe) id: number,
    @Body() createArticleDto: CreateArticleDto,
  ): Promise<Article> {
    return this.articlesService.updateArticleById(role, uid, id, createArticleDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard())
  deleteArticleById(
    @GetRole() role: Role,
    @GetUserid() uid: number,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.articlesService.deleteArticleById(role, uid, id);
  }
}
