import { Injectable, NotFoundException } from '@nestjs/common'
import * as _ from 'lodash'
import { PrismaService } from 'src/prisma/prisma.service'
import { UpdateLanguageDto } from './dto/update-language.dto'

@Injectable()
export class LanguagesService {
  constructor(private prisma: PrismaService) { }

  async allLanguages() {
    try {
      const langs = await this.prisma.languages.findMany({})
      if (!langs.length) throw new NotFoundException('Not found languages')

      return langs
    } catch (error) {
      throw error
    }
  }

  async supportedLanguagesByRestaurant(id: number) {
    try {
      const langs = await this.prisma.ettermek.findMany({
        where: {
          id: id
        },
        include: {
          etterem_nyelv: {
            include: {
              languages: true
            }
          }
        }
      })
      if (!langs.length) throw new NotFoundException(`Not found restaurant with id: ${id}`)
      const result = langs[0].etterem_nyelv.map(lang => lang.languages)
      if (!result.length) return []

      return result
    } catch (error) {
      throw error
    }
  }

  async updateLanguagesByRestaurantId(id: number, updateLanguageDto: UpdateLanguageDto) {
    try {
      const langsInDb = await (await this.supportedLanguagesByRestaurant(id)).map(lang => lang.kod)


      if (_.isEqual(langsInDb.sort(), updateLanguageDto.languages.sort())) return langsInDb

      // console.log(langsInDb, updateLanguageDto.languages)

      // console.log('to remove:', _.difference(langsInDb.sort(), updateLanguageDto.languages.sort()))
      // console.log('to add:', _.difference(updateLanguageDto.languages.sort(), langsInDb.sort()))
      const toRemove = _.difference(langsInDb.sort(), updateLanguageDto.languages.sort())
      const toAdd = _.difference(updateLanguageDto.languages.sort(), langsInDb.sort())



      if (toRemove.length) {
        await Promise.all(
          await toRemove.map(async lang => {
            const langId: number | undefined = await this.getIdByCode(lang)
            if (langId) {
              return await this.prisma.etterem_nyelv.delete({
                where: {
                  etterem_id_nyelv_id: {
                    etterem_id: id,
                    nyelv_id: langId
                  }
                }
              })
            }
          })
        )
      }

      if (toAdd.length) {
        await Promise.all(
          await toAdd.map(async lang => {
            const langId: number | undefined = await this.getIdByCode(lang)
            if (langId) {
              return await this.prisma.etterem_nyelv.create({
                data: {
                  etterem_id: id,
                  nyelv_id: langId
                }
              })
            }
          })
        )
      }


      return await (await this.supportedLanguagesByRestaurant(id)).map(lang => lang.kod)
    } catch (error) {
      throw error
    }
  }

  private async getIdByCode(kod: string) {
    try {
      const lang = await this.prisma.languages.findFirst({
        where: {
          kod: kod
        }
      })
      if (!lang) return undefined
      return lang.id
    } catch (error) {
      throw error
    }
  }

}
