import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('events')
export class EventEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  eventId!: string;

  @Column()
  userId!: string;

  @Column()
  status!: string;

  @Column()
  level!: string;

  @Column('decimal', { precision: 10, scale: 7 })
  lat!: number;

  @Column('decimal', { precision: 10, scale: 7 })
  lng!: number;

  @Column('decimal', { precision: 8, scale: 2, nullable: true })
  accuracy!: number;

  @Column({ default: 'mobile_app' })
  source!: string;

  @Column({ default: 1 })
  priority!: number;

  @CreateDateColumn()
  createdAt!: Date;
}