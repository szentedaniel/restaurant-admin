import { Controller, Get, Body, Patch, Param, UseGuards } from '@nestjs/common'
import { RestaurantsService } from './restaurants.service'
import { UpdateRestaurantDto } from './dto/update-restaurant.dto'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { GetUser, Roles } from 'src/auth/decorator'
import { JwtGuard, RolesGuard } from 'src/auth/guard'
import { Role } from 'src/auth/enums'
import { user } from '@prisma/client'


@ApiTags('restaurants')
@Controller('api/restaurants')
export class RestaurantsController {
  constructor(private readonly restaurantsService: RestaurantsService) { }

  @Get()
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  findAll(@GetUser() user: user) {
    return this.restaurantsService.findAll(user)
  }

  @Get(':id')
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  findOne(@Param('id') id: string,) {
    return this.restaurantsService.findOne(+id)
  }

  @Get(':id/products')
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  getProducts(@Param('id') id: string, @GetUser() user: user) {
    return this.restaurantsService.getProducts(+id, user)
  }

  @Patch(':id')
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(Role.Admin)
  @ApiBearerAuth()
  update(@Param('id') id: string, @Body() updateRestaurantDto: UpdateRestaurantDto) {
    return this.restaurantsService.update(+id, updateRestaurantDto)
  }
}
