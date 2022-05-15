// import { IsString, IsNumber } from 'class-validator'; // 필요하나 이거?
import { PartialType } from '@nestjs/mapped-types';
import { CreateMovieDto } from './create-movie.dto';

export class UpdateMovieDto extends PartialType(CreateMovieDto) {}
