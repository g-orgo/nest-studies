import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AtualizarJogadorDto } from './dtos/atualizar-jogador.dto';
import { CriarJogadorDto } from './dtos/criar-jogador.dto';
import { Jogador } from './interfaces/jogador.interface';

@Injectable()
export class JogadoresService {
  constructor(
    @InjectModel('Jogador') private readonly jogadorModel: Model<Jogador>,
  ) {}

  async criarJogador(criaJogadorDto: CriarJogadorDto): Promise<Jogador> {
    const { email } = criaJogadorDto;

    const jogadorEncontrado = await this.jogadorModel.findOne({ email }).exec();

    if (jogadorEncontrado) {
      throw new BadRequestException(
        `Jogador com o e-mail ${email} já cadastrado`,
      );
    }

    const jogadorCriado = new this.jogadorModel(criaJogadorDto);
    return await jogadorCriado.save();
  }

  async atualizarJogador(
    _id: string,
    atualizaJogadorDto: AtualizarJogadorDto,
  ): Promise<void> {
    const jogadorEncontrado = await this.jogadorModel.findOne({ _id }).exec();

    if (!jogadorEncontrado) {
      throw new NotFoundException(`Jogador com id ${_id} não encontrado`);
    }
    await this.jogadorModel
      .findOneAndUpdate({ _id }, { $set: atualizaJogadorDto })
      .exec();
  }

  async consultarJogadorPeloId(_id: string): Promise<Jogador> {
    const jogadorEncontrado = await this.jogadorModel.findOne({ _id }).exec();
    if (!jogadorEncontrado)
      throw new NotFoundException('Nenhum jogador com este _id foi encontrado');
    return jogadorEncontrado;
  }

  async consultarTodosJogadores(): Promise<Jogador[]> {
    return await this.jogadorModel.find().exec();
  }

  async deletarJogador(_id: string): Promise<any> {
    return await this.jogadorModel.deleteOne({ _id }).exec();
  }
}
