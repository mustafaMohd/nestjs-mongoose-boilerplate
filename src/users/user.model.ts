import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as bcrypt from 'bcryptjs';
@Schema({
  timestamps: true,
})
export class User extends Document {
  @Prop({ required: true })
  fullname: string;

  
  @Prop({ required: true, unique: true, lowercase: true })
  email: string;

  @Prop({ required: true })
  password: string;

  
  @Prop({ required: true, enum: ['admin', 'user' ],default:'user'})
  role: string

  isPasswordMatch  =  async function (password:string) {
    const user = this;

    await bcrypt.compare(password, user.password);
  };
  isEmailTaken = async function (email, excludeUserId) {
    const user = await this.findOne({ email, _id: { $ne: excludeUserId } });
    return !!user;
  };
}

export const UserSchema = SchemaFactory.createForClass(User);