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
  Put,
} from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { Question } from './entities/question.entity';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { GetUserid } from 'src/users/decorators/get-userid.decorator';
import { RolesGuard } from 'src/users/guards/roles.guard';
import { Roles } from 'src/users/decorators/roles.decorator';
import { Role } from 'src/users/enums/Roles.enum';
import { GetRole } from 'src/users/decorators/get-role.decorator';
import { CreateAnswerDto } from 'src/answers/dto/create-answer.dto';

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
  @UseGuards(AuthGuard())
  updateQuestionByID(
    @GetUserid() uid: number,
    @GetRole() role: Role,
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) createQuestionDto: CreateQuestionDto,
  ): Promise<Question> {
    return this.questionsService.updateQuestionById(uid, role, id, createQuestionDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard())
  removeQuestionById(
    @GetUserid() uid: number,
    @GetRole() role: Role,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<string> {
    return this.questionsService.removeQuestionById(uid, role, id);
  }

  @Put(':id/lock')
  @Roles(Role.MODERATOR)
  @UseGuards(RolesGuard)
  @UseGuards(AuthGuard())
  changeLock(@Param('id', ParseIntPipe) id: number): Promise<string> {
    return this.questionsService.changeLock(id);
  }

  @Put(':id')
  @UseGuards(AuthGuard())
  addAnswer(
    @Param('id', ParseIntPipe) id: number,
    @GetUserid() uid: number,
    @Body(ValidationPipe) createAnswerDto: CreateAnswerDto,
  ): Promise<string> {
    return this.questionsService.addAnswer(id, uid, createAnswerDto);
  }

  @Delete(':id/:aId')
  @UseGuards(AuthGuard())
  removeAnswer(
    @Param('id', ParseIntPipe) id: number,
    @GetRole() role: Role,
    @GetUserid() uid: number,
    @Param('aId', ParseIntPipe) aId: number,
  ): Promise<string> {
    return this.questionsService.removeAnswer(id, role, uid, aId);
  }

  @Patch(':id/:aId')
  @UseGuards(AuthGuard())
  editAnswer(
    @Param('id', ParseIntPipe) id: number,
    @GetRole() role: Role,
    @GetUserid() uid: number,
    @Param('aId', ParseIntPipe) aId: number,
    @Body(ValidationPipe) createAnswerDto: CreateAnswerDto,
  ): Promise<string> {
    return this.questionsService.editAnswer(id, role, uid, aId, createAnswerDto);
  }

  @Put(':id/:aId')
  @UseGuards(AuthGuard())
  setGood(
    @Param('id', ParseIntPipe) id: number,
    @GetRole() role: Role,
    @GetUserid() uid: number,
    @Param('aId', ParseIntPipe) aId: number,
  ): Promise<string> {
    return this.questionsService.setGood(id, role, uid, aId);
  }

  @Patch(':id/status')
  @Roles(Role.EDITOR)
  @UseGuards(RolesGuard)
  @UseGuards(AuthGuard())
  changeStatus(
    @Body('status') newStatus: string,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<void> {
    return this.questionsService.changeStatus(id, newStatus);
  }
}
