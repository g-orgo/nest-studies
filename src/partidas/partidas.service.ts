import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Partida } from 'src/partidas/interface/partida.interface';

@Injectable()
export class PartidasService {
  constructor(
    @InjectModel('Partidas') private readonly partidaModel: Model<Partida>,
  ) {}

  async criarPartida(): Promise<Partida> {

    return
  };
}
