import { ApiProperty } from '@nestjs/swagger';
import { IsDecimal, IsNotEmpty } from 'class-validator';

export class CreatePlaceDto {
  @IsNotEmpty()
  @IsDecimal()
  @ApiProperty({ example: 60 })
  lng: number;

  @IsNotEmpty()
  @IsDecimal()
  @ApiProperty({ example: 49 })
  lat: number;

  @IsNotEmpty()
  @ApiProperty({ example: '2021.03.15. 16:09' })
  date: Date;
}
