import { EntityRepository, Repository } from 'typeorm';
import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  GoneException,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { Question } from './entities/question.entity';
import { Role } from 'src/users/enums/Roles.enum';
import { User } from 'src/users/entities/user.entity';
import { Answer } from 'src/answers/entities/answer.entity';

@EntityRepository(Question)
export class QuestionRepository extends Repository<Question> {
  private logger = new Logger('QuestionRepository');

  async createQuestion(
    id: number,
    title: string,
    content: string,
    status: string,
  ): Promise<Question> {
    const user = await User.findOne(id);
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
    question.user = user;

    try {
      await question.save();
      this.logger.verbose(
        `Question ${question.title} has been successfully created by user ${question.user.name}`,
      );
      return question;
    } catch (error) {
      this.logger.warn(error);
      throw new InternalServerErrorException();
    }
  }

  async getAllQuestions(): Promise<Question[]> {
    const questions = await Question.find({ where: { locked: false }, relations: ['answers'] });
    questions.map(question => {
      delete question.user;
      return questions;
    });
    return questions;
  }

  async getQuestionById(id: number): Promise<Question> {
    const question = await Question.findOne(id, { relations: ['user', 'answers'] });
    if (!question) throw new NotFoundException(`Question with id ${id} noth found`);
    if (question.deleted) throw new GoneException();
    return question;
  }

  async updateQuestionById(
    uid: number,
    role: number,
    id: number,
    title: string,
    content: string,
    status: string,
  ): Promise<Question> {
    const question = await this.getQuestionById(id);
    if (question.locked) throw new ConflictException();
    if (!(question.user.id === uid) && !(role >= Role.MODERATOR)) throw new ForbiddenException();
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
    delete question.user;
    return question;
  }

  async removeQuestionById(uid: number, role: Role, id: number): Promise<string> {
    const question = await this.getQuestionById(id);
    if (question.locked) throw new ConflictException();
    if (question.user.id === uid) {
      question.remove();
      try {
        question.save();
        this.logger.verbose(
          `Question with the id of ${id} successfully deleted from database by user ${uid}`,
        );
        return '';
      } catch (error) {
        this.logger.warn(error);
        throw new InternalServerErrorException();
      }
    } else if (role >= Role.MODERATOR) {
      question.deleted = true;
      question.lastModified = new Date();

      try {
        question.save();
        this.logger.verbose(`Question with the id of ${id} successfully 'deleted' by user ${uid}`);
        return '';
      } catch (error) {
        this.logger.warn(error);
        throw new InternalServerErrorException();
      }
    } else throw new ForbiddenException();
  }

  async changeLock(id: number): Promise<string> {
    const question = await this.getQuestionById(id);
    question.locked = !question.locked;
    question.lastModified = new Date();
    try {
      question.save();
      this.logger.verbose(`Question ${id} locked state set to ${question.locked}`);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
    return '';
  }

  async addAnswer(id: number, uid: number, content: string): Promise<string> {
    const answer = new Answer();
    answer.content = content;
    answer.user = uid;
    answer.question = id;
    try {
      answer.save();
      this.logger.verbose(`New answer added to question ${id} from ${uid} with ${content}`);
      return '';
    } catch (error) {
      this.logger.warn(error);
      throw new InternalServerErrorException();
    }
  }

  async removeAnswer(id: number, role: Role, uid: number, aId: number): Promise<string> {
    const answer = await Answer.findOne(aId);
    if (!answer) throw new NotFoundException(`Answer with id ${aId} not found`);
    if (uid !== answer.user && role < Role.MODERATOR) throw new ForbiddenException();
    try {
      answer.remove();
      this.logger.verbose(`Answer ${aId} deleted by ${uid}`);
      return '';
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
  async editAnswer(
    id: number,
    role: Role,
    uid: number,
    aId: number,
    content: string,
  ): Promise<string> {
    const answer = await Answer.findOne(aId);
    if (!answer) throw new NotFoundException(`Answer with id ${aId} not found`);
    if (uid !== answer.user && role < Role.MODERATOR) throw new ForbiddenException();
    answer.content = content;
    try {
      answer.save();
      this.logger.verbose(`Answer ${aId} changed by ${uid} to ${content}`);
      return '';
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
  async setGood(id: number, role: Role, uid: number, aId: number): Promise<string> {
    const answer = await Answer.findOne(aId);
    const question = await Question.findOne(id);
    if (!answer) throw new NotFoundException(`Answer with id ${aId} not found`);
    if (!question) throw new NotFoundException(`Question with id ${id} not found`);
    if (uid !== answer.user && role < Role.MODERATOR) throw new ForbiddenException();
    if (question.acceptedAnswer) throw new BadRequestException();
    console.log(question);

    question.acceptedAnswer = answer.id;
    try {
      question.save();
      this.logger.verbose(`Answer ${aId} set good answer to ${uid}`);
      return '';
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
