import { Injectable, Logger, NotFoundException } from '@nestjs/common';
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

  async consultarJogadorPeloEmail(email: string): Promise<Jogador> {
    const jogadorEncontrado = this.jogadores.find(
      (jogador: Jogador) => jogador.email === email,
    );
    if (!jogadorEncontrado)
      throw new NotFoundException(
        'Nenhum jogador com este email foi encontrado',
      );
    return jogadorEncontrado;
  }

  async criarAtualizarJogador(criaJogadorDto: CriarJogadorDto): Promise<void> {
    const { email } = criaJogadorDto;

    const jogadorEncontrado = this.jogadores.find(
      (jogador: Jogador) => jogador.email === email,
    );

    if (jogadorEncontrado) {
      return this.atualizar(jogadorEncontrado, criaJogadorDto);
    } else this.criar(criaJogadorDto);
  }

  async deletarJogador(email: string): Promise<void> {
    const jogadorEncontrado = this.jogadores.find(
      (jogador: Jogador) => jogador.email === email,
    );

    if (!jogadorEncontrado)
      throw new NotFoundException('Este jogador não existe');
    this.jogadores = this.jogadores.filter(
      (jogador: Jogador) => jogador !== jogadorEncontrado,
    );
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
