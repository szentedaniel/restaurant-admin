import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { AuthSignInDto, AuthSignUpAdminDto, AuthSignUpDto, AuthUpdateSettingsDto } from './dto'
import * as argon from 'argon2'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime'
import { MailerService } from '@nestjs-modules/mailer'
import { user } from '@prisma/client'
import { join } from 'path'
import { ConfigService } from '@nestjs/config'
import * as objectHash from 'object-hash'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private readonly mailerService: MailerService, private config: ConfigService, private jwt: JwtService) { }


  async signup(dto: AuthSignUpDto) {
    // generate password hash
    const hash = await argon.hash(dto.password)
    // save user to db
    try {
      let role = [dto.role]
      if (!role) role = ['user']

      console.log(role,)
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          name: dto.name,
          role: role,
          password: hash,
        }
      })

      const registeredUser = await this.sendVerificationEmail(user)

      const convertedUser = this.convertUserData(registeredUser)

      delete registeredUser.password

      const access_token = await this.signToken(user.id, user.email)
      const response = {
        user: convertedUser,
        access_token
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

  async signupAdmin(dto: AuthSignUpAdminDto) {
    // generate password hash
    const hash = await argon.hash(dto.password)
    // save user to db
    try {
      let role = [dto.role]
      if (!role) role = ['user']

      console.log(role,)
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          name: dto.name,
          role: role,
          password: hash,
          ettermek: {
            create: {
              name: dto.restaurantName,
              adoszam: Number(dto.taxNumber),
              ceg: dto.companyName,
              city_name: dto.cityName,
              address: dto.address,
              lat: Number(dto.lat),
              lng: Number(dto.lng)
            }
          }
        }
      })

      const registeredUser = await this.sendVerificationEmail(user)

      const convertedUser = this.convertUserData(registeredUser)

      delete registeredUser.password

      const access_token = await this.signToken(user.id, user.email)
      const response = {
        user: convertedUser,
        access_token
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

  async signin(dto: AuthSignInDto) {
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
    const access_token = await this.signToken(user.id, user.email, dto.remember)
    const response = {
      user: convertedUser,
      access_token
    }
    return response
  }

  async signinAdmin(dto: AuthSignInDto) {
    // find the user
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email
      }
    })
    // if user does not exist throw exception
    if (!user) throw new NotFoundException('User not found.')

    if (!user.etterem_id) throw new ForbiddenException()

    // compare passwords
    const pwMatches = await argon.verify(user.password, dto.password)
    // if password incorrect throw exception
    if (!pwMatches) throw new ForbiddenException('Credentials incorrect.')

    // send back the user
    const convertedUser = this.convertUserData(user)
    delete user.password
    const access_token = await this.signToken(user.id, user.email, dto.remember)
    const response = {
      user: convertedUser,
      access_token
    }
    return response
  }

  async refreshToken(user: user) {
    // if user does not exist throw exception
    if (!user) throw new NotFoundException('User not found.')

    // send back the user
    const convertedUser = this.convertUserData(user)
    delete user.password
    const access_token = await this.signToken(user.id, user.email)
    const response = {
      user: convertedUser,
      access_token
    }
    return response
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
        template: 'emailVerification',
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

  async signToken(userId: number, email: string, remember = false): Promise<string> {
    const payload = {
      sub: userId,
      email
    }
    return this.jwt.signAsync(payload, {
      expiresIn: remember === true ? '100y' : '1d',
      secret: this.config.get('JWT_SECRET')
    })
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


