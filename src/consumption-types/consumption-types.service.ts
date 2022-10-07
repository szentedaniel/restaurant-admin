import { Injectable, NotFoundException } from '@nestjs/common'
import * as _ from 'lodash'
import { PrismaService } from 'src/prisma/prisma.service'
import { CreateConsumptionTypeDto } from './dto/create-consumption-type.dto'
import { UpdateConsumptionTypeDto } from './dto/update-consumption-type.dto'

@Injectable()
export class ConsumptionTypesService {
  constructor(private prisma: PrismaService) { }

  async allConsumptionType() {
    try {
      const type = await this.prisma.fogyasztasi_mod.findMany({
        include: {
          fogyasztasi_mod_fordito: {
            include: {
              languages: true
            }
          }
        }
      })
      if (!type.length) throw new NotFoundException('Not found Consumption types')

      return type
    } catch (error) {
      throw error
    }
  }

  async supportedConsumptionTypesByRestaurant(id: number) {
    try {
      const types = await this.prisma.fogyasztasi_mod_rend.findMany({
        where: {
          etterem_id: id
        },
        include: {
          fogyasztasi_mod: {
            include: {
              fogyasztasi_mod_fordito: true
            }
          }
        }
      })
      if (!types.length) return []
      const result = types.map(type => type.fogyasztasi_mod)
      if (!result.length) return []

      return result
    } catch (error) {
      throw error
    }
  }

  async updateRestaurantConsumptionTypeByRestaurantId(id: number, dto: UpdateConsumptionTypeDto) {
    try {
      const typesInDb = await (await this.supportedConsumptionTypesByRestaurant(id)).map(type => type.id)


      if (_.isEqual(typesInDb.sort(), dto.consumptionType.sort())) return typesInDb

      // console.log(typesInDb, dto.consumptionType)

      // console.log('to remove:', _.difference(typesInDb.sort(), dto.consumptionType.sort()))
      // console.log('to add:', _.difference(dto.consumptionType.sort(), typesInDb.sort()))
      const toRemove = _.difference(typesInDb.sort(), dto.consumptionType.sort())
      const toAdd = _.difference(dto.consumptionType.sort(), typesInDb.sort())



      if (toRemove.length) {
        await Promise.all(
          await toRemove.map(async typeId => {
            return await this.prisma.fogyasztasi_mod_rend.delete({
              where: {
                etterem_id_fogyasztasi_mod_id: {
                  etterem_id: id,
                  fogyasztasi_mod_id: typeId
                }
              }
            })
          })
        )
      }

      if (toAdd.length) {
        await Promise.all(
          await toAdd.map(async typeId => {
            return await this.prisma.fogyasztasi_mod_rend.create({
              data: {
                etterem_id: id,
                fogyasztasi_mod_id: typeId
              }
            })
          })
        )
      }


      return await this.supportedConsumptionTypesByRestaurant(id)
    } catch (error) {
      throw error
    }
  }
}
