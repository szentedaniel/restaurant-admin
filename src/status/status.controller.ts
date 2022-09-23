import { Controller, Get } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { StatusService } from './status.service'

@ApiTags('OrderStatus')
@Controller('api/status')
export class StatusController {
  constructor(private readonly statusService: StatusService) { }

  @Get()
  findAll() {
    return this.statusService.findAll()
  }
}
