import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common'
import { FavoritesService } from './favorites.service'
import { CreateFavoriteProdDto, CreateFavoriteRestaurantDto } from './dto/create-favorite.dto'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { GetUser } from 'src/auth/decorator'
import { user } from '@prisma/client'
import { JwtGuard } from 'src/auth/guard'

@ApiTags('favorites')
@Controller('api/favorites')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) { }

  @Post('product')
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  createProdFav(@Body() dto: CreateFavoriteProdDto, @GetUser() user: user) {
    return this.favoritesService.createProdFav(dto, user)
  }

  @Get('products')
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  findAllProdFav(@GetUser() user: user) {
    return this.favoritesService.findAllProdFav(user)
  }

  @Delete('product/:id')
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  removeProdFav(@Param('id') id: string, @GetUser() user: user) {
    return this.favoritesService.removeProdFav(+id, user)
  }

  @Post('restaurant')
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  createRestaurantFav(@Body() dto: CreateFavoriteRestaurantDto, @GetUser() user: user) {
    return this.favoritesService.createRestaurantFav(dto, user)
  }

  @Get('restaurants')
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  findAllRestaurantFav(@GetUser() user: user) {
    return this.favoritesService.findAllRestaurantFav(user)
  }

  @Delete('restaurant/:id')
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  removeRestaurantFav(@Param('id') id: string, @GetUser() user: user) {
    return this.favoritesService.removeRestaurantFav(+id, user)
  }
}
