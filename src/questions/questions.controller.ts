import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  ValidationPipe,
  UseGuards,
} from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { Question } from './entities/question.entity';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { GetUserid } from 'src/users/decorators/get-userid.decorator';

@ApiTags('Questions')
@Controller('questions')
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) {}

  @Post()
  @UseGuards(AuthGuard())
  createQuestion(
    @GetUserid() id: number,
    @Body(ValidationPipe) createQuestionDto: CreateQuestionDto,
  ): Promise<Question> {
    return this.questionsService.createQuestion(id, createQuestionDto);
  }

  @Get()
  getAllQuestions(): Promise<Question[]> {
    return this.questionsService.getAllQuestions();
  }

  @Get(':id')
  getQuestionById(@Param('id', ParseIntPipe) id: number): Promise<Question> {
    return this.questionsService.getQuestionById(id);
  }

  @Patch(':id')
  // @UseGuards();
  @UseGuards(AuthGuard())
  updateQuestionByID(
    @GetUserid() uid: number,
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) createQuestionDto: CreateQuestionDto,
  ) {
    return this.questionsService.updateQuestionById(uid, id, createQuestionDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard())
  removeQuestionById(@GetUserid() uid: number, @Param('id', ParseIntPipe) id: number) {
    return this.questionsService.removeQuestionById(uid, id);
  }
}
