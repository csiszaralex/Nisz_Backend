import { Controller, Post, Body, ValidationPipe, UseGuards } from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { PermissionsGuard } from 'src/users/guards/permissions.guard';
import { Permissions } from 'src/users/decorators/permissions.decorator';
import { GetUsername } from 'src/users/decorators/get-username.decorator';

@ApiTags('Permission')
@Controller('permissions')
export class PermissionsController {
  constructor(private readonly permissionsService: PermissionsService) {}

  @Post()
  @Permissions('PERMISSION')
  @UseGuards(PermissionsGuard)
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Jogosultság létrehozása' })
  @ApiResponse({ status: 201, description: 'Sikeres művelet' })
  @ApiResponse({ status: 400, description: 'Hibásan megadott adatok' })
  @ApiResponse({ status: 401, description: 'Hibás token' })
  @ApiResponse({ status: 403, description: 'Nincs jogosultság' })
  @ApiResponse({ status: 409, description: 'Már létezik ilyen kódú jogosutság' })
  @ApiResponse({ status: 500, description: 'Szerverhiba' })
  createPermission(
    @Body(ValidationPipe) createPermissionDto: CreatePermissionDto,
    @GetUsername() name: string,
  ) {
    return this.permissionsService.createPermission(createPermissionDto, name);
  }
}
