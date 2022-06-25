import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Desafio } from './interface/desafio.interface';
import { CriarDesafioDTO } from './dtos/criar-desafio.dto';
import { CategoriasService } from 'src/categorias/categorias.service';
import { JogadoresService } from 'src/jogadores/jogadores.service';
import { Jogador } from 'src/jogadores/interfaces/jogador.interface';
import { Model } from 'mongoose';

@Injectable()
export class DesafiosService {
  constructor(
    @InjectModel('Desafio') private readonly desafioModel: Model<Desafio>,
    private readonly jogadoresService: JogadoresService,
    private readonly categoriasService: CategoriasService,
  ) {}

  async criarDesafio(criarDesafioDto: CriarDesafioDTO): Promise<Desafio> {
    const { jogadores, solicitante, dataHoraDesafio } = criarDesafioDto;

    const jogadoresNoDesafio = await this.desafioModel.find(jogadores).exec();

    if (
      !jogadores.some(
        (elementInIt: Jogador) => elementInIt._id === solicitante._id,
      )
    )
      throw new BadRequestException(
        `O solicitante  ${solicitante.nome} não é um dos jogadores da partida.`,
      );
    return;
  }
}
