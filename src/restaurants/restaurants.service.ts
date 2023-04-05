import { Injectable, NotFoundException } from '@nestjs/common'
import { user } from '@prisma/client'
import { ConsumptionTypesService } from 'src/consumption-types/consumption-types.service'
import { LanguagesService } from 'src/languages/languages.service'
import { CartDto } from 'src/orders/dto/cart.dto'
import { PrismaService } from 'src/prisma/prisma.service'
import { Allergen, CategoriesDto, ProductDto } from './dto/products.dto'
import { RestaurantDto } from './dto/restaurant.dto'
import { UpdateRestaurantDto } from './dto/update-restaurant.dto'
import * as _ from 'lodash'

@Injectable()
export class RestaurantsService {
  constructor(private prisma: PrismaService, private languages: LanguagesService, private consimptionTypes: ConsumptionTypesService) { }

  async findAll(user: user) {
    try {
      const restaurants = await this.prisma.ettermek.findMany({
        where: {
          aktiv: true
        }
      })

      if (!restaurants.length) throw new NotFoundException('Not found restaurants')

      return await this.convertRestaurantData(restaurants, user)
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
        languages: await this.languages.supportedLanguagesByRestaurant(restaurant.id),
        fogyasztasi_modok: await this.consimptionTypes.supportedConsumptionTypesByRestaurant(restaurant.id),
      }
    } catch (error) {
      throw error
    }
  }

  async getProducts(id: number, user: user) {
    try {
      const products = await this.prisma.ettermek.findFirst({
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

      // console.log(products)






      return await this.convertCategoriesData(products, user)
    } catch (error) {
      throw error
    }
  }

  async getDesc(id: number) {
    try {
      const desc = await this.prisma.leiras_fordito.findMany({
        where: {
          etterem_id: id
        },
        include: {
          languages: true
        }
      })

      return desc
    } catch (error) {
      throw error
    }
  }

  async update(id: number, updateRestaurantDto: UpdateRestaurantDto, user: user) {
    try {
      if (updateRestaurantDto.languages) {
        await Promise.all(await this.languages.updateLanguagesByRestaurantId(id, { languages: updateRestaurantDto.languages }))
      }
      if (updateRestaurantDto.fogyasztasi_modok) {
        await Promise.all(await this.consimptionTypes.updateRestaurantConsumptionTypeByRestaurantId(id, { consumptionType: updateRestaurantDto.fogyasztasi_modok }))
      }
      delete updateRestaurantDto.languages
      delete updateRestaurantDto.fogyasztasi_modok
      const leiras = updateRestaurantDto.leiras
      delete updateRestaurantDto.leiras
      const updatedRestaurant = await this.prisma.ettermek.update({
        where: {
          id: id
        },
        data: updateRestaurantDto
      })
      if (!updatedRestaurant) throw new NotFoundException(`Not found restaurant with id: ${id}`)
      if (leiras) {
        await Promise.all(await leiras.map(async desc => {
          return await this.prisma.leiras_fordito.upsert({
            where: {
              etterem_id_nyelv_id: {
                etterem_id: id,
                nyelv_id: desc.nyelv_id
              }
            },
            update: desc,
            create: {
              ...desc,
              etterem_id: id
            }
          })
        }))
      }
      return await this.findOne(id, user)
    } catch (error) {
      throw error
    }
  }

  async findAllForOwner() {
    try {
      const restaurants = await this.prisma.ettermek.findMany({
        include: {
          user: true
        }
      })

      return await Promise.all(restaurants.map(async r => {
        return {
          id: r.id,
          name: r.name,
          address: r.address,
          phone: r.telefon,
          owner: await this.findUserNameById(r.created_by_user_id),
          active: r.aktiv
        }
      }))
    } catch (error) {
      throw error
    }
  }

  private async findUserNameById(id: number) {
    try {
      const user = await this.prisma.user.findFirst({
        where: {
          id: id
        }
      })

      return user.name
    } catch (error) {
      return 'not defined'
    }
  }

  private async isFavoriteFood(productId: number, user: user) {
    const isFavorite = await this.prisma.kedvenc_termekek.findFirst({
      where: {
        termek_id: productId,
        user_id: user.id
      }
    })

    return Boolean(isFavorite)
  }

  private async isFavoriteRestaurant(restaurantId: number, user: user) {
    const isFavorite = await this.prisma.kedvenc_ettermek.findFirst({
      where: {
        etterem_id: restaurantId,
        user_id: user.id
      }
    })

    return Boolean(isFavorite)
  }

  async convertRestaurantData(restaurants, user) {
    const d = new Date()
    const day = d.getDay() === 0 ? 7 : d.getDay() - 1

    const results = await Promise.all(restaurants.map(async restaurant => {
      const temp_descriptions = await this.prisma.leiras_fordito.findMany({
        where: {
          etterem_id: restaurant.id
        },
        include: {
          languages: true
        }
      })

      const descriptions = temp_descriptions.map(lf => {
        return {
          language: lf.languages,
          text: lf.text
        }
      })

      const temp_images = restaurant.img_path.map(img => `${process.env.API_URL}/${img}`)

      return {
        ...restaurant,
        kedvenc: await this.isFavoriteRestaurant(restaurant.id, user),
        languages: await this.languages.supportedLanguagesByRestaurant(restaurant.id),
        fogyasztasi_modok: await this.consimptionTypes.supportedConsumptionTypesByRestaurant(restaurant.id),
        descriptions: descriptions,
        images: temp_images,
      }
    }))


    const result: RestaurantDto[] = results.map(r => {
      if (r.address && r.email && !!r.kedvenc !== null && !!r.kedvenc !== undefined && r.id && r.lat && r.lng && r.name && r.nyitvatartas !== null && r.nyitvatartas !== undefined && r.nyitvatartas && Array.isArray(r.nyitvatartas) && (r.nyitvatartas.length === 7) && r.telefon && r.fogyasztasi_modok) {
        return {
          id: r.id,
          address: r.address,
          email: r.email,
          favourite: r.kedvenc,
          images: (Array.isArray(r.images) && r.images.length) ? [...r.images] : [`${process.env.API_URL}/files/placeholders/restaurant.png`],
          latitude: r.lat,
          longitude: r.lng,
          name: r.name,
          openingHours: (_.has(r.nyitvatartas[day], 'open') && r.nyitvatartas[day].open) ? `${r.nyitvatartas[day].start};${r.nyitvatartas[day].end}` : '-;-',
          phone: r.telefonm,
          serviceType: r.fogyasztasi_modok.map(x => x.id),
          description: r.descriptions,
          nyitvatartas: r.nyitvatartas,
          languages: r.languages,
        }
      }
    }).filter(r => r)

    return result
  }

  async convertCategoriesData(products, user) {
    const temp = await Promise.all(products.etterem_kategoria_rend.map(async kinalat => {
      const termekek = await Promise.all(kinalat.kategoriak.termekek.map(async termek => {
        return {
          ...termek,
          kedvenc: await this.isFavoriteFood(termek.id, user)
        }
      }))
      kinalat.kategoriak.termekek = termekek

      return kinalat
    }))

    const result: CategoriesDto[] = await Promise.all(temp.map(async c => {

      const temp_c = c.kategoriak
      const temp_names = temp_c.kategoriak_fordito.map(kf => {
        return {
          language: kf.languages,
          text: kf.nev
        }
      })

      const temp_products: ProductDto[] = await Promise.all(temp_c.termekek.map(async p => {


        const temp_names = p.termekek_fordito.map(pn => {
          return {
            language: pn.languages,
            text: pn.termek_nev
          }
        })

        const temp_desc = p.termekek_fordito.map(pn => {
          return {
            language: pn.languages,
            text: pn.termek_leiras
          }
        })

        const temp_allergens: Allergen[] = p.termekek_allergenek_rend.map(a => a.allergenek).map(a => {
          const temp_fordit = a.allergenek_fordito.map(af => {
            return {
              language: af.languages,
              text: af.nev
            }
          })

          return {
            id: a.id,
            image: `${process.env.API_URL}/${a.image_path}`,
            names: temp_fordit,

          }
        })

        const temp: ProductDto = {
          id: Number(p.id),
          available: p.elerheto,
          favourite: await this.isFavoriteFood(p.id, user),
          priceInEuro: p.ar_euro,
          priceInForint: parseInt(p.ar_forint.toString(), 10),
          image: p.img_path ? `${process.env.API_URL}/${p.img_path}` : `${process.env.API_URL}/files/placeholders/product.png`,
          names: temp_names,
          descriptions: temp_desc,
          allergens: temp_allergens,
        }


        return temp
      }))
      const result: CategoriesDto = {
        id: c.kategoria_id,
        names: temp_names,
        products: temp_products
      }
      return result
    }))
    return result
  }

  async convertProductsData(products, user) {
    const result: ProductDto[] = await Promise.all(products.map(async p => {


      const temp_names = p.termekek_fordito.map(pn => {
        return {
          language: pn.languages,
          text: pn.termek_nev
        }
      })

      const temp_desc = p.termekek_fordito.map(pn => {
        return {
          language: pn.languages,
          text: pn.termek_leiras
        }
      })

      const temp_allergens: Allergen[] = p.termekek_allergenek_rend.map(a => a.allergenek).map(a => {
        const temp_fordit = a.allergenek_fordito.map(af => {
          return {
            language: af.languages,
            text: af.nev
          }
        })

        return {
          id: a.id,
          image: `${process.env.API_URL}/${a.image_path}`,
          names: temp_fordit,

        }
      })

      const temp: ProductDto = {
        id: Number(p.id),
        available: p.elerheto,
        favourite: await this.isFavoriteFood(p.id, user),
        priceInEuro: p.ar_euro,
        priceInForint: parseInt(p.ar_forint.toString(), 10),
        image: p.img_path ? `${process.env.API_URL}/${p.img_path}` : `${process.env.API_URL}/files/placeholders/product.png`,
        names: temp_names,
        descriptions: temp_desc,
        allergens: temp_allergens,
      }


      return temp
    }))
    return result
  }

  async convertCartData(products, user) {
    const result: CartDto[] = await Promise.all(products.map(async p => {


      const temp_names = p.product.termekek_fordito.map(pn => {
        return {
          language: pn.languages,
          text: pn.termek_nev
        }
      })

      const temp_desc = p.product.termekek_fordito.map(pn => {
        return {
          language: pn.languages,
          text: pn.termek_leiras
        }
      })

      const temp_allergens: Allergen[] = p.product.termekek_allergenek_rend.map(a => a.allergenek).map(a => {
        const temp_fordit = a.allergenek_fordito.map(af => {
          return {
            language: af.languages,
            text: af.nev
          }
        })

        return {
          id: a.id,
          image: `${process.env.API_URL}/${a.image_path}`,
          names: temp_fordit,

        }
      })

      const temp: ProductDto = {
        id: Number(p.product.id),
        available: p.product.elerheto,
        favourite: await this.isFavoriteFood(p.product.id, user),
        priceInEuro: p.product.ar_euro,
        priceInForint: parseInt(p.product.ar_forint.toString(), 10),
        image: p.product.img_path ? `${process.env.API_URL}/${p.product.img_path}` : `${process.env.API_URL}/files/placeholders/product.png`,
        names: temp_names,
        descriptions: temp_desc,
        allergens: temp_allergens,
      }

      return {
        status: p.status,
        canceled: p.canceled,
        quantity: p.quantity,
        orderId: p.orderId,
        dailyOrderId: p.dailyOrderId,
        consumptionTypeId: p.consumptionTypeId,
        product: temp,
      }
    }))
    return result
  }
}
