
import {  IsEmail, IsNotEmpty, MinLength } from "class-validator";

/**
 * Login Paylaod Class
 */
export class LoginPayload {
  /**
   * Username field
   */
   @IsEmail()
  @IsNotEmpty()
  email: string;

  /**
   * Password field
   */
  
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}