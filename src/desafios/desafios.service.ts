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
    @InjectModel('Desafios') private readonly desafioModel: Model<Desafio>,
    private readonly jogadoresService: JogadoresService,
    private readonly categoriasService: CategoriasService,
  ) {}

  async criarDesafio(criarDesafioDto: CriarDesafioDTO): Promise<Desafio> {
    const { jogadores, solicitante, dataHoraDesafio } = criarDesafioDto;

    const jogadoresDoDesafio =
      await this.jogadoresService.consultarTodosJogadores();

    const jogadorComCategoria =
      await this.categoriasService.consultarTodasCategorias();

    if (!jogadoresDoDesafio) {
      /**
       * ? Caso nenhum jogador do desafio tenha registro no sistema
       */
      throw new BadRequestException(
        `Não há nenhum jogador citado para o desafio em nosso banco.`,
      );
    }

    if (
      !jogadores.some(
        (elementInIt: Jogador) => elementInIt._id === solicitante._id,
      )
    ) {
      /**
       * ? O solicitante tem que estar presente como participante do desafio
       */
      throw new BadRequestException(
        `O solicitante  ${solicitante.nome} não é um dos jogadores do desafio.`,
      );
    }

    return;
  }
}
