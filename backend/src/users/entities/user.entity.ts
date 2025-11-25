import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
    ManyToOne,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';
import { Task } from '../../tasks/entities/task.entity';
import { Organization } from '../../organizations/entities/organization.entity';
import { Role } from '../../common/enums/role.enum';

@Entity('users')
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column({ type: 'simple-enum', enum: Role, default: Role.VIEWER })
    role: Role;

    // 🔥 Needed for demo accounts
    @Column({ default: false })
    isDemo: boolean;

    // 🔥 Foreign Key Reference
    @Column()
    organizationId: string;

    @ManyToOne(() => Organization, (org) => org.users)
    organization: Organization;

    // 🔥 Relations added for tasks
    @OneToMany(() => Task, (task) => task.createdBy)
    createdTasks: Task[];

    @OneToMany(() => Task, (task) => task.assignedTo)
    assignedTasks: Task[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
