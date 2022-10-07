import { Controller, Get } from '@nestjs/common'
import { ApiResponse, ApiTags } from '@nestjs/swagger'
import { defaultStatusResponseDto } from './dto/response-status.dto'
import { StatusService } from './status.service'

@ApiTags('OrderStatus')
@Controller('status')
export class StatusController {
  constructor(private readonly statusService: StatusService) { }

  @Get()
  @ApiResponse({
    isArray: true,
    status: 200,
    type: defaultStatusResponseDto
  })
  findAll() {
    return this.statusService.findAll()
  }
}
