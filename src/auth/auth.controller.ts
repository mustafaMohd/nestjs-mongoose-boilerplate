import { Body, Controller, Post, Req, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { AuthService, IAuthReturnBody, ITokenReturnBody } from './auth.service';
import { LoginPayload } from './payload/login.payload';
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
  @Post('login')
  async login(@Body() payload: LoginPayload)  {
    


      const user = await this.usersService.getByEmail(payload.email);
     
      if (!user || !(await user.isPasswordMatch(payload.password))) {
        throw new Error('Incorrect email or password');
        // throw new UnauthorizedException(
        //     "Could not authenticate. Please try again.",
        //   );
    }

    // const foundUserCopy = { ...user.toObject() };

    // delete foundUserCopy.password;
    // delete foundUserCopy.__v;

     const tokens=await this.authService.generateAuthTokens(user);

return { user, tokens}
  }
}
