import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EventEntity } from './event.entity';

@Injectable()
export class SosService {
  constructor(
    @InjectRepository(EventEntity)
    private readonly eventRepo: Repository<EventEntity>,
  ) {}

  async createEvent(data: Partial<EventEntity>) {
    const existingActive = await this.eventRepo.findOne({
      where: {
        userId: data.userId,
        status: 'ACTIVE',
      },
      order: { id: 'DESC' },
    });

    if (existingActive) {
      throw new BadRequestException(
        'Ya existe un evento SOS activo para este usuario',
      );
    }

    const event = this.eventRepo.create(data);
    return await this.eventRepo.save(event);
  }

  async getAllEvents() {
    return await this.eventRepo.find({
      order: { id: 'DESC' },
    });
  }

  async cancelEvent(userId: string) {
    const activeEvent = await this.eventRepo.findOne({
      where: {
        userId,
        status: 'ACTIVE',
      },
      order: { id: 'DESC' },
    });

    if (!activeEvent) {
      throw new BadRequestException('No hay evento activo');
    }

    activeEvent.status = 'CANCELED';
    return await this.eventRepo.save(activeEvent);
  }

  async getStatus(userId: string) {
    const activeEvent = await this.eventRepo.findOne({
      where: {
        userId,
        status: 'ACTIVE',
      },
      order: { id: 'DESC' },
    });

    return {
      active: !!activeEvent,
      event: activeEvent || null,
    };
  }
}