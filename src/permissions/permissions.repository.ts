import { EntityRepository, Repository } from 'typeorm';
import { Permission } from './entities/permission.entity';
import { ConflictException, InternalServerErrorException, Logger } from '@nestjs/common';

@EntityRepository(Permission)
export class PermissionsRepository extends Repository<Permission> {
  private logger = new Logger('PermissionRepository');

  async createPermission(name, desc, code, uName) {
    this.logger.log(`Permission creation started by ${uName}`);
    const permission = new Permission();
    permission.name = name;
    permission.description = desc;
    permission.code = code;

    try {
      await permission.save();
      this.logger.verbose(`Permission ${code} has successfully registered by user ${uName}`);
      return permission;
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY')
        throw new ConflictException('Permission code already exists');
      else {
        this.logger.warn(error);
        throw new InternalServerErrorException();
      }
    }
  }
}
