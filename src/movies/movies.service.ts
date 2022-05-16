import { Injectable, NotFoundException } from '@nestjs/common';
import { Movie } from './entities/movie.entity';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
// import { MovieStatusValidationPipe } from './pipes/movie-status-validation.pipe';

// 보통 DB에 관련된 로직을 처리한다. -> DB 로직은 repository에서 관리한다 (repository pattern)

@Injectable()
export class MoviesService {
  // private를 사용하지 않으면 다른 컴포넌트에서 해당 배열 값을 수정할 수 있기 때문이 이를 차단하기 위함.
  private movies: Movie[] = [];

  getAll(): Movie[] {
    return this.movies;
  }

  getOne(id: number): Movie {
    const movie = this.movies.find((movie) => movie.id === +id); // +id로 쓰면 형변환을 해준다.

    if (!movie) {
      throw new NotFoundException(`Movie with ID ${id} not found.`);
    }

    return movie;
  }

  deleteOne(id: number) {
    this.getOne(id);
    this.movies = this.movies.filter((movie) => movie.id !== +id);
  }

  create(movieData: CreateMovieDto) {
    this.movies.push({
      id: this.movies.length + 1,
      ...movieData,
    });
  }

  update(id: number, updateData: UpdateMovieDto) {
    const movie = this.getOne(id);
    this.deleteOne(id);
    this.movies.push({ ...movie, ...updateData });
  }

  // updateMovieStatus(id: number, status: MovieStatusValidationPipe) {
  //   const movie = this.getOne(id);
  //   this.deleteOne(id);
  //   this.movies.push({ ...movie, ...status });
  // }
}
