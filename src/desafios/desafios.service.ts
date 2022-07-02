import {
  Injectable,
  BadRequestException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Desafio } from './interface/desafio.interface';
import { CriarDesafioDTO } from './dtos/criar-desafio.dto';
import { CategoriasService } from 'src/categorias/categorias.service';
import { JogadoresService } from 'src/jogadores/jogadores.service';
import { Jogador } from 'src/jogadores/interfaces/jogador.interface';
import { Model } from 'mongoose';
import { DesafioStatus } from './interface/desafio-status.enum';

@Injectable()
export class DesafiosService {
  constructor(
    @InjectModel('Desafios') private readonly desafioModel: Model<Desafio>,
    private readonly jogadoresService: JogadoresService,
    private readonly categoriasService: CategoriasService,
  ) {}

  async criarDesafio(criarDesafioDto: CriarDesafioDTO): Promise<Desafio> {
    const { jogadores, solicitante, dataHoraDesafio } = criarDesafioDto;

    const desafiante1 = jogadores[0];
    const desafiante2 = jogadores[1];

    const desafioCriado = new this.desafioModel(criarDesafioDto);
    desafioCriado.status = DesafioStatus.PENDENTE;
    const arrayCategoriaDoSolicitante =
      await this.categoriasService.consultarCategoriaPorJogador(
        solicitante._id,
      );

    if (
      !this.jogadoresService.consultarJogadorPeloId(desafiante1._id) &&
      !this.jogadoresService.consultarJogadorPeloId(desafiante2._id)
    ) {
      /**
       * ? Caso nenhum jogador do desafio tenha registro no sistema
       */
      throw new NotFoundException(
        `Não há nenhum jogador citado para o desafio em nosso banco.`,
      );
    }

    if (
      !jogadores.some((jogador: Jogador) => jogador._id === solicitante._id)
    ) {
      /**
       * ? O solicitante tem que estar presente como participante do desafio
       */
      throw new BadRequestException(
        `O solicitante  ${solicitante.nome} não é um dos jogadores do desafio.`,
      );
    }

    if (arrayCategoriaDoSolicitante.length === 0) {
      /**
       * ? Caso o jogador não esteja presente em nenhuma categoria
       */

      throw new BadRequestException(
        `O Solicitante ${solicitante.nome} não está presente em nenhuma categoria`,
      );
    }

    new Logger().log(
      `Jogador da categoria ${arrayCategoriaDoSolicitante} solicitou um desafio às ${dataHoraDesafio}`,
    );

    return await desafioCriado.save();
  }

  async consultarDesafios(idJogador?: string): Promise<Array<Desafio>> {
    if (idJogador) {
      /**
       * ? Caso exista um id de jogador para ser consultado
       */

      if (!this.jogadoresService.consultarJogadorPeloId(idJogador))
        throw new NotFoundException(`O solicitante ${idJogador} não existe`);

      return await this.desafioModel
        .find({})
        .where('jogadores')
        .in([idJogador])
        .populate('jogadores')
        .exec();
    } else {
      /**
       * ? Caso não exista um id de jogador para ser consultado
       */
      return await this.desafioModel.find().populate('jogadores').exec();
    }
  }

  async deletarDesafio(idDesafio: string): Promise<Desafio> {
    if (
      !(await this.desafioModel.find({}).exec()).some(
        (desafio: Desafio) => desafio._id === idDesafio,
      )
    )
      throw new NotFoundException(`O desafio ${idDesafio} não existe`);

    const desafioParaSerCanceladoAtualizado = await this.desafioModel
      .findOne({
        _id: idDesafio,
      })
      .exec();

    desafioParaSerCanceladoAtualizado.status = DesafioStatus.CANCELADO;

    this.desafioModel
      .findOneAndUpdate({ idDesafio, $set: desafioParaSerCanceladoAtualizado })
      .exec();
    return desafioParaSerCanceladoAtualizado;
  }
}
