import { Controller, Post, Body, ValidationPipe, UseGuards } from '@nestjs/common';
import { PlacesService } from './places.service';
import { CreatePlaceDto } from './dto/create-place.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { GetUserid } from 'src/users/decorators/get-userid.decorator';

@ApiTags('Place')
@Controller('check-in')
export class PlacesController {
  constructor(private readonly placesService: PlacesService) {}

  @Post()
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Felhasználó jelentése, hogy volt valahol' })
  @ApiResponse({ status: 200, description: 'Sikeres művelet' })
  @ApiResponse({ status: 400, description: 'Nem megfelelő adatok' })
  @ApiResponse({ status: 401, description: 'Hibás token' })
  @ApiResponse({ status: 500, description: 'Szerverhiba' })
  iHaveBeenHere(@GetUserid() userId: number, @Body(ValidationPipe) createPlaceDto: CreatePlaceDto) {
    return this.placesService.iHaveBeenHere(userId, createPlaceDto);
  }
}
