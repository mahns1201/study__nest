import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './auth/jwt.strategy';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    // PassportModule,

    JwtModule.register({
      secret: 'test',
      signOptions: { expiresIn: '1d' },
    }),
  ],

  // JwtModule.registerAsync({
  //   useFactory: async () => ({
  //     secret: 'test',
  //     signOptions: {
  //       expiresIn: '1h',
  //     },
  //   }),
  // }),
  // ],
  providers: [UsersResolver, UsersService, JwtStrategy],
})
export class UsersModule {}
