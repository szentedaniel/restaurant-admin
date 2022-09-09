import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common'
import { OrdersService } from './orders.service'
import { CreateOrderDto } from './dto/create-order.dto'
import { UpdateOrderDto } from './dto/update-order.dto'
import { ApiTags } from '@nestjs/swagger'
import { GetUser } from 'src/auth/decorator'
import { user } from '@prisma/client'

@ApiTags('orders')
@Controller('api/orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) { }

  @Post()
  create(@Body() createOrderDto: CreateOrderDto, @GetUser() user: user) {
    return this.ordersService.create(createOrderDto, user)
  }

  @Get()
  findAll() {
    return this.ordersService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ordersService.findOne(+id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.ordersService.update(+id, updateOrderDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ordersService.remove(+id)
  }
}
