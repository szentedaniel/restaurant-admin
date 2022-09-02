import { Controller, Get, } from '@nestjs/common'
import { LanguagesService } from './languages.service'
import { ApiTags } from '@nestjs/swagger'

@ApiTags('languages')
@Controller('api/languages')
export class LanguagesController {
  constructor(private readonly languagesService: LanguagesService) { }

  @Get()
  // @ApiBearerAuth()
  // @UseGuards(JwtGuard)
  allLanguages() {
    return this.languagesService.allLanguages()
  }

  // @Get(':restaurantId')
  // // @ApiBearerAuth()
  // // @UseGuards(JwtGuard)
  // supportedLanguagesByRestaurant(@Param('restaurantId') id: string) {
  //   return this.languagesService.supportedLanguagesByRestaurant(+id)
  // }

  // @Patch(':restaurantId')
  // // @ApiBearerAuth()
  // // @UseGuards(JwtGuard)
  // updateSupportedLanguagesByRestaurant(@Param('restaurantId') id: string, @Body() updateLanguageDto: UpdateLanguageDto) {
  //   return this.languagesService.updateLanguagesByRestaurantId(+id, updateLanguageDto)
  // }

}
