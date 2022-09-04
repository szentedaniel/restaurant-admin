import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { GetUser, Roles } from 'src/auth/decorator'
import { Role } from 'src/auth/enums'
import { JwtGuard, RolesGuard } from 'src/auth/guard'
import { CategoriesService } from './categories.service'
import { CreateCategoryDto } from './dto/create-category.dto'
import { UpdateCategoryDto } from './dto/update-category.dto'

@ApiTags('categories')
@Controller('api/categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) { }

  @Post()
  @ApiBearerAuth()
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(Role.Admin, Role.Staff)
  create(@Body() createCategoryDto: CreateCategoryDto, @GetUser('etterem_id') restaurantId: number) {
    return this.categoriesService.create(createCategoryDto, restaurantId)
  }

  @Get()
  @ApiBearerAuth()
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(Role.Admin, Role.Staff)
  findAll(@GetUser('etterem_id') restaurantId: number) {
    return this.categoriesService.findAll(restaurantId)
  }

  @Get(':id')
  @ApiBearerAuth()
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(Role.Admin, Role.Staff)
  findOne(@Param('id') id: string) {
    return this.categoriesService.findOne(+id)
  }

  @Patch(':id')
  @ApiBearerAuth()
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(Role.Admin, Role.Staff)
  update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoriesService.update(+id, updateCategoryDto)
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(Role.Admin)
  remove(@Param('id') id: string) {
    return this.categoriesService.remove(+id,)
  }
}
