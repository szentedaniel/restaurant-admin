import { Controller, Get } from '@nestjs/common'
import { ApiResponse, ApiTags } from '@nestjs/swagger'
import { ConsumptionTypesService } from './consumption-types.service'
import { defaultConsumptionTypeResponseDto } from './dto/response-consumption-type.dto'

@ApiTags('consumptionTypes')
@Controller('consumptionTypes')
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
  @ApiResponse({
    isArray: true,
    status: 200,
    type: defaultConsumptionTypeResponseDto
  })
  findAll() {
    return this.consumptionTypesService.allConsumptionType()
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.consumptionTypesService.supportedConsumptionTypesByRestaurant(+id)
  // }
}
