import { Controller, Get, UseGuards } from '@nestjs/common'
import { RestaurantsService } from './restaurants.service'
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger'
import { Roles } from 'src/auth/decorator'
import { JwtGuard, RolesGuard } from 'src/auth/guard'
import { Role } from 'src/auth/enums'


@ApiTags('restaurantsForOwner')
@Controller('restaurantsForOwner')
export class restaurantsForOwnerController {
  constructor(private readonly restaurantsService: RestaurantsService) { }

  @Get()
  @UseGuards(JwtGuard, RolesGuard)
  @ApiBearerAuth()
  @Roles(Role.Owner)
  @ApiOperation({ summary: `ReqRole: ${[Role.Owner]}` })
  findAllForOwner() {
    return this.restaurantsService.findAllForOwner()
  }

}
