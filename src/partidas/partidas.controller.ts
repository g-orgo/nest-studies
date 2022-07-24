import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Partida } from './interface/partida.interface';

@Controller('partidas')
export class PartidasController {
  @Post()
  @UsePipes(ValidationPipe)
  async criarPartida(@Body() criarPartidaDto): Promise<Partida> {
    return;
  }
}
