
import { ArrayMaxSize, ArrayMinSize, ArrayNotEmpty, IsAlphanumeric, IsNotEmpty, MaxLength, MinLength } from "class-validator";



/**
 * CreateFilmPayload Paylaod Class
 */
export class UpdateFilmPayload {
  /**
   * name field
   */
  
  
  name: string;

  /**
   * description field
   */
  
  description: string;

  rating: number;

  
  releaseDate: Date;
  
  
  
  photo: string;


  
  ticketPrice: number;
  

  
  country: string;
  
  genre: string[];
}