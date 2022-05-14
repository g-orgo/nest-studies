import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JogadoresModule } from './jogadores/jogadores.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://gabriel-orgo:%40Mongodb323@cluster0.4q1qy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
    ),
    JogadoresModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
