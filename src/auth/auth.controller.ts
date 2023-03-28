import { Body, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, Ip, Param, Post, Query, Req } from '@nestjs/common'
import { ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger'
import { user } from '@prisma/client'
import { AuthService } from './auth.service'
import { AuthSignInDto, AuthSignUpAdminDto, AuthSignUpDto, ForgotPasswordDto, ResetPasswordDto } from './dto'
import { emailVerifyDto, defaultAuthResponseDto, ErrorResonseDto, ForgotPasswordSuccessfulResponseDto } from './dto/authRespose.dto'
import GoogleTokenDto from './dto/google-token.dto'
import RefreshTokenDto from './dto/refresh-token.dto'
import FacebookLoginDto from './dto/facebook-login.dto'


@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @ApiTags('mobile')
  @Post('register')
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    type: defaultAuthResponseDto
  })
  @ApiResponse({
    status: 403,
    type: ErrorResonseDto
  })
  signup(@Req() request, @Ip() ip: string, @Body() dto: AuthSignUpDto) {
    return this.authService.signup(dto, {
      ipAddress: ip,
      userAgent: request.headers['user-agent'],
    })
  }

  @Post('register/admin')
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    type: defaultAuthResponseDto
  })
  @ApiResponse({
    status: 403,
    type: ErrorResonseDto
  })
  signupAdmin(@Req() request, @Ip() ip: string, @Body() dto: AuthSignUpAdminDto) {
    return this.authService.signupAdmin(dto, {
      ipAddress: ip,
      userAgent: request.headers['user-agent'],
    })
  }

  @ApiTags('mobile')
  @Post('login')
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    type: defaultAuthResponseDto
  })
  @ApiResponse({
    status: 403,
    type: ErrorResonseDto
  })
  @ApiResponse({
    status: 404,
    type: ErrorResonseDto
  })
  signin(@Req() request, @Ip() ip: string, @Body() dto: AuthSignInDto) {
    // console.log(dto)

    return this.authService.signin(dto, {
      ipAddress: ip,
      userAgent: request.headers['user-agent'],
    })
  }

  @Post('login/admin')
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    type: defaultAuthResponseDto
  })
  @ApiResponse({
    status: 403,
    type: ErrorResonseDto
  })
  @ApiResponse({
    status: 404,
    type: ErrorResonseDto
  })
  signinAdmin(@Req() request, @Ip() ip: string, @Body() dto: AuthSignInDto) {
    // console.log(dto)

    return this.authService.signinAdmin(dto, {
      ipAddress: ip,
      userAgent: request.headers['user-agent'],
    })
  }

  @ApiTags('mobile')
  @Post('/google/login')
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    type: defaultAuthResponseDto
  })
  @ApiResponse({
    status: 403,
    type: ErrorResonseDto
  })
  @ApiResponse({
    status: 404,
    type: ErrorResonseDto
  })
  async googleLogin(
    @Body() body: GoogleTokenDto,
    @Req() req,
    @Ip() ip: string,
  ): Promise<{ user: Partial<user>, access_token: string; refresh_token: string }> {
    const result = await this.authService.loginGoogleUser(body.email, {
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

  @ApiTags('mobile')
  @Post('/facebook/login')
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    type: defaultAuthResponseDto
  })
  @ApiResponse({
    status: 403,
    type: ErrorResonseDto
  })
  @ApiResponse({
    status: 404,
    type: ErrorResonseDto
  })
  async facebookLogin(
    @Body() body: FacebookLoginDto,
    @Req() req,
    @Ip() ip: string,
  ): Promise<{ user: Partial<user>, access_token: string; refresh_token: string }> {
    const result = await this.authService.loginFacebookUser(body.email, {
      userAgent: req.headers['user-agent'],
      ipAddress: ip,
    })
    if (result) {
      return result
    } else {
      throw new HttpException(
        {
          status: HttpStatus.UNAUTHORIZED,
          error: 'Error while logging in with facebook',
        },
        HttpStatus.UNAUTHORIZED,
      )
    }
  }

  @Post('refresh')
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    type: defaultAuthResponseDto
  })
  refreshToken(@Body() body: RefreshTokenDto) {
    return this.authService.refresh(body.refreshToken)
  }

  @Delete('logout')
  async logout(@Body() body: RefreshTokenDto) {
    return this.authService.logout(body.refreshToken)
  }

  @Get('verify')
  @HttpCode(200)
  @ApiQuery({ name: 'code', type: 'string' })
  @ApiResponse({
    status: 200,
    type: emailVerifyDto
  })
  @ApiResponse({
    status: 404,
    type: ErrorResonseDto
  })
  verify(@Query('code') code: string) {
    return this.authService.verify(code)
  }

  @ApiTags('mobile')
  @Post('forgot-password')
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    type: ForgotPasswordSuccessfulResponseDto
  })
  @ApiResponse({
    status: 400,
    type: ErrorResonseDto
  })
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
