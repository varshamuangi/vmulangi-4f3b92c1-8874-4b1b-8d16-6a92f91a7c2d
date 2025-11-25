import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Organization } from '../organizations/entities/organization.entity';
import { User } from '../users/entities/user.entity';
import { Role } from '../common/enums/role.enum';

@Injectable()
export class SeedService {
    private logger = new Logger('SeedService');

    constructor(
        @InjectRepository(Organization)
        private readonly orgRepo: Repository<Organization>,
        @InjectRepository(User)
        private readonly userRepo: Repository<User>,
    ) { }

    async runSeedIfNeeded() {
        const orgCount = await this.orgRepo.count();
        const userCount = await this.userRepo.count();

        // Already seeded → skip
        if (orgCount > 0 || userCount > 0) {
            this.logger.log('🌱 Seed skipped — database already contains data.');
            return;
        }

        this.logger.log('🌱 Running initial database seed...');

        // Create organization
        const org = this.orgRepo.create({
            id: 'demo-org',
            name: 'Demo Organization',
            description: 'Auto-generated organization',
        });
        await this.orgRepo.save(org);

        // Create demo admin
        const admin = this.userRepo.create({
            id: 'demo-admin-1',
            email: 'admin@demo.com',
            password: 'admin123', // You can hash later
            firstName: 'Admin',
            lastName: 'User',
            role: Role.ADMIN,
            organizationId: org.id,
            isDemo: true,
        });
        await this.userRepo.save(admin);

        // Create demo owner
        const owner = this.userRepo.create({
            id: 'demo-owner-1',
            email: 'owner@demo.com',
            password: 'owner123',
            firstName: 'Owner',
            lastName: 'User',
            role: Role.OWNER,
            organizationId: org.id,
            isDemo: true,
        });
        await this.userRepo.save(owner);

        this.logger.log('✅ Seed completed successfully.');
    }
}
