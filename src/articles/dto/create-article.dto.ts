import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateArticleDto {
  @IsNotEmpty()
  @ApiProperty({ example: 'Favorite Band' })
  title: string;

  @IsNotEmpty()
  @ApiProperty({ example: 'Rövid összefoglaló' })
  preview: string;

  @IsNotEmpty()
  @ApiProperty({ example: 'Who likes Gorillaz?' })
  content: string;

  @IsNotEmpty()
  @ApiProperty({ example: 'Ajánlott' })
  status: string;

  @IsNotEmpty()
  @ApiProperty({ example: 'GitHub' })
  category: string;
}
