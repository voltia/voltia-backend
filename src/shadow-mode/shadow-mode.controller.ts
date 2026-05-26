import { Body, Controller, Post } from '@nestjs/common';
import { ShadowModeService } from './shadow-mode.service';

@Controller('shadow-mode')
export class ShadowModeController {
  constructor(private readonly shadowModeService: ShadowModeService) {}

  @Post('activate')
  activate(@Body() body: any) {
    return this.shadowModeService.activate(body);
  }
}