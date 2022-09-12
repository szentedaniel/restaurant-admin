import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common'
import { user } from '@prisma/client'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime'
import { PrismaService } from 'src/prisma/prisma.service'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import * as argon from 'argon2'

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) { }

  async create(dto: CreateUserDto, _user: user) {
    try {
      const hash = await argon.hash(dto.password)
      let role = [dto.role]
      if (!role) role = ['user']
      const user = await this.prisma.user.create({
        data: {
          ...dto,
          role: role,
          password: hash,
          etterem_id: _user.etterem_id
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

  async findAll(id: number, userId: number) {
    try {
      const users = await this.prisma.user.findMany({
        where: {
          etterem_id: id,
          id: {
            not: userId
          }
        },
      })

      if (!users.length) throw new NotFoundException(`Users not found with restaurant id: ${id}`)

      const result = users.map(user => {
        delete user.password
        return user
      })

      return result
    } catch (error) {
      throw error
    }
  }

  async findOne(id: number) {
    try {
      const user = await this.prisma.user.findFirst({
        where: {
          id: id
        }
      })
      if (!user) throw new NotFoundException(`User not found with id: ${id}`)

      delete user.password
      return user
    } catch (error) {
      throw error
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      const user = await this.prisma.user.update({
        where: {
          id: id
        },
        data: {
          ...updateUserDto
        }
      })

      if (!user) throw new NotFoundException(`User not found with id: ${id}`)

      delete user.password
      return user
    } catch (error) {
      throw error
    }
  }

  async remove(id: number) {
    try {

      const hasUser = await this.prisma.user.findFirst({
        where: {
          id: id
        }
      })

      if (!hasUser) throw new NotFoundException(`User not found with id: ${id}`)

      const user = await this.prisma.user.delete({
        where: {
          id: id
        }
      })


      delete user.password
      return user
    } catch (error) {
      throw error
    }
  }
}
