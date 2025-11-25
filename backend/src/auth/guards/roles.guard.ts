import {
    Injectable,
    CanActivate,
    ExecutionContext,
    ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '../../common/enums/role.enum';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) { }

    canActivate(ctx: ExecutionContext): boolean {
        const requiredRoles = this.reflector.get<Role[]>(
            'roles',
            ctx.getHandler(),
        );

        if (!requiredRoles || requiredRoles.length === 0) return true;

        const request = ctx.switchToHttp().getRequest();
        const user = request.user;

        if (!user) throw new ForbiddenException('No user');

        const hasRole = requiredRoles.includes(user.role);

        if (!hasRole) {
            throw new ForbiddenException('Forbidden resource');
        }

        return true;
    }
}
