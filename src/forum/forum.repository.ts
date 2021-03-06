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
import { Forum } from './entities/forum.entity';
import { Category } from 'src/categorys/entities/category.entity';
import { Role } from 'src/users/enums/Roles.enum';
import { User } from 'src/users/entities/user.entity';

@EntityRepository(Forum)
export class ForumRepository extends Repository<Forum> {
  private logger = new Logger('UserRepository');

  async createForum(
    id: number,
    title: string,
    content: string,
    category: string,
    parent: number,
  ): Promise<Forum> {
    const parentObj = await this.getForumById(parent);

    const categoryObj = await this.createCategory(category);
    if (!parentObj && !title)
      throw new BadRequestException('You must have a title for a forum starter post');
    const forum = new Forum();
    forum.title = title;
    forum.created = new Date();
    forum.deleted = false;
    forum.lastModified = forum.created;
    forum.locked = false;
    forum.parent = parentObj ? parentObj : null;
    forum.status = '';
    forum.user = await User.findOne(id);
    forum.content = content;
    forum.category = categoryObj;
    forum.children = [];

    try {
      await forum.save();
      if (parentObj) {
        parentObj.children.push(forum);
        parentObj.save();
      }
      this.logger.verbose(
        `Fórum ${forum.title} has been successfully created by user ${forum.user.name}`,
      );
      delete forum.deleted;
      delete forum.parent;
      delete forum?.category?.question;
      delete forum?.category?.article;
      delete forum?.category?.forum;
      delete forum?.user?.password;
      delete forum?.user?.publicRole;
      delete forum?.user?.questions;
      delete forum?.user?.answers;
      delete forum?.user?.articles;
      delete forum?.user?.salt;
      delete forum?.user?.forums;
      delete forum?.user?.email;
      return forum;
    } catch (error) {
      this.logger.warn(error);
    }
  }

  async createCategory(name: string): Promise<Category> {
    let category = await Category.findOne({ where: { name: name } });

    if (!category) {
      category = new Category();
      category.name = name;
      category.color = '#' + Math.floor(Math.random() * 16777215).toString(16);
      try {
        await category.save();
        this.logger.verbose(`Category ${name} successfully saved`);
      } catch (error) {
        this.logger.warn(error);
        throw new InternalServerErrorException();
      }
    }
    delete category.forum;
    delete category.article;
    delete category.question;
    return category;
  }

  async getAllForums(): Promise<Forum[]> {
    const forums = await Forum.find({ where: { deleted: false }, relations: ['category', 'user'] });
    if (forums) {
      forums.map(forum => {
        delete forum.deleted;
        delete forum.parent;
        delete forum?.category?.question;
        delete forum?.category?.article;
        delete forum?.category?.forum;
        delete forum?.user?.password;
        delete forum?.user?.publicRole;
        delete forum?.user?.questions;
        delete forum?.user?.answers;
        delete forum?.user?.articles;
        delete forum?.user?.salt;
        delete forum?.user?.forums;
        delete forum?.user?.email;
        return forum;
      });
    }
    return forums;
  }

  async getForumById(id: number): Promise<Forum> {
    const forum = await Forum.findOne(id, { relations: ['category', 'children', 'user'] });
    if (forum) {
      if (forum.deleted) throw new GoneException('The requested forum post is deleted');
      delete forum.deleted;
      delete forum.parent;
      delete forum?.category?.question;
      delete forum?.category?.article;
      delete forum?.category?.forum;
      delete forum?.user?.password;
      delete forum?.user?.publicRole;
      delete forum?.user?.questions;
      delete forum?.user?.answers;
      delete forum?.user?.articles;
      delete forum?.user?.salt;
      delete forum?.user?.forums;
      delete forum?.user?.email;
    }
    return forum;
  }

  async updateForumById(
    role: Role,
    uid: number,
    id: number,
    title: string,
    content: string,
    category: string,
    parent: number,
  ): Promise<Forum> {
    let parentObj = null;
    if (!(parent == 0) && parent != null) parentObj = await this.getForumById(parent);
    const forum = await Forum.findOne(id, { relations: ['user'] });
    if (!forum) throw new NotFoundException(`No forum post with the id of ${id} found`);
    if (forum.locked) throw new ConflictException();
    if (!(forum.user.id === uid) && !(role >= Role.MODERATOR)) throw new ForbiddenException();

    forum.title = title;
    forum.deleted = false;
    forum.lastModified = new Date();
    forum.locked = false;
    forum.parent = parentObj;
    forum.status = '';
    forum.content = content;
    forum.category = await this.createCategory(category);

    try {
      await forum.save();
      this.logger.verbose(
        `Forum ${forum.title} has been successfully created by user ${forum.user}`,
      );
      delete forum.deleted;
      delete forum.parent;
      delete forum.user;
      delete forum?.category?.question;
      delete forum?.category?.article;
      delete forum?.category?.forum;
      delete forum?.user?.password;
      delete forum?.user?.publicRole;
      delete forum?.user?.questions;
      delete forum?.user?.answers;
      delete forum?.user?.articles;
      delete forum?.user?.salt;
      delete forum?.user?.forums;
      delete forum?.user?.email;
      return forum;
    } catch (error) {
      this.logger.warn(error);
    }
  }

  async deleteFormById(uid: number, role: Role, id: number): Promise<string> {
    const forum = await Forum.findOne({ where: { id: id } });
    forum.deleted = true;
    forum.lastModified = new Date();
    try {
      forum.save();
      this.logger.verbose(`Question with the id of ${id} successfully 'deleted' by ${uid}`);
    } catch (error) {
      this.logger.warn(error);
      throw new InternalServerErrorException();
    }
    return '';
  }
  async removeQuestionById(uid: number, role: Role, id: number): Promise<string> {
    const forum = await this.getForumById(id);
    if (forum.locked) throw new ConflictException();
    if (forum.user.id === uid) {
      forum.remove();
      try {
        forum.save();
        this.logger.verbose(
          `Forum with the id of ${id} successfully deleted from database by user ${uid}`,
        );
        return '';
      } catch (error) {
        this.logger.warn(error);
        throw new InternalServerErrorException();
      }
    } else if (role >= Role.MODERATOR) {
      forum.deleted = true;
      forum.lastModified = new Date();

      try {
        forum.save();
        this.logger.verbose(`Forum with the id of ${id} successfully 'deleted' by user ${uid}`);
        return '';
      } catch (error) {
        this.logger.warn(error);
        throw new InternalServerErrorException();
      }
    } else throw new ForbiddenException();
  }

  async changeLock(id: number): Promise<string> {
    const forum = await Forum.findOne({ where: { id: id } });
    forum.locked = !forum.locked;
    try {
      await forum.save();
      this.logger.verbose(
        `Forum post ${forum.id} has been successfully ${forum.locked ? `locked` : `unlocked`}`,
      );
    } catch (error) {
      this.logger.warn(error);
      throw new InternalServerErrorException();
    }
    return '';
  }

  async changeStatus(id: number, newStatus: string): Promise<void> {
    const forum = await this.getForumById(id);
    forum.status = newStatus;
    try {
      await forum.save();
      this.logger.verbose(`Status for id ${forum.id} forum post changed to ${newStatus}`);
    } catch (error) {
      this.logger.warn(error);
      throw new InternalServerErrorException();
    }
  }
}
