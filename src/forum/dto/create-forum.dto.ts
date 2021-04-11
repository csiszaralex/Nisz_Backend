import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateForumDto {
  @IsNotEmpty()
  @ApiProperty({ example: 'Favorite Band' })
  title: string;

  @IsNotEmpty()
  @ApiProperty({ example: 'Who likes Gorillaz?' })
  content: string;

  @IsNotEmpty()
  @ApiProperty({ example: 'Ajánlott' })
  category: string;

  @IsNotEmpty()
  @ApiProperty({ example: 1 })
  parent: number;
}
