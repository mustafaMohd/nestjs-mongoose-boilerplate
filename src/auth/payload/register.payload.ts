import {
  IsEmail,
  IsNotEmpty,
  MinLength,
  Matches,
} from "class-validator";

/**
 * Register Payload Class
 */
export class RegisterPayload {
  /**
   * Email field
   */
  @IsEmail()
  @IsNotEmpty()
  email: string;

  
  /**
   * Full Name field
   */
  
  @Matches(/^[a-zA-Z ]+$/)
  @IsNotEmpty()
  fullname: string;

  /**
   * Password field
   */
  @IsNotEmpty()
  @MinLength(8)
  password: string;
}