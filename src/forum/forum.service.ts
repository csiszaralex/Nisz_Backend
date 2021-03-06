import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from 'src/users/enums/Roles.enum';
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

  updateForumById(
    role: Role,
    uid: number,
    id: number,
    createForumDto: CreateForumDto,
  ): Promise<Forum> {
    const { title, content, category, parent } = createForumDto;
    return this.forumRepository.updateForumById(role, uid, id, title, content, category, parent);
  }

  deleteFormById(uid: number, role: Role, id: number): Promise<string> {
    return this.forumRepository.deleteFormById(uid, role, id);
  }

  changeLock(id: number): Promise<string> {
    return this.forumRepository.changeLock(id);
  }
  
  changeStatus(id: number, newStatus: string): Promise<void> {
    return this.forumRepository.changeStatus(id, newStatus);
  }
}
