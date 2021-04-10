import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { ForumService } from './forum.service';
import { CreateForumDto } from './dto/create-forum.dto';
import { Forum } from './entities/forum.entity';
import { GetUserid } from 'src/users/decorators/get-userid.decorator';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Forums')
@Controller('forums')
export class ForumController {
  constructor(private readonly forumService: ForumService) {}

  @Post()
  @UseGuards(AuthGuard())
  createForum(@GetUserid() id: number, @Body() createForumDto: CreateForumDto) {
    return this.forumService.createForum(id, createForumDto);
  }

  @Get()
  getAllForums(): Promise<Forum[]> {
    return this.forumService.getAllForums();
  }

  @Get(':id')
  getForumById(@Param('id', ParseIntPipe) id: number): Promise<Forum> {
    return this.forumService.getForumById(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard())
  updateForumById(
    @GetUserid() uid: number,
    @Param('id', ParseIntPipe) id: number,
    @Body() createForumDto: CreateForumDto,
  ): Promise<Forum> {
    return this.forumService.updateForumById(uid, id, createForumDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard())
  deleteFormById(@GetUserid() uid: number, @Param('id', ParseIntPipe) id: number): Promise<string> {
    return this.forumService.deleteFormById(uid, id);
  }
}
