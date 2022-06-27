import {
  Body,
  Controller,
  Get,
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

  @Get()
  async consultarDesafios(): Promise<Desafio[]> {
    return await this.desafioService.consultarTodosDesafios();
  }
}
