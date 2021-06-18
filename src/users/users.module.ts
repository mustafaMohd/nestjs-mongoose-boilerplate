import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { User, UserSchema } from './user.model';
import { UsersController } from './users.controller';

import * as bcrypt from 'bcryptjs';
import { UsersService } from './users.service';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: User.name,
        useFactory: () => {
          const schema = UserSchema;

          schema.pre<User>('save', async function (next: Function) {
            const user = this;
            
            if (user.password) {
              user.password = await bcrypt.hash(user.password, 8);
            }
            
            next();
          });
          schema.methods.comparePasswords = async function (submittedPassword) {
            const user = this;

            await bcrypt.compare(submittedPassword, user.password);
          };
          
          // schema.plugin(require('mongoose-autopopulate'));
          return schema;
        },
      },
    ]),
  ],
  controllers: [UsersController],
 providers: [UsersService],
 exports: [UsersService]
})

export class UsersModule {}