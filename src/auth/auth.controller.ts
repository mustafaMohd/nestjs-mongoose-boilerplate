import { Body, Controller, Post, Req } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { AuthService, IAuthReturnBody, ITokenReturnBody } from './auth.service';
import { RegisterPayload } from './payload/register.payload';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService,
        private readonly usersService: UsersService,) {}
    @Post('register')
  async register(@Body() payload: RegisterPayload)  {
    


      const user = await this.usersService.createUser(payload);
     const tokens=await this.authService.generateAuthTokens(user);

return { user, tokens}
  }
}
