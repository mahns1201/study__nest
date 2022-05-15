import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';

@Controller('movies') // 'movies' is basic router
export class MoviesController {
  @Get()
  getAll() {
    return 'This will return all movies';
  }

  // query params
  @Get('search')
  search(@Query('year') searchingYear: string) {
    return `We are searching for a movie made after: ${searchingYear}`;
  }

  @Get('/:id')
  getMovieById(@Param('id') movieId: string) {
    return `This will return a movie ${movieId}`;
  }

  @Post()
  create(@Body() movieData) {
    console.log(movieData);
    return movieData;
  }

  @Delete('/:id')
  remove(@Param('id') movieId: string) {
    return `this will delete a movie ${movieId}`;
  }

  // Put -> 리소스 전체 수정
  // Patch -> 리소스 일부만 수정
  @Patch('/:id')
  Patch(@Param('id') movieId: string, @Body() updateData) {
    return {
      updatedMovie: movieId,
      ...updateData,
    };
  }
}
