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
