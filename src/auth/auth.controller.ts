import { Body, Controller, Get, Post, Query } from '@nestjs/common'
import { ApiQuery, ApiTags } from '@nestjs/swagger'
import { AuthService } from './auth.service'
import { AuthSignInDto, AuthSignUpDto } from './dto'

@ApiTags('auth')
@Controller('api/auth')
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

  @Get('verify')
  @ApiQuery({ name: 'code', type: 'string' })
  verify(@Query('code') code: string) {
    console.log(code)

    return this.authService.verify(code)
  }
}
