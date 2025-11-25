import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Organization } from '../organizations/entities/organization.entity';
import { User } from '../users/entities/user.entity';
import { Role } from '../common/enums/role.enum';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class SeedService {
    constructor(
        @InjectRepository(Organization)
        private readonly organizationRepo: Repository<Organization>,

        @InjectRepository(User)
        private readonly userRepo: Repository<User>,
    ) { }

    async run() {
        // Create organization if not exists
        let org = await this.organizationRepo.findOne({
            where: { id: 'demo-org' },
        });

        if (!org) {
            org = this.organizationRepo.create({
                id: 'demo-org',
                name: 'Demo Organization',
                description: 'Auto seeded demo organization',
            });

            await this.organizationRepo.save(org);
            console.log('✔ Seeded organization');
        }

        // Create admin user if not exists
        const existingAdmin = await this.userRepo.findOne({
            where: { id: 'demo-admin-1' },
        });

        if (!existingAdmin) {
            const admin = this.userRepo.create({
                id: 'demo-admin-1',
                email: 'admin@demo.com',
                password: await bcrypt.hash('admin123', 10),
                firstName: 'Admin',
                lastName: 'User',
                role: Role.ADMIN,
                organization: org,
                isDemo: true,
            });

            await this.userRepo.save(admin);
            console.log('✔ Seeded admin user');
        }
    }
}
