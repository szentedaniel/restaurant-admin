import { Controller, Get} from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { ConsumptionTypesService } from './consumption-types.service'

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
