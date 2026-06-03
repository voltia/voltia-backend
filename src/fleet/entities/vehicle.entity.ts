import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('vehicles')
export class Vehicle {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Index()
  @Column()
  ownerId!: string;

  @Index()
  @Column({ nullable: true })
  familyId!: string;

  @Column()
  nickname!: string;

  @Column({ nullable: true })
  plate!: string;

  @Column({ nullable: true })
  brand!: string;

  @Column({ nullable: true })
  model!: string;

  @Column({ nullable: true })
  year!: number;

  @Column({ nullable: true })
  linkedDeviceId!: string;

  @Column({ default: 'ACTIVE' })
  status!: 'ACTIVE' | 'INACTIVE' | 'MOVING' | 'PARKED' | 'ALERT' | 'SOS';

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}