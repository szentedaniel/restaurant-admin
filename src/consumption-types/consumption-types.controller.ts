import { Controller, Get, Post, Body, Param, Delete, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { GetUser, Roles } from 'src/auth/decorator'
import { Role } from 'src/auth/enums'
import { JwtGuard, RolesGuard } from 'src/auth/guard'
import { ConsumptionTypesService } from './consumption-types.service'
import { CreateConsumptionTypeDto } from './dto/create-consumption-type.dto'

@ApiTags('consumptionTypes')
@Controller('api/consumptionTypes')
export class ConsumptionTypesController {
  constructor(private readonly consumptionTypesService: ConsumptionTypesService) { }

  // @Post()
  // @ApiBearerAuth()
  // @UseGuards(JwtGuard, RolesGuard)
  // @Roles(Role.Admin)
  // create(@Body() createConsumptionTypeDto: CreateConsumptionTypeDto, @GetUser('restaurant_id') restaurantId: number) {
  //   return this.consumptionTypesService.create(createConsumptionTypeDto)
  // }

  @Get()
  findAll() {
    return this.consumptionTypesService.allConsumptionType()
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.consumptionTypesService.supportedConsumptionTypesByRestaurant(+id)
  // }
}
