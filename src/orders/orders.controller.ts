import { Controller, Get, Post, Body, Patch, Param, UseGuards } from '@nestjs/common'
import { OrdersService } from './orders.service'
import { CreateOrderDto } from './dto/create-order.dto'
import { myCartDto, PayRequiredDto, UpdateOrderDto } from './dto/update-order.dto'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { GetUser, Roles } from 'src/auth/decorator'
import { user } from '@prisma/client'
import { JwtGuard, RolesGuard } from 'src/auth/guard'
import { Role } from 'src/auth/enums'

@ApiTags('orders')
@Controller('api/orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) { }

  @Post()
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  create(@Body() createOrderDto: CreateOrderDto, @GetUser() user: user) {
    return this.ordersService.createOrder(createOrderDto, user)
  }

  @Get()
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  findAll(@GetUser('etterem_id') restaurantId: number) {
    return this.ordersService.findAllOrdersByRestaurant(restaurantId)
  }

  @Get(':id')
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  findOne(@Param('id') id: string) {
    return this.ordersService.findOne(id)
  }

  @Patch(':id')
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.ordersService.update(id, updateOrderDto)
  }

  @Post('payReq')
  @ApiBearerAuth()
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(Role.User)
  pay(@Body() dto: PayRequiredDto, @GetUser() user: user) {
    return this.ordersService.payReq(dto, user)
  }

  @Post('myCart')
  @ApiBearerAuth()
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(Role.User)
  myCart(@Body() dto: myCartDto, @GetUser() user: user) {
    return this.ordersService.myCart(dto, user)
  }
}
