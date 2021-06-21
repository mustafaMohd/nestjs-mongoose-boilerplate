import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  timestamps: true,
})



export class Film extends Document {
  @Prop({ required: true })
  name: string;

  @Prop()
  slug: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  country: string;

  @Prop({ required: true })
  photo: string;

  @Prop({ required: true })
  ticketPrice: Number;

  @Prop({ required: true })
  releaseDate: Date;
  

  @Prop({ required: true })
  rating: Number;

  
  @Prop([String])
  genre: string[];

  
}

export const FilmSchema = SchemaFactory.createForClass(Film);
