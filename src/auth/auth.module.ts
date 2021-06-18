import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
@Module({
  imports: [UsersModule ,JwtModule.register({ secret: 'hard!to-guess_secret' })],
  controllers: [AuthController],

  providers: [AuthService,JwtService ]
})
export class AuthModule {}
