import { ArrayMaxSize, ArrayMinSize, IsArray } from 'class-validator';
import { Jogador } from 'src/jogadores/interfaces/jogador.interface';

export class CriarPartidaDTO {
  @IsArray()
  @ArrayMinSize(2)
  @ArrayMaxSize(2)
  jogadores: Array<Jogador>;
}
