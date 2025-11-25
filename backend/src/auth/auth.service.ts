import {
    Injectable,
    UnauthorizedException,
    ConflictException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { AuditLogService } from '../audit-log/audit-log.service';
import { Role } from '../common/enums/role.enum';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
        private readonly auditLogService: AuditLogService,
    ) { }

    async register(registerDto: RegisterDto) {
        const existingUser = await this.usersService.findByEmail(registerDto.email);
        if (existingUser) {
            throw new ConflictException('Email already exists');
        }

        const hashedPassword = await bcrypt.hash(registerDto.password, 10);

        const user = await this.usersService.create({
            ...registerDto,
            role: registerDto.role ?? Role.VIEWER,


            password: hashedPassword,
        });

        await this.auditLogService.log({
            userId: user.id,
            userEmail: user.email,
            action: 'USER_REGISTERED',
            resource: 'User',
            resourceId: user.id,
        });

        const { password, ...clean } = user;
        return clean;
    }

    async login(loginDto: LoginDto) {
        const email = loginDto?.email?.toLowerCase().trim();
        const password = loginDto?.password?.trim();

        if (!email || !password) {
            throw new UnauthorizedException('Email and password are required');
        }

        //---------------------------------
        // DEMO USERS (role FIXED)
        //---------------------------------
        const demoUsers = [
            {
                id: 'demo-admin-1',
                email: 'admin@demo.com',
                password: 'admin123',
                firstName: 'Admin',
                lastName: 'User',
                role: Role.ADMIN,
                organizationId: 'demo-org',
                isDemo: true,
            },
            {
                id: 'demo-owner-1',
                email: 'owner@demo.com',
                password: 'owner123',
                firstName: 'Owner',
                lastName: 'User',
                role: Role.OWNER,
                organizationId: 'demo-org',
                isDemo: true,
            },
        ];

        const demoUser = demoUsers.find(
            (u) => u.email === email && u.password === password,
        );

        if (demoUser) {
            const payload = {
                sub: demoUser.id,
                email: demoUser.email,
                role: demoUser.role,
                organizationId: demoUser.organizationId,
                isDemo: true,
            };

            return {
                access_token: this.jwtService.sign(payload),
                user: demoUser,
            };
        }

        //---------------------------------
        // NORMAL USERS
        //---------------------------------
        const user = await this.usersService.findByEmail(email);

        if (!user) throw new UnauthorizedException('Invalid credentials');

        const valid = await bcrypt.compare(password, user.password);
        if (!valid) throw new UnauthorizedException('Invalid credentials');

        const payload = {
            sub: user.id,
            email: user.email,
            role: user.role.toUpperCase(),
            organizationId: user.organizationId,
            isDemo: false,
        };

        return {
            access_token: this.jwtService.sign(payload),
            user: {
                id: user.id,
                email: user.email,
                role: payload.role,
                firstName: user.firstName,
                lastName: user.lastName,
                organizationId: user.organizationId,
            },
        };
    }

    async validateUser(id: string) {
        return this.usersService.findOne(id);
    }
}
