import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateQuestionDto {
  @IsNotEmpty()
  @ApiProperty({ example: 'Favorite Band' })
  title: string;

  @IsNotEmpty()
  @ApiProperty({ example: 'Who likes Gorillaz?' })
  content: string;

  @IsNotEmpty()
  @ApiProperty({ example: ['Music', 'Popular', 'Internet'] })
  categories: string[];
}
