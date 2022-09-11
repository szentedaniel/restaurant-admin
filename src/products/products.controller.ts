import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common'
import { ProductsService } from './products.service'
import { CreateProductDto, toggleAvailableDto } from './dto/create-product.dto'
import { UpdateProductDto } from './dto/update-product.dto'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { JwtGuard, RolesGuard } from 'src/auth/guard'
import { GetUser, Roles } from 'src/auth/decorator'
import { Role } from 'src/auth/enums'
import { user } from '@prisma/client'

@ApiTags('products')
@Controller('api/products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) { }

  @Post()
  @ApiBearerAuth()
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(Role.Admin, Role.Staff)
  create(@Body() createProductDto: CreateProductDto, @GetUser() user: user) {
    return this.productsService.create(createProductDto, user)
  }


  @Get()
  @ApiBearerAuth()
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(Role.Admin, Role.Staff)
  findAll(@GetUser() user: user) {
    return this.productsService.findAll(user)
  }

  @Get(':id')
  @ApiBearerAuth()
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(Role.Admin, Role.Staff)
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(+id)
  }


  @Patch(':id')
  @ApiBearerAuth()
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(Role.Admin, Role.Staff)
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(+id, updateProductDto)
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(Role.Admin)
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id)
  }
}
