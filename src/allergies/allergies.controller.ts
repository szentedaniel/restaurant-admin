import { Controller, Get } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { AllergiesService } from './allergies.service'

@ApiTags('allergies')
@Controller('api/allergies')
export class AllergiesController {
  constructor(private readonly allergiesService: AllergiesService) { }

  @Get()
  findAll() {
    return this.allergiesService.findAll()
  }

}
