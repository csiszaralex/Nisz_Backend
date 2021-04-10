import {
  Controller,
  Post,
  Body,
  Param,
  ValidationPipe,
  Put,
  ParseIntPipe,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SigninUserDto } from './dto/signin-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { PermissionsGuard } from './guards/permissions.guard';
import { Permissions } from './decorators/permissions.decorator';

@ApiTags('User')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // @Post('signup')
  // @ApiOperation({ summary: 'Felhasználó regisztrálása' })
  // @ApiResponse({ status: 201, description: 'Felhasználó létrehozva' })
  // @ApiResponse({ status: 400, description: 'Hibás adatok küldve' })
  // @ApiResponse({ status: 409, description: 'Már letezik felhasználó a megadott adatokkal' })
  // @ApiResponse({ status: 500, description: 'Szerverhiba' })
  // createUser(@Body(ValidationPipe) createUserDto: CreateUserDto): Promise<{ accessToken: string }> {
  //   return this.usersService.createUser(createUserDto);
  // }

  // @Post('signin')
  // @ApiOperation({ summary: 'Felhasználó beléptetése' })
  // @ApiResponse({ status: 201, description: 'Sikeres bejelentkezés' })
  // @ApiResponse({ status: 400, description: 'Hibás adatok küldve' })
  // @ApiResponse({ status: 500, description: 'Szerverhiba' })
  // signIn(@Body(ValidationPipe) signinUserDto: SigninUserDto): Promise<{ accessToken: string }> {
  //   return this.usersService.signinUser(signinUserDto);
  // }

  // @Put('permission/:code/:id')
  // @Permissions('PERMISSION')
  // @UseGuards(PermissionsGuard)
  // @UseGuards(AuthGuard())
  // @ApiBearerAuth()
  // @ApiOperation({ summary: 'Jogosultság hozzáadása egy felhasználóhoz' })
  // @ApiResponse({ status: 200, description: 'Sikeres művelet' })
  // @ApiResponse({ status: 400, description: 'Az ID számmá konvertálása sikertelen' })
  // @ApiResponse({ status: 401, description: 'Hibás Token' })
  // @ApiResponse({ status: 403, description: 'Nincs jogosultság' })
  // @ApiResponse({ status: 404, description: 'Nincs ilyen IDjű, vagy kódú adat az adatbázisban' })
  // @ApiResponse({ status: 500, description: 'Szerverhiba' })
  // addPermission(@Param('code') code: string, @Param('id', ParseIntPipe) id: number) {
  //   return this.usersService.addPermission(code, id);
  // }

  // @Delete('permission/:code/:id')
  // @Permissions('PERMISSION')
  // @UseGuards(PermissionsGuard)
  // @UseGuards(AuthGuard())
  // @ApiBearerAuth()
  // @ApiOperation({ summary: 'Jogosultság eltávolítása egy felhasználótól' })
  // @ApiResponse({ status: 200, description: 'Sikeres művelet' })
  // @ApiResponse({ status: 400, description: 'Az ID számmá konvertálása sikertelen' })
  // @ApiResponse({ status: 401, description: 'Hibás Token' })
  // @ApiResponse({ status: 403, description: 'Nincs jogosultság' })
  // @ApiResponse({ status: 404, description: 'Nincs ilyen IDjű, vagy kódú adat az adatbázisban' })
  // @ApiResponse({ status: 500, description: 'Szerverhiba' })
  // removePermission(@Param('code') code: string, @Param('id', ParseIntPipe) id: number) {
  //   return this.usersService.removePermission(code, id);
  // }
}
