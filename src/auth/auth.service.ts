import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { AuthSignInDto, AuthSignUpAdminDto, AuthSignUpDto, AuthUpdateSettingsDto, ForgotPasswordDto, ResetPasswordDto } from './dto'
import * as argon from 'argon2'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime'
import { MailerService } from '@nestjs-modules/mailer'
import { refresh_tokens, user } from '@prisma/client'
import { join } from 'path'
import { ConfigService } from '@nestjs/config'
import * as objectHash from 'object-hash'
import { JwtService } from '@nestjs/jwt'
import { getAdminUser } from 'src/utils'
import { Auth, google } from 'googleapis'
import { convertedUserDto } from './dto/authRespose.dto'

@Injectable()
export class AuthService {
  private oauthClient: Auth.OAuth2Client

  constructor(private prisma: PrismaService, private readonly mailerService: MailerService, private config: ConfigService, private jwt: JwtService) {
    const clientId = this.config.get('GOOGLE_CLIENT_ID')
    const clientSecret = this.config.get('GOOGLE_CLIENT_SECRET')
    this.oauthClient = new google.auth.OAuth2(clientId, clientSecret)
  }


  async signup(dto: AuthSignUpDto, values: { userAgent: string; ipAddress: string }) {
    // generate password hash
    const hash = await argon.hash(dto.password)
    // save user to db
    try {
      const role = ['user']

      // console.log(role,)
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          name: dto.name,
          role: role,
          password: hash,
          phone: dto.phone
        }
      })

      const registeredUser = await this.sendVerificationEmail(user)

      const convertedUser = this.convertUserData(registeredUser)

      delete registeredUser.password

      const tokens = await this.newRefreshAndAccessToken(user, values)
      const response = {
        user: convertedUser,
        access_token: tokens.accessToken,
        refresh_token: tokens.refreshToken
      }

      return response

    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Credentials taken')
        }
      }
      throw error
    }
  }

  async signupAdmin(dto: AuthSignUpAdminDto, values: { userAgent: string; ipAddress: string }) {
    // generate password hash
    const hash = await argon.hash(dto.password)
    // save user to db
    try {
      let role = [dto.role]
      if (!role) role = ['user']

      // console.log(role,)
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          name: dto.name,
          role: role,
          password: hash,
          ettermek: {
            create: {
              name: dto.restaurantName,
              adoszam: dto.taxNumber,
              ceg: dto.companyName,
              city_name: dto.cityName,
              address: dto.address,
              lat: Number(dto.lat),
              lng: Number(dto.lng),
              aktiv: false,
              img_path: [],
              nyitvatartas: [
                {
                  open: false,
                  start: '08:00',
                  end: '17:00',
                },
                {
                  open: false,
                  start: '08:00',
                  end: '17:00',
                },
                {
                  open: false,
                  start: '08:00',
                  end: '17:00',
                },
                {
                  open: false,
                  start: '08:00',
                  end: '17:00',
                },
                {
                  open: false,
                  start: '08:00',
                  end: '17:00',
                },
                {
                  open: false,
                  start: '08:00',
                  end: '17:00',
                },
                {
                  open: false,
                  start: '08:00',
                  end: '17:00',
                },
              ]
            }
          }
        }
      })

      await this.prisma.ettermek.update({
        where: {
          id: user.etterem_id
        },
        data: {
          created_by_user_id: user.id
        }
      })

      const registeredUser = await this.sendVerificationEmail(user)

      const convertedUser = this.convertUserData(registeredUser)

      delete registeredUser.password

      const tokens = await this.newRefreshAndAccessToken(user, values)
      const response = {
        user: convertedUser,
        access_token: tokens.accessToken,
        refresh_token: tokens.refreshToken
      }

      return response

    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Credentials taken')
        }
      }
      throw error
    }
  }

  async updateSettings(dto: AuthUpdateSettingsDto) {
    try {
      const updatedUser = await this.prisma.user.update({
        where: {
          id: dto.userId
        },
        data: {
          settings: {
            upsert: {
              create: {
                settings: dto.settings,
                shortcuts: dto.shortcuts
              },
              update: {
                settings: dto.settings,
                shortcuts: dto.shortcuts
              }
            }
          }

        }
      })
      delete updatedUser.password

      return updatedUser

    } catch (error) {
      throw error
    }
  }

  async signin(dto: AuthSignInDto, values: { userAgent: string; ipAddress: string }) {
    // find the user
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email
      }
    })
    // if user does not exist throw exception
    if (!user) throw new NotFoundException('User not found.')

    // compare passwords
    const pwMatches = await argon.verify(user.password, dto.password)
    // if password incorrect throw exception
    if (!pwMatches) throw new ForbiddenException('Credentials incorrect.')

    // send back the user
    const convertedUser = this.convertUserData(user)
    delete user.password
    const tokens = await this.newRefreshAndAccessToken(user, values, dto.remember)
    const response = {
      user: convertedUser,
      access_token: tokens.accessToken,
      refresh_token: tokens.refreshToken
    }
    return response
  }

  async signinAdmin(dto: AuthSignInDto, values: { userAgent: string; ipAddress: string }) {
    // find the user
    await this.checkAdminUser(dto)
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email
      }
    })
    // if user does not exist throw exception
    if (!user) throw new NotFoundException('User not found.')

    const roles = JSON.parse(JSON.stringify(user.role))

    if (!user.etterem_id && !roles.includes('owner')) throw new ForbiddenException()

    // compare passwords
    const pwMatches = await argon.verify(user.password, dto.password)
    // if password incorrect throw exception
    if (!pwMatches) throw new ForbiddenException('Credentials incorrect.')

    // send back the user
    const convertedUser = this.convertUserData(user)
    delete user.password
    const tokens = await this.newRefreshAndAccessToken(user, values)
    const response = {
      user: convertedUser,
      access_token: tokens.accessToken,
      refresh_token: tokens.refreshToken
    }
    return response
  }

  async loginGoogleUser(email: string, values: { userAgent: string, ipAddress: string }): Promise<{ user: convertedUserDto, access_token: string, refresh_token: string } | undefined> {
    //   const tokenInfo = await this.oauthClient.getTokenInfo(token)
    //   const user = await this.prisma.user.findFirst({
    //     where: {
    //       email: tokenInfo.email
    //     }
    //   })
    //   if (user) {
    //     const tokens = await this.newRefreshAndAccessToken(user, values)
    //     return {
    //       user: this.convertUserData(user),
    //       access_token: tokens.accessToken,
    //       refresh_token: tokens.refreshToken
    //     }
    //   } else {
    //     const newUser = await this.prisma.user.create({
    //       data: {
    //         email: tokenInfo.email,
    //         name: tokenInfo.email.split('@')[0],
    //         password: await argon.hash(tokenInfo.aud),
    //         role: ['user']
    //       }
    //     })
    //     const tokens = await this.newRefreshAndAccessToken(newUser, values)
    //     return {
    //       user: this.convertUserData(newUser),
    //       access_token: tokens.accessToken,
    //       refresh_token: tokens.refreshToken
    //     }
    //   }
    //   return undefined
    // }
    const user = await this.prisma.user.findFirst({
      where: {
        email: email
      }
    })
    if (user) {
      const tokens = await this.newRefreshAndAccessToken(user, values)
      return {
        user: this.convertUserData(user),
        access_token: tokens.accessToken,
        refresh_token: tokens.refreshToken
      }
    } else {
      const newUser = await this.prisma.user.create({
        data: {
          email: email,
          name: email.split('@')[0],
          password: await argon.hash(objectHash({ email: email })),
          role: ['user']
        }
      })
      const tokens = await this.newRefreshAndAccessToken(newUser, values)
      return {
        user: this.convertUserData(newUser),
        access_token: tokens.accessToken,
        refresh_token: tokens.refreshToken
      }
    }
    return undefined
  }

  async loginFacebookUser(email: string, values: { userAgent: string, ipAddress: string }): Promise<{ user: convertedUserDto, access_token: string, refresh_token: string } | undefined> {
    const user = await this.prisma.user.findFirst({
      where: {
        email: email
      }
    })
    if (user) {
      const tokens = await this.newRefreshAndAccessToken(user, values)
      return {
        user: this.convertUserData(user),
        access_token: tokens.accessToken,
        refresh_token: tokens.refreshToken
      }
    } else {
      const newUser = await this.prisma.user.create({
        data: {
          email: email,
          name: email.split('@')[0],
          password: await argon.hash(objectHash({ email: email })),
          role: ['user']
        }
      })
      const tokens = await this.newRefreshAndAccessToken(newUser, values)
      return {
        user: this.convertUserData(newUser),
        access_token: tokens.accessToken,
        refresh_token: tokens.refreshToken
      }
    }
    return undefined
  }

  async logout(refreshStr): Promise<void> {
    const refreshToken = await this.retrieveRefreshToken(refreshStr)

    if (!refreshToken) {
      return
    }
    // delete refreshtoken from db
    await this.prisma.refresh_tokens.delete({
      where: {
        id: refreshToken.id
      }
    })
  }

  async verify(code: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        verify: code
      }
    })
    if (!user) throw new NotFoundException()

    await this.prisma.user.update({
      where: {
        verify: code
      },
      data: {
        verify: null
      }
    })


    return { status: 200, message: 'Email verified successfuly' }
  }

  async forgotPassword(dto: ForgotPasswordDto) {
    const user = await this.prisma.user.findFirst({
      where: {
        email: dto.email
      }
    })

    if (!user) throw new NotFoundException('Bad credentials')

    const successful = await this.sendForgotPasswordEmail(user)

    if (!successful) throw new BadRequestException('Something went wrong')

    return { statusCode: 200, message: 'Email sent' }
  }

  async resetPassword(dto: ResetPasswordDto) {
    const user = await this.prisma.user.findFirst({
      where: {
        forgot: dto.resetToken
      }
    })

    if (!user) throw new NotFoundException('User not found')
    const hash = await argon.hash(dto.password)

    const successful = await this.prisma.user.update({
      where: {
        id: user.id
      },
      data: {
        forgot: null,
        password: hash
      }
    })

    if (!successful) throw new BadRequestException('Something went wrong')

    return { status: 200 }
  }

  // 

  private async sendVerificationEmail(user: user): Promise<user> {

    const verifyCode = objectHash(user)

    const updatedUser = await this.prisma.user.update({
      where: {
        id: user.id
      },
      data: {
        verify: verifyCode
      }
    })

    this.mailerService
      .sendMail({
        to: user.email, // list of receivers
        // from: 'noreply@nestjs.com', // sender address
        subject: 'Please verify your email.', // Subject line
        template: './emailVerification',
        // attachments: [{
        //   filename: 'email.png',
        //   path: join(process.cwd(), `/dist/mail/templates/images/email.png`),
        //   cid: 'email'
        // }],
        context: {
          // Data to be sent to template engine.
          name: user.name,
          email: user.email,
          image1: join(this.config.get('IMAGES_URL'), 'email.png'),
          verifyLink: join(this.config.get('DOMAIN_URL'), `auth/verify?code=${verifyCode}`)
        },
        // text: 'welcome', // plaintext body
        // html: '<b>welcome</b>', // HTML body content
      })
      .then((msg) => {
        console.log(msg)
      })
      .catch((err) => {
        console.log(err)
      })
    return updatedUser
  }

  private async sendForgotPasswordEmail(user: user): Promise<user> {

    const verifyCode = objectHash(user)

    const updatedUser = await this.prisma.user.update({
      where: {
        id: user.id
      },
      data: {
        forgot: verifyCode,
        password: ''
      }
    })

    this.mailerService
      .sendMail({
        to: user.email, // list of receivers
        // from: 'noreply@nestjs.com', // sender address
        subject: 'Forgotten Password', // Subject line
        template: './forgotPassword',
        // attachments: [{
        //   filename: 'email.png',
        //   path: join(process.cwd(), `/dist/mail/templates/images/email.png`),
        //   cid: 'email'
        // }],
        context: {
          // Data to be sent to template engine.
          name: user.name,
          // email: user.email,
          // image1: join(this.config.get('IMAGES_URL'), 'email.png'),
          verifyLink: join(this.config.get('DOMAIN_URL'), `reset-password/${verifyCode}`)
        },
        // text: 'welcome', // plaintext body
        // html: '<b>welcome</b>', // HTML body content
      })
      .then((msg) => {
        console.log(msg)
      })
      .catch((err) => {
        console.log(err)
      })
    return updatedUser
  }

  async getValidReset(resetToken: string) {
    const user = await this.prisma.user.findFirst({
      where: {
        forgot: resetToken
      }
    })

    if (!user) throw new NotFoundException('Password reset request not found')

    return { status: 200 }
  }

  private async checkAdminUser(dto: AuthSignInDto): Promise<void> {
    getAdminUser(dto)
  }

  async refresh(refreshStr: string): Promise<{ user: convertedUserDto, access_token: string } | undefined> {
    const refreshToken = await this.retrieveRefreshToken(refreshStr)

    if (!refreshToken) {
      return undefined
    }

    const user = await this.prisma.user.findFirst({
      where: {
        id: refreshToken.user_id
      }
    })
    if (!user) {
      return undefined
    }

    const convertedUser = this.convertUserData(user)
    delete user.password

    return {
      user: convertedUser,
      access_token: this.signAccessToken(refreshToken.user_id)
    }
  }

  private retrieveRefreshToken(
    refreshStr: string,
  ): Promise<refresh_tokens | undefined> {
    try {
      const decoded = this.jwt.verify(refreshStr, { secret: this.config.get('REFRESH_SECRET') })

      if (typeof decoded === 'string') {
        return undefined
      }
      return Promise.resolve(
        this.prisma.refresh_tokens.findFirst({
          where: {
            id: decoded.id
          }
        })
        ,
      )
    } catch (e) {
      return undefined
    }
  }

  // TOKEN FUNCTIONS 

  private async newRefreshAndAccessToken(
    user: user,
    values: { userAgent: string; ipAddress: string },
    remember = false
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const refreshObject = await this.prisma.refresh_tokens.create({
      data: {
        user_id: user.id,
        user_agent: values.userAgent,
        ip_address: values.ipAddress
      }
    })

    return {
      refreshToken: this.signRefreshToken(refreshObject),
      accessToken: this.signAccessToken(user.id, remember),
    }
  }

  private signAccessToken(userId: number, remember = false): string {
    const payload = {
      sub: userId
    }
    return this.jwt.sign(payload, {
      expiresIn: remember === true ? '100y' : '15m',
      secret: this.config.get('JWT_SECRET')
    })
  }

  private signRefreshToken(data: Partial<refresh_tokens>): string {
    return this.jwt.sign({ ...data }, { secret: this.config.get('REFRESH_SECRET') })
  }

  convertUserData(user: user) {

    return {
      role: user.role,
      data: {
        displayName: user.name,
        photoURL: '', //assets/images/avatars/brian-hughes.jpg
        etterem_id: user.etterem_id,
        email: user.email,
        shortcuts: []
      }

    }

  }
}


