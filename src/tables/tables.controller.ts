import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common'
import { TablesService } from './tables.service'
import { CreateTableDto } from './dto/create-table.dto'
import { UpdateTableDto } from './dto/update-table.dto'
import { GetUser, Roles } from 'src/auth/decorator'
import { JwtGuard, RolesGuard } from 'src/auth/guard'
import { Role } from 'src/auth/enums'
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger'

@ApiTags('tables')
@Controller('tables')
export class TablesController {
  constructor(private readonly tablesService: TablesService) { }

  @Post()
  @ApiBearerAuth()
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(Role.Admin, Role.Restricted, Role.Staff)
  @ApiOperation({ summary: `ReqRole: ${[Role.Admin, Role.Restricted, Role.Staff]}` })
  create(@Body() createTableDto: CreateTableDto, @GetUser('etterem_id') restaurantId: number) {
    return this.tablesService.create(createTableDto, restaurantId)
  }

  @Get()
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @ApiOperation({ summary: `Must log in` })
  findAll(@GetUser('etterem_id') restaurantId: number) {
    return this.tablesService.findAll(+restaurantId)
  }

  @Get(':id')
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @ApiOperation({ summary: `Must log in` })
  findOne(@Param('id') id: string) {
    return this.tablesService.findOne(+id)
  }

  @Patch(':id')
  @ApiBearerAuth()
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(Role.Admin, Role.Restricted, Role.Staff)
  @ApiOperation({ summary: `ReqRole: ${[Role.Admin, Role.Restricted, Role.Staff]}` })
  update(@Param('id') id: string, @Body() updateTableDto: UpdateTableDto) {
    return this.tablesService.update(+id, updateTableDto)
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(Role.Admin)
  @ApiOperation({ summary: `ReqRole: ${[Role.Admin]}` })
  remove(@Param('id') id: string) {
    return this.tablesService.remove(+id)
  }
}
