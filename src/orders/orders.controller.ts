import { Controller, Get, Post, Body, Patch, Param, UseGuards, HttpCode } from '@nestjs/common'
import { OrdersService } from './orders.service'
import { CreateOrderDto } from './dto/create-order.dto'
import { myCartDto, PayRequiredDto, UpdateOrderDto, UpdateOrderProductDto } from './dto/update-order.dto'
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { GetUser, Roles } from 'src/auth/decorator'
import { user } from '@prisma/client'
import { JwtGuard, RolesGuard } from 'src/auth/guard'
import { Role } from 'src/auth/enums'
import { ErrorResonseDto } from 'src/auth/dto/authRespose.dto'
import { CartDto } from './dto/cart.dto'

@ApiTags('orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) { }

  @ApiTags('mobile')
  @Post()
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @ApiOperation({ summary: `Must log in` })
  @ApiResponse({
    isArray: true,
    status: 200,
    type: Number
  })
  @ApiResponse({
    status: 403,
    type: ErrorResonseDto
  })
  create(@Body() createOrderDto: CreateOrderDto, @GetUser() user: user) {
    return this.ordersService.createOrder(createOrderDto, user)
  }

  @Get()
  @ApiBearerAuth()
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(Role.Staff, Role.Restricted, Role.Admin)
  @ApiOperation({ summary: `ReqRole: ${[Role.Staff, Role.Restricted, Role.Admin]}` })
  findAll(@GetUser('etterem_id') restaurantId: number) {
    return this.ordersService.findAllOrdersByRestaurant(restaurantId)
  }

  @Get(':id')
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @Roles(Role.Staff, Role.Restricted, Role.Admin)
  @ApiOperation({ summary: `ReqRole: ${[Role.Staff, Role.Restricted, Role.Admin]}` })
  findOne(@Param('id') id: string) {
    return this.ordersService.findOne(id)
  }

  @Patch(':id')
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @Roles(Role.Staff, Role.Restricted, Role.Admin)
  @ApiOperation({ summary: `ReqRole: ${[Role.Staff, Role.Restricted, Role.Admin]}` })
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.ordersService.update(id, updateOrderDto)
  }

  @Patch(':orderId/:prodId')
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @Roles(Role.Staff, Role.Restricted, Role.Admin)
  @ApiOperation({ summary: `ReqRole: ${[Role.Staff, Role.Restricted, Role.Admin]}` })
  updateOrderProd(@Param('orderId') orderId: string, @Param('prodId') prodId: string, @Body() updateOrderDto: UpdateOrderProductDto) {
    return this.ordersService.updateOrderProd(orderId, +prodId, updateOrderDto)
  }

  @ApiTags('mobile')
  @Post('payReq')
  @ApiBearerAuth()
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(Role.User)
  @ApiOperation({ summary: `ReqRole: ${[Role.User]}` })
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    isArray: true,
    type: Number
  })
  @ApiResponse({
    status: 400,
    isArray: false,
    type: ErrorResonseDto
  })
  @ApiResponse({
    status: 404,
    isArray: false,
    type: ErrorResonseDto
  })
  pay(@Body() dto: PayRequiredDto, @GetUser() user: user) {
    return this.ordersService.payReq(dto, user)
  }

  @ApiTags('mobile')
  @Post('myCart')
  @ApiBearerAuth()
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(Role.User)
  @ApiOperation({ summary: `ReqRole: ${[Role.User]}` })
  @ApiResponse({
    status: 200,
    isArray: true,
    type: CartDto
  })
  @ApiResponse({
    status: 400,
    isArray: false,
    type: ErrorResonseDto
  })
  @ApiResponse({
    status: 404,
    isArray: false,
    type: ErrorResonseDto
  })
  myCart(@Body() dto: myCartDto, @GetUser() user: user) {
    return this.ordersService.myCart(dto, user)
  }
}
