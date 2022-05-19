// model과 같은 역할을 한다.
export class Movie {
  id: number;
  title: string;
  year: number;
  genres: string[];
  // status: MovieStatus;
}

export enum MovieStatus {
  PUBLIC = 'public',
  PRIVATE = 'private',
}

// make class to table using typeorm
// import { BaseEntity,  PrimaryGeneratedColumn } from 'typeorm';

// @entity()
// export class Movie extends BaseEntity {
//   @PrimaryGeneratedColumn()
//   id: number;

//   @Column()
//   title: string;

//   @Column()
//   year: number;

//   @Column()
//   genres: string[];
//   // status: MovieStatus;
// }
