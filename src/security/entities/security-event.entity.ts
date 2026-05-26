import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('security_events')
export class SecurityEvent {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string;

  @Column()
  message: string;

  @Column({ nullable: true })
  ip?: string;

  @Column({ nullable: true })
  path?: string;

  @Column({ nullable: true })
  method?: string;

  @Column({ nullable: true })
  userAgent?: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  metadata?: string;

  @CreateDateColumn()
  createdAt: Date;
}