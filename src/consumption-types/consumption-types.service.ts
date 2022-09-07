import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { CreateConsumptionTypeDto } from './dto/create-consumption-type.dto'

@Injectable()
export class ConsumptionTypesService {
  constructor(private prisma: PrismaService) { }

  create(createConsumptionTypeDto: CreateConsumptionTypeDto) {
    try {
      const type = this.prisma.fogyasztasi_mod_rend.
    } catch (error) {
      throw error
    }
  }

  findAll() {
    return `This action returns all consumptionTypes`
  }

  findOne(id: number) {
    return `This action returns a #${id} consumptionType`
  }

  remove(id: number) {
    return `This action removes a #${id} consumptionType`
  }
}
