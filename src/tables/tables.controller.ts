import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common'
import { TablesService } from './tables.service'
import { CreateTableDto } from './dto/create-table.dto'
import { UpdateTableDto } from './dto/update-table.dto'
import { GetUser, Roles } from 'src/auth/decorator'
import { JwtGuard, RolesGuard } from 'src/auth/guard'
import { Role } from 'src/auth/enums'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'

@ApiTags('tables')
@Controller('api/tables')
export class TablesController {
  constructor(private readonly tablesService: TablesService) { }

  @Post()
  @ApiBearerAuth()
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(Role.Admin, Role.Staff)
  create(@Body() createTableDto: CreateTableDto, @GetUser('etterem_id') restaurantId: number) {
    return this.tablesService.create(createTableDto, restaurantId)
  }

  @Get('r/:restaurantId')
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  findAll(@Param('restaurantId') restaurantId: number) {
    return this.tablesService.findAll(+restaurantId)
  }

  @Get(':id')
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  findOne(@Param('id') id: string) {
    return this.tablesService.findOne(+id)
  }

  @Patch(':id')
  @ApiBearerAuth()
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(Role.Admin, Role.Staff)
  update(@Param('id') id: string, @Body() updateTableDto: UpdateTableDto) {
    return this.tablesService.update(+id, updateTableDto)
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(Role.Admin)
  remove(@Param('id') id: string) {
    return this.tablesService.remove(+id)
  }
}
