import { Body, Controller, Get, HttpCode, Param, Post, Query, UseGuards } from '@nestjs/common'
import { ApiQuery, ApiTags } from '@nestjs/swagger'
import { user } from '@prisma/client'
import { AuthService } from './auth.service'
import { GetUser } from './decorator'
import { AuthSignInDto, AuthSignUpAdminDto, AuthSignUpDto, ForgotPasswordDto, ResetPasswordDto } from './dto'
import { JwtGuard } from './guard'

@ApiTags('auth')
@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('register')
  signup(@Body() dto: AuthSignUpDto) {
    // console.log(dto)

    return this.authService.signup(dto)
  }

  @Post('register/admin')
  signupAdmin(@Body() dto: AuthSignUpAdminDto) {
    // console.log(dto)

    return this.authService.signupAdmin(dto)
  }

  @Post('settings')
  updateSettings(@Body() dto: AuthSignUpAdminDto) {
    // console.log(dto)

    return this.authService.signupAdmin(dto)
  }

  @Post('login')
  @HttpCode(200)
  signin(@Body() dto: AuthSignInDto) {
    // console.log(dto)

    return this.authService.signin(dto)
  }

  @Post('login/admin')
  signinAdmin(@Body() dto: AuthSignInDto) {
    // console.log(dto)

    return this.authService.signinAdmin(dto)
  }

  @Get('access-token')
  @UseGuards(JwtGuard)
  refreshToken(@GetUser() user: user) {
    // console.log(user)

    return this.authService.refreshToken(user)
  }

  @Get('verify')
  @ApiQuery({ name: 'code', type: 'string' })
  verify(@Query('code') code: string) {
    // console.log(code)

    return this.authService.verify(code)
  }

  @Post('forgot-password')
  forgotPassword(@Body() dto: ForgotPasswordDto) {
    return this.authService.forgotPassword(dto)
  }

  @Post('reset-password')
  resetPassword(@Body() dto: ResetPasswordDto) {
    return this.authService.resetPassword(dto)
  }

  @Get('reset-password/:resetToken')
  getValidReset(@Param('resetToken') resetToken: string) {
    return this.authService.getValidReset(resetToken)
  }
}
