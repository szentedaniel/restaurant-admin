import { Controller, Get } from '@nestjs/common'
import { ApiResponse, ApiTags } from '@nestjs/swagger'
import { AllergiesService } from './allergies.service'
import { defaultAllergyResponseDto } from './dto/response-allergy.dto'

@ApiTags('allergies')
@Controller('allergies')
export class AllergiesController {
  constructor(private readonly allergiesService: AllergiesService) { }

  @Get()
  @ApiResponse({
    isArray: true,
    status: 200,
    type: defaultAllergyResponseDto
  })
  findAll() {
    return this.allergiesService.findAll()
  }

}
