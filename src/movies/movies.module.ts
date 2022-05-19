import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';

// import {TypeormModule} from '@nestjs/typeorm';
// import {MovieRepository} from './repository/movie.repository.ts'
// imports: [TypeormModule.forFeature([MovieRepository])]

@Module({
  imports: [AuthModule],
  controllers: [MoviesController],
  providers: [MoviesService],
})
export class MoviesModule {}
