import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateAnswerDto {
  @IsNotEmpty()
  @ApiProperty({ example: 'Egyetértek' })
  content: string;

}
