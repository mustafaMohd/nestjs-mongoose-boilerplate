import { Injectable, HttpException, HttpStatus } from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';
import moment from 'moment';

import { UsersService } from '../users/users.service';


@Injectable()
export class AuthService {
  constructor(
   
    private usersService: UsersService,
   
    private jwtService: JwtService
  ) {}

  async signup(signupData): Promise<any> {
    // const foundUser = await this.userModel.findOne({ email: signupData.email });

    // if (foundUser) {
    //   throw new HttpException(
    //     'Email is already in use',
    //     HttpStatus.BAD_REQUEST
    //   );
    // }

   // const createdProfile = await this.profilesService.createProfile();

    const createdUser = await this.usersService.createUser(signupData);

    const createdUserCopy = { ...createdUser.toObject() };

    delete createdUserCopy.password;
    delete createdUserCopy.__v;

    const payload = {
    //  username: createdUser.username,
      sub: createdUser._id,
    };

    return {
      user: createdUserCopy,
 //     token: this.jwtService.sign(payload),
    };
  }
  // const generateAuthTokens = async (user) => {
  //   const accessTokenExpires = moment().add(config.jwt.accessExpirationMinutes, 'minutes');
  //   const accessToken = generateToken(user.id, accessTokenExpires, tokenTypes.ACCESS);
  
  //   const refreshTokenExpires = moment().add(config.jwt.refreshExpirationDays, 'days');
  //   const refreshToken = generateToken(user.id, refreshTokenExpires, tokenTypes.REFRESH);
  //   await saveToken(refreshToken, user.id, refreshTokenExpires, tokenTypes.REFRESH);
  
  //   return {
  //     access: {
  //       token: accessToken,
  //       expires: accessTokenExpires.toDate(),
  //     },
  //     refresh: {
  //       token: refreshToken,
  //       expires: refreshTokenExpires.toDate(),
  //     },
  //   };
  // };

  async generateToken (userId, expires, type)  {
    const payload = {
      sub: userId,
      iat: moment().unix(),
      exp: expires.unix(),
      type,
    };
    return this.jwtService.sign(payload);
  };

  async saveToken (token, userId, expires, type, blacklisted = false)  {
    const tokenDoc = await Token.create({
      token,
      user: userId,
      expires: expires.toDate(),
      type,
      blacklisted,
    });
    return tokenDoc;
  };
  // async generateAuthTokens(user: User) {
  //   return {
  //     expiresIn: this.configService.get('JWT_EXPIRATION_TIME'),
  //     accessToken: this.jwtService.sign({ id: user.id }),
  //     user,
  //   };
  // }



}