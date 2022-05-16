import { Module } from '@nestjs/common';
import { MoviesModule } from './movies/movies.module';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [MoviesModule, AuthModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
