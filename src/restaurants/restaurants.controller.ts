import { Controller, Get, Body, Patch, Param, UseGuards } from '@nestjs/common'
import { RestaurantsService } from './restaurants.service'
import { UpdateRestaurantDto } from './dto/update-restaurant.dto'
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger'
import { GetUser, Roles } from 'src/auth/decorator'
import { JwtGuard, RolesGuard } from 'src/auth/guard'
import { Role } from 'src/auth/enums'
import { user } from '@prisma/client'


@ApiTags('restaurants')
@Controller('restaurants')
export class RestaurantsController {
  constructor(private readonly restaurantsService: RestaurantsService) { }

  @ApiTags('mobile')
  @Get()
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: `Must log in` })
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
  getProducts(@Param('id') id: string, @GetUser() user: user) {
    return this.restaurantsService.getProducts(+id, user)
  }

  @Patch(':id')
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(Role.Admin)
  @ApiOperation({ summary: `ReqRole: ${[Role.Admin]}` })
  @ApiBearerAuth()
  update(@Param('id') id: string, @Body() updateRestaurantDto: UpdateRestaurantDto, @GetUser() user: user) {
    return this.restaurantsService.update(+id, updateRestaurantDto, user)
  }
}
