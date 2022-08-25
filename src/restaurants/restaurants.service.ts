import { Injectable, NotFoundException } from '@nestjs/common'
import { user } from '@prisma/client'
import { PrismaService } from 'src/prisma/prisma.service'
import { UpdateRestaurantDto } from './dto/update-restaurant.dto'

@Injectable()
export class RestaurantsService {
  constructor(private prisma: PrismaService) { }


  async findAll(user: user) {
    try {
      const restaurants = await this.prisma.ettermek.findMany({})

      if (!restaurants.length) throw new NotFoundException('Not found restaurants')

      const results = Promise.all(restaurants.map(async restaurant => {
        return {
          ...restaurant,
          kedvenc: await this.isFavoriteRestaurant(restaurant.id, user)
        }
      }))
      return results
    } catch (error) {
      throw error
    }
  }

  async findOne(id: number) {
    try {
      const restaurant = await this.prisma.ettermek.findFirst({
        where: {
          id: id,
        },
      })

      if (!restaurant) throw new NotFoundException(`Not found restaurant with id: ${id}`)

      return restaurant
    } catch (error) {
      throw error
    }
  }

  async getProducts(id: number, user: user) {
    try {
      const restaurant = await this.prisma.ettermek.findFirst({
        where: {
          id: id,
        },
        include: {
          etterem_kategoria_rend: {
            include: {
              ettermek: false,
              kategoriak: {
                include: {
                  kategoriak_fordito: {
                    include: {
                      languages: true
                    }
                  },
                  termekek: {
                    include: {
                      termekek_fordito: {
                        include: {
                          languages: true
                        }
                      },
                      termekek_allergenek_rend: {
                        include: {
                          allergenek: {
                            include: {
                              allergenek_fordito: {
                                include: {
                                  languages: true
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      })
      // let result = renameKeyName(restaurant, 'etterem_kategoria_rend', 'kinalat')

      const result = Promise.all(restaurant.etterem_kategoria_rend.map(async kinalat => {
        const termekek = await Promise.all(kinalat.kategoriak.termekek.map(async termek => {
          return {
            ...termek,
            kedvenc: await this.isFavoriteFood(termek.id, user)
          }
        }))
        kinalat.kategoriak.termekek = termekek

        return kinalat
      }))




      return result
    } catch (error) {

    }
  }

  async update(id: number, updateRestaurantDto: UpdateRestaurantDto) {
    try {
      const updatedRestaurant = await this.prisma.ettermek.update({
        where: {
          id: id
        },
        data: updateRestaurantDto
      })

      if (!updatedRestaurant) throw new NotFoundException(`Not found restaurant with id: ${id}`)
      return updatedRestaurant
    } catch (error) {
      throw error
    }
  }

  remove(id: number) {
    return `This action removes a #${id} restaurant`
  }


  async isFavoriteFood(productId: number, user: user) {
    const isFavorite = await this.prisma.kedvenc_termekek.findFirst({
      where: {
        termek_id: productId,
        user_id: user.id
      }
    })

    return Boolean(isFavorite)
  }

  async isFavoriteRestaurant(restaurantId: number, user: user) {
    const isFavorite = await this.prisma.kedvenc_ettermek.findFirst({
      where: {
        etterem_id: restaurantId,
        user_id: user.id
      }
    })

    return Boolean(isFavorite)
  }
}
