import { EntityRepository, Repository } from 'typeorm';
import { GoneException, Logger, NotFoundException } from '@nestjs/common';
import { Forum } from './entities/forum.entity';
import { Category } from 'src/categorys/entities/category.entity';

@EntityRepository(Forum)
export class ForumRepository extends Repository<Forum> {
  private logger = new Logger('UserRepository');

  async createForum(
    id: number,
    title: string,
    content: string,
    category: number,
    parent: number,
  ): Promise<Forum> {
    let parentObj = null;
    if (!(parent == 0)) parentObj = await this.getForumById(parent);
    const categoryObj = await Category.findOne({ where: { id: category } });

    const forum = new Forum();
    forum.title = title;
    forum.created = new Date();
    forum.deleted = false;
    forum.lastModified = forum.created;
    forum.locked = false;
    forum.parent = parentObj;
    forum.status = '';
    forum.user = id;
    forum.content = content;
    forum.category = categoryObj;

    try {
      await forum.save();
      this.logger.verbose(
        `Fórum ${forum.title} has been successfully created by user ${forum.user}`,
      );
      delete forum.deleted;
      return forum;
    } catch (error) {
      this.logger.warn(error);
    }
  }

  async getAllForums(): Promise<Forum[]> {
    const forums = await Forum.find();
    forums.filter(forum => !forum.deleted);
    forums.map(forum => delete forum.deleted);
    return forums;
  }

  async getForumById(id: number): Promise<Forum> {
    const forum = await Forum.findOne({ where: { id } });
    if (forum.deleted) throw new GoneException('The requested forum post is deleted');
    delete forum.deleted;
    return forum;
  }

  async updateForumById(
    uid: number,
    id: number,
    title: string,
    content: string,
    category: number,
    parent: number,
  ): Promise<Forum> {
    let parentObj = null;
    if (!(parent == 0) && parent != null) parentObj = await this.getForumById(parent);
    const forum = await this.getForumById(id);
    if (!forum) throw new NotFoundException(`No forum post with the id of ${id} found`);
    const categoryObj = await Category.findOne({ where: { id: category } });

    forum.title = title;
    forum.deleted = false;
    forum.lastModified = new Date();
    forum.locked = false;
    forum.parent = parentObj;
    forum.status = '';
    forum.user = uid;
    forum.content = content;
    forum.category = categoryObj;

    try {
      await forum.save();
      this.logger.verbose(
        `Forum ${forum.title} has been successfully created by user ${forum.user}`,
      );
      delete forum.deleted;
      return forum;
    } catch (error) {
      this.logger.warn(error);
    }
  }

  async deleteFormById(uid: number, id: number): Promise<string> {
    const forum = await Forum.findOne({ where: { id: id } });
    forum.deleted = true;
    forum.lastModified = new Date();
    try {
      forum.save();
      this.logger.verbose(`Question with the id of ${id} successfully 'deleted' by ${uid}`);
    } catch (error) {
      this.logger.warn(error);
    }
    return '';
  }
}
