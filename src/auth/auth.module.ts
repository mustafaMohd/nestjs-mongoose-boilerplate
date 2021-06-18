import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigModule } from 'src/config/config.module';
import { ConfigService } from 'src/config/config.service';
import { UsersModule } from 'src/users/users.module';
import { PassportModule } from "@nestjs/passport";

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { Token, TokenSchema } from './token.model';
import { MongooseModule } from '@nestjs/mongoose';
@Module({
  imports: [MongooseModule.forFeature([{ name: Token.name, schema: TokenSchema }]),JwtModule,UsersModule ,ConfigModule,PassportModule.register({ defaultStrategy: "jwt" }),
  JwtModule.registerAsync({
    imports: [ConfigModule],
    useFactory: async (configService: ConfigService) => {
      return {
        secret: configService.get("WEBTOKEN_SECRET_KEY"),
        signOptions: {
          ...(configService.get("ACCESSTOKEN_EXPIRATION_TIME")
            ? {
                expiresIn: Number(
                  configService.get("ACCESSTOKEN_EXPIRATION_TIME"),
                ),
              }
            : {}),
        },
      };
    },
    inject: [ConfigService],
  })],
  controllers: [AuthController],

  providers: [AuthService ],
  exports: [JwtModule,PassportModule.register({ defaultStrategy: "jwt" })],
})
export class AuthModule {}


