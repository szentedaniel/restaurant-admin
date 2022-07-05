import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { AuthSignInDto, AuthSignUpDto } from './dto'
import * as argon from 'argon2'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime'

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) { }

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

}
