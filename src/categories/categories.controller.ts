import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiSecurity, ApiTags, PartialType } from '@nestjs/swagger'
import { kategoriak, kategoriak_fordito, languages } from '@prisma/client'
import { GetUser, Roles } from 'src/auth/decorator'
import { Role } from 'src/auth/enums'
import { JwtGuard, RolesGuard } from 'src/auth/guard'
import { CategoriesService } from './categories.service'
import { CreateCategoryDto } from './dto/create-category.dto'
import { defaultCategoryResposeDto } from './dto/response-category.dto'
import { UpdateCategoryDto } from './dto/update-category.dto'

@ApiTags('categories')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) { }

  @Post()
  @ApiBearerAuth()
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(Role.Admin, Role.Restricted)
  @ApiOperation({ summary: `ReqRole: ${[Role.Admin, Role.Restricted]}` })
  @ApiResponse({
    status: 201,
    type: defaultCategoryResposeDto
  })
  create(@Body() createCategoryDto: CreateCategoryDto, @GetUser('etterem_id') restaurantId: number) {
    return this.categoriesService.create(createCategoryDto, restaurantId)
  }

  @Get()
  @ApiBearerAuth()
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(Role.Admin, Role.Restricted)
  @ApiOperation({ summary: `ReqRole: ${[Role.Admin, Role.Restricted]}` })
  @ApiResponse({
    isArray: true,
    status: 200,
    type: defaultCategoryResposeDto
  })
  findAll(@GetUser('etterem_id') restaurantId: number) {
    return this.categoriesService.findAll(restaurantId)
  }

  @Get(':id')
  @ApiBearerAuth()
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(Role.Admin, Role.Restricted)
  @ApiOperation({ summary: `ReqRole: ${[Role.Admin, Role.Restricted]}` })
  @ApiResponse({
    status: 200,
    type: defaultCategoryResposeDto
  })
  findOne(@Param('id') id: string) {
    return this.categoriesService.findOne(+id)
  }

  @Patch(':id')
  @ApiBearerAuth()
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(Role.Admin, Role.Restricted)
  @ApiOperation({ summary: `ReqRole: ${[Role.Admin, Role.Restricted]}` })
  @ApiResponse({
    status: 200,
    type: defaultCategoryResposeDto
  })
  update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoriesService.update(+id, updateCategoryDto)
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(Role.Admin)
  @ApiOperation({ summary: `ReqRole: ${[Role.Admin]}` })
  @ApiResponse({
    status: 200,
    type: defaultCategoryResposeDto
  })
  remove(@Param('id') id: string) {
    return this.categoriesService.remove(+id,)
  }
}
