import { Body, Controller, Post } from '@nestjs/common';
import { TacticalResponseService } from './tactical-response.service';

@Controller('tactical-response')
export class TacticalResponseController {
  constructor(
    private readonly tacticalResponseService: TacticalResponseService,
  ) {}

  @Post('execute')
  execute(@Body() body: any) {
    return this.tacticalResponseService.execute(body);
  }
}