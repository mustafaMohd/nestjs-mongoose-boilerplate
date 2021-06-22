
import { ArrayMaxSize, ArrayMinSize, ArrayNotEmpty, IsAlphanumeric, IsNotEmpty, MaxLength, MinLength } from "class-validator";



/**
 * CreateFilmPayload Paylaod Class
 */
export class CreateFilmPayload {
  /**
   * name field
   */
  
  @IsNotEmpty()
  name: string;

  /**
   * description field
   */
  
  @IsNotEmpty()
  
  description: string;

  @IsNotEmpty()
  
  rating: number;

  @IsNotEmpty()
  
  releaseDate: Date;
  
  
  @IsNotEmpty()
  
  photo: string;


  @IsNotEmpty()
  
  ticketPrice: number;
  

  @IsNotEmpty()
  
  country: string;
  
  @ArrayNotEmpty()
  @ArrayMinSize(1)
  @ArrayMaxSize(5)
  @MinLength(3, { each: true, message: 'genre is too short. Minimal length is $value characters' })
  @MaxLength(50, { each: true, message: 'genre is too long. Maximal length is $value characters' })
  genre: string[];
}