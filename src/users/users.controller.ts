import {
  Controller,
  Post,
  Body,
  Param,
  ValidationPipe,
  Put,
  Get,
  ParseIntPipe,
  Delete,
  UseGuards,
  Ip,
  HttpCode,
  Query,
  Header,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { InfectedUserDto } from './dto/infected-user.dto';
import { SigninUserDto } from './dto/signin-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUserid } from './decorators/get-userid.decorator';
import { PermissionsGuard } from './guards/permissions.guard';
import { Permissions } from './decorators/permissions.decorator';
import { TimerInterceptor } from './interceptors/timer.interceptor';

@ApiTags('User')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('infected')
  @HttpCode(215)
  @Header('Asd', 'Sajááát')
  @UseInterceptors(TimerInterceptor)
  // @Redirect('https://google.com', 302)
  @ApiOperation({ summary: 'Fertőzött felhasználók kilistázása' })
  @ApiResponse({ status: 200, description: 'Sikeres művelet', type: InfectedUserDto })
  @ApiResponse({ status: 500, description: 'Szerverhiba' })
  listInfected(@Ip() ip, @Query('asd') query): Promise<InfectedUserDto[]> {
    console.log('IP: ', ip);
    console.log('QUERY: ', query);

    return this.usersService.listInfected();
  }

  @Post('signup')
  @ApiOperation({ summary: 'Felhasználó regisztrálása' })
  @ApiResponse({ status: 201, description: 'Felhasználó létrehozva' })
  @ApiResponse({ status: 400, description: 'Hibás adatok küldve' })
  @ApiResponse({ status: 409, description: 'Már letezik felhasználó a megadott adatokkal' })
  @ApiResponse({ status: 500, description: 'Szerverhiba' })
  createUser(@Body(ValidationPipe) createUserDto: CreateUserDto): Promise<{ accessToken: string }> {
    return this.usersService.createUser(createUserDto);
  }

  @Post('signin')
  @ApiOperation({ summary: 'Felhasználó beléptetése' })
  @ApiResponse({ status: 201, description: 'Sikeres bejelentkezés' })
  @ApiResponse({ status: 400, description: 'Hibás adatok küldve' })
  @ApiResponse({ status: 500, description: 'Szerverhiba' })
  signIn(@Body(ValidationPipe) signinUserDto: SigninUserDto): Promise<{ accessToken: string }> {
    return this.usersService.signinUser(signinUserDto);
  }

  @Put('infected/')
  @UseGuards(AuthGuard())
  @ApiOperation({ summary: 'Felhasználó jelentése, hogy beteg' })
  @ApiResponse({ status: 200, description: 'Sikeres művelet' })
  @ApiResponse({ status: 400, description: 'Az ID számmá konvertálása sikertelen' })
  @ApiResponse({ status: 401, description: 'Hibás token' })
  @ApiResponse({ status: 500, description: 'Szerverhiba' })
  iHaveCovid(@GetUserid() id: number): Promise<string> {
    return this.usersService.iHaveCovid(id);
  }

  @Put('permission/:code/:id')
  @Permissions('PERMISSION')
  @UseGuards(PermissionsGuard)
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Jogosultság hozzáadása egy felhasználóhoz' })
  @ApiResponse({ status: 200, description: 'Sikeres művelet' })
  @ApiResponse({ status: 400, description: 'Az ID számmá konvertálása sikertelen' })
  @ApiResponse({ status: 401, description: 'Hibás Token' })
  @ApiResponse({ status: 403, description: 'Nincs jogosultság' })
  @ApiResponse({ status: 404, description: 'Nincs ilyen IDjű, vagy kódú adat az adatbázisban' })
  @ApiResponse({ status: 500, description: 'Szerverhiba' })
  addPermission(@Param('code') code: string, @Param('id', ParseIntPipe) id: number) {
    return this.usersService.addPermission(code, id);
  }

  @Delete('permission/:code/:id')
  @Permissions('PERMISSION')
  @UseGuards(PermissionsGuard)
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Jogosultság eltávolítása egy felhasználótól' })
  @ApiResponse({ status: 200, description: 'Sikeres művelet' })
  @ApiResponse({ status: 400, description: 'Az ID számmá konvertálása sikertelen' })
  @ApiResponse({ status: 401, description: 'Hibás Token' })
  @ApiResponse({ status: 403, description: 'Nincs jogosultság' })
  @ApiResponse({ status: 404, description: 'Nincs ilyen IDjű, vagy kódú adat az adatbázisban' })
  @ApiResponse({ status: 500, description: 'Szerverhiba' })
  removePermission(@Param('code') code: string, @Param('id', ParseIntPipe) id: number) {
    return this.usersService.removePermission(code, id);
  }
}
