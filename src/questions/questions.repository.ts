import { EntityRepository, Repository } from 'typeorm';
import { InternalServerErrorException, Logger } from '@nestjs/common';
import { Question } from './entities/question.entity';

@EntityRepository(Question)
export class QuestionRepository extends Repository<Question> {
  private logger = new Logger('QuestionRepository');

  async createQuestion(
    id: number,
    title: string,
    content: string,
    status: string,
  ): Promise<Question> {
    const question = new Question();
    question.acceptedAnswer = null;
    question.answers = null;
    question.content = content;
    question.created = new Date();
    question.deleted = false;
    question.lastModified = question.created;
    question.locked = false;
    question.status = status;
    question.title = title;
    question.user = id;

    try {
      await question.save();
      this.logger.verbose(
        `Question ${question.title} has been successfully created by user ${question.user}`,
      );
      return question;
    } catch (error) {
      this.logger.warn(error);
      throw new InternalServerErrorException();
    }
  }

  async getAllQuestions(): Promise<Question[]> {
    const questions = await Question.find();
    return questions;
  }

  async getQuestionById(id: number): Promise<Question> {
    const question = await Question.findOne({ where: { id: id } });
    return question;
  }

  async updateQuestionById(
    uid: number,
    id: number,
    title: string,
    content: string,
    status: string,
  ): Promise<Question> {
    const question = await Question.findOne({ where: { id: id } });
    question.title = title;
    question.content = content;
    question.status = status;
    question.lastModified = new Date();
    try {
      question.save();
      this.logger.verbose(`Question with the id of ${id} successfully updated by user ${uid}`);
    } catch (error) {
      this.logger.warn(error);
      throw new InternalServerErrorException();
    }
    return question;
  }

  async removeQuestionById(uid: number, id: number): Promise<Question> {
    const question = await Question.findOne({ where: { id: id } });
    question.deleted = true;
    question.lastModified = new Date();
    try {
      question.save();
      this.logger.verbose(`Question with the id of ${id} successfully 'deleted' by user ${uid}`);
    } catch (error) {
      this.logger.warn(error);
      throw new InternalServerErrorException();
    }
    return question;
  }
}
