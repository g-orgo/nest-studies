import { Document } from 'mongoose';
import { Resultado } from 'src/desafios/interface/desafio.interface';
import { Jogador } from 'src/jogadores/interfaces/jogador.interface';

export interface Partida extends Document {
  categoria: string;
  jogadores: Jogador[];
  def: Jogador;
  resultado: Resultado[];
}
