import { IsString, IsNumber, IsOptional, IsNotEmpty } from 'class-validator';

// DTO (data transfer object)
// 계층 간 데이터 교환을 위한 객체. 데이터가 네트워크를 통해 전송되는 방법을 정의한 객체.
// interface or class로 정의 가능, class를 추천.

export class CreateMovieDto {
  @IsNotEmpty()
  @IsString()
  readonly title: string;

  @IsNumber()
  readonly year: number;

  @IsOptional()
  @IsString({ each: true })
  readonly genres: string[];
}
