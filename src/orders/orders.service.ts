import { Injectable } from '@nestjs/common'
import { user } from '@prisma/client'
import { PrismaService } from 'src/prisma/prisma.service'
import { genOrderUniqueId } from 'src/utils'
import { CreateOrderDto } from './dto/create-order.dto'
import { UpdateOrderDto } from './dto/update-order.dto'

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) { }

  create(dto: CreateOrderDto, user: user) {
    try {
      const order = this.prisma.rendelesek.create({
        data: {
          id: genOrderUniqueId(),
          user_id: user.id,
          etterem_id: dto.etterem_id,
          asztal_id: dto.asztal_id,
          kupon: dto.kupon,
          fizetes_most: dto.fizetesi_most,
          fizetesi_mod_id: dto.fizetesi_mod_id,
          fogyasztasi_mod_id: dto.fogyasztasi_mod_id,
          rendelesek_termekek: {
            createMany: {
              data: dto.termekek
            }
          },

        }
      })
    } catch (error) {
      throw error
    }
  }

  findAll() {
    return `This action returns all orders`
  }

  findOne(id: number) {
    return `This action returns a #${id} order`
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`
  }

  remove(id: number) {
    return `This action removes a #${id} order`
  }
}
