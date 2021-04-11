import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateForumDto } from './dto/create-forum.dto';
import { Forum } from './entities/forum.entity';
import { ForumRepository } from './forum.repository';

@Injectable()
export class ForumService {
  constructor(@InjectRepository(ForumRepository) private forumRepository: ForumRepository) {}
  createForum(id: number, createForumDto: CreateForumDto) {
    const { title, content, category, parent } = createForumDto;
    return this.forumRepository.createForum(id, title, content, category, parent);
  }

  getAllForums(): Promise<Forum[]> {
    return this.forumRepository.getAllForums();
  }

  getForumById(id: number): Promise<Forum> {
    return this.forumRepository.getForumById(id);
  }

  updateForumById(uid: number, id: number, createForumDto: CreateForumDto): Promise<Forum> {
    const { title, content, category, parent } = createForumDto;
    return this.forumRepository.updateForumById(uid, id, title, content, category, parent);
  }

  deleteFormById(uid: number, id: number): Promise<string> {
    return this.forumRepository.deleteFormById(uid, id);
  }

  changeLock(id: number): Promise<string> {
    return this.forumRepository.changeLock(id);
  }
}
