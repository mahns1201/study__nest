import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  // Query,
} from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { MoviesService } from './movies.service';
import { Movie } from './entities/movie.entity';
import { AuthGuard } from '@nestjs/passport';
// import { MovieStatusValidationPipe } from './pipes/movie-status-validation.pipe';

@Controller('movies') // 'movies' is basic router
@UseGuards(AuthGuard())
export class MoviesController {
  // moviesService: MoviesService; // 선언
  // constructor(moviesService: MoviesService) {
  //   this.moviesService = moviesService;
  // } // constructor로 생성

  // 접근 제한자를 생성자 파라미터에 선언 시, 해당 파라미터는 암묵적으로 클래스 프로퍼티로 선언됨.
  constructor(private readonly moviesService: MoviesService) {}

  @Get()
  getAll(): Movie[] {
    return this.moviesService.getAll();
  }

  // query params
  // @Get('search')
  // search(@Query('year') searchingYear: string) {
  //   return `We are searching for a movie made after: ${searchingYear}`;
  // }

  @Get('/:id')
  getOne(@Param('id') movieId: number): Movie {
    return this.moviesService.getOne(movieId);
  }

  @Post()
  create(@Body() movieData: CreateMovieDto) {
    return this.moviesService.create(movieData);
  }

  @Delete('/:id')
  remove(@Param('id') movieId: number) {
    return this.moviesService.deleteOne(movieId);
  }

  // Put -> 리소스 전체 수정
  // Patch -> 리소스 일부만 수정
  @Patch('/:id')
  patch(@Param('id') movieId: number, @Body() updateData: UpdateMovieDto) {
    return this.moviesService.update(movieId, updateData);
    // return {
    //   updatedMovie: movieId,
    //   ...updateData,
    // };
  }

  // @Patch('/:id/status')
  // updateMovieStatus(
  //   @Param('id') movieId: number,
  //   @Body() status: MovieStatusValidationPipe,
  // ) {
  //   return this.moviesService.updateMovieStatus(movieId, status);
  // }
}
