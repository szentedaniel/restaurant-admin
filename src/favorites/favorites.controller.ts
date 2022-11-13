import { Controller, Get, Post, Body, Param, Delete, UseGuards } from '@nestjs/common'
import { FavoritesService } from './favorites.service'
import { CreateFavoriteProdDto, CreateFavoriteRestaurantDto } from './dto/create-favorite.dto'
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags, PartialType } from '@nestjs/swagger'
import { GetUser } from 'src/auth/decorator'
import { user } from '@prisma/client'
import { JwtGuard } from 'src/auth/guard'
import { defaultKedvencEtteremResponseDto, defaultKedvencTermekResponseDto } from './dto/response-favorite.dto'
import { ErrorResonseDto } from 'src/auth/dto/authRespose.dto'
import { ProductDto } from 'src/restaurants/dto/products.dto'
import { RestaurantDto } from 'src/restaurants/dto/restaurant.dto'

@ApiTags('favorites', 'mobile')
@Controller('favorites')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) { }

  @Post('product')
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @ApiOperation({ summary: 'Must log in' })
  @ApiResponse({
    status: 200,
    type: defaultKedvencTermekResponseDto
  })
  @ApiResponse({
    status: 403,
    type: ErrorResonseDto
  })
  createProdFav(@Body() dto: CreateFavoriteProdDto, @GetUser() user: user) {
    return this.favoritesService.createProdFav(dto, user)
  }

  @Get('products')
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @ApiOperation({ summary: 'Must log in' })
  @ApiResponse({
    isArray: true,
    status: 200,
    type: ProductDto
  })
  @ApiResponse({
    status: 403,
    type: ErrorResonseDto
  })
  @ApiResponse({
    status: 404,
    type: ErrorResonseDto
  })
  findAllProdFav(@GetUser() user: user) {
    return this.favoritesService.findAllProdFav(user)
  }

  @Get('productsByRestaurant/:restaurantId')
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @ApiOperation({ summary: 'Must log in' })
  @ApiResponse({
    isArray: true,
    status: 200,
    type: ProductDto
  })
  @ApiResponse({
    status: 403,
    type: ErrorResonseDto
  })
  @ApiResponse({
    status: 404,
    type: ErrorResonseDto
  })
  findAllProdFavByRestaurant(@Param('restaurantId') id: string, @GetUser() user: user) {
    return this.favoritesService.findAllProdFavByRestaurant(+id, user)
  }

  @Delete('product/:id')
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @ApiOperation({ summary: 'Must log in' })
  @ApiResponse({
    status: 200,
    type: defaultKedvencTermekResponseDto
  })
  @ApiResponse({
    status: 403,
    type: ErrorResonseDto
  })
  @ApiResponse({
    status: 404,
    type: ErrorResonseDto
  })
  removeProdFav(@Param('id') id: string, @GetUser() user: user) {
    return this.favoritesService.removeProdFav(+id, user)
  }

  @Post('restaurant')
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @ApiOperation({ summary: 'Must log in' })
  @ApiResponse({
    status: 200,
    type: defaultKedvencEtteremResponseDto
  })
  @ApiResponse({
    status: 403,
    type: ErrorResonseDto
  })
  createRestaurantFav(@Body() dto: CreateFavoriteRestaurantDto, @GetUser() user: user) {
    return this.favoritesService.createRestaurantFav(dto, user)
  }

  @Get('restaurants')
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @ApiOperation({ summary: 'Must log in' })
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
  findAllRestaurantFav(@GetUser() user: user) {
    return this.favoritesService.findAllRestaurantFav(user)
  }

  @Delete('restaurant/:id')
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @ApiOperation({ summary: 'Must log in' })
  @ApiResponse({
    status: 200,
    type: defaultKedvencEtteremResponseDto
  })
  @ApiResponse({
    status: 403,
    type: ErrorResonseDto
  })
  @ApiResponse({
    status: 404,
    type: ErrorResonseDto
  })
  removeRestaurantFav(@Param('id') id: string, @GetUser() user: user) {
    return this.favoritesService.removeRestaurantFav(+id, user)
  }
}
