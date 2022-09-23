import { Injectable, NotFoundException } from '@nestjs/common'
import { allergenek } from '@prisma/client'
import * as _ from 'lodash'
import { PrismaService } from 'src/prisma/prisma.service'
import { UpdateAllergyDto } from './dto/update-allergy.dto'

@Injectable()
export class AllergiesService {
  constructor(private prisma: PrismaService) { }

  async findAll() {
    try {
      const allergies = await this.prisma.allergenek.findMany({
        include: {
          allergenek_fordito: {
            include: {
              languages: true
            }
          }
        }
      })
      return allergies
    } catch (error) {
      throw error
    }
  }

  async allergiesByProduct(id: number) {
    try {
      const langs = await this.prisma.termekek.findMany({
        where: {
          id: id
        },
        include: {
          termekek_allergenek_rend: true
        }
      })
      if (!langs.length) throw new NotFoundException(`Not found`)
      const result = langs[0].termekek_allergenek_rend.map(allergy => allergy.allergen_id)
      if (!result.length) return []

      return result
    } catch (error) {
      throw error
    }
  }

  async updateAllergiesByProductId(id: number, dto: UpdateAllergyDto) {
    try {
      const allergiesInDb = await this.allergiesByProduct(id)
      const tempAllergies: allergenek[] = await this.findAll()
      const allergiesIds = tempAllergies.map(allergy => allergy.id)
      const wannaBeAllergies = _.intersection(allergiesIds, dto.allergenek)

      if (_.isEqual(allergiesInDb.sort(), wannaBeAllergies.sort())) return allergiesInDb

      // console.log(allergiesInDb, wannaBeAllergies)

      // console.log('to remove:', _.difference(allergiesInDb.sort(), wannaBeAllergies.sort()))
      // console.log('to add:', _.difference(wannaBeAllergies.sort(), allergiesInDb.sort()))
      const toRemove = _.difference(allergiesInDb.sort(), wannaBeAllergies.sort())
      const toAdd = _.difference(wannaBeAllergies.sort(), allergiesInDb.sort())

      if (toRemove.length) {
        await Promise.all(
          await toRemove.map(async allergyId => {
            return await this.prisma.termekek_allergenek_rend.delete({
              where: {
                allergen_id_termek_id: {
                  termek_id: id,
                  allergen_id: allergyId
                }
              }
            })
          })
        )
      }

      if (toAdd.length) {
        await Promise.all(
          await toAdd.map(async allergyId => {
            return await this.prisma.termekek_allergenek_rend.create({
              data: {
                allergen_id: allergyId,
                termek_id: id
              }
            })
          })
        )
      }

      return await this.allergiesByProduct(id)
    } catch (error) {
      throw error
    }
  }
}
