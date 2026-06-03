import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('family_members')
export class FamilyMember {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  familyId!: string;

  @Column()
  userId!: string;

  @Column()
  role!: 'OWNER' | 'ADMIN' | 'MEMBER' | 'CHILD' | 'ELDER' | 'GUEST';

  @Column({ default: true })
  canShareLocation!: boolean;

  @Column({ default: true })
  canReceiveAlerts!: boolean;

  @Column({ default: false })
  canManageDevices!: boolean;

  @Column({ default: 'ACTIVE' })
  status!: 'ACTIVE' | 'INVITED' | 'BLOCKED' | 'REMOVED';

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}