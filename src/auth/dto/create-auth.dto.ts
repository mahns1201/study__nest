// export class AuthCredentialsDto {
//   username: string;
//   password: string;
// }

import { IsString, IsNotEmpty } from 'class-validator';

export class AuthCredentialsDto {
  @IsNotEmpty()
  @IsString()
  readonly username: string;

  @IsNotEmpty()
  @IsString()
  readonly password: string;
}
