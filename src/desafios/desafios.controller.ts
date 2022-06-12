import { Controller } from '@nestjs/common';
import { DesafiosService } from './desafios.service';

@Controller('api/v1/desafios')
export class DesafiosController {
  constructor(private readonly desafioService: DesafiosService) {}
}
