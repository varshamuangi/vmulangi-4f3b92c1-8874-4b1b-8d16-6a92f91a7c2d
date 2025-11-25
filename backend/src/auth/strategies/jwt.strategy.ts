import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from '../../users/users.service';
import { Role } from '../../common/enums/role.enum';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private usersService: UsersService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET || 'super-secret-key',
        });
    }

    async validate(payload: any) {
        // DEMO USERS
        if (payload.isDemo) {
            return {
                id: payload.sub,
                email: payload.email,
                role: payload.role,
                organizationId: payload.organizationId,
                isDemo: true,
            };
        }

        // DB USERS
        const user = await this.usersService.findOne(payload.sub);
        if (!user) throw new UnauthorizedException();

        return {
            ...user,
            role: user.role.toUpperCase() as Role,
        };
    }
}
