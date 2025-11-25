import { Module, OnModuleInit } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeedService } from './seed.service';
import { SeedModule } from './seed.module';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'sqlite',
            database: 'database.sqlite',

            // ✔ FIXED ENTITY PATH
            entities: [__dirname + '/../**/*.entity.{ts,js}'],

            synchronize: true,
            logging: true,
        }),

        SeedModule,
    ],
})
export class DatabaseModule implements OnModuleInit {
    constructor(private readonly seedService: SeedService) { }

    async onModuleInit() {
        await this.seedService.run();
    }
}
