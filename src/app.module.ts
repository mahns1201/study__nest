import { Module } from '@nestjs/common';
import { MoviesModule } from './movies/movies.module';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';

// import typeorm config
// import {typeORMConfig} from "./configs/typeorm.config";
// imports: [TypeORMModule.forRoot(typeORMConfig)]
@Module({
  imports: [MoviesModule, AuthModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
