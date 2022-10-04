import { Body, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, Ip, Param, Post, Query, Req, UseGuards } from '@nestjs/common'
import { ApiQuery, ApiTags } from '@nestjs/swagger'
import { user } from '@prisma/client'
import { AuthService } from './auth.service'
import { GetUser } from './decorator'
import { AuthSignInDto, AuthSignUpAdminDto, AuthSignUpDto, ForgotPasswordDto, ResetPasswordDto } from './dto'
import GoogleTokenDto from './dto/google-token.dto'
import RefreshTokenDto from './dto/refresh-token.dto'
import { JwtGuard } from './guard'

@ApiTags('auth')
@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('register')
  signup(@Req() request, @Ip() ip: string, @Body() dto: AuthSignUpDto) {
    // console.log(dto)

    return this.authService.signup(dto, {
      ipAddress: ip,
      userAgent: request.headers['user-agent'],
    })
  }

  @Post('register/admin')
  signupAdmin(@Req() request, @Ip() ip: string, @Body() dto: AuthSignUpAdminDto) {
    // console.log(dto)

    return this.authService.signupAdmin(dto, {
      ipAddress: ip,
      userAgent: request.headers['user-agent'],
    })
  }

  // @Post('settings')
  // updateSettings(@Body() dto: AuthSignUpAdminDto) {
  //   // console.log(dto)

  //   return this.authService.signupAdmin(dto)
  // }

  @Post('login')
  @HttpCode(200)
  signin(@Req() request, @Ip() ip: string, @Body() dto: AuthSignInDto) {
    // console.log(dto)

    return this.authService.signin(dto, {
      ipAddress: ip,
      userAgent: request.headers['user-agent'],
    })
  }

  @Post('login/admin')
  signinAdmin(@Req() request, @Ip() ip: string, @Body() dto: AuthSignInDto) {
    // console.log(dto)

    return this.authService.signinAdmin(dto, {
      ipAddress: ip,
      userAgent: request.headers['user-agent'],
    })
  }

  @Post('/google/login')
  async googleLogin(
    @Body() body: GoogleTokenDto,
    @Req() req,
    @Ip() ip: string,
  ): Promise<{ user: Partial<user>, access_token: string; refresh_token: string }> {
    const result = await this.authService.loginGoogleUser(body.token, {
      userAgent: req.headers['user-agent'],
      ipAddress: ip,
    })
    if (result) {
      return result
    } else {
      throw new HttpException(
        {
          status: HttpStatus.UNAUTHORIZED,
          error: 'Error while logging in with google',
        },
        HttpStatus.UNAUTHORIZED,
      )
    }
  }

  @Post('refresh')
  refreshToken(@Body() body: RefreshTokenDto) {
    // console.log(user)

    return this.authService.refresh(body.refreshToken)
  }

  @Delete('logout')
  async logout(@Body() body: RefreshTokenDto) {
    return this.authService.logout(body.refreshToken)
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
