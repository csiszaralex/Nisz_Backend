import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreatePermissionDto {
  @IsNotEmpty()
  @ApiProperty({ example: 'Törlés' })
  name: string;

  @IsNotEmpty()
  @ApiProperty({ example: 'Törölni lehet vele' })
  description: string;

  @IsNotEmpty()
  @ApiProperty({ example: 'DEL' })
  code: string;
}
