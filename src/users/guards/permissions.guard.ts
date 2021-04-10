import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(ctx: ExecutionContext): boolean {
    const requiredPermissions = this.reflector
      .getAllAndOverride<string[]>('permission', [ctx.getHandler(), ctx.getClass()])
      .map(perm => perm.toUpperCase());

    const { user } = ctx.switchToHttp().getRequest();

    if (user.permission?.includes('ADMIN')) return true;
    return requiredPermissions.some(perm => user.permissions?.includes(perm));
  }
}
