import { ExtractJwt, JwtPayload, Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable, UnauthorizedException } from "@nestjs/common";

import { ConfigService } from "../config/config.service";
import { UsersService } from "../users/users.service";
import { tokenTypes } from "src/emums/token.enum";

/**
 * Jwt Strategy Class
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  /**
   * Constructor
   * @param {ConfigService} configService
   * @param {ProfileService} profileService
   */
  constructor(
    readonly configService: ConfigService,
    private readonly usersService: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get("ACCESSTOKEN_SECRET_KEY"),
    });
  }

  /**
   * Checks if the bearer token is a valid token
   * @param {JwtPayload} jwtPayload validation method for jwt token
   * @param {any} done callback to resolve the request user with
   * @returns {Promise<boolean>} whether or not to validate the jwt token
   */
//   async validate({ iat, exp, _id }: JwtPayload, done): Promise<boolean> {
//     const timeDiff = exp - iat;
//     if (timeDiff <= 0) {
//       throw new UnauthorizedException();
//     }

//     const user = await this.usersService.getById(_id);
//     if (!user) {
//       throw new UnauthorizedException();
//     }

//     done(null, user);
//     return true;
//   }

async validate(payload: JwtPayload, done): Promise<boolean> {
   
   
    const timeDiff = payload.exp - payload.iat;
    if (timeDiff <= 0) {
      throw new UnauthorizedException("token expired please refresh your token");
    }
    if (payload.type !== tokenTypes.ACCESS) {
                 throw new Error('Invalid token type');
               }

     const user = await this.usersService.getById(payload.sub);
    if (!user) {
      throw new UnauthorizedException();
    }

    done(null,user );
    return true;
  }




//   const jwtVerify = async (payload, done) => {
//     try {
//       if (payload.type !== tokenTypes.ACCESS) {
//         throw new Error('Invalid token type');
//       }
//       const user = await User.findById(payload.sub);
//       if (!user) {
//         return done(null, false);
//       }
//       done(null, user);
//     } catch (error) {
//       done(error, false);
//     }
//   };

}