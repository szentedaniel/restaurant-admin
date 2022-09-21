import { Injectable, NotFoundException } from '@nestjs/common'
import { user } from '@prisma/client'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime'
import { PrismaService } from 'src/prisma/prisma.service'
import { CreateCategoryDto } from './dto/create-category.dto'
import { UpdateCategoryDto } from './dto/update-category.dto'

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) { }

  async create(dto: CreateCategoryDto, restaurantId: number) {
    try {
      const category = await this.prisma.kategoriak.create({
        data: {
          parent_id: (dto.parentId ? dto.parentId : null),
          kategoriak_fordito: {
            createMany: {
              data: dto.nev
            }
          },
          etterem_kategoria_rend: {
            create: {
              etterem_id: restaurantId
            },
          }
        },
        include: {
          kategoriak_fordito: {
            include: {
              languages: true
            }
          }
        }
      })

      return category
    } catch (error) {
      throw error
    }
  }

  async findAll(restaurantId: number) {
    try {
      const category = await this.prisma.kategoriak.findMany({
        where: {
          etterem_kategoria_rend: {
            some: {
              etterem_id: restaurantId
            }
          }
        },
        include: {
          kategoriak_fordito: {
            include: {
              languages: true
            }
          }
        }
      })

      return category
    } catch (error) {
      throw error
    }
  }

  async findOne(id: number) {
    try {
      const category = await this.prisma.kategoriak.findFirst({
        where: {
          id: id
        },
        include: {
          kategoriak_fordito: {
            include: {
              languages: true
            }
          }
        }
      })
      if (!category) throw new NotFoundException(`Category not found with id: ${id}`)
      return category
    } catch (error) {
      throw error
    }
  }

  async update(id: number, dto: UpdateCategoryDto) {
    try {
      const updatedCategory = await this.prisma.kategoriak.update({
        where: {
          id: Number(id)
        },
        data: {
          parent_id: (dto.parentId ? dto.parentId : null),
        }
      })
      if (!updatedCategory) throw new NotFoundException(`Category not found with id: ${id}`)
      if (dto.nev) {
        await Promise.all(await dto.nev.map(async nev => {
          return await this.prisma.kategoriak_fordito.upsert({
            where: {
              kategoria_id_nyelv_id: {
                kategoria_id: id,
                nyelv_id: nev.nyelv_id
              }
            },
            update: nev,
            create: {
              ...nev,
              kategoria_id: id
            }
          })
        }))
      }
      const category = await this.findOne(id)
      return category
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException(`Category not found with id: ${id}`)
        }
      }
      throw error
    }
  }

  async remove(id: number) {
    try {
      const category = await this.prisma.kategoriak.delete({
        where: {
          id: id
        }
      })
      if (!category) throw new NotFoundException(`Category not found with id: ${id}`)
      return category
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException(`Category not found with id: ${id}`)
        }
      }
      throw error
    }
  }
}
