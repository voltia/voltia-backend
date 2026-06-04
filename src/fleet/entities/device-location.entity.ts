import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('device_locations')
export class DeviceLocation {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Index()
  @Column({ type: 'text' })
  deviceId!: string;

  @Index()
  @Column({ type: 'text', nullable: true })
  familyId!: string | null;

  @Index()
  @Column({ type: 'text', nullable: true })
  userId!: string | null;

  @Column({ type: 'double precision' })
  latitude!: number;

  @Column({ type: 'double precision' })
  longitude!: number;

  @Column({ type: 'double precision', nullable: true })
  speed!: number | null;

  @Column({ type: 'double precision', nullable: true })
  heading!: number | null;

  @Column({ type: 'double precision', nullable: true })
  accuracy!: number | null;

  @Column({ type: 'integer', nullable: true })
  battery!: number | null;

  @Column({ type: 'text', default: 'NORMAL' })
  eventType!: 'NORMAL' | 'SOS' | 'ALERT' | 'GEOFENCE' | 'OFFLINE_SYNC';

  @Column({ type: 'text', default: 'LOW' })
  riskLevel!: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';

  @CreateDateColumn()
  createdAt!: Date;
}