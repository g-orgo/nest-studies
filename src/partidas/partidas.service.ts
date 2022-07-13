import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Partida } from 'src/desafios/interface/desafio.interface';

@Injectable()
export class PartidasService {
  constructor(
    @InjectModel('Partidas') private readonly partidasModel: Model<Partida>,
  ) {}

  async criarPartida(): Promise<Partida> {
    
    
    return
  };
}
