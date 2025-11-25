import {
    IsEmail,
    IsNotEmpty,
    IsString,
    MinLength,
    IsOptional,
    IsEnum
} from 'class-validator';
import { Role } from '../../common/enums/role.enum';

export class RegisterDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @MinLength(6)
    password: string;

    @IsString()
    @IsNotEmpty()
    firstName: string;

    @IsString()
    @IsNotEmpty()
    lastName: string;

    @IsString()
    @IsNotEmpty()
    organizationId: string;

    @IsOptional()
    @IsEnum(Role)
    role?: Role;   // <--------- FIXED
}
