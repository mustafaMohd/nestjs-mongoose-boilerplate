import { Controller, Post } from '@nestjs/common';

@Controller('auth')
export class AuthController {
    @Post('register')
  register(): string {
    return 'This action adds a new cat';
  }
}
