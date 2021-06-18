

import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../users/user.model';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    ) {}

  async createUser(userData): Promise<any> {
    const foundUser = await this.userModel.findOne({ email: userData.email });
    if (foundUser) {
      throw new HttpException(
        'Email is already in use',
        HttpStatus.BAD_REQUEST
      );
    }

   
    const createdUser = await this.userModel.create(userData);


    //return createdUser;

    const createdUserCopy = { ...createdUser.toObject() };

    delete createdUserCopy.password;
    delete createdUserCopy.__v;
return createdUserCopy;

  }
}


    
    
