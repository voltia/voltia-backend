import { Injectable } from '@nestjs/common';

export type VoltiaMarkerType = 'USER' | 'RISK' | 'SOS' | 'PATROL' | 'SAFE_ZONE';

export interface VoltiaMarker {
  id: number;
  lat: number;
  lng: number;
  title: string;
  type: VoltiaMarkerType;
}

@Injectable()
export class MapService {
  private readonly markers: VoltiaMarker[] = [
    {
      id: 1,
      lat: 18.4861,
      lng: -69.9312,
      title: 'Usuario activo',
      type: 'USER',
    },
    {
      id: 2,
      lat: 18.5,
      lng: -69.9,
      title: 'Zona de riesgo',
      type: 'RISK',
    },
    {
      id: 3,
      lat: 18.47,
      lng: -69.95,
      title: 'SOS activo',
      type: 'SOS',
    },
    {
      id: 4,
      lat: 18.49,
      lng: -69.88,
      title: 'Patrulla VOLTIA',
      type: 'PATROL',
    },
    {
      id: 5,
      lat: 18.46,
      lng: -69.92,
      title: 'Zona segura',
      type: 'SAFE_ZONE',
    },
  ];

  getMarkers(): VoltiaMarker[] {
    return this.markers;
  }

  getPlaces(): VoltiaMarker[] {
    return this.markers;
  }

  approvePlace(id: number) {
    return {
      ok: true,
      action: 'APPROVED',
      id,
    };
  }

  rejectPlace(id: number) {
    return {
      ok: true,
      action: 'REJECTED',
      id,
    };
  }

  deletePlace(id: number) {
    return {
      ok: true,
      action: 'DELETED',
      id,
    };
  }
}