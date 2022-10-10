import { Body, Controller, Inject, Post } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { AuthService } from './auth.service';
import { AuthCredentialDto } from './dto/auth.credential';

@Controller('auth')
export class AuthController {
  @Inject(AuthService)
  private readonly authService: AuthService;

  @Post('signin')
  async singin(@Body() authcredentialDto: AuthCredentialDto) {
    return this.authService.login(authcredentialDto);
  }

  @Post('register')
  async register(@Body() authcredentialDto: CreateUserDto) {
    return this.authService.register(authcredentialDto);
  }
}
