import { Injectable, NotFoundException } from '@nestjs/common'
import { user } from '@prisma/client'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime'
import * as _ from 'lodash'
import { AllergiesService } from 'src/allergies/allergies.service'
import { PrismaService } from 'src/prisma/prisma.service'
import { CreateProductDto, TermekFordito, toggleAvailableDto } from './dto/create-product.dto'
import { UpdateProductDto } from './dto/update-product.dto'

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService, private allergies: AllergiesService) { }

  async create(dto: CreateProductDto, user: user) {
    try {
      const allergenek = dto.allergenek.map(allergen => ({ allergen_id: Number(allergen) }))
      const product = await this.prisma.termekek.create({
        data: {
          etterem_id: user.etterem_id,
          kategoria_id: dto.kategoria_id,
          ar_forint: dto.ar_forint,
          ar_euro: (dto.ar_euro ?? null),
          elerheto: dto.elerheto,
          img_path: dto.img_path ? dto.img_path : null,
          termekek_fordito: {
            createMany: {
              data: dto.fordito
            }
          },
          termekek_allergenek_rend: {
            createMany: {
              data: allergenek
            }
          }
        },
        include: {
          termekek_fordito: {
            include: {
              languages: true
            }
          },
          kategoriak: {
            include: {
              kategoriak_fordito: {
                include: {
                  languages: true
                }
              }
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
      })

      return product
    } catch (error) {
      throw error
    }
  }

  async findAll(user: user) {
    try {
      const products = await this.prisma.termekek.findMany({
        where: {
          etterem_id: user.etterem_id
        },
        include: {
          termekek_fordito: {
            include: {
              languages: true
            }
          },
          kategoriak: {
            include: {
              kategoriak_fordito: {
                include: {
                  languages: true
                }
              }
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
      })

      return products
    } catch (error) {
      throw error
    }
  }

  async findOne(id: number) {
    try {
      const product = await this.prisma.termekek.findFirst({
        where: {
          id: id
        },
        include: {
          termekek_fordito: {
            include: {
              languages: true
            }
          },
          kategoriak: {
            include: {
              kategoriak_fordito: {
                include: {
                  languages: true
                }
              }
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
      })
      if (!product) throw new NotFoundException(`Product not found with id: ${id}`)

      return product
    } catch (error) {
      throw error
    }
  }

  async update(id: number, dto: UpdateProductDto) {
    try {
      if (dto.allergenek) {
        await Promise.all(await this.allergies.updateAllergiesByProductId(id, { allergenek: dto.allergenek }))
      }
      if (dto.fordito) {
        await Promise.all(await this.updateForditoByProductId(id, dto.fordito))
      }
      delete dto.allergenek
      delete dto.fordito
      const product = await this.prisma.termekek.update({
        where: {
          id: id
        },
        data: {
          ...dto
        },
        include: {
          termekek_fordito: {
            include: {
              languages: true
            }
          },
          kategoriak: {
            include: {
              kategoriak_fordito: {
                include: {
                  languages: true
                }
              }
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
      })
      return product
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException(`Product not found with id: ${id}`)
        }
      }
      throw error
    }
  }

  async remove(id: number) {
    try {
      const product = await this.prisma.termekek.delete({
        where: {
          id: id
        }
      })
      return product
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException(`Product not found with id: ${id}`)
        }
      }
      throw error
    }
  }

  private async forditoByProduct(id: number) {
    try {
      const langs = await this.prisma.termekek.findMany({
        where: {
          id: id
        },
        include: {
          termekek_fordito: true
        }
      })
      if (!langs.length) throw new NotFoundException(`Not found`)
      const result = langs[0].termekek_fordito.map(lang => lang.nyelv_id)
      if (!result.length) return []

      return result
    } catch (error) {
      throw error
    }
  }

  private async updateForditoByProductId(id: number, forditok: Array<TermekFordito>) {
    try {
      const langsInDb = await this.forditoByProduct(id)
      const kapottForditoNyelvek = forditok.map(fordito => fordito.nyelv_id)

      // console.log(langsInDb, kapottForditoNyelvek)

      // console.log('to remove:', _.difference(langsInDb.sort(), kapottForditoNyelvek.sort()))
      // console.log('to add:', _.difference(kapottForditoNyelvek.sort(), langsInDb.sort()))
      const toRemove = _.difference(langsInDb.sort(), kapottForditoNyelvek.sort())

      if (toRemove.length) {
        await Promise.all(
          await toRemove.map(async lang => {
            return await this.prisma.termekek_fordito.delete({
              where: {
                termek_id_nyelv_id: {
                  nyelv_id: lang,
                  termek_id: id
                }
              }
            })
          })
        )
      }

      await Promise.all(
        await forditok.map(async fordito => {
          return await this.prisma.termekek_fordito.upsert({
            where: {
              termek_id_nyelv_id: {
                nyelv_id: fordito.nyelv_id,
                termek_id: id
              }
            },
            update: {
              termek_nev: fordito.termek_nev,
              termek_leiras: fordito.termek_leiras
            },
            create: {
              nyelv_id: fordito.nyelv_id,
              termek_id: id,
              termek_nev: fordito.termek_nev,
              termek_leiras: fordito.termek_leiras
            }
          })
        })
      )

      return await this.forditoByProduct(id)
    } catch (error) {
      throw error
    }
  }

}
