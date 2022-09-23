import { Injectable, NotFoundException } from '@nestjs/common'
import { user } from '@prisma/client'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime'
import { PrismaService } from 'src/prisma/prisma.service'
import { genOrderUniqueId } from 'src/utils'
import { CreateOrderDto } from './dto/create-order.dto'
import { myCartDto, PayRequiredDto, UpdateOrderDto } from './dto/update-order.dto'

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) { }

  async createOrder(dto: CreateOrderDto, user: user) {
    try {
      const order = await this.prisma.rendelesek.create({
        data: {
          id: await this.getOrderId(),
          user_id: user.id,
          etterem_id: dto.etterem_id,
          statusz_id: 1,
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
        },
        include: {
          user: true,
          asztalok: true,
          fizetesi_mod: {
            include: {
              fizetesi_mod_fordito: {
                include: {
                  languages: true
                }
              }
            }
          },
          fogyasztasi_mod: {
            include: {
              fogyasztasi_mod_fordito: {
                include: {
                  languages: true
                }
              }
            }
          },
          rendeles_statusz: {
            include: {
              rendeles_statusz_fordito: {
                include: {
                  languages: true
                }
              }
            }
          },
          rendelesek_termekek: {
            include: {
              termekek: {
                include: {
                  termekek_fordito: {
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
      return order
    } catch (error) {
      throw error
    }
  }

  async findAllOrdersByRestaurant(restaurantId: number) {
    try {
      const orders = await this.prisma.rendelesek.findMany({
        where: {
          etterem_id: restaurantId
        },
        include: {
          user: true,
          asztalok: true,
          fizetesi_mod: {
            include: {
              fizetesi_mod_fordito: {
                include: {
                  languages: true
                }
              }
            }
          },
          fogyasztasi_mod: {
            include: {
              fogyasztasi_mod_fordito: {
                include: {
                  languages: true
                }
              }
            }
          },
          rendeles_statusz: {
            include: {
              rendeles_statusz_fordito: {
                include: {
                  languages: true
                }
              }
            }
          },
          rendelesek_termekek: {
            include: {
              termekek: {
                include: {
                  termekek_fordito: {
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
      return orders
    } catch (error) {
      throw error
    }
  }

  async findOne(id: string) {
    try {
      const order = await this.prisma.rendelesek.findFirst({
        where: {
          id: id
        },
        include: {
          user: true,
          asztalok: true,
          fizetesi_mod: {
            include: {
              fizetesi_mod_fordito: {
                include: {
                  languages: true
                }
              }
            }
          },
          fogyasztasi_mod: {
            include: {
              fogyasztasi_mod_fordito: {
                include: {
                  languages: true
                }
              }
            }
          },
          rendeles_statusz: {
            include: {
              rendeles_statusz_fordito: {
                include: {
                  languages: true
                }
              }
            }
          },
          rendelesek_termekek: {
            include: {
              termekek: {
                include: {
                  termekek_fordito: {
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
      if (!order) throw new NotFoundException(`Not found order with id: ${id}`)
      return order
    } catch (error) {
      throw error
    }
  }

  async update(id: string, dto: UpdateOrderDto) {
    try {
      const order = await this.prisma.rendelesek.update({
        where: {
          id: id
        },
        data: {
          statusz_id: dto.statusz_id
        },
        include: {
          user: true,
          asztalok: true,
          fizetesi_mod: {
            include: {
              fizetesi_mod_fordito: {
                include: {
                  languages: true
                }
              }
            }
          },
          fogyasztasi_mod: {
            include: {
              fogyasztasi_mod_fordito: {
                include: {
                  languages: true
                }
              }
            }
          },
          rendeles_statusz: {
            include: {
              rendeles_statusz_fordito: {
                include: {
                  languages: true
                }
              }
            }
          },
          rendelesek_termekek: {
            include: {
              termekek: {
                include: {
                  termekek_fordito: {
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
      return order
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException(`Order not found with id: ${id}`)
        }
      }
      throw error
    }
  }

  async payReq(dto: PayRequiredDto, user: user) {
    try {
      const orders = await this.prisma.rendelesek.findMany({
        where: {
          user_id: user.id,
          etterem_id: dto.etterem_id,
          statusz_id: {
            notIn: [5, 6]
          }
        }
      })
      if (orders.length === 0) throw new NotFoundException(`Not found unpayed orders`)
      const results = await Promise.all(
        await orders.map(async order => {
          return await this.prisma.rendelesek.update({
            where: {
              id: order.id
            },
            data: {
              statusz_id: 5,
              fizetesi_mod_id: dto.fizetesi_mod_id
            },
            include: {
              rendelesek_termekek: true
            }
          })
        })
      )
      return results
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException(`Order not found with id: ${dto.etterem_id}`)
        }
      }
      throw error
    }
  }

  async myCart(dto: myCartDto, user: user) {
    try {
      const orders = await this.prisma.rendelesek.findMany({
        where: {
          user_id: user.id,
          etterem_id: dto.etterem_id,
          statusz_id: {
            notIn: [6]
          }
        },
        include: {
          rendelesek_termekek: true
        }
      })
      return orders
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException(`Order not found with id: ${dto.etterem_id}`)
        }
      }
      throw error
    }
  }

  private async getOrderId(): Promise<string> {
    try {
      const id = genOrderUniqueId()
      const order = await this.prisma.rendelesek.findFirst({
        where: {
          id: id
        }
      })
      // console.log(order)

      if (!order) return id
      return await this.getOrderId()
    } catch (error) {
      throw error
    }
  }
}
