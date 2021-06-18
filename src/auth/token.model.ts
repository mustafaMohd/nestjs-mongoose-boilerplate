import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { User } from 'src/users/user.model';

@Schema({
  timestamps: true,
})
export class Token extends Document {
  @Prop({ required: true })
  token: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
user: User;
  
@Prop({ required: true, enum: ['access', 'refresh' ]})
type: string

@Prop({ required: true, unique: true, lowercase: true })
  email: string;

  @Prop({ required: true })
  password: string;

  
}

export const TokenSchema = SchemaFactory.createForClass(Token);