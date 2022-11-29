import { Controller, Get, Body, Patch, Param, UseGuards } from '@nestjs/common'
import { RestaurantsService } from './restaurants.service'
import { UpdateRestaurantDto } from './dto/update-restaurant.dto'
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { GetUser, Roles } from 'src/auth/decorator'
import { JwtGuard, RolesGuard } from 'src/auth/guard'
import { Role } from 'src/auth/enums'
import { user } from '@prisma/client'
import { ErrorResonseDto } from 'src/auth/dto/authRespose.dto'
import { CategoriesDto } from './dto/products.dto'
import { RestaurantDto } from './dto/restaurant.dto'


@ApiTags('restaurants')
@Controller('restaurants')
export class RestaurantsController {
  constructor(private readonly restaurantsService: RestaurantsService) { }

  @ApiTags('mobile')
  @Get()
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: `Must log in` })
  @ApiResponse({
    isArray: true,
    status: 200,
    type: RestaurantDto
  })
  @ApiResponse({
    status: 403,
    type: ErrorResonseDto
  })
  @ApiResponse({
    status: 404,
    type: ErrorResonseDto
  })
  findAll(@GetUser() user: user) {
    return this.restaurantsService.findAll(user)
  }

  @Get(':id')
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: `Must log in` })
  findOne(@Param('id') id: string, @GetUser() user: user) {
    return this.restaurantsService.findOne(+id, user)
  }

  @ApiTags('mobile')
  @Get(':id/products')
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: `Must log in` })
  @ApiResponse({
    isArray: true,
    status: 200,
    type: CategoriesDto
  })
  @ApiResponse({
    status: 403,
    type: ErrorResonseDto
  })
  @ApiResponse({
    status: 404,
    type: ErrorResonseDto
  })
  getProducts(@Param('id') id: string, @GetUser() user: user) {
    return this.restaurantsService.getProducts(+id, user)
  }

  @Get(':id/description')
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(Role.Admin)
  @ApiOperation({ summary: `ReqRole: ${[Role.Admin]}` })
  @ApiBearerAuth()
  getDesc(@Param('id') id: string) {
    return this.restaurantsService.getDesc(+id)
  }

  @Patch(':id')
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(Role.Admin, Role.Owner)
  @ApiOperation({ summary: `ReqRole: ${[Role.Admin, Role.Owner]}` })
  @ApiBearerAuth()
  update(@Param('id') id: string, @Body() updateRestaurantDto: UpdateRestaurantDto, @GetUser() user: user) {
    return this.restaurantsService.update(+id, updateRestaurantDto, user)
  }

  @Get('/forOwner')
  @UseGuards(JwtGuard, RolesGuard)
  @ApiBearerAuth()
  @Roles(Role.Owner)
  @ApiOperation({ summary: `ReqRole: ${[Role.Owner]}` })
  findAllForOwner() {
    return this.restaurantsService.findAllForOwner()
  }

}
