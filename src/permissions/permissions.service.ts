import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { PermissionsRepository } from './permissions.repository';

@Injectable()
export class PermissionsService {
  constructor(
    @InjectRepository(PermissionsRepository) private permissionRepository: PermissionsRepository,
  ) {}

  createPermission(createPermissionDto: CreatePermissionDto, uName: string) {
    const { name, description, code } = createPermissionDto;
    return this.permissionRepository.createPermission(name, description, code.toUpperCase(), uName);
  }
}
