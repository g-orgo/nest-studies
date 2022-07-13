import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoriasModule } from 'src/categorias/categorias.module';
import { JogadoresModule } from 'src/jogadores/jogadores.module';
import { PartidasModule } from 'src/partidas/partidas.module';
import { DesafiosController } from './desafios.controller';
import { DesafiosService } from './desafios.service';
import { DesafiosSchema } from './interface/desafio.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Desafios', schema: DesafiosSchema }]),
    JogadoresModule,
    CategoriasModule,
    PartidasModule,
  ],
  controllers: [DesafiosController],
  providers: [DesafiosService],
})
export class DesafiosModule {}
