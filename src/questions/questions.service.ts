import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateQuestionDto } from './dto/create-question.dto';
import { Question } from './entities/question.entity';
import { QuestionRepository } from './questions.repository';

@Injectable()
export class QuestionsService {
  constructor(
    @InjectRepository(QuestionRepository) private questionRepository: QuestionRepository,
  ) {}
  createQuestion(id: number, createQuestionDto: CreateQuestionDto): Promise<Question> {
    const { title, content, status } = createQuestionDto;
    return this.questionRepository.createQuestion(id, title, content, status);
  }

  getAllQuestions(): Promise<Question[]> {
    return this.questionRepository.getAllQuestions();
  }

  getQuestionById(id: number): Promise<Question> {
    return this.questionRepository.getQuestionById(id);
  }

  updateQuestionById(
    uid: number,
    id: number,
    createQuestionDto: CreateQuestionDto,
  ): Promise<Question> {
    const { title, content, status } = createQuestionDto;
    return this.questionRepository.updateQuestionById(uid, id, title, content, status);
  }

  removeQuestionById(uid: number, id: number): Promise<Question> {
    return this.questionRepository.removeQuestionById(uid, id);
  }
}
