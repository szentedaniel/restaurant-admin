/* eslint-disable indent */
import { ApiProperty } from '@nestjs/swagger'
import { IsArray } from 'class-validator'

export class UpdateLanguageDto {
  @IsArray()
  @ApiProperty()
  languages: Array<string>
}
