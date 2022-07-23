import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { AuthSignInDto, AuthSignUpDto } from './dto'
import * as argon from 'argon2'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime'
import { MailerService } from '@nestjs-modules/mailer'
import { user } from '@prisma/client'
import { join } from 'path'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private readonly mailerService: MailerService, private config: ConfigService) { }


  async signup(dto: AuthSignUpDto) {
    // generate password hash
    const hash = await argon.hash(dto.password)
    // save user to db
    try {
      console.log(dto.roles,)

      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          name: dto.name,
          roles: dto.roles,
          password: hash
        }
      })

      await this.sendVerificationEmail(user)

      delete user.password
      return user
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Credentials taken')
        }
      }
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
    delete user.password
    return user
  }

  //

  private async sendVerificationEmail(user: user): Promise<void> {
    this.mailerService
      .sendMail({
        to: user.email, // list of receivers
        // from: 'noreply@nestjs.com', // sender address
        subject: 'Please verify youre email.', // Subject line
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
          image1: join(this.config.get('IMAGES_URL'), 'email.png')
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
  }

}
