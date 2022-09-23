import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'

@Injectable()
export class StatusService {
  constructor(private prisma: PrismaService) { }

  async findAll() {
    try {
      const statuses = await this.prisma.rendeles_statusz.findMany({
        include: {
          rendeles_statusz_fordito: {
            include: {
              languages: true
            }
          }
        }
      })

      if (!statuses.length) throw new NotFoundException('Not found OrderStatus')
      return statuses
    } catch (error) {
      throw error
    }
  }

}
