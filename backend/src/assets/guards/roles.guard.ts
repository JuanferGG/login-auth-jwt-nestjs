import {
    CanActivate,
    ExecutionContext,
    Injectable,
    HttpException,
  } from '@nestjs/common';
  import { Reflector } from '@nestjs/core';
  import { ROLES_KEY } from '../decorators/roles.decorator';
  
  @Injectable()
  export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) {}
  
    canActivate(context: ExecutionContext): boolean {
      const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
        context.getHandler(),
        context.getClass(),
      ]);
      if (!requiredRoles) {
        return true; //* No roles requeridos = acceso libre
      }
  
      const request = context.switchToHttp().getRequest();
      const user = request.user;
  
      if (!requiredRoles.includes(user.role)) {
        throw new HttpException('No tienes persimo para acceder a esta ruta', 403);
      }
  
      return true;
    }
  }
  