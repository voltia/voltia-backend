import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('place_submissions')
export class PlaceSubmission {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  userId!: string;

  @Column()
  placeName!: string;

  @Column('float')
  latitude!: number;

  @Column('float')
  longitude!: number;

  @Column()
  description!: string;

  @Column({ default: 'pending' })
  status!: 'pending' | 'approved' | 'rejected';

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt!: Date;
}