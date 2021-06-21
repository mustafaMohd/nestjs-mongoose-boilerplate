
import { IsAlphanumeric, IsNotEmpty, MinLength } from "class-validator";

/**
 * Login Paylaod Class
 */
export class LoginPayload {
  /**
   * Username field
   */
  @IsAlphanumeric()
  @IsNotEmpty()
  email: string;

  /**
   * Password field
   */
  
  @IsNotEmpty()
  @MinLength(8)
  password: string;
}