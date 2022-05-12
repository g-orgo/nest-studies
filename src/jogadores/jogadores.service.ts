import { Injectable, Logger } from '@nestjs/common';
import { CriarJogadorDto } from './dtos/criar-jogador.dto';
import { Jogador } from './interfaces/jogador.interface';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class JogadoresService {
  private jogadores: Jogador[] = [];

  private readonly logger = new Logger(JogadoresService.name);

  async consultarTodosJogadores(): Promise<Jogador[]> {
    return this.jogadores;
  }

  async criarAtualizarJogador(criaJogadorDto: CriarJogadorDto): Promise<void> {
    const { email } = criaJogadorDto;

    const jogadorEncontrado = await this.jogadores.find(
      (jogador: Jogador) => jogador.email === email,
    );

    if (jogadorEncontrado) {
      return await this.atualizar(jogadorEncontrado, criaJogadorDto);
    } else await this.criar(criaJogadorDto);
  }

  private criar(criaJogadorDto: CriarJogadorDto): void {
    const { nome, email, telefoneCelular } = criaJogadorDto;

    const jogador: Jogador = {
      _id: uuidv4(),
      email,
      nome,
      telefoneCelular,
      ranking: 'A',
      posicaoRanking: 1,
      urlFotoJogador: 'definitivamenteNãoUmaURL',
    };
    this.logger.log(`criarJogadorDto: ${JSON.stringify(jogador)}`);
    this.jogadores.push(jogador);
  }
  private atualizar(
    jogadorEncontrado: Jogador,
    criarJogadorDto: CriarJogadorDto,
  ): void {
    const { nome } = criarJogadorDto;

    jogadorEncontrado.nome = nome;
    this.logger.log(
      `atualizarJogadorDto: ${JSON.stringify(jogadorEncontrado)}`,
    );
  }
}
