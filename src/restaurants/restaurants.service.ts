import { Injectable, NotFoundException } from '@nestjs/common'
import { user } from '@prisma/client'
import { LanguagesService } from 'src/languages/languages.service'
import { PrismaService } from 'src/prisma/prisma.service'
import { UpdateRestaurantDto } from './dto/update-restaurant.dto'

@Injectable()
export class RestaurantsService {
  constructor(private prisma: PrismaService, private languages: LanguagesService) { }


  async findAll(user: user) {
    try {
      const restaurants = await this.prisma.ettermek.findMany({})

      if (!restaurants.length) throw new NotFoundException('Not found restaurants')

      const results = Promise.all(restaurants.map(async restaurant => {
        return {
          ...restaurant,
          kedvenc: await this.isFavoriteRestaurant(restaurant.id, user),
          languages: await this.languages.supportedLanguagesByRestaurant(restaurant.id)
        }
      }))
      return results
    } catch (error) {
      throw error
    }
  }

  async findOne(id: number, user: user) {
    try {
      const restaurant = await this.prisma.ettermek.findFirst({
        where: {
          id: id,
        },
      })

      if (!restaurant) throw new NotFoundException(`Not found restaurant with id: ${id}`)

      return {
        ...restaurant,
        kedvenc: await this.isFavoriteRestaurant(restaurant.id, user),
        languages: await this.languages.supportedLanguagesByRestaurant(restaurant.id)
      }
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

  async update(id: number, updateRestaurantDto: UpdateRestaurantDto, user: user) {
    try {
      if (updateRestaurantDto.languages.length > 0) {
        await Promise.all(await this.languages.updateLanguagesByRestaurantId(id, { languages: updateRestaurantDto.languages }))
      }
      delete updateRestaurantDto.languages
      const updatedRestaurant = await this.prisma.ettermek.update({
        where: {
          id: id
        },
        data: updateRestaurantDto
      })
      if (!updatedRestaurant) throw new NotFoundException(`Not found restaurant with id: ${id}`)
      return await this.findOne(id, user)
    } catch (error) {
      throw error
    }
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
