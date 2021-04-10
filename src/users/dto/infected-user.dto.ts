import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class InfectedUserDto {
  @IsNotEmpty()
  @ApiProperty({ example: 'Kerek Elek' })
  name: string;

  @IsNotEmpty()
  @ApiProperty({ example: 'example@gmail.com' })
  email: string;

  @IsNotEmpty()
  @ApiProperty({ example: 1 })
  id: number;

  @IsNotEmpty()
  @ApiProperty({ example: { infectedDate: new Date(), morning: false } })
  userInfection: {
    infectedDate: Date;
    morning: boolean;
  };

  @IsNotEmpty()
  @ApiProperty({ example: {} })
  lastMove: Record<string, never> | { date: Date; morning: boolean };

  @IsNotEmpty()
  @ApiProperty({ example: {} })
  lastPlace: Record<string, never> | { id: number; longitude: number; latitude: number };
}
