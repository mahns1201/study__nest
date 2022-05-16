// custom pipe

import {
  // ArgumentMetadata,
  BadRequestException,
  PipeTransform,
} from '@nestjs/common';
import { MovieStatus } from '../entities/movie.entity';

// 반드시 implements PipeTransform과 transform을 포함해야 한다.
export class MovieStatusValidationPipe implements PipeTransform {
  readonly StatusOptions = [MovieStatus.PRIVATE, MovieStatus.PUBLIC];

  transform(value: any) {
    value = value.toUpperCase();

    if (!this.isStatusValid(value)) {
      throw new BadRequestException(`${value} is not the status options`);
    }

    return value;
  }

  private isStatusValid(status: any) {
    const index = this.StatusOptions.indexOf(status);
    return index !== -1;
  }
}
