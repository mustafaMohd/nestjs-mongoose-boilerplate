import { Injectable, HttpException, HttpStatus } from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import moment from 'moment';
import { Date, Model } from 'mongoose';
import { ConfigService } from 'src/config/config.service';

import { UsersService } from '../users/users.service';
import { Token } from './token.model';

export interface IAuthReturnBody {
  /**
   * When the token is to expire in seconds
   */
  user:{
    id:string,
  email:string,
  fullname:string,
 role:string,
  
},
  tokens:{
    access: {
    
    
      token:string,
      expires:string,
    },
    
    refresh: {
      token:string,
      expires:string,
    };
  }
  }
  export interface ITokenReturnBody {
  
    tokens:{
      access: {
      
      
        token:string,
        expires:Date,
      },
      
      refresh: {
        token:string,
        expires:Date,
      };
    }
    }

@Injectable()
export class AuthService {
  
  
  
  
  constructor(
    @InjectModel(Token.name) private readonly tokenModel: Model<Token>,
    private usersService: UsersService,
   
    private jwtService: JwtService,
    private configService: ConfigService
  ) {}

  async register(userData): Promise<any> {
   

    const createdUser = await this.usersService.createUser(userData);

    const createdUserCopy = { ...createdUser.toObject() };

    delete createdUserCopy.password;
    delete createdUserCopy.__v;

    //const payload = {
    //  username: createdUser.username,
     // sub: createdUser._id,
    //};
//const tokens= this.generateAuthTokens(createdUserCopy)
    return {
      user: createdUserCopy,
  //    tokens
    };
  }
  async generateAuthTokens(user){
    const accessTokenExpires = moment().add(this.configService.get("ACCESSTOKEN_EXPIRATION_TIME"), 'minutes');
    const accessToken = this.generateToken(user.id, accessTokenExpires, 'access');
  
    const refreshTokenExpires = moment().add(this.configService.get("REFRESHTOKEN_EXPIRATION_TIME"), 'days');
    const refreshToken = this.generateToken(user.id, refreshTokenExpires, 'refresh');
    await this.saveToken(refreshToken, user.id, refreshTokenExpires, 'refresh');
  
    return {
      access: {
        token: accessToken,
        expires: accessTokenExpires.toDate(),
      },
      refresh: {
        token: refreshToken,
        expires: refreshTokenExpires.toDate(),
      },
    };
  };

  async generateToken (userId, expires, type)  {
    const payload = {
      sub: userId,
      iat: moment().unix(),
      exp: expires.unix(),
      type,
    };
    return this.jwtService.sign(payload);
  };
  async verifyToken (token, type){
   
    const payload = this.jwtService.verify(token);
    const tokenDoc = await this.tokenModel.findOne({ token, type, user: payload.sub, blacklisted: false });
    if (!tokenDoc) {
      throw new Error('Token not found');
    }
    return tokenDoc;
  };
  async saveToken (token, userId, expires, type, blacklisted = false)  {
    const tokenDoc = await this.tokenModel.create({
      token,
      user: userId,
      expires: expires.toDate(),
      type,
      blacklisted,
    });
    return tokenDoc;
  };
  


}