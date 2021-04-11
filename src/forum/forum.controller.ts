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
  ValidationPipe,
  Put,
} from '@nestjs/common';
import { ForumService } from './forum.service';
import { CreateForumDto } from './dto/create-forum.dto';
import { Forum } from './entities/forum.entity';
import { GetUserid } from 'src/users/decorators/get-userid.decorator';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/users/decorators/roles.decorator';
import { Role } from 'src/users/enums/Roles.enum';
import { RolesGuard } from 'src/users/guards/roles.guard';
import { GetRole } from 'src/users/decorators/get-role.decorator';

@ApiTags('Forums')
@Controller('forums')
export class ForumController {
  constructor(private readonly forumService: ForumService) {}

  @Post()
  @UseGuards(AuthGuard())
  createForum(@GetUserid() id: number, @Body(ValidationPipe) createForumDto: CreateForumDto) {
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
    @GetRole() role: Role,
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) createForumDto: CreateForumDto,
  ): Promise<Forum> {
    return this.forumService.updateForumById(role, uid, id, createForumDto);
  }
  @Delete(':id')
  @UseGuards(AuthGuard())
  removeQuestionById(
    @GetUserid() uid: number,
    @GetRole() role: Role,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<string> {
    return this.forumService.deleteFormById(uid, role, id);
  }

  @Put(':id/lock')
  @Roles(Role.MODERATOR)
  @UseGuards(RolesGuard)
  @UseGuards(AuthGuard())
  changeLock(@Param('id', ParseIntPipe) id: number): Promise<string> {
    return this.forumService.changeLock(id);
  }

  @Patch(':id/status')
  @Roles(Role.EDITOR)
  @UseGuards(RolesGuard)
  @UseGuards(AuthGuard())
  changeStatus(
    @Body('status') newStatus: string,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<void> {
    return this.forumService.changeStatus(id, newStatus);
  }
  
  @Put(':id/lock')
  @Roles(Role.MODERATOR)
  @UseGuards(RolesGuard)
  @UseGuards(AuthGuard())
  changeLock(@Param('id', ParseIntPipe) id: number): Promise<string> {
    return this.forumService.changeLock(id);
  }
}
