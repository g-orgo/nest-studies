import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PartidaSchema } from './interface/partida.schema';
import { PartidasController } from './partidas.controller';
import { PartidasService } from './partidas.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Partidas', schema: PartidaSchema }]),
  ],
  controllers: [PartidasController],
  providers: [PartidasService],
  exports: [PartidasService],
})
export class PartidasModule {}
