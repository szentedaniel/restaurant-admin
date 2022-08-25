import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common'
import { user } from '@prisma/client'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime'
import { PrismaService } from 'src/prisma/prisma.service'
import { CreateFavoriteProdDto, CreateFavoriteRestaurantDto } from './dto/create-favorite.dto'

@Injectable()
export class FavoritesService {
  constructor(private prisma: PrismaService) { }

  async createProdFav(dto: CreateFavoriteProdDto, user: user) {
    try {
      const fav = await this.prisma.kedvenc_termekek.create({
        data: {
          termek_id: dto.termekId,
          user_id: user.id
        }
      })

      return fav
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Credentials taken')
        }
      }
      throw error
    }
  }

  async findAllProdFav(user: user) {
    try {
      const favs = await this.prisma.kedvenc_termekek.findMany({
        where: {
          user_id: user.id
        }
      })

      if (!favs.length) throw new NotFoundException('Not found favorites')

      return favs
    } catch (error) {
      throw error
    }
  }

  async removeProdFav(id: number, user: user) {
    try {
      const fav = await this.prisma.kedvenc_termekek.delete({
        where: {
          termek_id_user_id: {
            termek_id: id,
            user_id: user.id
          }
        }
      })

      if (!fav) throw new NotFoundException('Not found favorites')

      return fav
    } catch (error) {
      throw error
    }
  }


  async createRestaurantFav(dto: CreateFavoriteRestaurantDto, user: user) {
    try {
      const fav = await this.prisma.kedvenc_ettermek.create({
        data: {
          etterem_id: dto.restaurantId,
          user_id: user.id
        }
      })

      return fav
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Credentials taken')
        }
      }
      throw error
    }
  }

  async findAllRestaurantFav(user: user) {
    try {
      const favs = await this.prisma.kedvenc_ettermek.findMany({
        where: {
          user_id: user.id
        }
      })

      if (!favs.length) throw new NotFoundException('Not found favorites')

      return favs
    } catch (error) {
      throw error
    }
  }

  async removeRestaurantFav(id: number, user: user) {
    try {
      const fav = await this.prisma.kedvenc_ettermek.delete({
        where: {
          etterem_id_user_id: {
            etterem_id: id,
            user_id: user.id
          }
        }
      })

      if (!fav) throw new NotFoundException('Not found favorites')

      return fav
    } catch (error) {
      throw error
    }
  }
}
