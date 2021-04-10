import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateAnswerDto } from 'src/answers/dto/create-answer.dto';
import { Role } from 'src/users/enums/Roles.enum';
import { CreateQuestionDto } from './dto/create-question.dto';
import { Question } from './entities/question.entity';
import { QuestionRepository } from './questions.repository';

@Injectable()
export class QuestionsService {
  constructor(
    @InjectRepository(QuestionRepository) private questionRepository: QuestionRepository,
  ) {}
  createQuestion(id: number, createQuestionDto: CreateQuestionDto): Promise<Question> {
    const { title, content, categories } = createQuestionDto;
    return this.questionRepository.createQuestion(id, title, content, categories);
  }

  getAllQuestions(): Promise<Question[]> {
    return this.questionRepository.getAllQuestions();
  }

  async getQuestionById(id: number): Promise<Question> {
    const question = await this.questionRepository.getQuestionById(id);
    delete question.user;
    return question;
  }

  updateQuestionById(
    uid: number,
    role: Role,
    id: number,
    createQuestionDto: CreateQuestionDto,
  ): Promise<Question> {
    const { title, content, status } = createQuestionDto;
    return this.questionRepository.updateQuestionById(uid, role, id, title, content, status);
  }

  removeQuestionById(uid: number, role: Role, id: number): Promise<string> {
    return this.questionRepository.removeQuestionById(uid, role, id);
  }

  changeLock(id: number): Promise<string> {
    return this.questionRepository.changeLock(id);
  }

  addAnswer(id: number, uid: number, createAnswerDto: CreateAnswerDto): Promise<string> {
    const { content } = createAnswerDto;
    return this.questionRepository.addAnswer(id, uid, content);
  }
  removeAnswer(id: number, role: Role, uid: number, aId: number): Promise<string> {
    return this.questionRepository.removeAnswer(id, role, uid, aId);
  }
  editAnswer(
    id: number,
    role: Role,
    uid: number,
    aId: number,
    createAnswerDto: CreateAnswerDto,
  ): Promise<string> {
    const { content } = createAnswerDto;
    return this.questionRepository.editAnswer(id, role, uid, aId, content);
  }
  setGood(id: number, role: Role, uid: number, aId: number): Promise<string> {
    return this.questionRepository.setGood(id, role, uid, aId);
  }
}
