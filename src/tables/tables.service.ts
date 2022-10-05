import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime'
import { PrismaService } from 'src/prisma/prisma.service'
import { genTableUniqueCode } from 'src/utils'
import { CreateTableDto } from './dto/create-table.dto'
import { UpdateTableDto } from './dto/update-table.dto'

@Injectable()
export class TablesService {
  constructor(private prisma: PrismaService) { }

  async create(createTableDto: CreateTableDto, restaurantId: number) {
    try {
      // console.log(createTableDto)

      const table = await this.prisma.asztalok.create({
        data: {
          nev: createTableDto.nev,
          ferohely: createTableDto.ferohely,
          elerheto: createTableDto.elerheto,
          etterem_id: restaurantId,
          kod: genTableUniqueCode(restaurantId)
        }
      })
      return table
    } catch (error) {
      throw error
    }
  }

  async findAll(restaurantId: number) {
    try {
      const table = await this.prisma.asztalok.findMany({
        where: {
          etterem_id: restaurantId
        }
      })
      return table
    } catch (error) {
      throw error
    }
  }

  async findOne(id: number) {
    try {
      const table = await this.prisma.asztalok.findFirst({
        where: {
          id: id
        }
      })
      if (!table) throw new NotFoundException(`Table not found with id: ${id}`)
      return table
    } catch (error) {
      throw error
    }
  }

  async update(id: number, updateTableDto: UpdateTableDto) {
    try {
      // console.log(id)

      const table = await this.prisma.asztalok.update({
        where: {
          id: id
        },
        data: {
          ...updateTableDto
        }
      })
      if (!table) throw new NotFoundException(`Table not found with id: ${id}`)
      return table
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException(`Table not found with id: ${id}`)
        }
      }
      throw error
    }
  }

  async remove(id: number) {
    try {
      const table = await this.prisma.asztalok.delete({
        where: {
          id: id
        }
      })
      if (!table) throw new NotFoundException(`Table not found with id: ${id}`)
      return table
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException(`Table not found with id: ${id}`)
        }
      }
      throw error
    }
  }
}
