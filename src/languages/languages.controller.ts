import { Controller, Get, } from '@nestjs/common'
import { LanguagesService } from './languages.service'
import { ApiResponse, ApiTags } from '@nestjs/swagger'
import { defaultLanguagesResponseDto } from './dto/response-language.dto'

@ApiTags('languages')
@Controller('languages')
export class LanguagesController {
  constructor(private readonly languagesService: LanguagesService) { }

  @Get()
  @ApiResponse({
    status: 200,
    type: defaultLanguagesResponseDto
  })
  allLanguages() {
    return this.languagesService.allLanguages()
  }
}
