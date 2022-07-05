import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class LoginInput {
  @Field()
  @IsNotEmpty()
  userId: string;

  // @Field((type) => Number, { nullable: true })
  // userId?: string;
}
