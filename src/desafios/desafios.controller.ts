import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { DesafiosService } from './desafios.service';
import { CriarDesafioDTO } from './dtos/criar-desafio.dto';
import { Desafio } from './interface/desafio.interface';

@Controller('api/v1/desafios')
export class DesafiosController {
  constructor(private readonly desafioService: DesafiosService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async criarDesafio(
    @Body() criarDesafioDto: CriarDesafioDTO,
  ): Promise<Desafio> {
    return await this.desafioService.criarDesafio(criarDesafioDto);
  }

  @Post('/:idDesafio/partida/:idPartida')
  @UsePipes(ValidationPipe)
  async atribuirDesafioNaPartida(
    @Param('idDesafio') idDesafio: string,
    @Param('idPartida') idPartida: string,
  ): Promise<void> {
    await this.desafioService.atribuirDesafioNaPartida(idDesafio, idPartida);
  }

  @Get()
  async consultarDesafios(): Promise<Desafio[]> {
    return await this.desafioService.consultarDesafios();
  }

  @Get('/jogadores/:idJogador')
  async consultarDesafiosDoJogador(
    @Param('idJogador') idJogador: string,
  ): Promise<Desafio[]> {
    return await this.desafioService.consultarDesafios(idJogador);
  }

  @Delete('/:idDesafio')
  async deletarDesafio(
    @Param('idDesafio') idDesafio: string,
  ): Promise<Desafio> {
    return await this.desafioService.deletarDesafio(idDesafio);
  }
}
