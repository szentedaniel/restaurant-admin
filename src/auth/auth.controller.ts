import { Body, Controller, Post } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthSignInDto, AuthSignUpDto } from './dto'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('register')
  signup(@Body() dto: AuthSignUpDto) {
    console.log(dto)

    return this.authService.signup(dto)
  }

  @Post('login')
  signin(@Body() dto: AuthSignInDto) {
    console.log(dto)

    return this.authService.signin(dto)
  }
}
