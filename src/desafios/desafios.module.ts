import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JogadoresModule } from 'src/jogadores/jogadores.module';
import { DesafiosController } from './desafios.controller';
import { DesafiosService } from './desafios.service';
import { DesafiosSchema } from './interface/desafio.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Desafios', schema: DesafiosSchema }]),
    JogadoresModule,
  ],
  controllers: [DesafiosController],
  providers: [DesafiosService],
})
export class DesafiosModule {}
