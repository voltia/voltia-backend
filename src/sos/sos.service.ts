import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { EventEntity } from './event.entity';
import { MapGateway } from '../map/map.gateway';

@Injectable()
export class SosService {
  constructor(
    @InjectRepository(EventEntity)
    private readonly eventRepo: Repository<EventEntity>,

    private readonly mapGateway: MapGateway,
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

    const event = new EventEntity();

    event.userId = data.userId ?? '';
    event.eventId = data.eventId ?? `SOS-${Date.now()}`;
    event.status = data.status ?? 'ACTIVE';
    event.level = data.level ?? 'CRITICAL';
    event.lat = data.lat ?? 0;
    event.lng = data.lng ?? 0;
    event.accuracy = data.accuracy ?? 0;
    event.source = data.source ?? 'mobile_app';
    event.priority = data.priority ?? 1;

    const savedEvent = await this.eventRepo.save(event);

    this.mapGateway.emitMapEvent({
      type: 'SOS_ACTIVATED',
      eventId: savedEvent.id,
      userId: savedEvent.userId,
      level: savedEvent.level,
      lat: savedEvent.lat,
      lng: savedEvent.lng,
      status: savedEvent.status,
      timestamp: new Date(),
    });

    return savedEvent;
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

    const savedEvent = await this.eventRepo.save(activeEvent);

    this.mapGateway.emitMapEvent({
      type: 'SOS_CANCELED',
      eventId: savedEvent.id,
      userId: savedEvent.userId,
      level: savedEvent.level,
      lat: savedEvent.lat,
      lng: savedEvent.lng,
      status: savedEvent.status,
      timestamp: new Date(),
    });

    return savedEvent;
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
      event: activeEvent ?? null,
    };
  }
}