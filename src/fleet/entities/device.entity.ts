import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('devices')
export class Device {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Index()
  @Column()
  ownerId!: string;

  @Index()
  @Column({ nullable: true })
  familyId!: string;

  @Column()
  name!: string;

  @Column()
  deviceType!: 'PHONE' | 'TABLET' | 'WATCH' | 'GPS_TRACKER' | 'VEHICLE_DEVICE' | 'IOT';

  @Column()
  platform!: 'IOS' | 'ANDROID' | 'WEB' | 'GPS' | 'UNKNOWN';

  @Index()
  @Column({ unique: true })
  fingerprint!: string;

  @Column({ default: 100 })
  trustScore!: number;

  @Column({ default: 'OFFLINE' })
  status!: 'ONLINE' | 'OFFLINE' | 'IDLE' | 'MOVING' | 'ALERT' | 'SOS' | 'BLOCKED';

  @Column({ type: 'double precision', nullable: true })
  latitude!: number;

  @Column({ type: 'double precision', nullable: true })
  longitude!: number;

  @Column({ type: 'double precision', nullable: true })
  speed!: number;

  @Column({ type: 'double precision', nullable: true })
  heading!: number;

  @Column({ nullable: true })
  lastSeenAt!: Date;

  @Column({ default: true })
  active!: boolean;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}