import { Injectable, NotFoundException } from '@nestjs/common'
import { user } from '@prisma/client'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime'
import { OrderStatus } from 'prisma/data'
import { PrismaService } from 'src/prisma/prisma.service'
import { RestaurantsService } from 'src/restaurants/restaurants.service'
import { genOrderUniqueId } from 'src/utils'
import { CartDto } from './dto/cart.dto'
import { CreateOrderDto } from './dto/create-order.dto'
import { myCartDto, PayRequiredDto, UpdateOrderDto, UpdateOrderProductDto } from './dto/update-order.dto'

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService, private restaurantsService: RestaurantsService) { }

  async createOrder(dto: CreateOrderDto, user: user) {
    try {
      const today = new Date()

      const dailyCounter = await this.prisma.rendelesek.count({
        where: {
          etterem_id: dto.etterem_id,
          rendeles_ideje: {
            gte: new Date(today.toISOString().split('T')[0]),
          }
        }
      }) + 1
      const order = await this.prisma.rendelesek.create({
        data: {
          id: await this.getOrderId(),
          daily_id: dailyCounter,
          user_id: user.id,
          etterem_id: dto.etterem_id,
          statusz_id: 1,
          asztal_id: dto.asztal_id,
          // kupon: dto.kupon,
          fizetes_most: dto.fizetes_most,
          fizetesi_mod_id: dto.fizetesi_mod_id,
          fogyasztasi_mod_id: dto.fogyasztasi_mod_id,
          rendelesek_termekek: {
            createMany: {
              data: dto.termekek
            }
          },
        },
        include: {
          rendelesek_termekek: {
            select: {
              termek_id: true
            }
          }
        }
      })
      return order.rendelesek_termekek.map(o => o.termek_id)
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

  async updateOrderProd(orderId: string, prodId: number, dto: UpdateOrderProductDto) {
    try {
      const prod = await this.prisma.rendelesek_termekek.update({
        where: {
          rendeles_id_termek_id: {
            rendeles_id: orderId,
            termek_id: prodId
          }
        },
        data: dto
      })

      return await (await this.findOne(prod.rendeles_id)).rendelesek_termekek
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException(`Order or Order's product not found`)
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
            notIn: [OrderStatus.Ordered, OrderStatus.Declined, OrderStatus.PaymentRequested, OrderStatus.Paid]
          }
        }
      })
      if (orders.length === 0) return []
      const results = await Promise.all(
        await orders.map(async order => {
          return await this.prisma.rendelesek.update({
            where: {
              id: order.id
            },
            data: {
              statusz_id: OrderStatus.PaymentRequested,
              fizetesi_mod_id: dto.fizetesi_mod_id
            },
            include: {
              rendelesek_termekek: true
            }
          })
        })
      )


      return results.map(r => r.rendelesek_termekek.map(t => t.termek_id))
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
            notIn: [OrderStatus.Declined, OrderStatus.Paid]
          }
        },
        include: {
          rendelesek_termekek: {
            include: {
              termekek: {
                include: {
                  termekek_fordito: {
                    include: {
                      languages: true
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
              }
            }
          }
        }
      })

      const result = []

      for (let i = 0; i < orders.length; i++) {
        const order = orders[i]

        for (let j = 0; j < order.rendelesek_termekek.length; j++) {
          const termekek = order.rendelesek_termekek[j]
          result.push({ product: termekek.termekek, status: order.statusz_id, quantity: termekek.darab, canceled: termekek.canceled, orderId: order.id, dailyOrderId: order.daily_id, consumptionTypeId: order.fogyasztasi_mod_id })
        }
      }



      return this.restaurantsService.convertCartData(result, user)
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
