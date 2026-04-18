import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PlaceSubmission } from './entities/place-submission.entity';

@Injectable()
export class MapService {
  constructor(
    @InjectRepository(PlaceSubmission)
    private readonly placeRepository: Repository<PlaceSubmission>,
  ) {}

  async submitPlace(body: {
    userId: string;
    placeName: string;
    latitude: number;
    longitude: number;
    description: string;
  }) {
    const place = this.placeRepository.create({
      userId: body.userId,
      placeName: body.placeName,
      latitude: body.latitude,
      longitude: body.longitude,
      description: body.description,
      status: 'pending',
    });

    const saved = await this.placeRepository.save(place);

    return {
      message: 'Lugar enviado correctamente',
      data: saved,
    };
  }

  async getPlaces() {
    return await this.placeRepository.find({
      order: { id: 'ASC' },
    });
  }

  async approvePlace(id: number) {
    const place = await this.placeRepository.findOneBy({ id });

    if (!place) {
      throw new NotFoundException('Lugar no encontrado');
    }

    place.status = 'approved';
    const updated = await this.placeRepository.save(place);

    return {
      message: 'Lugar aprobado',
      data: updated,
    };
  }

  async rejectPlace(id: number) {
    const place = await this.placeRepository.findOneBy({ id });

    if (!place) {
      throw new NotFoundException('Lugar no encontrado');
    }

    place.status = 'rejected';
    const updated = await this.placeRepository.save(place);

    return {
      message: 'Lugar rechazado',
      data: updated,
    };
  }

  async deletePlace(id: number) {
    const place = await this.placeRepository.findOneBy({ id });

    if (!place) {
      throw new NotFoundException('Lugar no encontrado');
    }

    await this.placeRepository.remove(place);

    return {
      message: 'Lugar eliminado correctamente',
      data: place,
    };
  }
}