import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  getStatus() {
    return {
      message: 'VOLTIA Backend funcionando correctamente 🚀',
      status: 'OK',
      app: 'VOLTIA CORE',
    };
  }

  @Get('markers')
  getMarkers() {
    return [
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
  }
}